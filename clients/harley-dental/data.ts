import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'harley-dental',
  businessName: 'HArley Dental',
  url: 'https://harleyprivatedental.co.uk',
  reportDate: '2026-07-04',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Harley Dental.\nWebsite needs ',
    emphasis: 'urgent attention',
  },
  heroSubheading: 'We ran harleyprivatedental.co.uk through Google\'s own diagnostic tools and found a site that presents beautifully on the surface but is quietly turning away patients before they ever book. The performance issues alone are costing Harley Private Dental real enquiries every single day.',
  heroMeta: [
    { primary: '42 Kingfield Rd, Nether Edge, Sheffield, S11 9AS', secondary: 'Est. locally' },
    { primary: 'Implants, Aligners & Medical Aesthetics', secondary: 'Private specialist care' },
    { primary: '1 of 3', secondary: 'Live chat only — forms & calls not tracked' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'F' },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'C' },
    { label: 'Security headers', grade: 'D'  },
    { label: 'Accessibility',    grade: 'A-' },
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
    performance:   { score: 32,   note: 'A score of 32 out of 100 on mobile — the lowest possible band — is driven primarily by 23.3MB of page weight and over 1,300KB of JavaScript that loads but is never used, adding nearly 4 seconds of dead time before the page becomes usable.' },
    accessibility: { score: 91, note: 'Scoring 91 is a solid result, but the remaining gaps likely involve contrast ratios or missing labels that could exclude patients using screen readers or accessibility tools — a legal consideration as well as a practical one.' },
    bestPractices: { score: 73, note: 'A score of 73 flags that the site is missing five of six recommended security headers, meaning browsers cannot fully protect visitors from common web threats — something that can quietly erode trust with cautious, privacy-conscious patients.' },
    seo:           { score: 100,           note: 'A perfect 100 for SEO confirms the technical on-page signals are correctly set up, but a high SEO score simply means Google can read the site — it does not mean the site is converting the traffic Google sends.' },
  },

  diagnosisFindings: [
    { stat: '32 / 100', title: 'Mobile performance is critically slow', body: 'Google scores Harley Private Dental\'s homepage at just 32 out of 100 on mobile — a rating that places it in the bottom tier of all websites tested. Most patients searching for a private dentist in Sheffield are doing so on their phone, and right now the majority of them are waiting several seconds just to see the page. Research consistently shows that more than half of mobile visitors leave if a page takes longer than 3 seconds to load.' },
    { stat: '23.3MB', title: 'The page is carrying 20× too much weight', body: 'A well-optimised dental website homepage should weigh around 1–2MB. Harley Private Dental\'s homepage is 23.3MB — roughly the same size as a short video clip — and every visitor has to download most of that just to view the page. On a typical mobile connection this adds seconds of loading time that patients simply won\'t wait through, particularly when searching for emergency dental appointments.' },
    { stat: '3,670ms', title: 'Nearly 4 seconds wasted on unused JavaScript', body: 'The site is loading 1,386KB of JavaScript code that is never actually used on the page — code that takes an estimated 3.67 seconds to process before anything interactive works. This is the single biggest drag on performance and is almost certainly a legacy of plugins or third-party tools that were added over time and never cleaned up.' },
    { stat: '1.7s TTFB', title: 'The server itself is responding slowly', body: 'Time to First Byte — the delay between a patient clicking your link and the server starting to respond — is 1.7 seconds, which Google flags as needing improvement. This happens before any content loads at all, and it suggests the hosting environment or server configuration needs attention. Combined with the heavy page weight, patients are facing a compounding delay that kills first impressions.' },
    { stat: '1 of 6', title: 'Security headers are almost entirely absent', body: 'Only one of the six recommended browser security headers is in place on this site. These headers instruct browsers on how to handle the site safely — without them, the site is more vulnerable to clickjacking, cross-site scripting, and data injection attacks. For a private dental practice handling patient enquiries and booking data, this is a compliance and trust risk that should be addressed promptly.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix the speed problems bleeding you of patients',
      bullets: ['Audit and remove the 1,386KB of unused JavaScript identified by Google — the single biggest performance drain on the site', 'Compress and properly format the images driving the 23.3MB page weight, targeting a sub-2MB homepage', 'Resolve the redirect chain flagged by Google that is adding 780ms of unnecessary delay on every page load'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Build a site patients and Google can both trust',
      bullets: ['Implement the five missing security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) to protect patient data and build browser trust', 'Remove the 96KB of unused CSS and minify remaining stylesheets to shave a further 380ms from load times', 'Add structured schema markup for Google Reviews so star ratings appear directly in search results — currently this data is present on the site but invisible to Google', 'Add a meta description to the homepage — currently blank — so Google and patients see a compelling summary in search results rather than a random pulled snippet'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn more of your traffic into booked consultations',
      bullets: ['Expand the live chat into a trained 24/7 AI chatbot that can qualify leads for aligners, implants, and aesthetics outside of practice hours — your highest-value treatments', 'Build automated follow-up sequences for enquiries that don\'t book immediately, particularly for 0% finance leads where patients often need a nudge', 'Add conversion tracking across all booking touchpoints so you can see exactly which treatments and which pages are driving real revenue'],
    },
  ],

  prognosisRows: [
    { today: 'Mobile performance score of 32 — bottom tier, pages take 4+ seconds to become usable', after: 'Target score of 70+ after JavaScript cleanup and image compression', why: 'Removing unused JS alone saves an estimated 3.67 seconds of processing time on every mobile visit' },
    { today: '23.3MB homepage that takes seconds to download on a mobile connection', after: 'Sub-2MB page weight loading comfortably within Google\'s recommended thresholds', why: 'Image optimisation and asset cleanup eliminates the bulk of the unnecessary data transfer' },
    { today: 'Google Reviews not visible in search results — star ratings absent from listings', after: 'Star ratings and review count displayed directly in Google search results', why: 'Adding review schema markup surfaces existing patient feedback where it influences click-through rates' },
    { today: '1 of 6 security headers present — site flagged as under-protected by browser security audits', after: 'Full complement of 6 security headers in place, passing browser and compliance checks', why: 'Security headers are a configuration change that protects patient data and removes a red flag for privacy-conscious patients' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Harley Private Dental already has live chat in place — we\'d upgrade this to a trained AI assistant that can handle out-of-hours enquiries for high-value treatments like implants, clear aligners, and aesthetics packages, so no consultation request goes unanswered overnight.' },
    { title: 'Lead automation', description: 'With 0% finance offers prominently featured across the site, automated follow-up sequences can re-engage patients who enquire about composite bonding or aligner packages but don\'t book immediately — the highest-drop-off point in private dentistry funnels.' },
    { title: 'Data entry automation', description: 'New patient enquiries, consultation bookings, and treatment interest captured via chat or forms can be automatically logged and assigned in your practice management system, removing manual admin from the front desk team.' },
    { title: 'Image optimisation', description: 'The site\'s 23.3MB page weight is almost certainly driven by uncompressed images — we\'d audit, reformat, and lazy-load every image across all pages to bring the site into a healthy loading range without changing how it looks.' },
    { title: 'Security hardening', description: 'Five of the six recommended security headers are currently missing from harleyprivatedental.co.uk — we\'d implement Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy to protect patient-facing pages and pass modern browser security audits.' },
    { title: 'SEO & content', description: 'The homepage is missing a meta description entirely, and Google Review schema is absent — quick wins that, alongside targeted content for high-intent searches like \'dental implants Sheffield\' and \'emergency dentist Sheffield\', would strengthen the practice\'s visibility for its most profitable treatments.' },
  ],

  techStack: {
    cms:     'Webflow',
    hosting: null,
    other:   ['Cloudflare', 'Google Hosted Libraries'],
  },
}
