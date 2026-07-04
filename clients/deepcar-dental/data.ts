import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'deepcar-dental',
  businessName: 'DeepCar Dental',
  url: 'https://deepcardentalcare.co.uk/',
  reportDate: '2026-07-04',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Great dentistry.\nWebsite needs ',
    emphasis: 'urgent attention',
  },
  heroSubheading: 'We ran deepcardentalcare.co.uk through Google\'s own diagnostic tools and found a practice doing everything right clinically — same-day emergencies, implants, transparent pricing — but a website that\'s quietly turning patients away before they ever pick up the phone.',
  heroMeta: [
    { primary: '334 Manchester Rd, Deepcar, Sheffield S36 2RH', secondary: 'Est. locally' },
    { primary: 'Emergency & Implant Practice', secondary: 'Cosmetic & family care' },
    { primary: '2 of 3', secondary: 'Booking widget & chatbot live' },
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
    { metric: 'FCP', displayValue: '1.4s', status: 'good' },
    { metric: 'CLS', displayValue: '1.00', status: 'good' },
    { metric: 'INP', displayValue: '95ms', status: 'good' },
  ],

  lighthouse: {
    performance:   { score: 91,   note: 'At 91 out of 100, mobile performance is genuinely strong — but 108KB of unused CSS is adding around 450ms of unnecessary load time that could cost you impatient patients searching in pain.' },
    accessibility: { score: 0, note: 'Google scored accessibility at 0 out of 100, which means the site likely has missing alt text, poor colour contrast, or unlabelled form fields — issues that also directly harm your Google rankings.' },
    bestPractices: { score: 0, note: 'A Best Practices score of 0 typically points to missing HTTPS enforcement, console errors, or deprecated code — problems that signal to Google and to browsers that your site isn\'t safe or well-maintained.' },
    seo:           { score: 0,           note: 'An SEO score of 0 is a serious red flag — it means Google\'s crawler is finding structural problems that will actively suppress your rankings, even if your page content is well-written.' },
  },

  diagnosisFindings: [
    { stat: '0 / 100', title: 'Google can\'t properly read your site', body: 'Your SEO score from Google Lighthouse is zero — not low, zero. That means there are fundamental technical problems stopping Google from fully understanding and indexing your pages. For a practice competing on emergency dentistry in Sheffield, this is the equivalent of not being in the phone book. Patients searching \'emergency dentist Sheffield\' right now may never see you.' },
    { stat: '0 of 6', title: 'No security headers in place', body: 'Your site is missing all six standard security headers that modern browsers and Google expect to see. These headers protect your visitors from certain types of attack and signal to Google that your site is trustworthy. Their absence is a direct contributor to your Best Practices score of zero and can affect how patients\' browsers display your site.' },
    { stat: 'CWV FAILED', title: 'Core Web Vitals are failing — officially', body: 'Google\'s Core Web Vitals are the page experience signals used to rank websites. Deepcar Dental\'s site is officially failing this assessment, driven largely by a TTFB (Time to First Byte) of 0.8 seconds — meaning your server itself is slow to respond. This isn\'t just a technical footnote; Google uses CWV as a ranking factor, so you may be losing positions to competitors whose sites load faster.' },
    { stat: '0', title: 'No structured data — address and reviews invisible to Google', body: 'Your practice address and Google Reviews aren\'t appearing in your site\'s structured data. This means Google can\'t confidently connect your website to your physical location or your star rating. Practices with proper local schema markup get richer results in Google Search — including star ratings and address details — which dramatically increases click-through rates from local searches.' },
    { stat: '108KB', title: 'Bloated CSS is slowing every page load', body: 'There\'s 108 kilobytes of CSS code being loaded on your site that isn\'t used — adding roughly 450 milliseconds of unnecessary delay on every visit. For someone searching for an emergency dentist while in pain, that half-second gap before your page responds can be the difference between them staying or hitting the back button to try a competitor.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s actively costing you patients right now',
      bullets: ['Implement all six missing security headers to resolve the Best Practices score of zero and stop browsers flagging your site', 'Add structured data markup for your practice address (334 Manchester Rd, Deepcar) and Google Reviews so they appear in search results', 'Diagnose and resolve the technical issues causing the SEO score of zero — likely missing meta robots tags, crawl errors, or broken canonical links'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Pass Core Web Vitals and make Google rank you properly',
      bullets: ['Investigate and resolve the server TTFB of 0.8s — this typically means switching hosting tier or enabling server-side caching', 'Strip out the 108KB of unused CSS to recover the 450ms load time penalty identified by Lighthouse', 'Fix the accessibility score of zero by auditing and correcting missing image alt text, form labels, and colour contrast across the site', 'Ensure the booking widget and chatbot are not contributing to render-blocking that worsens Core Web Vitals on mobile'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn more visitors into booked appointments',
      bullets: ['Expand local SEO content targeting the surrounding villages already named on the site — Wadsley, Dore, Fulwood, Ranmoor, Greystones — with properly structured landing pages', 'Connect your Google Reviews to the site\'s schema so your star rating displays in search results and increases click-through from emergency searches', 'Optimise the chatbot and booking widget flow specifically for emergency dental enquiries, reducing the number of steps between \'in pain\' and \'appointment booked\''],
    },
  ],

  prognosisRows: [
    { today: 'SEO score of 0 — Google is finding structural errors that suppress your rankings', after: 'Technical SEO errors resolved, site fully crawlable and indexable by Google', why: 'Fixing canonical tags, meta issues, and crawl errors removes the barriers stopping Google from ranking your pages' },
    { today: 'No address or reviews in structured data — your location and reputation are invisible in search', after: 'Practice address and star rating visible in Google Search results with rich snippet markup', why: 'Adding local business schema connects your site to your Google Business Profile and displays trust signals directly in the results' },
    { today: 'Core Web Vitals officially failing — Google is likely deprioritising your site in rankings', after: 'Core Web Vitals pass, removing a known negative ranking signal', why: 'Resolving TTFB and removing unused CSS directly addresses the two main causes of the CWV failure' },
    { today: 'Zero security headers — browsers and Google flag the site as not fully trustworthy', after: 'All six security headers in place, Best Practices score recovers from zero', why: 'Security headers are a straightforward server-level fix that immediately resolves the Best Practices failure' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Your current chatbot is live but unoptimised — we configure it specifically for emergency dental enquiries so patients in pain at midnight get triaged and booked, not just greeted.' },
    { title: 'Lead automation', description: 'Every patient who fills in a form or starts a chat on deepcardentalcare.co.uk but doesn\'t book gets an automated follow-up sequence — so your new patient offer of £39 doesn\'t just get seen, it gets acted on.' },
    { title: 'Data entry automation', description: 'New enquiry details from your booking widget and chat are captured and pushed directly into your practice management system, removing manual admin between an online enquiry and a confirmed appointment.' },
    { title: 'Image optimisation', description: 'Your site currently weighs 1.2MB — we compress and lazy-load images to bring that down significantly, reducing load time for every visitor on mobile.' },
    { title: 'Security hardening', description: 'All six missing security headers — including Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security — are implemented at server level to resolve your Best Practices score of zero.' },
    { title: 'SEO & content', description: 'You\'re already naming local areas like Wadsley, Dore, and Fulwood on the site but without structured landing pages — we build these out properly so you rank for emergency dentist searches across the full catchment.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'PHP', 'MySQL', 'Apache HTTP Server'],
  },
}
