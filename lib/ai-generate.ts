import Anthropic from '@anthropic-ai/sdk'
import type { CoreVital, DiagnosisFinding, TreatmentPhase, PrognosisRow, ServiceItem } from './types'
import { lighthouseGrade, coreVitalsGrade, securityHeadersGrade, leadCaptureGrade, reputationGrade } from './grading'
import type { Grade } from './types'

const BOOKING_PATTERNS = [
  /doctify/i, /treatwell/i, /fresha/i, /calendly/i, /acuity/i,
  /book[\s-]?now/i, /book[\s-]?online/i, /book[\s-]?appointment/i,
  /online[\s-]?booking/i, /request[\s-]?appointment/i,
  /practiceweb/i, /dentally/i, /SOE/i, /exact/i,
]
const CHAT_PATTERNS = [
  /tidio/i, /intercom/i, /drift/i, /livechat/i, /tawk/i,
  /crisp/i, /freshchat/i, /hubspot/i, /chatbot/i, /live[\s-]?chat/i,
]
const FORM_PATTERNS = [
  /<form[\s\S]{0,200}?(contact|enquir|message|callback|refer)/i,
  /contact[\s-]?us/i, /get[\s-]?in[\s-]?touch/i, /send[\s-]?us[\s-]?a[\s-]?message/i,
]

export interface ScrapedSite {
  title: string
  description: string
  jsonLd: object[]
  addressText: string
  reviewRating: number | null
  reviewCount: number | null
  leadCaptureCount: number
  leadCaptureMechanisms: string[]
  bodySnippet: string   // first ~3000 chars of visible text
}

export async function scrapeWebsite(url: string): Promise<ScrapedSite> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SozeroAuditBot/1.0)' },
    signal: AbortSignal.timeout(15000),
  })
  const html = await res.text()

  // Meta tags
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? ''
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim() ?? ''

  // JSON-LD structured data
  const jsonLdMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const jsonLd: object[] = []
  for (const m of jsonLdMatches) {
    try { jsonLd.push(JSON.parse(m[1])) } catch { /* ignore malformed */ }
  }

  // Extract review data from schema
  let reviewRating: number | null = null
  let reviewCount: number | null = null
  for (const schema of jsonLd) {
    const s = schema as Record<string, unknown>
    const agg = s.aggregateRating as Record<string, unknown> | undefined
    if (agg) {
      reviewRating = reviewRating ?? (parseFloat(String(agg.ratingValue ?? agg.bestRating ?? '')) || null)
      reviewCount  = reviewCount  ?? (parseInt(String(agg.reviewCount ?? agg.ratingCount ?? ''), 10) || null)
    }
    if (s.ratingValue) reviewRating = reviewRating ?? (parseFloat(String(s.ratingValue)) || null)
  }

  // Address from schema
  let addressText = ''
  for (const schema of jsonLd) {
    const s = schema as Record<string, unknown>
    const addr = s.address as Record<string, unknown> | undefined
    if (addr) {
      const parts = [addr.streetAddress, addr.addressLocality, addr.postalCode].filter(Boolean)
      if (parts.length) { addressText = parts.join(', '); break }
    }
  }

  // Strip HTML tags for plain text
  const noScript = html.replace(/<script[\s\S]*?<\/script>/gi, '')
  const noStyle  = noScript.replace(/<style[\s\S]*?<\/style>/gi, '')
  const noTags   = noStyle.replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim()
  const bodySnippet = noTags.slice(0, 4000)

  // Lead capture detection
  const leadCaptureMechanisms: string[] = []
  if (BOOKING_PATTERNS.some((p) => p.test(html))) leadCaptureMechanisms.push('booking widget')
  if (CHAT_PATTERNS.some((p) => p.test(html)))    leadCaptureMechanisms.push('live chat / chatbot')
  if (FORM_PATTERNS.some((p) => p.test(html)))    leadCaptureMechanisms.push('contact / callback form')

  return {
    title,
    description,
    jsonLd,
    addressText,
    reviewRating,
    reviewCount,
    leadCaptureCount: leadCaptureMechanisms.length,
    leadCaptureMechanisms,
    bodySnippet,
  }
}

