import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'deepcar-dental',
  businessName: 'Deepcar Dental',
  url: 'https://www.deepcardental.co.uk',
  reportDate: '2026-07-03',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'TODO: Headline before emphasis. ',
    emphasis: 'TODO.',
  },
  heroSubheading: 'TODO: subheading',
  heroMeta: [
    { primary: 'TODO: Address', secondary: 'TODO: Trading since XXXX' },
    { primary: 'TODO: Specialty', secondary: 'TODO: Label' },
    { primary: '0 of 3', secondary: 'Booking, chatbot, contact form live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'F' },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'F' },
    { label: 'Security headers', grade: 'D'  },
    { label: 'Accessibility',    grade: 'F' },
    { label: 'Best practices',   grade: 'F'   },
    { label: 'On-page SEO',      grade: 'F'  },
    { label: 'Reputation',       grade: 'B'  },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP',  displayValue: '—', status: 'no-data' },
    { metric: 'TTFB', displayValue: '—', status: 'no-data' },
    { metric: 'FCP',  displayValue: '—', status: 'no-data' },
    { metric: 'CLS',  displayValue: '—', status: 'no-data' },
    { metric: 'INP',  displayValue: '—', status: 'no-data' },
  ],

  lighthouse: {
    performance:   { score: 0,   note: 'TODO' },
    accessibility: { score: 0, note: 'TODO' },
    bestPractices: { score: 0, note: 'TODO' },
    seo:           { score: 0,           note: 'TODO' },
  },

  diagnosisFindings: [
    { stat: 'TODO', title: 'TODO finding title', body: 'TODO: explanation' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'TODO',
      bullets: ['TODO'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'TODO',
      bullets: ['TODO'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'TODO',
      bullets: ['TODO'],
    },
  ],

  prognosisRows: [
    { today: 'TODO', after: 'TODO', why: 'TODO' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'TODO' },
    { title: 'Lead automation', description: 'TODO' },
    { title: 'Data entry automation', description: 'TODO' },
    { title: 'Image optimisation', description: 'TODO' },
    { title: 'Security hardening', description: 'TODO' },
    { title: 'SEO & content', description: 'TODO' },
  ],

  techStack: {
    cms:     null,
    hosting: null,
    other:   ['Nginx'],
  },
}
