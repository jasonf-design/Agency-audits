#!/usr/bin/env tsx
/**
 * Usage:
 *   npm run generate -- --url=https://example.com --slug=example-co
 *
 * Requires PAGESPEED_API_KEY and WHATCMS_API_KEY in .env.local
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'
import { config } from 'dotenv'
import type {
  CoreVital, VitalStatus, LighthouseScore, TechStack,
} from '../lib/types'
import {
  lighthouseGrade, coreVitalsGrade, securityHeadersGrade,
} from '../lib/grading'

config({ path: resolve(process.cwd(), '.env.local') })

// ── CLI arg parsing ───────────────────────────────────────────────────────────

function arg(name: string): string | undefined {
  const flag = process.argv.find((a) => a.startsWith(`--${name}=`))
  return flag?.split('=').slice(1).join('=')
}

const url  = arg('url')
const slug = arg('slug')

if (!url || !slug) {
  console.error('Usage: npm run generate -- --url=https://example.com --slug=example-co')
  process.exit(1)
}

const PAGESPEED_KEY = process.env.PAGESPEED_API_KEY
const WHATCMS_KEY   = process.env.WHATCMS_API_KEY
const ROOT          = process.cwd()

// ── WhatCMS rate-limit tracker ────────────────────────────────────────────────

const WHATCMS_LOG_PATH = join(ROOT, 'data', 'whatcms-usage.json')

interface WhatCmsUsage {
  month: string   // "YYYY-MM"
  count: number
}

function getWhatCmsUsage(): WhatCmsUsage {
  if (!existsSync(WHATCMS_LOG_PATH)) return { month: currentMonth(), count: 0 }
  return JSON.parse(readFileSync(WHATCMS_LOG_PATH, 'utf-8'))
}

function incrementWhatCmsUsage(usage: WhatCmsUsage): void {
  const updated: WhatCmsUsage = { month: usage.month, count: usage.count + 1 }
  writeFileSync(WHATCMS_LOG_PATH, JSON.stringify(updated, null, 2))
}

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}

// ── Security header check ─────────────────────────────────────────────────────

const SECURITY_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'x-frame-options',
  'cross-origin-opener-policy',
  'permissions-policy',
  'referrer-policy',
]

async function checkSecurityHeaders(targetUrl: string): Promise<{ presentCount: number; present: string[] }> {
  try {
    const res = await fetch(targetUrl, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) })
    const present = SECURITY_HEADERS.filter((h) => res.headers.has(h))
    return { presentCount: present.length, present }
  } catch (err) {
    console.warn(`⚠  Security header check failed: ${(err as Error).message}`)
    return { presentCount: -1, present: [] }
  }
}

// ── PageSpeed Insights ────────────────────────────────────────────────────────

interface PageSpeedResult {
  lighthouse: {
    performance:   LighthouseScore
    accessibility: LighthouseScore
    bestPractices: LighthouseScore
    seo:           LighthouseScore
  }
  coreVitalsPass: boolean | null
  coreVitals: CoreVital[]
  totalPageWeightKb: number | null
  topOpportunities: Array<{ title: string; savingsKb: number | null; savingsMs: number | null }>
}

function vitalStatus(rating: string | undefined): VitalStatus {
  if (!rating) return 'no-data'
  if (rating === 'FAST')   return 'good'
  if (rating === 'SLOW')   return 'poor'
  return 'needs-work'
}

function formatVitalValue(value: number | undefined, metric: string): string {
  if (value === undefined) return '—'
  if (metric === 'CLS') return value.toFixed(2)
  if (metric === 'INP') return `${Math.round(value)}ms`
  return `${(value / 1000).toFixed(1)}s`
}

async function fetchPageSpeed(targetUrl: string): Promise<PageSpeedResult | null> {
  if (!PAGESPEED_KEY) {
    console.error('✗ PAGESPEED_API_KEY not set in .env.local')
    return null
  }
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile&key=${PAGESPEED_KEY}`
  try {
    console.log('⏳ Calling PageSpeed Insights API…')
    const res  = await fetch(apiUrl, { signal: AbortSignal.timeout(60000) })
    if (!res.ok) {
      const body = await res.text()
      console.error(`✗ PageSpeed API error ${res.status}: ${body.slice(0, 200)}`)
      return null
    }
    const json = await res.json()

    const cats = json.lighthouseResult?.categories ?? {}
    const auds = json.lighthouseResult?.audits ?? {}

    const score = (key: string) => Math.round((cats[key]?.score ?? 0) * 100)

    // Field data
    const cwv    = json.loadingExperience ?? {}
    const cwvPass: boolean | null = cwv.overall_category
      ? cwv.overall_category === 'FAST'
      : null

    const fieldMetrics = cwv.metrics ?? {}

    const lcpMs   = fieldMetrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile
    const fidMs   = fieldMetrics.INTERACTION_TO_NEXT_PAINT?.percentile  // INP
    const clsVal  = fieldMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile
    const fcpMs   = fieldMetrics.FIRST_CONTENTFUL_PAINT_MS?.percentile
    const ttfbMs  = fieldMetrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile

    const lcpRating  = fieldMetrics.LARGEST_CONTENTFUL_PAINT_MS?.category
    const inpRating  = fieldMetrics.INTERACTION_TO_NEXT_PAINT?.category
    const clsRating  = fieldMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category
    const fcpRating  = fieldMetrics.FIRST_CONTENTFUL_PAINT_MS?.category
    const ttfbRating = fieldMetrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category

    const coreVitals: CoreVital[] = [
      { metric: 'LCP',  displayValue: formatVitalValue(lcpMs,  'LCP'),  status: vitalStatus(lcpRating)  },
      { metric: 'TTFB', displayValue: formatVitalValue(ttfbMs, 'TTFB'), status: vitalStatus(ttfbRating) },
      { metric: 'FCP',  displayValue: formatVitalValue(fcpMs,  'FCP'),  status: vitalStatus(fcpRating)  },
      { metric: 'CLS',  displayValue: formatVitalValue(clsVal, 'CLS'),  status: vitalStatus(clsRating)  },
      { metric: 'INP',  displayValue: formatVitalValue(fidMs,  'INP'),  status: vitalStatus(inpRating)  },
    ]

    // Page weight
    const totalBytes: number | undefined = auds['total-byte-weight']?.numericValue
    const totalPageWeightKb = totalBytes ? Math.round(totalBytes / 1024) : null

    // Top 3 opportunities
    const opps = Object.values(auds as Record<string, {
      details?: { type: string; overallSavingsMs?: number; overallSavingsBytes?: number }
      title?: string
      numericValue?: number
    }>)
      .filter((a) => a?.details?.type === 'opportunity' && (a.details.overallSavingsMs ?? 0) > 0)
      .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
      .slice(0, 3)
      .map((a) => ({
        title:     a.title ?? 'Unknown',
        savingsKb: a.details?.overallSavingsBytes ? Math.round(a.details.overallSavingsBytes / 1024) : null,
        savingsMs: a.details?.overallSavingsMs    ? Math.round(a.details.overallSavingsMs)           : null,
      }))

    const perfScore = score('performance')

    return {
      lighthouse: {
        performance:   { score: perfScore,       note: totalPageWeightKb ? `${(totalPageWeightKb / 1024).toFixed(1)}MB total page weight.` : 'TODO: add note' },
        accessibility: { score: score('accessibility'), note: 'TODO: add note'  },
        bestPractices: { score: score('best-practices'), note: 'TODO: add note' },
        seo:           { score: score('seo'),            note: 'TODO: add note' },
      },
      coreVitalsPass: cwvPass,
      coreVitals: coreVitals as PageSpeedResult['coreVitals'],
      totalPageWeightKb,
      topOpportunities: opps,
    }
  } catch (err) {
    console.error(`✗ PageSpeed fetch failed: ${(err as Error).message}`)
    return null
  }
}

// ── WhatCMS ───────────────────────────────────────────────────────────────────

async function fetchWhatCms(targetUrl: string): Promise<TechStack | null> {
  if (!WHATCMS_KEY) {
    console.error('✗ WHATCMS_API_KEY not set in .env.local')
    return null
  }

  const usage = getWhatCmsUsage()
  const month = currentMonth()

  // Reset counter if it's a new month
  if (usage.month !== month) {
    usage.month  = month
    usage.count  = 0
  }

  if (usage.count >= 480) {
    console.warn(`⚠  WhatCMS monthly cap approaching (${usage.count}/500). Skipping API call.`)
    return null
  }
  if (usage.count >= 450) {
    console.warn(`⚠  WhatCMS usage at ${usage.count}/500 this month — getting close to the free-tier cap.`)
  }

  // Respect 1 req / 10s free-tier limit
  await new Promise((r) => setTimeout(r, 10_000))

  try {
    console.log(`⏳ Calling WhatCMS API (${usage.count + 1}/500 this month)…`)
    const apiUrl = `https://whatcms.org/API/Tech?key=${WHATCMS_KEY}&url=${encodeURIComponent(targetUrl)}`
    const res    = await fetch(apiUrl, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) {
      console.error(`✗ WhatCMS error ${res.status}`)
      return null
    }
    const json = await res.json()
    incrementWhatCmsUsage({ month, count: usage.count })

    if (json.result?.code !== 200) {
      console.warn(`⚠  WhatCMS returned code ${json.result?.code}: ${json.result?.msg}`)
      return { cms: null, hosting: null, other: [] }
    }

    const techs: Array<{ name: string; categories?: string[] }> = json.results ?? []
    let cms: string | null     = null
    let hosting: string | null = null
    const other: string[]      = []

    for (const t of techs) {
      const cats = (t.categories ?? []).map((c: string) => c.toLowerCase())
      if (!cms     && cats.some((c: string) => c.includes('cms') || c.includes('blog'))) { cms     = t.name; continue }
      if (!hosting && cats.some((c: string) => c.includes('host')))                      { hosting = t.name; continue }
      other.push(t.name)
    }

    return { cms, hosting, other: other.slice(0, 8) }
  } catch (err) {
    console.error(`✗ WhatCMS fetch failed: ${(err as Error).message}`)
    return null
  }
}

// ── Output file writer ────────────────────────────────────────────────────────

function buildDataFile(params: {
  slug: string
  url: string
  reportDate: string
  ps: PageSpeedResult | null
  tech: TechStack | null
  secHeaders: { presentCount: number; present: string[] }
}): string {
  const { ps, tech, secHeaders } = params

  const hasPs   = ps !== null
  const hasTech = tech !== null

  const perfScore = ps?.lighthouse.performance.score
  const a11yScore = ps?.lighthouse.accessibility.score
  const bpScore   = ps?.lighthouse.bestPractices.score
  const seoScore  = ps?.lighthouse.seo.score

  const perfGrade  = perfScore !== undefined ? `'${lighthouseGrade(perfScore)}'`  : "'F' // TODO: fill in when API data available"
  const a11yGrade  = a11yScore !== undefined ? `'${lighthouseGrade(a11yScore)}'`  : "'F' // TODO"
  const bpGrade    = bpScore   !== undefined ? `'${lighthouseGrade(bpScore)}'`    : "'F' // TODO"
  const seoGrade   = seoScore  !== undefined ? `'${lighthouseGrade(seoScore)}'`   : "'F' // TODO"
  const cwvGrade   = hasPs     ? `'${coreVitalsGrade(ps.coreVitalsPass)}'`        : "'F' // TODO"
  const secGrade   = secHeaders.presentCount >= 0
    ? `'${securityHeadersGrade(secHeaders.presentCount)}'`
    : "'D' // TODO: security header check failed — verify manually"

  const cwvPass = hasPs ? String(ps.coreVitalsPass ?? false) : 'false'

  const vitalsLines = hasPs
    ? ps.coreVitals.map(
        (v) => `    { metric: '${v.metric}', displayValue: '${v.displayValue}', status: '${v.status}' },`,
      ).join('\n')
    : `    { metric: 'LCP',  displayValue: '—', status: 'no-data' },
    { metric: 'TTFB', displayValue: '—', status: 'no-data' },
    { metric: 'FCP',  displayValue: '—', status: 'no-data' },
    { metric: 'CLS',  displayValue: '—', status: 'no-data' },
    { metric: 'INP',  displayValue: '—', status: 'no-data' },`

  const oppsComment = hasPs && ps.topOpportunities.length > 0
    ? '\n// Top PageSpeed opportunities (use these to craft diagnosisFindings):\n' +
      ps.topOpportunities.map((o) =>
        `//   ${o.title}: ${o.savingsKb != null ? o.savingsKb + 'KB' : '?'} / ${o.savingsMs != null ? o.savingsMs + 'ms' : '?'} saved`,
      ).join('\n') + '\n'
    : ''

  const pageWeightNote = hasPs && ps.totalPageWeightKb
    ? `${(ps.totalPageWeightKb / 1024).toFixed(1)}MB total page weight.`
    : 'TODO: add note'

  const cmsSafe     = hasTech && tech.cms     ? `'${tech.cms}'`     : 'null'
  const hostingSafe = hasTech && tech.hosting ? `'${tech.hosting}'` : 'null'
  const otherSafe   = hasTech
    ? `[${tech.other.map((t) => `'${t}'`).join(', ')}]`
    : '[]'

  return `import type { ClientData } from '@/lib/types'
${oppsComment}
export const data: ClientData = {
  slug: '${params.slug}',
  businessName: 'TODO: Business name',
  url: '${params.url}',
  reportDate: '${params.reportDate}',

  heroHeadline: {
    before:   'TODO: Headline before emphasis. ',
    emphasis: 'TODO: emphasis word.',
  },
  heroSubheading: 'TODO: 1–2 sentence subheading referencing the business name and review count/rating.',
  heroMeta: [
    { primary: 'TODO: Address', secondary: 'TODO: Trading since XXXX' },
    { primary: 'TODO: Specialty badge', secondary: 'TODO: Label' },
    { primary: '0 of 3', secondary: 'Booking, chatbot, pricing content live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: ${perfGrade} },
    { label: 'Core Web Vitals',  grade: ${cwvGrade} },
    { label: 'Lead capture',     grade: 'F'  }, // TODO: count live capture mechanisms (0–3)
    { label: 'Security headers', grade: ${secGrade} },
    { label: 'Accessibility',    grade: ${a11yGrade} },
    { label: 'Best practices',   grade: ${bpGrade} },
    { label: 'On-page SEO',      grade: ${seoGrade} },
    { label: 'Reputation',       grade: 'B'  }, // TODO: derive from Google review rating + count
  ],

  coreVitalsPass: ${cwvPass},
  coreVitals: [
${vitalsLines}
  ],

  lighthouse: {
    performance:   { score: ${perfScore ?? 0}, note: '${pageWeightNote}' },
    accessibility: { score: ${a11yScore ?? 0}, note: 'TODO: note key accessibility issues found' },
    bestPractices: { score: ${bpScore   ?? 0}, note: 'TODO: note key best-practice issues found' },
    seo:           { score: ${seoScore  ?? 0}, note: 'TODO: note key SEO issues found' },
  },

  diagnosisFindings: [
    // TODO: write 3–5 findings using the opportunity data above as a starting point
    { stat: 'TODO', title: 'TODO finding title', body: 'TODO: explain the finding and its impact.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'TODO: Phase 1 title',
      bullets: ['TODO bullet 1', 'TODO bullet 2', 'TODO bullet 3'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'TODO: Phase 2 title',
      bullets: ['TODO bullet 1', 'TODO bullet 2', 'TODO bullet 3'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'TODO: Phase 3 title',
      bullets: ['TODO bullet 1', 'TODO bullet 2'],
    },
  ],

  prognosisRows: [
    { today: 'TODO: current state', after: 'TODO: improved state', why: 'TODO: reason' },
    { today: 'TODO: current state', after: 'TODO: improved state', why: 'TODO: reason' },
  ],

  services: [
    { title: '24/7 chatbot',         description: 'TODO: tailor to this business.' },
    { title: 'Lead automation',      description: 'TODO: tailor to this business.' },
    { title: 'Data entry automation',description: 'TODO: tailor to this business.' },
    { title: 'Image optimisation',   description: 'TODO: tailor to this business.' },
    { title: 'Security hardening',   description: 'TODO: tailor to this business.' },
    { title: 'SEO & content',        description: 'TODO: tailor to this business.' },
  ],

  techStack: {
    cms:     ${cmsSafe},
    hosting: ${hostingSafe},
    other:   ${otherSafe},
  },
}
`
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 Generating report for ${url} → clients/${slug}/data.ts\n`)

  const reportDate = new Date().toISOString().split('T')[0]
  const todos: string[] = []

  // Run PageSpeed and security check in parallel
  const [ps, secHeaders] = await Promise.all([
    fetchPageSpeed(url!),
    checkSecurityHeaders(url!),
  ])

  if (!ps) todos.push('All Lighthouse scores and Core Web Vitals — PageSpeed API call failed')
  if (secHeaders.presentCount < 0) todos.push('Security headers grade — HEAD request failed, check manually')

  // WhatCMS (sequential due to rate-limit delay)
  const tech = await fetchWhatCms(url!)
  if (!tech) todos.push('Tech stack (CMS, hosting) — WhatCMS API call failed or skipped')

  // Write data file
  const dir      = join(ROOT, 'clients', slug!)
  const filePath = join(dir, 'data.ts')

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  if (existsSync(filePath)) {
    console.warn(`⚠  clients/${slug}/data.ts already exists — writing to clients/${slug}/data.ts.new instead`)
    writeFileSync(filePath + '.new', buildDataFile({ slug: slug!, url: url!, reportDate, ps, tech, secHeaders }))
    console.log(`✓ Wrote clients/${slug}/data.ts.new`)
  } else {
    writeFileSync(filePath, buildDataFile({ slug: slug!, url: url!, reportDate, ps, tech, secHeaders }))
    console.log(`✓ Wrote clients/${slug}/data.ts`)
  }

  // Summary
  const manualTodos = [
    'businessName',
    'heroHeadline',
    'heroSubheading',
    'heroMeta (address, trading since, specialty)',
    'diagnosisFindings (titles and body copy)',
    'treatmentPlan (all bullets)',
    'prognosisRows',
    'services (descriptions)',
    'reportCard: Lead capture grade (count live capture mechanisms)',
    'reportCard: Reputation grade (check Google review rating + count)',
    'attribution-log.json: update businessName once known',
    ...todos,
  ]

  console.log('\n─────────────────────────────────────────────────────')
  console.log('✅  DONE — fields still needing a human:\n')
  manualTodos.forEach((t) => console.log(`   • ${t}`))
  console.log('\nThen add the import to lib/clients.ts and preview with:')
  console.log('   npm run dev → http://localhost:3000/clients/' + slug)
  console.log('─────────────────────────────────────────────────────\n')
}

main().catch((e) => { console.error(e); process.exit(1) })