export interface AIGeneratedContent {
  heroHeadline:      { before: string; emphasis: string }
  heroSubheading:    string
  heroMeta:          Array<{ primary: string; secondary: string }>
  reviewRating:      number | null
  reviewCount:       number | null
  lighthouseNotes:   { performance: string; accessibility: string; bestPractices: string; seo: string }
  diagnosisFindings: DiagnosisFinding[]
  treatmentPlan:     [TreatmentPhase, TreatmentPhase, TreatmentPhase]
  prognosisRows:     PrognosisRow[]
  services:          ServiceItem[]
  leadCaptureCount:  number
  reportCardGrades: {
    performance:     Grade
    coreVitals:      Grade
    leadCapture:     Grade
    securityHeaders: Grade
    accessibility:   Grade
    bestPractices:   Grade
    seo:             Grade
    reputation:      Grade
  }
}

export async function generateReportContent(params: {
  businessName:     string
  url:              string
  site:             ScrapedSite
  lighthouse:       { performance: number; accessibility: number; bestPractices: number; seo: number } | null
  coreVitals:       CoreVital[] | null
  coreVitalsPass:   boolean | null
  totalPageWeightKb: number | null
  topOpportunities: Array<{ title: string; savingsKb: number | null; savingsMs: number | null }>
  secHeaders:       { presentCount: number; present: string[] }
}): Promise<AIGeneratedContent> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const { businessName, url, site, lighthouse: lh, coreVitals, coreVitalsPass, totalPageWeightKb, topOpportunities, secHeaders } = params

  const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  const reviewRating = site.reviewRating
  const reviewCount  = site.reviewCount

  // Compute grades
  const perfGrade = lh ? lighthouseGrade(lh.performance)   : 'F'
  const a11yGrade = lh ? lighthouseGrade(lh.accessibility) : 'F'
  const bpGrade   = lh ? lighthouseGrade(lh.bestPractices) : 'F'
  const seoGrade  = lh ? lighthouseGrade(lh.seo)           : 'F'
  const cwvGrade  = coreVitalsGrade(coreVitalsPass ?? null)
  const secGrade  = secHeaders.presentCount >= 0 ? securityHeadersGrade(secHeaders.presentCount) : 'D'
  const leadGrade = leadCaptureGrade(site.leadCaptureCount)
  const repGrade  = reviewRating && reviewCount ? reputationGrade(reviewRating, reviewCount) : 'B'

  const prompt = `You are writing a website audit report for a dental practice. Your job is to turn technical data into a compelling, plain-English sales document that a dentist will understand and find valuable. The tone is direct, honest, and specific — not generic marketing fluff.

PRACTICE: ${businessName}
WEBSITE: ${domain}

PAGE TITLE: ${site.title}
META DESCRIPTION: ${site.description}
ADDRESS FOUND: ${site.addressText || 'not found in structured data'}
GOOGLE REVIEWS: ${reviewRating ? `${reviewRating}★ from ${reviewCount} reviews` : 'not found in page schema'}

LEAD CAPTURE MECHANISMS DETECTED ON SITE: ${site.leadCaptureMechanisms.length > 0 ? site.leadCaptureMechanisms.join(', ') : 'none detected'}

LIGHTHOUSE SCORES (mobile, 0–100):
- Performance: ${lh?.performance ?? 'unavailable'}
- Accessibility: ${lh?.accessibility ?? 'unavailable'}
- Best Practices: ${lh?.bestPractices ?? 'unavailable'}
- SEO: ${lh?.seo ?? 'unavailable'}

TOTAL PAGE WEIGHT: ${totalPageWeightKb ? `${(totalPageWeightKb / 1024).toFixed(1)}MB` : 'unknown'}

TOP SPEED OPPORTUNITIES:
${topOpportunities.length > 0 ? topOpportunities.map((o) => `- ${o.title}: saves ${o.savingsKb != null ? o.savingsKb + 'KB' : '?'} / ${o.savingsMs != null ? o.savingsMs + 'ms' : '?'}`).join('\n') : 'none available'}

CORE WEB VITALS (field data from real visitors):
${coreVitals ? coreVitals.map((v) => `- ${v.metric}: ${v.displayValue} (${v.status})`).join('\n') : 'no field data available'}
OVERALL CWV ASSESSMENT: ${coreVitalsPass === true ? 'PASSED' : coreVitalsPass === false ? 'FAILED' : 'no data'}

SECURITY HEADERS: ${secHeaders.presentCount >= 0 ? `${secHeaders.presentCount} of 6 present` : 'check failed'}
${secHeaders.present.length > 0 ? `Present: ${secHeaders.present.join(', ')}` : ''}

WEBSITE TEXT SNIPPET (first 4000 chars of visible text):
${site.bodySnippet}

---

Return ONLY a valid JSON object — no markdown, no explanation, just the raw JSON. Use this exact structure:

{
  "heroHeadline": {
    "before": "Two words or a short phrase ending with a full stop and newline. Then 'Website needs ' or similar lead-in.",
    "emphasis": "one or two words in orange — the problem word(s)"
  },
  "heroSubheading": "2 sentences max. Mention the business name, what we did (ran the website through Google diagnostics), and the key tension (great reputation/presence but the website isn't converting it). If we found reviews, mention the rating and count.",
  "heroMeta": [
    { "primary": "address if found, else 'TODO: address'", "secondary": "Trading since XXXX if found in page text, else 'TODO: trading since'" },
    { "primary": "any notable credential or specialty found (e.g. Invisalign Provider, Implant Centre)", "secondary": "descriptor" },
    { "primary": "X of 3", "secondary": "Booking, chatbot, contact form live" }
  ],
  "lighthouseNotes": {
    "performance": "One sentence explaining what's causing the low score, specific to this site's data.",
    "accessibility": "One sentence on the key accessibility issues found.",
    "bestPractices": "One sentence on the key best-practice issues.",
    "seo": "One sentence — if score is high, explain why it's still not enough on its own."
  },
  "diagnosisFindings": [
    {
      "stat": "the key number/value e.g. '${totalPageWeightKb ? (totalPageWeightKb / 1024).toFixed(1) + 'MB' : 'TODO'}'",
      "title": "Short plain-English title",
      "body": "2–3 sentences explaining the problem and its real-world impact on the practice. No jargon. Speak to the dentist, not a developer."
    }
  ],
  "treatmentPlan": [
    {
      "phaseLabel": "Phase 1 — Stop the leak",
      "title": "Short compelling title",
      "bullets": ["specific action 1", "specific action 2", "specific action 3"]
    },
    {
      "phaseLabel": "Phase 2 — Fix the foundations",
      "title": "Short compelling title",
      "bullets": ["specific action 1", "specific action 2", "specific action 3", "specific action 4"]
    },
    {
      "phaseLabel": "Phase 3 — Grow the funnel",
      "title": "Short compelling title",
      "bullets": ["specific action 1", "specific action 2", "specific action 3"]
    }
  ],
  "prognosisRows": [
    { "today": "Current state described plainly", "after": "Improved state after Phase 1", "why": "Brief reason" },
    { "today": "...", "after": "...", "why": "..." },
    { "today": "...", "after": "...", "why": "..." },
    { "today": "...", "after": "...", "why": "..." }
  ],
  "services": [
    { "title": "24/7 chatbot", "description": "One sentence tailored to this practice's situation." },
    { "title": "Lead automation", "description": "One sentence tailored to this practice." },
    { "title": "Data entry automation", "description": "One sentence tailored to this practice." },
    { "title": "Image optimisation", "description": "One sentence using the actual page weight number if available." },
    { "title": "Security hardening", "description": "One sentence referencing the specific headers missing." },
    { "title": "SEO & content", "description": "One sentence on the specific content gaps for this practice." }
  ]
}

Guidelines:
- Write as if presenting this to the dentist in person. Confident, specific, not salesy.
- Use the actual numbers from the data — don't make up scores.
- diagnosisFindings: write 3–5 findings. Base them on the top opportunities and any obvious issues from the scores. Stat should be the most impactful number.
- treatmentPlan bullets should be specific to this practice's actual problems, not generic.
- prognosisRows: 4 rows, each showing a concrete before/after improvement from Phase 1.
- heroMeta third item: use the actual lead capture count detected (${site.leadCaptureCount} of 3).
- If address was not found, use "TODO: address" as primary.
- If trading-since year is not in the page text, use "TODO: trading since".`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''

  // Strip any accidental markdown fences
  const jsonStr = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()
  const parsed = JSON.parse(jsonStr)

  return {
    heroHeadline:      parsed.heroHeadline,
    heroSubheading:    parsed.heroSubheading,
    heroMeta:          parsed.heroMeta,
    reviewRating,
    reviewCount,
    lighthouseNotes:   parsed.lighthouseNotes,
    diagnosisFindings: parsed.diagnosisFindings,
    treatmentPlan:     parsed.treatmentPlan,
    prognosisRows:     parsed.prognosisRows,
    services:          parsed.services,
    leadCaptureCount:  site.leadCaptureCount,
    reportCardGrades: {
      performance:    perfGrade,
      coreVitals:     cwvGrade,
      leadCapture:    leadGrade,
      securityHeaders: secGrade,
      accessibility:  a11yGrade,
      bestPractices:  bpGrade,
      seo:            seoGrade,
      reputation:     repGrade,
    },
  }
}
