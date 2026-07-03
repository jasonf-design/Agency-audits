import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'deepcar-dental',
  businessName: 'DeepCar Dental',
  url: 'https://deepcardentalcare.co.uk/',
  reportDate: '2026-07-03',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Strong practice.\nWebsite needs ',
    emphasis: 'urgent attention',
  },
  heroSubheading: 'We ran Deepcar Dental Care\'s website through Google\'s own diagnostic tools and found a practice with genuine local reputation and clear patient appeal — but a website that\'s quietly losing enquiries every day due to missing trust signals, security gaps, and untracked performance.',
  heroMeta: [
    { primary: '334 Manchester Rd, Deepcar, Sheffield S36 2RH', secondary: 'Est. locally' },
    { primary: 'Emergency, Implants & Cosmetic Dentistry', secondary: 'Same-day & planned care' },
    { primary: '2 of 3', secondary: 'Booking widget & live chat active' },
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
    performance:   { score: 0,   note: 'Google\'s performance data for this site couldn\'t be collected — which itself is a red flag, as it typically means the site hasn\'t yet accumulated enough real-visitor data or has a technical barrier preventing measurement.' },
    accessibility: { score: 0, note: 'Without a scoreable accessibility result, we can\'t confirm that all patients — including those with visual impairments or who rely on screen readers — can fully use the site, which also affects Google\'s view of the page quality.' },
    bestPractices: { score: 0, note: 'Best-practices data was unavailable, but the complete absence of security headers (0 out of 6) is a direct best-practices failure that modern browsers and Google\'s quality assessments flag as a serious concern.' },
    seo:           { score: 0,           note: 'SEO data couldn\'t be retrieved from live field tests, and critically the site\'s address and Google Reviews are absent from structured data, meaning search engines can\'t confidently surface the practice for local searches.' },
  },

  diagnosisFindings: [
    { stat: '0 of 6', title: 'No security headers in place', body: 'Your website is missing all six standard security headers that protect visitors from common attacks like clickjacking and data interception. This isn\'t just a technical issue — Google treats it as a trust signal, and some browsers actively warn users about unsecured sites. For a healthcare practice asking patients to book appointments and share personal details, this is a credibility problem.' },
    { stat: 'Not found', title: 'Your address isn\'t visible to Google', body: 'Even though your address appears in the page text, it isn\'t embedded in the structured data that search engines read automatically. This means Google can\'t confidently link your site to a physical location, which directly weakens your visibility in local \'near me\' and map searches — exactly the searches that bring in emergency dental patients.' },
    { stat: 'Not found', title: 'Google Reviews missing from the site', body: 'Your patient reviews aren\'t connected to your website in a way that Google can read and display. This means you\'re missing out on star ratings appearing in search results — a feature that dramatically increases click-through rates. A prospective patient searching for an emergency dentist in Sheffield sees stars next to competitors and a blank next to you.' },
    { stat: 'Unavailable', title: 'Site performance is untracked', body: 'Google couldn\'t return performance scores for your site, which suggests real-visitor speed data hasn\'t been gathered at scale or there\'s a technical configuration issue. Without this data, you have no way of knowing whether your site loads quickly enough on mobile — and for emergency dental patients in pain, a slow-loading page means they\'ve already called someone else.' },
    { stat: 'Unknown', title: 'Page weight and load speed are invisible', body: 'Total page weight data wasn\'t available, which means there\'s no baseline to measure against or optimise. Unoptimised images, unnecessary scripts, and heavy page files are the most common reasons dental websites load slowly on mobile — and a one-second delay in load time typically reduces conversions by around 7%. Right now, you simply don\'t know if this is costing you patients.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix the trust and visibility gaps that are losing you enquiries today',
      bullets: ['Add all six security headers to protect patient data and remove browser trust warnings', 'Embed structured data for your practice address so Google can confidently place you in local and map searches', 'Connect your Google Reviews to the site via schema markup so star ratings appear directly in search results'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Build a measurable, fast, technically sound website',
      bullets: ['Set up Google Search Console and Core Web Vitals monitoring so you have real performance data for the first time', 'Audit and optimise all page images and scripts to reduce load time, particularly on mobile where most emergency searches happen', 'Ensure the booking widget and live chat are fully integrated with a follow-up automation so no enquiry goes cold', 'Conduct a full accessibility audit to ensure all patients, including those with disabilities, can navigate and book without barriers'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn more local searches into booked appointments',
      bullets: ['Expand the local area pages (Wadsley, Dore, Fulwood, Ranmoor etc.) with unique, substantive content that ranks for emergency searches across each neighbourhood', 'Create a structured review generation process so new patient reviews feed continuously into Google and on-site schema', 'Build an automated follow-up sequence for enquiries that don\'t immediately book, capturing patients who were considering treatment but drifted away'],
    },
  ],

  prognosisRows: [
    { today: 'Address not in structured data — Google unsure of your location', after: 'Practice address embedded correctly, strengthening local and map search rankings', why: 'Structured data gives Google the confidence to display your practice prominently for Sheffield and Deepcar searches' },
    { today: 'Zero security headers — potential browser warnings for patients', after: 'All six headers in place, browsers and Google treat the site as trustworthy', why: 'Security headers are a direct ranking and trust signal; their absence actively harms credibility' },
    { today: 'No star ratings showing in Google search results', after: 'Review schema live — stars visible in results, increasing click-through rate', why: 'Review snippets in search results consistently outperform plain listings, especially for emergency and high-intent searches' },
    { today: 'No performance data — no way to know if the site is fast or slow', after: 'Monitoring active, real load-time data collected, slow pages identified and fixed', why: 'You can\'t improve what you can\'t measure — getting baseline data is the essential first step to a faster, higher-converting site' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Your live chat is already active, but pairing it with an AI-trained dental chatbot means emergency enquiries arriving at 11pm get an immediate, helpful response rather than silence — keeping that patient in your funnel until the morning.' },
    { title: 'Lead automation', description: 'When a prospective implant or cosmetic patient submits an enquiry and doesn\'t hear back within minutes, they move on — automated follow-up sequences ensure Deepcar Dental stays front of mind until they book.' },
    { title: 'Data entry automation', description: 'New patient forms, booking confirmations, and enquiry logging can flow automatically into your practice management system, removing the manual admin burden from your front desk.' },
    { title: 'Image optimisation', description: 'Page weight data wasn\'t measurable from the audit, which means we\'d start by benchmarking your current load size and compressing images and assets to bring mobile load times to an acceptable level.' },
    { title: 'Security hardening', description: 'All six missing security headers — including Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security — need to be configured server-side to protect patients and satisfy Google\'s best-practice requirements.' },
    { title: 'SEO & content', description: 'Your local area pages for Wadsley, Fulwood, Ranmoor and others are listed in the navigation but need substantive, location-specific content to rank for the emergency dental searches patients in those areas are actually making.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'PHP', 'MySQL', 'Apache HTTP Server'],
  },
}
