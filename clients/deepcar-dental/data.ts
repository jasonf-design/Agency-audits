import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'deepcar-dental',
  businessName: 'Deepcar Dental',
  url: 'https://deepcardentalcare.co.uk/',
  reportDate: '2026-07-03',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Good dentist.\nWebsite needs ',
    emphasis: 'urgent treatment',
  },
  heroSubheading: 'We ran Deepcar Dental Care\'s website through Google\'s own diagnostic tools — the same ones Google uses to decide where you rank. The practice clearly delivers excellent care, but the website is failing on every technical measure Google scores, meaning patients who need you are finding someone else first.',
  heroMeta: [
    { primary: 'TODO: address', secondary: 'TODO: trading since' },
    { primary: 'Emergency & Implant Dentistry', secondary: 'Same-day care + full private service' },
    { primary: '2 of 3', secondary: 'Booking widget and live chat live — no standalone contact form detected' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'A-' },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'F'  },
    { label: 'Accessibility',    grade: 'F' },
    { label: 'Best practices',   grade: 'F'   },
    { label: 'On-page SEO',      grade: 'F'  },
    { label: 'Reputation',       grade: 'B'  },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP', displayValue: '1.6s', status: 'good' },
    { metric: 'TTFB', displayValue: '0.8s', status: 'needs-work' },
    { metric: 'FCP', displayValue: '1.3s', status: 'good' },
    { metric: 'CLS', displayValue: '1.00', status: 'good' },
    { metric: 'INP', displayValue: '94ms', status: 'good' },
  ],

  lighthouse: {
    performance:   { score: 92,   note: 'Performance scores a strong 92, but unused CSS is adding over 450ms of unnecessary loading delay — meaning the site loads well overall yet still keeps some visitors waiting longer than needed.' },
    accessibility: { score: 0, note: 'Google scored accessibility at 0 out of 100, which means the site likely has missing alt text, poor colour contrast, or unlabelled form fields — barriers that exclude patients with disabilities and trigger automatic ranking penalties.' },
    bestPractices: { score: 0, note: 'A Best Practices score of 0 typically points to insecure resource loading, browser errors, or deprecated code — issues that erode Google\'s trust in the site and can affect how it handles patient data.' },
    seo:           { score: 0,           note: 'An SEO score of 0 means Google is finding fundamental technical problems — things like missing or broken metadata signals — that prevent it from properly reading and ranking your pages, regardless of how good your content is.' },
  },

  diagnosisFindings: [
    { stat: '0 / 100', title: 'Google can barely read this website', body: 'Deepcar Dental scored zero on Google\'s SEO, Accessibility, and Best Practices checks — all three. This doesn\'t mean the site looks broken to you, but it means Google\'s crawlers are hitting walls when they try to understand and rank it. A competitor with a technically cleaner site will outrank you even if your care is better.' },
    { stat: 'CWV: FAILED', title: 'Core Web Vitals — failed in the real world', body: 'Google\'s Core Web Vitals are based on real visitor data, not lab tests. Deepcar Dental\'s site fails the overall assessment, largely because the server response time (TTFB at 0.8s) is taking longer than Google\'s threshold. This failure directly suppresses your ranking in search results — it\'s a confirmed Google ranking signal.' },
    { stat: '0 of 6', title: 'Zero security headers in place', body: 'Your website has none of the six standard security headers that protect visitors from data interception and malicious scripts. For a healthcare practice handling patient enquiries and booking data, this is a serious liability — and modern browsers actively flag sites like this as less trustworthy.' },
    { stat: '108KB', title: 'Bloated CSS slowing the site down', body: 'There\'s 108KB of CSS code loading on every page visit that the site never actually uses. Removing it would save around 450ms of load time. That\'s nearly half a second — enough to push a stressed patient in pain to hit the back button and call a competitor.' },
    { stat: 'Not found', title: 'Address and reviews missing from structured data', body: 'Your practice address and Google reviews aren\'t embedded in the site\'s structured data — the behind-the-scenes code Google reads to power local search and map results. Without it, Google can\'t reliably surface your location or star rating in the places patients look first when searching for an emergency dentist.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s actively costing you patients right now',
      bullets: ['Implement all six missing security headers to protect patient data and remove browser trust warnings', 'Add structured data markup for your practice address and Google reviews so they appear in local search and map results', 'Resolve the Core Web Vitals TTFB failure by optimising server response — a direct Google ranking factor', 'Strip the 108KB of unused CSS to recover 450ms of load time on every page visit'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Get Google reading the site properly',
      bullets: ['Audit and fix all accessibility failures (alt text, contrast, form labels) to bring the score above 90 and comply with accessibility obligations', 'Resolve the Best Practices score of 0 by fixing insecure resource loading, console errors, and deprecated code', 'Repair the SEO score by ensuring all pages have valid metadata, canonical tags, and crawlable structure', 'Optimise the 1.2MB total page weight through image compression and lazy loading to improve mobile performance for patients on the go'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn the traffic you\'re earning into booked appointments',
      bullets: ['Expand structured local SEO content for the area pages already started (Wadsley, Dore, Fulwood, Ranmoor etc.) so each one ranks for its own postcode searches', 'Connect the live chat and booking widget to automated follow-up sequences so after-hours enquiries don\'t go cold overnight', 'Set up conversion tracking so you can see exactly which pages, search terms, and referral sources are generating real bookings — not just traffic'],
    },
  ],

  prognosisRows: [
    { today: 'Practice address not found in structured data — Google Maps and local pack results are unreliable', after: 'Address embedded in schema markup — practice appears correctly in Google Maps, local pack, and \'near me\' searches', why: 'Structured data tells Google exactly where you are and what you do — essential for local emergency search intent' },
    { today: 'Core Web Vitals assessment: FAILED — suppressing search rankings for all pages', after: 'Core Web Vitals: PASSED — site meets Google\'s threshold and ranking penalty is lifted', why: 'CWV is a confirmed Google ranking signal; passing it removes an active ceiling on where you can appear' },
    { today: '0 of 6 security headers present — patient enquiry data inadequately protected', after: 'All 6 security headers active — site flagged as secure by browsers, patient data better protected', why: 'Security headers are fast to implement and immediately improve browser trust signals and compliance posture' },
    { today: '108KB of unused CSS loading on every visit, adding ~450ms delay for every patient', after: 'Unused CSS removed — page loads faster, reducing bounce rate among urgent-care patients searching in pain', why: 'Patients searching for an emergency dentist are stressed and impatient — every half-second of delay costs a booking' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Deepcar Dental already has live chat in place — we upgrade it to handle out-of-hours emergency triage, capture patient details overnight, and ensure no 2am toothache enquiry is lost by morning.' },
    { title: 'Lead automation', description: 'When a patient submits a booking request or enquiry, automated follow-up sequences confirm their request instantly and re-engage anyone who didn\'t complete the booking — so your diary fills without extra admin.' },
    { title: 'Data entry automation', description: 'New patient enquiries from the booking widget and chat are automatically logged and organised, removing manual copy-paste work for your front desk and reducing the risk of missed leads.' },
    { title: 'Image optimisation', description: 'Your site currently loads 1.2MB per page — compressing and lazy-loading images alone can cut that significantly, improving speed for patients browsing on mobile in an emergency.' },
    { title: 'Security hardening', description: 'All six missing security headers — including Content-Security-Policy, X-Frame-Options, and HSTS — are implemented to protect patient data, satisfy modern browser requirements, and remove a quiet red flag in your technical audit.' },
    { title: 'SEO & content', description: 'Your area pages for Wadsley, Dore, Fulwood, Ranmoor and others are started but need depth and schema markup to actually rank — we build them out so each one captures emergency and private dentistry searches from its own local area.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'PHP', 'MySQL', 'Apache HTTP Server'],
  },
}
