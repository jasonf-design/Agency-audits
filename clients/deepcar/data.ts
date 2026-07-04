import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'deepcar',
  businessName: 'Deepcar',
  url: 'https://deepcardentalcare.co.uk',
  reportDate: '2026-07-04',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Good scores.\nWebsite needs ',
    emphasis: 'critical fixes',
  },
  heroSubheading: 'We ran deepcardentalcare.co.uk through Google\'s own diagnostic tools and found a practice with strong content and clear positioning — but several technical failures that are quietly costing Deepcar Dental Care new patients every week.',
  heroMeta: [
    { primary: '334 Manchester Rd, Deepcar, Sheffield S36 2RH', secondary: 'Est. locally' },
    { primary: 'Emergency, Implants & Cosmetic Dentistry', secondary: 'Same-day & planned care' },
    { primary: '2 of 3', secondary: 'Booking widget & chatbot live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'B' },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'F'  },
    { label: 'Accessibility',    grade: 'A-' },
    { label: 'Best practices',   grade: 'A+'   },
    { label: 'On-page SEO',      grade: 'A-'  },
    { label: 'Reputation',       grade: 'B'  },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP', displayValue: '1.6s', status: 'good' },
    { metric: 'TTFB', displayValue: '0.8s', status: 'needs-work' },
    { metric: 'FCP', displayValue: '1.4s', status: 'good' },
    { metric: 'CLS', displayValue: '1.00', status: 'good' },
    { metric: 'INP', displayValue: '95ms', status: 'good' },
  ],

  lighthouse: {
    performance:   { score: 87,   note: 'A score of 87 is respectable, but 108KB of unused CSS is loading on every visit and adding up to 600ms of unnecessary delay — time patients spend waiting before they can book.' },
    accessibility: { score: 91, note: 'At 91, the site is mostly accessible, but there are likely contrast, label, or focus-order issues that could exclude patients with visual impairments and expose the practice to compliance risk.' },
    bestPractices: { score: 100, note: 'A perfect 100 here — the site uses secure connections, avoids deprecated code, and handles browser APIs correctly.' },
    seo:           { score: 92,           note: '92 is a strong on-page SEO score, but it doesn\'t account for the missing structured data — no address or Google Reviews are embedded in the page\'s schema, which limits how Google can display this practice in local search results.' },
  },

  diagnosisFindings: [
    { stat: 'FAILED', title: 'Core Web Vitals: Google has flagged this site', body: 'Despite several individual metrics showing as \'good\', Google\'s overall Core Web Vitals assessment for this site is a fail — largely driven by a Time to First Byte of 0.8 seconds, which means the server is slow to respond before the page even begins loading. This directly affects how Google ranks the site in local search. A practice investing in emergency and private care content deserves a site that Google is actively promoting, not penalising.' },
    { stat: '0 of 6', title: 'Zero security headers in place', body: 'None of the six standard HTTP security headers are present on this website — no Content Security Policy, no X-Frame-Options, no Referrer Policy, and more. These headers tell browsers how to protect visitors from common attacks. For a healthcare website handling patient enquiries, this is a significant oversight that could undermine patient trust if flagged by browsers or security scanners.' },
    { stat: 'Not found', title: 'Address & reviews missing from structured data', body: 'Google cannot find the practice\'s address or star ratings embedded in the page\'s structured data. This means the site is missing out on rich results in local search — the kind that show your address, opening hours, and review score directly in Google without the patient needing to click through. Competitors with this set up correctly will appear more prominent and trustworthy in the same search results.' },
    { stat: '108KB', title: 'Unused CSS slowing every page load', body: 'The site is loading 108 kilobytes of CSS code that is never actually used on the page — adding up to 600 milliseconds of dead weight on every visit. On mobile, where most emergency dental searches happen, that half-second delay is enough for an anxious patient to question whether the site is working and hit the back button. Removing this unused code is a straightforward fix with an immediate speed benefit.' },
    { stat: '1.2MB', title: 'Total page weight could be leaner', body: 'At 1.2MB, the homepage isn\'t excessively heavy, but on slower mobile connections — common in areas like Deepcar and Stocksbridge — every unnecessary byte adds to load time. With the unused CSS removed and images properly optimised, this figure could realistically drop below 800KB, making the site noticeably faster for patients searching in an emergency on their phone.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s costing you rankings and trust right now',
      bullets: ['Implement all 6 missing HTTP security headers to protect patient enquiries and meet healthcare website security standards', 'Add structured data markup for the practice address and Google Reviews so the practice appears fully in local search results', 'Investigate and resolve the server response time contributing to the Core Web Vitals fail — targeting a TTFB under 0.5 seconds'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Close the technical gaps dragging performance down',
      bullets: ['Audit and remove the 108KB of unused CSS to recover up to 600ms of load time on every page visit', 'Optimise and compress images across the site to bring total page weight closer to 800KB', 'Resolve the remaining accessibility issues — contrast ratios, form labels, and keyboard navigation — to reach a score above 95', 'Review and tighten the page\'s meta description to better match emergency search intent and improve click-through rates'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn more visitors into booked patients',
      bullets: ['Expand the local area pages already started (Wadsley, Dore, Whirlow, Fulwood) with deeper, search-optimised content to capture emergency searches across the Sheffield catchment', 'Integrate review schema so Google displays star ratings directly in search results, giving Deepcar Dental a visible trust advantage over competitors', 'Automate follow-up for enquiries submitted via the booking widget and chatbot to ensure no lead goes cold — particularly out-of-hours emergency contacts'],
    },
  ],

  prognosisRows: [
    { today: 'Core Web Vitals: FAILED — Google is actively downranking this site in local search', after: 'Core Web Vitals: PASSED — the site qualifies for Google\'s ranking boost awarded to fast, stable pages', why: 'Fixing server response time and removing unused CSS directly addresses the two metrics pulling the overall score below the pass threshold' },
    { today: '0 of 6 security headers present — patient-facing site has no browser-level protections in place', after: 'All 6 security headers active — browsers signal the site as secure to visitors and search engines alike', why: 'Security headers are a one-time server configuration change with immediate effect on trust and compliance' },
    { today: 'Address and reviews not found in structured data — Google cannot display rich local results for this practice', after: 'Structured data in place — practice address, opening hours, and review rating visible directly in Google search results', why: 'Adding schema markup costs nothing in ad spend and can significantly increase click-through rates from local searchers' },
    { today: '108KB of unused CSS loading on every visit, adding up to 600ms of unnecessary delay on mobile', after: 'Unused CSS removed — pages feel noticeably faster, particularly for emergency patients searching on a phone under pressure', why: 'Eliminating dead code is a targeted technical fix that reduces page weight and improves perceived load speed for real visitors' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Deepcar already has a chatbot in place — we can ensure it\'s configured to qualify emergency enquiries out of hours and route urgent cases to a same-day callback, so no emergency patient slips away to a competitor overnight.' },
    { title: 'Lead automation', description: 'With both a booking widget and chatbot capturing enquiries, automated follow-up sequences ensure that every new patient lead — especially for implants or cosmetic consultations — receives a timely, professional response without adding pressure to the front desk.' },
    { title: 'Data entry automation', description: 'Enquiry data collected via the booking widget and chatbot can be automatically logged into the practice management system, eliminating manual data entry and reducing the risk of missed follow-ups.' },
    { title: 'Image optimisation', description: 'The current page weight sits at 1.2MB — proper image compression and next-generation format conversion could reduce this to under 800KB, making a real difference for patients in Deepcar and Stocksbridge on mobile connections.' },
    { title: 'Security hardening', description: 'All six standard HTTP security headers — including Content Security Policy, X-Frame-Options, X-Content-Type-Options, Referrer Policy, Permissions Policy, and HSTS — are currently absent and need to be configured at the server level.' },
    { title: 'SEO & content', description: 'The local area pages for Wadsley, Dore, Whirlow, Fulwood, Ranmoor, and Greystones are a strong start — expanding each with condition-specific emergency content will capture high-intent searches across the full Sheffield and Barnsley catchment area.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'PHP', 'MySQL', 'Apache HTTP Server'],
  },
}
