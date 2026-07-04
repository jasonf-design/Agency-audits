import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'deepcar-dental',
  businessName: 'Deepcar Dental',
  url: 'https://www.deepcardentalcare.co.uk',
  reportDate: '2026-07-04',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Good scores.\nWebsite needs ',
    emphasis: 'urgent treatment',
  },
  heroSubheading: 'We ran Deepcar Dental Care\'s website through Google\'s own diagnostic tools and found a practice with strong content and clear patient appeal — but a site quietly turning away the emergency patients it\'s working hard to attract. The technical issues are specific, fixable, and costing real appointments.',
  heroMeta: [
    { primary: '334 Manchester Rd, Deepcar, Sheffield S36 2RH', secondary: 'Est. locally' },
    { primary: 'Emergency, Implants & Cosmetic Dentistry', secondary: 'Family & emergency care' },
    { primary: '2 of 3', secondary: 'Booking widget & live chat active' },
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
    performance:   { score: 77,   note: 'A mobile score of 77 is being dragged down by page redirects adding 780ms of delay and 108KB of unused CSS that forces visitors\' phones to load code the site never uses.' },
    accessibility: { score: 91, note: 'Scoring 91 out of 100 is solid, but the remaining gaps likely affect users with visual impairments or those using screen readers — a risk worth closing, especially for anxious or elderly patients.' },
    bestPractices: { score: 100, note: 'A perfect 100 here means the site is built on sound technical ground — no mixed content, no deprecated code — which makes the other issues easier to fix cleanly.' },
    seo:           { score: 92,           note: '92 out of 100 looks impressive, but SEO score alone doesn\'t mean you\'re ranking — Google\'s Core Web Vitals assessment is a separate signal, and this site is currently failing it, which actively suppresses search visibility.' },
  },

  diagnosisFindings: [
    { stat: 'FAILED', title: 'Google\'s Core Web Vitals: officially failing', body: 'Despite several individual metrics looking fine, Google has marked this site as failing its Core Web Vitals assessment overall. This matters because Google uses these results as a ranking factor — a failing site is at a structural disadvantage in search results compared to competitors who pass. For a practice competing on emergency searches where position one versus position three can mean the difference between a new patient and a missed call, this needs fixing.' },
    { stat: '780ms', title: 'Unnecessary redirects slowing every visit', body: 'Before a single word of the website loads, visitors are waiting an extra 780 milliseconds while the server bounces them through unnecessary redirect steps. On mobile — where most emergency dental searches happen — that\'s the difference between someone staying on the page and someone hitting the back button. This is entirely avoidable and has no benefit to the patient experience.' },
    { stat: '108KB', title: 'Unused code adding dead weight to every page load', body: 'The site is loading 108 kilobytes of CSS that it never actually uses on screen. That\'s dead weight being downloaded by every visitor on every page, costing around 600ms of extra load time on mobile connections. Removing it is a straightforward technical task that delivers an immediate and measurable speed improvement.' },
    { stat: '0 of 6', title: 'Zero security headers in place', body: 'Your website has none of the six standard HTTP security headers that modern browsers expect to see. These headers protect visitors from common attacks like clickjacking and cross-site scripting — and their absence is visible to anyone who checks, including Google. For a healthcare website handling patient enquiries and booking data, this is a trust and compliance gap that should be closed.' },
    { stat: 'Not found', title: 'Google Reviews not showing in search results', body: 'Your Google review rating and count are not embedded in the site\'s structured data, which means Google cannot display your star rating directly in search results. For a practice that clearly invests in patient trust — with testimonials and a strong community message on the homepage — this is a missed opportunity every single time someone searches for an emergency dentist in Sheffield and your listing appears without stars.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Remove the friction costing you emergency patients',
      bullets: ['Eliminate the multi-step page redirects adding 780ms to every mobile load — priority fix for emergency search traffic', 'Strip out the 108KB of unused CSS slowing the site down on the connections real patients use', 'Implement all six missing HTTP security headers to protect patient data and remove a visible trust gap'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Give Google every reason to rank you above competitors',
      bullets: ['Add structured data markup for your address so Google can confidently associate the site with your Sheffield location', 'Embed review schema so your star rating appears directly in search results for emergency and private dentist queries', 'Resolve the TTFB issue flagged in Core Web Vitals field data to bring the overall CWV assessment from failing to passing', 'Audit and consolidate the site\'s CSS delivery so mobile visitors get a fast, clean first paint every time'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn more visitors into booked appointments',
      bullets: ['Upgrade the live chat to a trained 24/7 dental chatbot that captures emergency enquiries out of hours and routes them to the booking widget', 'Build automated follow-up sequences for enquiries that don\'t convert immediately — particularly for implants and cosmetic consultations where patients take longer to decide', 'Expand local landing pages beyond the current Sheffield village pages to capture surrounding Barnsley and Stocksbridge searches at scale'],
    },
  ],

  prognosisRows: [
    { today: 'Core Web Vitals: FAILED — suppressing Google search rankings', after: 'Core Web Vitals: PASSED — competing on equal footing in local search', why: 'Fixing redirects and unused CSS directly improves the speed metrics Google measures' },
    { today: 'No star rating visible in Google search results', after: 'Review stars displayed on every relevant search result', why: 'Adding review schema lets Google pull and display your rating automatically' },
    { today: '0 of 6 security headers — patient data unprotected, trust signal missing', after: 'Full security header suite in place — compliant and visibly trustworthy', why: 'Headers are a server-level configuration change with no impact on site design' },
    { today: 'Address not in structured data — Google uncertain about your location', after: 'Location confirmed in schema — stronger local pack and map visibility', why: 'Structured address data is a direct local SEO ranking signal for Sheffield searches' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Deepcar Dental\'s busiest enquiry type is emergency — a trained chatbot means a patient in pain at 11pm gets a response, a triage question, and a booking prompt instead of a contact form and silence.' },
    { title: 'Lead automation', description: 'Patients considering implants or cosmetic treatment rarely book on the first visit — automated follow-up sequences keep Deepcar Dental in front of those leads until they\'re ready to commit.' },
    { title: 'Data entry automation', description: 'Connecting your booking widget and enquiry forms to your patient management system removes the manual step between an online booking and an appointment appearing in the diary.' },
    { title: 'Image optimisation', description: 'At 1.2MB total page weight there\'s room to compress images further and serve next-generation formats, shaving additional load time off every mobile visit without changing how anything looks.' },
    { title: 'Security hardening', description: 'All six missing security headers — including Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security — can be added at server level without touching the site\'s design or content.' },
    { title: 'SEO & content', description: 'The existing village-level emergency pages are a strong start, but there are no equivalent local pages targeting Barnsley, Stocksbridge or Oughtibridge for implants and cosmetic treatment — a gap competitors could fill first.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'PHP', 'MySQL', 'Apache HTTP Server'],
  },
}
