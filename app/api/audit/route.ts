import { NextRequest, NextResponse } from 'next/server'
import { scrapeWebsite, generateReportContent } from '@/lib/ai-generate'
import { publishClient } from '@/lib/github-publish'
import type { CoreVital, VitalStatus, TechStack } from '@/lib/types'

export const maxDuration = 300

const SECURITY_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'x-frame-options',
  'cross-origin-opener-policy',
  'permissions-policy',
  'referrer-policy',
]

const SUBPAGE_KEYWORDS = ['service', 'contact', 'booking', 'about', 'price', 'fee', 'product', 'quote', 'enquiry', 'enquire']

function vitalStatus(rating: string | undefined): VitalStatus {
  if (!rating) return 'no-data'
  if (rating === 'FAST') return 'good'
  if (rating === 'SLOW') return 'poor'
  return 'needs-work'
}

function formatVitalValue(value: number | undefined, metric: string): string {
  if (value === undefined) return '—'
  if (metric === 'CLS') return value.toFixed(2)
  if (metric === 'INP') return `${Math.round(value)}ms`
  return `${(value / 1000).toFixed(1)}s`
}

function subpageScore(pathname: string): number {
  const p = pathname.toLowerCase()
  const idx = SUBPAGE_KEYWORDS.findIndex((k) => p.includes(k))
  return idx === -1 ? 999 : idx
}

function isHtmlPage(url: string): boolean {
  try {
    const ext = new URL(url).pathname.split('.').pop()?.toLowerCase()
    return !ext || ext === 'html' || ext === 'htm' || ext === 'php' || ext === 'asp' || ext === 'aspx'
  } catch { return false }
}

async function parseSitemapForPages(xml: string, origin: string, baseUrl: string): Promise<string[]> {
  const isInternal = (href: string) => {
    try { return new URL(href).hostname === new URL(origin).hostname } catch { return false }
  }

  // Sitemap index: contains <sitemap> elements pointing to child sitemaps
  const isSitemapIndex = /<sitemap[\s>]/i.test(xml)
  if (isSitemapIndex) {
    // Fetch the first child sitemap and parse that instead
    const childUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].trim())
      .filter((u) => u.endsWith('.xml'))
      .slice(0, 3)

    for (const childUrl of childUrls) {
      try {
        const res = await fetch(childUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TrabeloAuditBot/1.0)' },
          signal: AbortSignal.timeout(6000),
        })
        if (!res.ok) continue
        const childXml = await res.text()
        const pages = await parseSitemapForPages(childXml, origin, baseUrl)
        if (pages.length > 0) return pages
      } catch { /* try next */ }
    }
    return []
  }

  // Regular sitemap: extract <loc> entries that are actual HTML pages
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((loc) => isInternal(loc) && isHtmlPage(loc) && new URL(loc).pathname !== '/' && loc !== baseUrl)
}

async function findSubpages(baseUrl: string): Promise<string[]> {
  const origin = new URL(baseUrl).origin
  const isInternal = (href: string) => {
    try { return new URL(href).hostname === new URL(origin).hostname } catch { return false }
  }

  // Try sitemap.xml first
  try {
    const res = await fetch(`${origin}/sitemap.xml`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TrabeloAuditBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    if (res.ok) {
      const xml  = await res.text()
      const locs = await parseSitemapForPages(xml, origin, baseUrl)
      if (locs.length > 0) {
        return locs
          .sort((a, b) => subpageScore(new URL(a).pathname) - subpageScore(new URL(b).pathname))
          .slice(0, 2)
      }
    }
  } catch { /* fall through */ }

  // Fallback: extract internal links from the homepage HTML
  try {
    const res = await fetch(baseUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TrabeloAuditBot/1.0)' },
      signal: AbortSignal.timeout(10000),
    })
    const html  = await res.text()
    const hrefs = [...html.matchAll(/href=["']([^"'#?]+)["']/g)].map((m) => m[1])
    const links = hrefs
      .map((h) => { try { return new URL(h, origin).href } catch { return null } })
      .filter((h): h is string => h !== null && isInternal(h) && isHtmlPage(h) && new URL(h).pathname !== '/' && h !== baseUrl)
    const unique = [...new Set(links)]
    return unique
      .sort((a, b) => subpageScore(new URL(a).pathname) - subpageScore(new URL(b).pathname))
      .slice(0, 2)
  } catch { return [] }
}

async function resolveCanonicalUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TrabeloAuditBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    // res.url is the final URL after all redirects
    return res.url || url
  } catch {
    return url
  }
}

