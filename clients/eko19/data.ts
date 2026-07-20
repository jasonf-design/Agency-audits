import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'eko19',
  businessName: 'Eko19',
  url: 'https://www.eko19.com',
  reportDate: '2026-07-20',

  territory: 'direct',
  referredBy: 'Jason',

  heroHeadline: {
    before:   'Eko19.com.\nWebsite needs ',
    emphasis: 'urgent attention',
  },
  heroSubheading: 'We ran Eko19.com through Google\'s diagnostic tools and found a site that offers genuinely compelling renewable energy services — but is actively undermining itself with technical failures that stop it from being found, trusted, or converting visitors into leads.',
  heroMeta: [
    { primary: 'Willow Barns, Stonewell Lane, Hartington', secondary: 'TODO: trading since' },
    { primary: 'Commercial Renewable Energy & Monitoring', secondary: 'Solar, EV, BESS & EfW solutions' },
    { primary: '2 of 3', secondary: 'Live chat & contact form active' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'F' },
    { label: 'Core Web Vitals',  grade: 'C'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'F'  },
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
    performance:   { score: 0,   note: 'Google\'s performance audit could not complete — the site failed to load correctly during scanning, which means real visitors may be experiencing the same broken experience.' },
    accessibility: { score: 0, note: 'The audit was unable to return accessibility scores because all three pages scanned returned errors, suggesting structural problems that would also affect screen readers and assistive technologies.' },
    bestPractices: { score: 0, note: 'With zero of six security headers in place and scan failures across every page tested, the site falls well short of the standards Google expects from a trustworthy business website.' },
    seo:           { score: 0,           note: 'No SEO score could be generated because the pages failed to scan — meaning Google itself may be struggling to crawl and index Eko19.com, effectively hiding it from prospective clients searching for commercial renewable energy.' },
  },

  diagnosisFindings: [
    { stat: '0 / 6', title: 'No security headers whatsoever', body: 'Eko19.com has none of the six standard security headers that browsers and Google use to verify a site is safe. This means modern browsers may flag the site as insecure to visitors. For a business asking commercial clients to submit enquiries and personal data, that\'s a serious trust problem.' },
    { stat: '3 / 3', title: 'Every page scan failed', body: 'All three pages we attempted to audit — including the homepage — returned scan failures. This isn\'t a minor technical hiccup; it means Google\'s own tools cannot fully read the site. If Googlebot is having the same experience, pages may not be properly indexed, and the business may be invisible in search results for its core services.' },
    { stat: 'Missing', title: 'No meta description on the homepage', body: 'The homepage has no meta description — the short summary text that appears under your link in Google search results. Without it, Google writes its own, often pulling unhelpful fragments from the page. This directly reduces click-through rates from anyone who does find the site via search.' },
    { stat: 'Not found', title: 'Address missing from structured data', body: 'The business address is present in the page text but not marked up in a way Google can read as structured data. This makes it much harder for the site to appear in local and map-based searches, and prevents Google from confidently associating Eko19 with the Hartington area or surrounding commercial catchment.' },
    { stat: 'Duplicate', title: 'Navigation menu repeated three times on the homepage', body: 'The homepage source code contains the full navigation menu — including phone numbers and CTAs — repeated three times in a row. This bloats the page, confuses search engines trying to understand the page structure, and suggests underlying template or theme issues that could be causing the broader scan failures.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix the technical failures blocking Google and visitors',
      bullets: ['Diagnose and resolve the page scan failures so the site loads reliably for both visitors and search engine crawlers', 'Implement all six missing security headers to remove browser warnings and restore trust signals for prospective commercial clients', 'Write and deploy a compelling homepage meta description that clearly communicates Eko19\'s commercial renewable energy proposition in search results'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Give Google everything it needs to rank and trust the site',
      bullets: ['Add structured data markup for the business address, phone number, and service area so Google can confidently surface Eko19 in local and regional searches', 'Remove the triplicated navigation code from the homepage and audit the WordPress theme for further structural duplication', 'Create individual, keyword-optimised service pages for Solar, BESS, EV Charging, EfW, and Energy Monitoring — currently these are thin and interchangeable in their descriptions', 'Connect Google Search Console and resolve any crawl errors or indexing gaps identified there'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn traffic into qualified commercial enquiries',
      bullets: ['Integrate the existing chatbot and contact form with a CRM or automated follow-up sequence so no inbound lead goes cold', 'Build location and sector-specific landing pages targeting high-intent searches such as \'commercial solar installation Derbyshire\' or \'EV charging for hospitality businesses\'', 'Add case studies and project outcomes to each service page to give commercial decision-makers the evidence they need to pick up the phone'],
    },
  ],

  prognosisRows: [
    { today: 'All three pages fail to scan — Google may not be indexing the site reliably', after: 'Pages load and scan cleanly, giving Google full visibility of all services', why: 'Resolving the underlying load/render failures is the single highest-impact fix available' },
    { today: 'Zero security headers — browsers may flag the site as unsafe to visitors', after: 'All six headers in place, building trust with both visitors and Google\'s quality assessment', why: 'Security headers are a quick server-level change with an immediate effect on trust signals' },
    { today: 'No meta description — Google writes its own, reducing search click-through rates', after: 'A clear, benefit-led meta description drives more qualified clicks from search results', why: 'A well-written meta description consistently improves click-through rate at no ongoing cost' },
    { today: 'Address not in structured data — invisible to local and map-based commercial searches', after: 'Structured data in place, making Eko19 eligible for Google Maps and local pack results', why: 'Structured data is a direct signal Google uses to match businesses to location-based queries' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Commercial energy enquiries rarely arrive during office hours — an intelligent chatbot on Eko19.com can qualify prospects, capture project details, and book discovery calls around the clock.' },
    { title: 'Lead automation', description: 'The existing contact form captures enquiries but there\'s no visible follow-up automation — we connect it to an email sequence that nurtures commercial leads until they\'re ready to commit.' },
    { title: 'Data entry automation', description: 'Enquiry data from the chatbot and contact form can be automatically pushed into a CRM, eliminating manual entry and ensuring no prospect is lost between the form submission and a sales call.' },
    { title: 'Image optimisation', description: 'Page weight data was unavailable due to scan failures, but once the site is loading correctly we will audit and compress all images to ensure fast load times on mobile for field-based commercial visitors.' },
    { title: 'Security hardening', description: 'We will implement all six missing HTTP security headers — including Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security — removing browser warnings and meeting the baseline expected by enterprise and public sector clients.' },
    { title: 'SEO & content', description: 'Each service page currently uses near-identical copy — we will write distinct, keyword-targeted content for Solar, BESS, EV Charging, EfW, and Energy Monitoring to capture the specific search terms commercial buyers actually use.' },
  ],

  techStack: {
    cms:     'Elementor',
    hosting: null,
    other:   ['WooCommerce', 'WordPress', 'PHP', 'MySQL', 'Cloudflare'],
  },
}
