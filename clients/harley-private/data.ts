import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'harley-private',
  businessName: 'HArley Private',
  url: 'https://harleyprivatedental.co.uk',
  reportDate: '2026-07-04',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Great practice.\nWebsite needs ',
    emphasis: 'urgent attention.',
  },
  heroSubheading: 'We ran harleyprivatedental.co.uk through Google\'s own diagnostic tools and found a practice with a strong treatment offering and premium positioning — but a website that\'s quietly turning patients away before they ever make contact. The technical issues here are costing Harley Private real enquiries every single day.',
  heroMeta: [
    { primary: '42 Kingfield Rd, Nether Edge, Sheffield, S11 9AS', secondary: 'Est. locally' },
    { primary: 'Clear Aligners, Implants & Cosmetic Dentistry', secondary: 'Private specialist care' },
    { primary: '1 of 3', secondary: 'Chatbot live — booking form & automation missing' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'F' },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'C' },
    { label: 'Security headers', grade: 'D'  },
    { label: 'Accessibility',    grade: 'A' },
    { label: 'Best practices',   grade: 'C'   },
    { label: 'On-page SEO',      grade: 'A+'  },
    { label: 'Reputation',       grade: 'B'  },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP', displayValue: '2.7s', status: 'needs-work' },
    { metric: 'TTFB', displayValue: '1.7s', status: 'needs-work' },
    { metric: 'FCP', displayValue: '2.5s', status: 'needs-work' },
    { metric: 'CLS', displayValue: '2.00', status: 'good' },
    { metric: 'INP', displayValue: '129ms', status: 'good' },
  ],

  lighthouse: {
    performance:   { score: 28,   note: 'A score of 28 out of 100 on mobile means Google considers this site dangerously slow — the 23.3MB page weight and over 1,300KB of unused JavaScript are the primary culprits, adding nearly 4 full seconds of load delay on a phone.' },
    accessibility: { score: 95, note: 'A score of 95 is strong and suggests the site is largely well-structured for screen readers and assistive technology — a genuine positive here.' },
    bestPractices: { score: 73, note: 'A score of 73 is dragged down by only 1 of 6 security headers being present, which signals to browsers and search engines that the site isn\'t fully hardened against common threats.' },
    seo:           { score: 100,           note: 'A perfect score of 100 means the on-page SEO basics are in place, but that won\'t help if Google\'s mobile-first index is penalising the site for its failed Core Web Vitals — a fast, technically sound site is what actually earns rankings.' },
  },

  diagnosisFindings: [
    { stat: '28 / 100', title: 'Mobile performance is critically low', body: 'Google scores this site 28 out of 100 for performance on mobile — a score that places it firmly in the danger zone. Most patients searching for a private dentist in Sheffield are doing so on their phone, and a site this slow will cause the majority to leave before it even finishes loading. This isn\'t a minor issue; it\'s the single biggest barrier between Harley Private and new patients.' },
    { stat: '23.3MB', title: 'The page weighs as much as 23 photographs', body: 'At 23.3MB, the homepage is extraordinarily heavy for a dental website — a well-optimised site typically loads in under 1MB. This bloat forces every visitor\'s phone or laptop to download an enormous amount of data before they see anything, which is why real-world load times are so poor. Compressing images and removing unused code alone could reduce this by 80% or more.' },
    { stat: '3,700ms', title: 'Nearly 4 seconds lost to unused JavaScript', body: 'There are 1,386KB of JavaScript files loading on the site that aren\'t actually being used on the page. This wastes 3.7 seconds of a visitor\'s time before the page becomes interactive. That\'s 3.7 seconds where a potential implant or aligner patient is staring at a blank or frozen screen — and most will simply hit back and call a competitor.' },
    { stat: 'FAILED', title: 'Google\'s Core Web Vitals test has failed', body: 'Core Web Vitals are the real-world speed measurements Google uses to rank websites. Harley Private\'s site has failed this assessment, with the largest content element taking 2.7 seconds to load and the server itself taking 1.7 seconds just to respond. This failure directly suppresses the site\'s position in Sheffield search results, regardless of how well the on-page SEO is set up.' },
    { stat: '1 of 6', title: 'Security headers are almost entirely absent', body: 'Only one of six recommended security headers is present on the site. These headers are a basic layer of protection that tell browsers how to handle the site safely — without them, the site is more vulnerable to certain types of attack, and some browsers may flag it to users. For a private healthcare provider handling patient enquiries, this is a trust and compliance risk worth taking seriously.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix the speed problems killing your conversions',
      bullets: ['Strip and defer the 1,386KB of unused JavaScript that\'s adding nearly 4 seconds to every page load', 'Compress and reformat the site\'s images to bring the 23.3MB page weight down to under 2MB', 'Eliminate the redirect chain flagged in the audit to recover 780ms of wasted load time'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Make the site secure, trusted, and technically sound',
      bullets: ['Implement the 5 missing security headers including Content-Security-Policy, X-Frame-Options, and Permissions-Policy', 'Add structured data (schema markup) so Google can display your star ratings and address directly in search results', 'Write and add a meta description so the listing in Google search results has a compelling reason to click, not a blank space', 'Remove unused CSS to further reduce page weight and improve rendering speed across all devices'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn the traffic you\'re already getting into booked consultations',
      bullets: ['Introduce lead capture automation so enquiries from the chatbot are followed up instantly, not left waiting in an inbox', 'Build out treatment-specific landing pages for high-value services like full-mouth implants, clear aligners, and composite bonding to capture patients searching for those exact terms in Sheffield', 'Connect patient data flows to reduce manual admin entry and ensure no enquiry falls through the cracks'],
    },
  ],

  prognosisRows: [
    { today: 'Mobile performance score of 28 — site loads slowly for most visitors', after: 'Target score above 70, with page load under 2.5 seconds on mobile', why: 'Removing unused JavaScript and compressing the 23.3MB page weight are the two highest-impact fixes available' },
    { today: 'Core Web Vitals assessment: FAILED — actively suppressing Google rankings', after: 'Pass all Core Web Vitals thresholds, removing the ranking penalty in mobile search', why: 'LCP and TTFB improvements from Phase 1 bring both metrics within Google\'s acceptable range' },
    { today: 'No meta description — search result listing looks incomplete and unprofessional', after: 'A tailored meta description appears under every Google result, giving patients a reason to click', why: 'A compelling 155-character description is a zero-cost change with direct impact on click-through rate' },
    { today: 'Google star rating not visible in search results due to missing schema markup', after: 'Review stars and address appear directly in Google search results for branded and local searches', why: 'Adding LocalBusiness and Review schema unlocks rich results that build trust before a patient even visits the site' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Harley Private already has a chatbot in place — we\'d ensure it\'s configured to qualify leads, capture contact details, and route high-value treatment enquiries like implants and aligner consultations directly into a follow-up sequence.' },
    { title: 'Lead automation', description: 'Right now any enquiry that comes in outside of office hours sits unanswered — automation ensures every chatbot or form submission gets an immediate, personalised response that keeps the patient warm until the team picks it up.' },
    { title: 'Data entry automation', description: 'Patient enquiry data captured through the website can be pushed directly into your practice management system, removing the manual step of re-entering contact details and reducing the risk of lost leads.' },
    { title: 'Image optimisation', description: 'The site currently loads 23.3MB of data on every visit — professional image compression and format conversion alone could reduce this by over 80%, dramatically improving speed without changing how the site looks.' },
    { title: 'Security hardening', description: 'Five of the six recommended browser security headers are absent, including Content-Security-Policy and X-Frame-Options — adding these protects patient data, builds browser trust, and brings the site in line with NHS-adjacent best practice for private healthcare.' },
    { title: 'SEO & content', description: 'The site has no meta description and no Google review schema, meaning it\'s missing two of the most visible trust signals in local search — fixing these, alongside treatment-specific pages for Sheffield implant and aligner searches, would have a measurable impact on enquiry volume.' },
  ],

  techStack: {
    cms:     'Webflow',
    hosting: null,
    other:   ['Google Hosted Libraries', 'Cloudflare'],
  },
}
