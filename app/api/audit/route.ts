import { NextRequest, NextResponse } from 'next/server'
import { scrapeWebsite, generateReportContent } from '@/lib/ai-generate'
import { publishClient } from '@/lib/github-publish'
import type { CoreVital, VitalStatus, TechStack } from '@/lib/types'

export const maxDuration = 60

const SECURITY_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'x-frame-options',
  'cross-origin-opener-policy',
  'permissions-policy',
  'referrer-policy',
]

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

async function runPageSpeed(url: string, apiKey: string) {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${apiKey}`
  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(55000) })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PageSpeed API ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
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
  territory: string
  referredBy: string
  reportDate: string
  ai: Awaited<ReturnType<typeof generateReportContent>> | null
  lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number } | null
  coreVitals: CoreVital[] | null
  coreVitalsPass: boolean | null
  techStack: TechStack
}): string {
  const { ai, lighthouse: lh, coreVitals, coreVitalsPass, techStack } = params

  const grades  = ai?.reportCardGrades
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

  const notes = ai?.lighthouseNotes
  const cmsSafe     = techStack.cms     ? `'${techStack.cms}'`     : 'null'
  const hostingSafe = techStack.hosting ? `'${techStack.hosting}'` : 'null'
  const otherSafe   = `[${techStack.other.map((t) => `'${t}'`).join(', ')}]`

  const heroMeta = ai?.heroMeta ?? [
    { primary: 'TODO: Address', secondary: 'TODO: Trading since XXXX' },
    { primary: 'TODO: Specialty', secondary: 'TODO: Label' },
    { primary: '0 of 3', secondary: 'Booking, chatbot, contact form live' },
  ]

  const findings = ai?.diagnosisFindings ?? [
    { stat: 'TODO', title: 'TODO finding title', body: 'TODO: explanation' },
  ]

  const plan = ai?.treatmentPlan ?? [
    { phaseLabel: 'Phase 1 — Stop the leak',      title: 'TODO', bullets: ['TODO'] },
    { phaseLabel: 'Phase 2 — Fix the foundations', title: 'TODO', bullets: ['TODO'] },
    { phaseLabel: 'Phase 3 — Grow the funnel',     title: 'TODO', bullets: ['TODO'] },
  ]

  const prognosis = ai?.prognosisRows ?? [
    { today: 'TODO', after: 'TODO', why: 'TODO' },
  ]

  const services = ai?.services ?? [
    { title: '24/7 chatbot',          description: 'TODO' },
    { title: 'Lead automation',       description: 'TODO' },
    { title: 'Data entry automation', description: 'TODO' },
    { title: 'Image optimisation',    description: 'TODO' },
    { title: 'Security hardening',    description: 'TODO' },
    { title: 'SEO & content',         description: 'TODO' },
  ]

  return `import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: '${params.slug}',
  businessName: '${esc(params.businessName)}',
  url: '${params.url}',
  reportDate: '${params.reportDate}',

  territory: '${params.territory}',
  referredBy: '${params.referredBy}',

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

  techStack: {
    cms:     ${cmsSafe},
    hosting: ${hostingSafe},
    other:   ${otherSafe},
  },
}
`
}

export async function GET(request: NextRequest) {
  const url        = request.nextUrl.searchParams.get('url')
  const slug       = request.nextUrl.searchParams.get('slug')
  const name       = request.nextUrl.searchParams.get('name') ?? 'TODO'
  const territory  = request.nextUrl.searchParams.get('territory') ?? 'direct'
  const referredBy = request.nextUrl.searchParams.get('referredBy') ?? 'direct'

  if (!url || !slug) {
    return NextResponse.json({ error: 'url and slug are required' }, { status: 400 })
  }

  const psKey    = process.env.PAGESPEED_API_KEY
  const cmsKey   = process.env.WHATCMS_API_KEY
  const aiKey    = process.env.ANTHROPIC_API_KEY
  const reportDate = new Date().toISOString().split('T')[0]
  const errors: string[] = []

  // Run PageSpeed, headers, site scrape, and WhatCMS all in parallel
  const [psResult, headersResult, scrapeResult, techResult] = await Promise.allSettled([
    psKey   ? runPageSpeed(url, psKey)     : Promise.reject(new Error('PAGESPEED_API_KEY not set')),
    checkHeaders(url),
    scrapeWebsite(url),
    cmsKey  ? runWhatCms(url, cmsKey)      : Promise.resolve<TechStack>({ cms: null, hosting: null, other: [] }),
  ])

  // Parse PageSpeed
  let lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number } | null = null
  let coreVitals: CoreVital[] | null = null
  let coreVitalsPass: boolean | null = null
  let totalPageWeightKb: number | null = null
  let topOpportunities: Array<{ title: string; savingsKb: number | null; savingsMs: number | null }> = []

  if (psResult.status === 'fulfilled') {
    const json = psResult.value
    const cats = json.lighthouseResult?.categories ?? {}
    const auds = json.lighthouseResult?.audits ?? {}
    const score = (key: string) => Math.round((cats[key]?.score ?? 0) * 100)
    lighthouse = { performance: score('performance'), accessibility: score('accessibility'), bestPractices: score('best-practices'), seo: score('seo') }

    const cwv   = json.loadingExperience ?? {}
    const field = cwv.metrics ?? {}
    coreVitalsPass = cwv.overall_category ? cwv.overall_category === 'FAST' : null

    coreVitals = [
      { metric: 'LCP',  displayValue: formatVitalValue(field.LARGEST_CONTENTFUL_PAINT_MS?.percentile,     'LCP'),  status: vitalStatus(field.LARGEST_CONTENTFUL_PAINT_MS?.category)     },
      { metric: 'TTFB', displayValue: formatVitalValue(field.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile, 'TTFB'), status: vitalStatus(field.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category) },
      { metric: 'FCP',  displayValue: formatVitalValue(field.FIRST_CONTENTFUL_PAINT_MS?.percentile,       'FCP'),  status: vitalStatus(field.FIRST_CONTENTFUL_PAINT_MS?.category)       },
      { metric: 'CLS',  displayValue: formatVitalValue(field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,   'CLS'),  status: vitalStatus(field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category)   },
      { metric: 'INP',  displayValue: formatVitalValue(field.INTERACTION_TO_NEXT_PAINT?.percentile,       'INP'),  status: vitalStatus(field.INTERACTION_TO_NEXT_PAINT?.category)       },
    ] as CoreVital[]

    const totalBytes: number | undefined = auds['total-byte-weight']?.numericValue
    totalPageWeightKb = totalBytes ? Math.round(totalBytes / 1024) : null
    topOpportunities = Object.values(auds as Record<string, { details?: { type: string; overallSavingsMs?: number; overallSavingsBytes?: number }; title?: string }>)
      .filter((a) => a?.details?.type === 'opportunity' && (a.details.overallSavingsMs ?? 0) > 0)
      .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
      .slice(0, 3)
      .map((a) => ({ title: a.title ?? 'Unknown', savingsKb: a.details?.overallSavingsBytes ? Math.round(a.details.overallSavingsBytes / 1024) : null, savingsMs: a.details?.overallSavingsMs ? Math.round(a.details.overallSavingsMs) : null }))
  } else {
    errors.push(`PageSpeed: ${(psResult as PromiseRejectedResult).reason?.message ?? 'unknown error'}`)
  }

  const secHeaders = headersResult.status === 'fulfilled' ? headersResult.value : { presentCount: -1, present: [] }
  if (headersResult.status === 'rejected') errors.push('Security header check failed')

  const site = scrapeResult.status === 'fulfilled' ? scrapeResult.value : null
  if (scrapeResult.status === 'rejected') errors.push(`Site scrape failed: ${(scrapeResult as PromiseRejectedResult).reason?.message}`)

  const techStack = techResult.status === 'fulfilled' ? techResult.value : { cms: null, hosting: null, other: [] }

  // AI generation
  let ai: Awaited<ReturnType<typeof generateReportContent>> | null = null
  if (!aiKey) {
    errors.push('ANTHROPIC_API_KEY not set — narrative fields left as TODO')
  } else if (!site) {
    errors.push('Site scrape failed — skipping AI generation')
  } else {
    try {
      ai = await generateReportContent({
        businessName: name, url, site,
        lighthouse, coreVitals, coreVitalsPass,
        totalPageWeightKb, topOpportunities, secHeaders,
      })
    } catch (err) {
      errors.push(`AI generation failed: ${(err as Error).message}`)
    }
  }

  const dataFileContent = buildDataFileContent({
    slug, url, businessName: name, territory, referredBy, reportDate,
    ai, lighthouse, coreVitals, coreVitalsPass, techStack,
  })

  // What still needs a human
  const manualTodos: string[] = []
  if (!ai) {
    manualTodos.push('All narrative fields — AI generation failed or API key not set')
  } else {
    if (ai.heroMeta.some((m) => m.primary.startsWith('TODO'))) manualTodos.push('heroMeta — address or trading-since not found on the website, fill in manually')
    if (!ai.reviewRating) manualTodos.push('Reputation grade — check Google Maps for review rating and count, then update reportCard')
  }
  manualTodos.push('Lead capture count — visit the site and confirm booking/chatbot/form actually works (auto-detected but worth a human check)')

  // Publish to GitHub (triggers Vercel redeploy automatically)
  const publishResult = await publishClient(slug, dataFileContent, name)
  if (!publishResult.success) {
    errors.push(`GitHub publish failed: ${publishResult.error}`)
  }

  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/clients/${slug}`
    : `http://localhost:3000/clients/${slug}`

  return NextResponse.json({
    slug, url, reportDate,
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
