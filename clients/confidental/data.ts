import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'confidental',
  businessName: 'ConfiDental',
  url: 'https://confidental.co.uk',
  reportDate: '2026-07-02',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before: 'Great reputation.\nWebsite needs ',
    emphasis: 'treatment.',
  },
  heroSubheading:
    "We ran ConfiDental's website through the same diagnostics Google uses to grade every site on the web. The trust is real — 4.9★ across 116 reviews. The website isn't converting it. Here's the full chart.",
  heroMeta: [
    { primary: '394 Ecclesall Rd, Sheffield', secondary: 'Trading since 2015' },
    { primary: 'Invisalign Platinum', secondary: 'Provider status' },
    { primary: '0 of 3', secondary: 'Booking, chatbot, pricing content live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'F'  },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'F'  },
    { label: 'Security headers', grade: 'D'  },
    { label: 'Accessibility',    grade: 'A-' },
    { label: 'Best practices',   grade: 'A'  },
    { label: 'On-page SEO',      grade: 'A+' },
    { label: 'Reputation',       grade: 'A+' },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP',  displayValue: '2.8s', status: 'needs-work' },
    { metric: 'TTFB', displayValue: '2.0s', status: 'poor'       },
    { metric: 'FCP',  displayValue: '2.5s', status: 'needs-work' },
    { metric: 'CLS',  displayValue: '0',    status: 'good'       },
    { metric: 'INP',  displayValue: '—',    status: 'no-data'    },
  ],

  lighthouse: {
    performance:   { score: 48,  note: "14MB page. 10.8MB is images that don't need to be that size." },
    accessibility: { score: 92,  note: 'Contrast, link labels and heading order need small fixes.'    },
    bestPractices: { score: 96,  note: 'No CSP, no HSTS, no clickjacking protection.'                 },
    seo:           { score: 100, note: "Well built for Google to read — just too slow for it to reward." },
  },

  diagnosisFindings: [
    {
      stat:  '10.8MB',
      title: 'Unoptimised images',
      body:  "Three-quarters of the entire site's weight. The single biggest, fastest fix available — and it improves loading speed, mobile ranking, and bounce rate all at once.",
    },
    {
      stat:  '2.0s',
      title: 'Server response time',
      body:  "The server takes two full seconds to respond before the page can even start drawing. A hosting/caching fix, not a design one — and it's dragging every other loading metric down with it.",
    },
    {
      stat:  '0',
      title: 'Ways to capture a lead outside office hours',
      body:  "Closed Sundays, 1pm finish on Saturdays. Every enquiry outside that window is a phone ringing out or an email sitting unread — no chatbot, no booking widget, no callback form.",
    },
    {
      stat:  '5',
      title: 'Missing security headers',
      body:  "No effective CSP, no strong HSTS, no clickjacking protection, no COOP, no Trusted Types. Straightforward to close — the same checklist we run on every client site.",
    },
    {
      stat:  '0',
      title: 'Pages with pricing or FAQs',
      body:  'Patients searching "implant cost Sheffield" find nothing on-site and land on a competitor instead.',
    },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Capture every lead',
      bullets: [
        '24/7 chatbot trained on treatments, pricing bands and hours',
        'Instant lead routing to the team, day or night',
        'Automated follow-up the moment someone enquires',
      ],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Make the site fast and safe',
      bullets: [
        'Hosting/caching fix for the 2s server delay',
        'Image compression — reclaim the 10.8MB',
        'Security headers: CSP, HSTS, clickjacking protection',
        'Review star ratings shown directly in Google search',
      ],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: "Win the searches they're losing",
      bullets: [
        'Pricing and finance pages',
        'FAQ content for common patient questions',
        'Landing pages by treatment: implants, Invisalign, cosmetic',
      ],
    },
  ],

  prognosisRows: [
    {
      today: 'Enquiries only captured ~44 hrs/week',
      after: 'Captured 168 hrs/week',
      why:   'Chatbot removes the opening-hours ceiling entirely',
    },
    {
      today: 'Reviews live on third-party sites only',
      after: "Star ratings shown in ConfiDental's own Google listing",
      why:   'Schema markup — no content change needed',
    },
    {
      today: 'Every enquiry re-typed into the practice system by hand',
      after: 'Enquiries logged automatically',
      why:   'Removes repetitive admin, frees up front-desk time',
    },
    {
      today: 'High-intent "cost" searches go to competitors',
      after: 'Captured on-site with pricing pages',
      why:   'Closes an open content gap',
    },
  ],

  services: [
    {
      title: '24/7 chatbot',
      description: "Trained on their real treatments and pricing — answers patients and captures leads while the practice is closed.",
    },
    {
      title: 'Lead automation',
      description: "Every enquiry routed and followed up instantly, instead of waiting on someone to notice.",
    },
    {
      title: 'Data entry automation',
      description: "New patient details flow straight into the practice system — no manual re-typing.",
    },
    {
      title: 'Image optimisation',
      description: "Reclaim the 10.8MB currently slowing every mobile visit.",
    },
    {
      title: 'Security hardening',
      description: "Close the CSP, HSTS and clickjacking gaps found in this check-up.",
    },
    {
      title: 'SEO & content',
      description: "Pricing pages, FAQs and review schema to win the searches they're currently losing.",
    },
  ],

  techStack: {
    cms:     null,
    hosting: null,
    other:   [],
  },
}
