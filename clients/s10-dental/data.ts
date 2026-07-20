import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 's10-dental',
  businessName: 'S10 Dental',
  url: 'https://www.s10dental.co.uk',
  reportDate: '2026-07-20',

  territory: 'direct',
  referredBy: 'Jason',

  heroHeadline: {
    before:   'Great reputation.\nWebsite needs ',
    emphasis: 'urgent work',
  },
  heroSubheading: 'We ran S10 Dental\'s website through Google\'s own diagnostic tools and found a practice with a stellar 4.9★ rating from 130 reviews — but a site that\'s quietly losing patients before they ever pick up the phone. The technical foundations are shakier than the reputation deserves.',
  heroMeta: [
    { primary: '12 Tom Lane, Sheffield, S10 3PB', secondary: 'Est. locally' },
    { primary: 'Cosmetic & Implant Dentistry', secondary: 'Nominated: Practice of the Year 2026' },
    { primary: '3 of 3', secondary: 'Booking widget, chatbot & contact form live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'B' },
    { label: 'Core Web Vitals',  grade: 'C'  },
    { label: 'Lead capture',     grade: 'A+' },
    { label: 'Security headers', grade: 'B'  },
    { label: 'Accessibility',    grade: 'A' },
    { label: 'Best practices',   grade: 'A'   },
    { label: 'On-page SEO',      grade: 'A+'  },
    { label: 'Reputation',       grade: 'A+'  },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP', displayValue: '—', status: 'no-data' },
    { metric: 'TTFB', displayValue: '—', status: 'no-data' },
    { metric: 'FCP', displayValue: '—', status: 'no-data' },
    { metric: 'CLS', displayValue: '—', status: 'no-data' },
    { metric: 'INP', displayValue: '—', status: 'no-data' },
  ],

  lighthouse: {
    performance:   { score: 81,   note: 'A mobile performance score of 81 means some visitors — especially on slower mobile connections — are waiting noticeably longer than they should, with a 780ms delay caused by unnecessary page redirects identified as the single biggest drag on load speed.' },
    accessibility: { score: 96, note: 'Scoring 96 out of 100 is strong, but the remaining gaps likely affect screen-reader users and patients with visual impairments — a small fix that also signals quality to Google.' },
    bestPractices: { score: 96, note: 'A score of 96 is respectable, though the missing security headers (3 of 6 in place) are factored into this — resolving those would push the score closer to perfect and protect patient trust.' },
    seo:           { score: 100,           note: 'A perfect 100 SEO score means the technical on-page signals are correctly configured, but that score measures structure — not whether the content is actually winning patients searching for implants, whitening or clear aligners in Sheffield.' },
  },

  diagnosisFindings: [
    { stat: '780ms', title: 'Unnecessary redirect is slowing every visit', body: 'Google found that the site is making visitors wait an extra 780 milliseconds due to avoidable page redirects — before they\'ve even seen a single image or read a word. On mobile, where most people search for a dentist, this delay is felt. Research consistently shows that even a one-second slowdown reduces the chance someone books an appointment.' },
    { stat: 'No data', title: 'Core Web Vitals are invisible to Google', body: 'Google\'s Core Web Vitals — the real-world speed scores collected from actual visitors — are showing no data for S10 Dental. This means Google can\'t confirm how fast the site feels to real patients, which removes a potential ranking advantage entirely. Practices with strong CWV data have a documented edge in local search results.' },
    { stat: '3 of 6', title: 'Half your security headers are missing', body: 'Your site has three of the six recommended security headers in place — a pass mark, but not a clean one. The missing headers (X-Frame-Options, X-Content-Type-Options, and Permissions-Policy) leave the door slightly ajar for certain browser-based attacks. More practically, browsers and increasingly savvy patients can flag security warnings, and Google\'s scoring penalises incomplete security configurations.' },
    { stat: '0.7MB', title: 'Page weight is lean — but images need attention', body: 'At 0.7MB the homepage is reasonably compact, which is a good sign. However, the site is loading large landscape images from the 2025 upload batch at full resolution — and the video embed fallback warning visible in the page code suggests media isn\'t always being served in the most efficient format. Properly optimised next-gen images would shave further time off the load on 4G connections.' },
    { stat: '81/100', title: 'Mobile performance is good, not great — and mobile is where patients search', body: 'A mobile performance score of 81 puts S10 Dental ahead of many dental practices, but it\'s not in the top tier. When a patient in Crosspool Googles \'dentist near me\' on their phone after a toothache, the fastest-loading practice wins the click. Pushing this score into the 90s is achievable with targeted fixes and would directly support more bookings from mobile searches.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Remove the friction costing you patients right now',
      bullets: ['Eliminate the redirect chain causing the 780ms delay so the site loads immediately on first click', 'Implement the three missing security headers to complete the browser security profile and lift Best Practices toward 100', 'Compress and convert the large homepage images to modern WebP format to reduce mobile load time further'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Build a site Google trusts and rewards',
      bullets: ['Resolve the Core Web Vitals data gap by ensuring real-visitor performance data is flowing into Google Search Console', 'Audit and optimise server-side caching to ensure the already-short 39ms server response stays consistent under traffic spikes', 'Review the video embed implementation so media loads correctly across all browsers without fallback warnings', 'Strengthen the meta description — the current one is generic; rewrite it to specifically call out Crosspool, key treatments, and the 4.9★ reputation to improve click-through rates from search results'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn search traffic into a steady stream of booked appointments',
      bullets: ['Build dedicated, content-rich landing pages for high-value treatments — dental implants, composite bonding, clear aligners — targeting specific Sheffield search terms beyond the homepage', 'Automate the follow-up sequence for enquiries submitted via the contact form and chatbot so no lead goes cold overnight', 'Leverage the Dental Practice of the Year 2026 nomination and 130 five-star reviews in structured schema markup so this social proof appears directly in Google search results'],
    },
  ],

  prognosisRows: [
    { today: '780ms redirect delay on every page visit', after: 'Redirect removed — site loads instantly from first click', why: 'Direct fix to the single largest identified speed drag' },
    { today: '3 of 6 security headers present — incomplete protection', after: '6 of 6 headers in place — full browser security profile', why: 'Missing headers added in under an hour; improves Best Practices score' },
    { today: 'No Core Web Vitals field data visible to Google', after: 'Real-visitor CWV data flowing — ranking signal restored', why: 'Data gap closed, giving Google the signals it needs to reward the site' },
    { today: 'Generic meta description not referencing the practice\'s strengths', after: 'Rewritten description citing 4.9★ reviews, Crosspool location and key treatments', why: 'More relevant descriptions directly increase click-through rates from search' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'S10 Dental already has a chatbot live — we ensure it\'s configured to capture out-of-hours implant and whitening enquiries and route them to a booked consultation, not a dead inbox.' },
    { title: 'Lead automation', description: 'With a booking widget, chatbot and contact form all running, S10 Dental is generating enquiries — automation ensures every one of them gets an immediate, personalised follow-up rather than waiting until the receptionist is free.' },
    { title: 'Data entry automation', description: 'New patient enquiry details captured across three different channels can be automatically unified into a single patient record, eliminating double-entry and the risk of a £75 new patient exam booking slipping through the cracks.' },
    { title: 'Image optimisation', description: 'The site\'s 0.7MB page weight can be reduced further by converting the high-resolution 2025 practice photography to next-gen WebP format, cutting mobile load times without losing the premium visual quality the practice has invested in.' },
    { title: 'Security hardening', description: 'X-Frame-Options, X-Content-Type-Options, and Permissions-Policy headers are all absent — adding these three closes the security gap and completes the full set of six recommended protections.' },
    { title: 'SEO & content', description: 'Despite a perfect technical SEO score, S10 Dental has no dedicated landing pages for its highest-value treatments — dental implants, composite bonding and clear aligners — meaning Sheffield patients searching specifically for those procedures aren\'t finding the practice.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['PHP', 'MySQL', 'LiteSpeed'],
  },
}