async function runPageSpeed(url: string, apiKey: string) {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&key=${apiKey}`
  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(90000) })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PageSpeed API ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}

interface ParsedPage {
  url: string
  lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number } | null
  coreVitals: CoreVital[] | null
  coreVitalsPass: boolean | null
  totalPageWeightKb: number | null
  topOpportunities: Array<{ title: string; savingsKb: number | null; savingsMs: number | null }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePageSpeedJson(url: string, json: any): ParsedPage {
  const cats = json.lighthouseResult?.categories ?? {}
  const auds = json.lighthouseResult?.audits ?? {}
  const score = (key: string) => Math.round((cats[key]?.score ?? 0) * 100)
  const lighthouse = {
    performance:   score('performance'),
    accessibility: score('accessibility'),
    bestPractices: score('best-practices'),
    seo:           score('seo'),
  }

  const cwv   = json.loadingExperience ?? {}
  const field = cwv.metrics ?? {}
  const coreVitalsPass: boolean | null = cwv.overall_category ? cwv.overall_category === 'FAST' : null

  const coreVitals: CoreVital[] = [
    { metric: 'LCP',  displayValue: formatVitalValue(field.LARGEST_CONTENTFUL_PAINT_MS?.percentile,     'LCP'),  status: vitalStatus(field.LARGEST_CONTENTFUL_PAINT_MS?.category)     },
    { metric: 'TTFB', displayValue: formatVitalValue(field.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile, 'TTFB'), status: vitalStatus(field.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category) },
    { metric: 'FCP',  displayValue: formatVitalValue(field.FIRST_CONTENTFUL_PAINT_MS?.percentile,       'FCP'),  status: vitalStatus(field.FIRST_CONTENTFUL_PAINT_MS?.category)       },
    { metric: 'CLS',  displayValue: formatVitalValue(field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,   'CLS'),  status: vitalStatus(field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category)   },
    { metric: 'INP',  displayValue: formatVitalValue(field.INTERACTION_TO_NEXT_PAINT?.percentile,       'INP'),  status: vitalStatus(field.INTERACTION_TO_NEXT_PAINT?.category)       },
  ]

  const totalBytes: number | undefined = auds['total-byte-weight']?.numericValue
  const totalPageWeightKb = totalBytes ? Math.round(totalBytes / 1024) : null

  const topOpportunities = Object.values(auds as Record<string, { details?: { type: string; overallSavingsMs?: number; overallSavingsBytes?: number }; title?: string }>)
    .filter((a) => a?.details?.type === 'opportunity' && (a.details.overallSavingsMs ?? 0) > 0)
    .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
    .slice(0, 5)
    .map((a) => ({
      title:     a.title ?? 'Unknown',
      savingsKb: a.details?.overallSavingsBytes ? Math.round(a.details.overallSavingsBytes / 1024) : null,
      savingsMs: a.details?.overallSavingsMs    ? Math.round(a.details.overallSavingsMs)            : null,
    }))

  return { url, lighthouse, coreVitals, coreVitalsPass, totalPageWeightKb, topOpportunities }
}

function aggregatePages(pages: ParsedPage[]): {
  lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number } | null
  coreVitals: CoreVital[] | null
  coreVitalsPass: boolean | null
  totalPageWeightKb: number | null
  topOpportunities: Array<{ title: string; savingsKb: number | null; savingsMs: number | null }>
  perPageScores: Array<{ url: string; scores: { performance: number; accessibility: number; bestPractices: number; seo: number } | null }>
} {
  const withScores = pages.filter((p) => p.lighthouse !== null)
  const homepage   = pages[0]

  const lighthouse = withScores.length > 0 ? {
    performance:   Math.min(...withScores.map((p) => p.lighthouse!.performance)),
    accessibility: Math.min(...withScores.map((p) => p.lighthouse!.accessibility)),
    bestPractices: Math.min(...withScores.map((p) => p.lighthouse!.bestPractices)),
    seo:           Math.min(...withScores.map((p) => p.lighthouse!.seo)),
  } : null

  // CWV only from homepage (subpages rarely have real-user field data)
  const coreVitals     = homepage?.coreVitals     ?? null
  const coreVitalsPass = homepage?.coreVitalsPass ?? null

  // Worst (largest) page weight across all pages
  const weights = pages.map((p) => p.totalPageWeightKb).filter((w): w is number => w !== null)
  const totalPageWeightKb = weights.length > 0 ? Math.max(...weights) : null

  // Combine opportunities, deduplicate by title, keep worst savings first
  const seen = new Set<string>()
  const topOpportunities = pages
    .flatMap((p) => p.topOpportunities)
    .sort((a, b) => (b.savingsMs ?? 0) - (a.savingsMs ?? 0))
    .filter((o) => { if (seen.has(o.title)) return false; seen.add(o.title); return true })
    .slice(0, 5)

  const perPageScores = pages.map((p) => ({ url: p.url, scores: p.lighthouse }))

  return { lighthouse, coreVitals, coreVitalsPass, totalPageWeightKb, topOpportunities, perPageScores }
}

async function checkHeaders(url: string): Promise<{ presentCount: number; present: string[] }> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) })
    const present = SECURITY_HEADERS.filter((h) => res.headers.has(h))
    return { presentCount: present.length, present }
  } catch {
    return { presentCount: -1, present: [] }
  }
}

async function runWhatCms(url: string, apiKey: string): Promise<TechStack> {
  try {
    const apiUrl = `https://whatcms.org/API/Tech?key=${apiKey}&url=${encodeURIComponent(url)}`
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) return { cms: null, hosting: null, other: [] }
    const json = await res.json()
    if (json.result?.code !== 200) return { cms: null, hosting: null, other: [] }
    const techs: Array<{ name: string; categories?: string[] }> = json.results ?? []
    let cms: string | null = null
    let hosting: string | null = null
    const other: string[] = []
    for (const t of techs) {
      const cats = (t.categories ?? []).map((c: string) => c.toLowerCase())
      if (!cms     && cats.some((c: string) => c.includes('cms') || c.includes('blog'))) { cms = t.name; continue }
      if (!hosting && cats.some((c: string) => c.includes('host')))                      { hosting = t.name; continue }
      other.push(t.name)
    }
    return { cms, hosting, other: other.slice(0, 8) }
  } catch {
    return { cms: null, hosting: null, other: [] }
  }
}

function buildDataFileContent(params: {
  slug: string
  url: string
  businessName: string
  reportDate: string
  ai: Awaited<ReturnType<typeof generateReportContent>> | null
  lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number } | null
  coreVitals: CoreVital[] | null
  coreVitalsPass: boolean | null
  techStack: TechStack
}): string {
  const { ai, lighthouse: lh, coreVitals, coreVitalsPass, techStack } = params

  const grades    = ai?.reportCardGrades
  const perfGrade = grades?.performance    ?? 'F'
  const cwvGrade  = grades?.coreVitals     ?? 'F'
  const leadGrade = grades?.leadCapture    ?? 'F'
  const secGrade  = grades?.securityHeaders ?? 'D'
  const a11yGrade = grades?.accessibility  ?? 'F'
  const bpGrade   = grades?.bestPractices  ?? 'F'
  const seoGrade  = grades?.seo            ?? 'F'
  const repGrade  = grades?.reputation     ?? 'B'

  const vitalsLines = coreVitals
    ? coreVitals.map((v) => `    { metric: '${v.metric}', displayValue: '${v.displayValue}', status: '${v.status}' },`).join('\n')
    : `    { metric: 'LCP',  displayValue: '—', status: 'no-data' },
    { metric: 'TTFB', displayValue: '—', status: 'no-data' },
    { metric: 'FCP',  displayValue: '—', status: 'no-data' },
    { metric: 'CLS',  displayValue: '—', status: 'no-data' },
    { metric: 'INP',  displayValue: '—', status: 'no-data' },`

  const esc = (s: string) => s.replace(/'/g, "\\'").replace(/\n/g, '\\n')

  const notes       = ai?.lighthouseNotes
  const cmsSafe     = techStack.cms     ? `'${techStack.cms}'`     : 'null'
  const hostingSafe = techStack.hosting ? `'${techStack.hosting}'` : 'null'
  const otherSafe   = `[${techStack.other.map((t) => `'${t}'`).join(', ')}]`

  const heroMeta = ai?.heroMeta ?? [
    { primary: 'TODO: Address', secondary: 'TODO: Trading since XXXX' },
    { primary: 'TODO: Specialty', secondary: 'TODO: Label' },
    { primary: '0 of 3', secondary: 'Booking, chatbot, contact form live' },
  ]

  const findings = ai?.diagnosisFindings ?? [{ stat: 'TODO', title: 'TODO finding title', body: 'TODO: explanation' }]
  const plan     = ai?.treatmentPlan     ?? [
    { phaseLabel: 'Phase 1 — Stop the leak',      title: 'TODO', bullets: ['TODO'] },
    { phaseLabel: 'Phase 2 — Fix the foundations', title: 'TODO', bullets: ['TODO'] },
    { phaseLabel: 'Phase 3 — Grow the funnel',     title: 'TODO', bullets: ['TODO'] },
  ]
  const prognosis = ai?.prognosisRows ?? [{ today: 'TODO', after: 'TODO', why: 'TODO' }]
  const services  = ai?.services ?? [
    { title: '24/7 chatbot',          description: 'TODO' },
    { title: 'Lead automation',       description: 'TODO' },
    { title: 'Data entry automation', description: 'TODO' },
    { title: 'Image optimisation',    description: 'TODO' },
    { title: 'Security hardening',    description: 'TODO' },
    { title: 'SEO & content',         description: 'TODO' },
  ]
  const aiRecs = ai?.aiRecommendations ?? []

  return `import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: '${params.slug}',
  businessName: '${esc(params.businessName)}',
  url: '${params.url}',
  reportDate: '${params.reportDate}',

  heroHeadline: {
    before:   '${esc(ai?.heroHeadline.before ?? 'TODO: Headline before emphasis. ')}',
    emphasis: '${esc(ai?.heroHeadline.emphasis ?? 'TODO.')}',
  },
  heroSubheading: '${esc(ai?.heroSubheading ?? 'TODO: subheading')}',
  heroMeta: [
${heroMeta.map((m) => `    { primary: '${esc(m.primary)}', secondary: '${esc(m.secondary)}' },`).join('\n')}
  ],

  reportCard: [
    { label: 'Performance',      grade: '${perfGrade}' },
    { label: 'Core Web Vitals',  grade: '${cwvGrade}'  },
    { label: 'Lead capture',     grade: '${leadGrade}' },
    { label: 'Security headers', grade: '${secGrade}'  },
    { label: 'Accessibility',    grade: '${a11yGrade}' },
    { label: 'Best practices',   grade: '${bpGrade}'   },
    { label: 'On-page SEO',      grade: '${seoGrade}'  },
    { label: 'Reputation',       grade: '${repGrade}'  },
  ],

  coreVitalsPass: ${coreVitalsPass ?? false},
  coreVitals: [
${vitalsLines}
  ],

  lighthouse: {
    performance:   { score: ${lh?.performance ?? 0},   note: '${esc(notes?.performance   ?? 'TODO')}' },
    accessibility: { score: ${lh?.accessibility ?? 0}, note: '${esc(notes?.accessibility ?? 'TODO')}' },
    bestPractices: { score: ${lh?.bestPractices ?? 0}, note: '${esc(notes?.bestPractices ?? 'TODO')}' },
    seo:           { score: ${lh?.seo ?? 0},           note: '${esc(notes?.seo           ?? 'TODO')}' },
  },

  diagnosisFindings: [
${findings.map((f) => `    { stat: '${esc(f.stat)}', title: '${esc(f.title)}', body: '${esc(f.body)}' },`).join('\n')}
  ],

  treatmentPlan: [
${plan.map((p) => `    {
      phaseLabel: '${esc(p.phaseLabel)}',
      title: '${esc(p.title)}',
      bullets: [${p.bullets.map((b: string) => `'${esc(b)}'`).join(', ')}],
    },`).join('\n')}
  ],

  prognosisRows: [
${prognosis.map((r) => `    { today: '${esc(r.today)}', after: '${esc(r.after)}', why: '${esc(r.why)}' },`).join('\n')}
  ],

  services: [
${services.map((s) => `    { title: '${esc(s.title)}', description: '${esc(s.description)}' },`).join('\n')}
  ],

  aiRecommendations: [
${aiRecs.map((r) => `    { tool: '${esc(r.tool)}', impact: '${r.impact}', why: '${esc(r.why)}' },`).join('\n')}
  ],

  techStack: {
    cms:     ${cmsSafe},
    hosting: ${hostingSafe},
    other:   ${otherSafe},
  },
}
`
}

export async function GET(request: NextRequest) {
  const url  = request.nextUrl.searchParams.get('url')
  const slug = request.nextUrl.searchParams.get('slug')
  const name = request.nextUrl.searchParams.get('name') ?? 'TODO'

  if (!url || !slug) {
    return NextResponse.json({ error: 'url and slug are required' }, { status: 400 })
  }

  const psKey      = process.env.PAGESPEED_API_KEY
  const cmsKey     = process.env.WHATCMS_API_KEY
  const aiKey      = process.env.ANTHROPIC_API_KEY
  const reportDate = new Date().toISOString().split('T')[0]
  const errors: string[] = []

  // Resolve the canonical URL (follows www/non-www and https redirects)
  const canonicalUrl = await resolveCanonicalUrl(url)

  // Discover subpages to scan alongside the homepage
  const subpages   = psKey ? await findSubpages(canonicalUrl) : []
  const urlsToScan = [canonicalUrl, ...subpages]

  // Run all PageSpeed calls + headers + scrape + WhatCMS in parallel
  const [headersResult, scrapeResult, techResult, ...psResults] = await Promise.allSettled([
    checkHeaders(canonicalUrl),
    scrapeWebsite(canonicalUrl),
    cmsKey ? runWhatCms(canonicalUrl, cmsKey) : Promise.resolve<TechStack>({ cms: null, hosting: null, other: [] }),
    ...(psKey
      ? urlsToScan.map((u) => runPageSpeed(u, psKey))
      : urlsToScan.map(() => Promise.reject(new Error('PAGESPEED_API_KEY not set')))),
  ])

  // Parse each PageSpeed result
  const parsedPages: ParsedPage[] = urlsToScan.map((u, i) => {
    const result = psResults[i]
    if (result.status === 'fulfilled') return parsePageSpeedJson(u, result.value)
    errors.push(`PageSpeed (${new URL(u).pathname || '/'}): ${(result as PromiseRejectedResult).reason?.message ?? 'unknown error'}`)
    return { url: u, lighthouse: null, coreVitals: null, coreVitalsPass: null, totalPageWeightKb: null, topOpportunities: [] }
  })

  // Aggregate: worst scores across all pages
  const { lighthouse, coreVitals, coreVitalsPass, totalPageWeightKb, topOpportunities, perPageScores } = aggregatePages(parsedPages)

  const secHeaders = headersResult.status === 'fulfilled' ? headersResult.value : { presentCount: -1, present: [] }
  if (headersResult.status === 'rejected') errors.push('Security header check failed')

  const site = scrapeResult.status === 'fulfilled' ? scrapeResult.value : null
  if (scrapeResult.status === 'rejected') errors.push(`Site scrape failed: ${(scrapeResult as PromiseRejectedResult).reason?.message}`)

  const techStack = techResult.status === 'fulfilled' ? techResult.value : { cms: null, hosting: null, other: [] }

  // AI generation
  let ai: Awaited<ReturnType<typeof generateReportContent>> | null = null
  if (!aiKey) {
    errors.push('ANTHROPIC_API_KEY not set — narrative fields left as TODO')
  } else {
    try {
      ai = await generateReportContent({
        businessName: name, url, site,
        lighthouse, coreVitals, coreVitalsPass,
        totalPageWeightKb, topOpportunities, secHeaders,
        pagesScanned: urlsToScan, perPageScores,
      })
    } catch (err) {
      errors.push(`AI generation failed: ${(err as Error).message}`)
    }
  }

  const dataFileContent = buildDataFileContent({
    slug, url, businessName: name, reportDate,
    ai, lighthouse, coreVitals, coreVitalsPass, techStack,
  })

  const manualTodos: string[] = []
  if (!ai) manualTodos.push('AI generation failed — check ANTHROPIC_API_KEY in Vercel env vars.')

  const publishResult = await publishClient(slug, dataFileContent, name)
  if (!publishResult.success) errors.push(`GitHub publish failed: ${publishResult.error}`)

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
  const vercelUrl = productionHost
    ? `https://${productionHost}/clients/${slug}`
    : `http://localhost:3000/clients/${slug}`

  return NextResponse.json({
    slug, url, reportDate,
    pagesScanned: urlsToScan,
    perPageScores,
    lighthouse, coreVitals, coreVitalsPass, totalPageWeightKb,
    topOpportunities, techStack, secHeaders,
    site: site ? { title: site.title, addressText: site.addressText, reviewRating: site.reviewRating, reviewCount: site.reviewCount, leadCaptureCount: site.leadCaptureCount, leadCaptureMechanisms: site.leadCaptureMechanisms } : null,
    ai: ai ? { heroHeadline: ai.heroHeadline, heroSubheading: ai.heroSubheading, reportCardGrades: ai.reportCardGrades } : null,
    published: publishResult.success,
    publishedUrl: publishResult.success ? vercelUrl : null,
    alreadyExisted: publishResult.alreadyExisted,
    errors,
    dataFileContent,
    manualTodos,
  })
}
