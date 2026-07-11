import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'albion-sports',
  businessName: 'Albion Sports',
  url: 'https://www.albionsports.co.uk/',
  reportDate: '2026-07-11',

  territory: 'East Midlands',
  referredBy: 'Aidan Fry',

  heroHeadline: {
    before:   'Albion Sports.\nWebsite needs ',
    emphasis: 'urgent work',
  },
  heroSubheading: 'We ran albionsports.co.uk through Google\'s own diagnostic tools and found a site that doesn\'t reflect the club\'s 50-year history — slow load times, zero security headers, and missing local signals are leaving potential members and sponsors with a poor first impression before they\'ve even seen the pitch.',
  heroMeta: [
    { primary: 'Bradford', secondary: 'Trading since 1974' },
    { primary: 'Non-League Football Club (CIC)', secondary: 'NCEL Premier Division' },
    { primary: '2 of 3', secondary: 'Chatbot & contact form live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'C' },
    { label: 'Core Web Vitals',  grade: 'C'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'F'  },
    { label: 'Accessibility',    grade: 'B' },
    { label: 'Best practices',   grade: 'B'   },
    { label: 'On-page SEO',      grade: 'B'  },
    { label: 'Reputation',       grade: 'B'  },
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
    performance:   { score: 63,   note: 'The site scores 63 out of 100 on mobile performance — pulled down by 326KB of JavaScript and CSS that loads but is never used, adding over 1.7 seconds of unnecessary delay before the page becomes usable.' },
    accessibility: { score: 87, note: 'Scoring 87 out of 100 is reasonable, but it means there are still identifiable barriers — likely missing labels, contrast issues, or navigation problems — that could exclude some visitors and hurt search rankings.' },
    bestPractices: { score: 77, note: 'A score of 77 flags issues such as outdated libraries or insecure resource loading, which can trigger browser warnings and erode trust with visitors who see them.' },
    seo:           { score: 77,           note: 'The SEO score of 77 reflects missing meta descriptions and the absence of structured local data, meaning Google has less information to confidently rank the site for searches in Bradford and surrounding areas.' },
  },

  diagnosisFindings: [
    { stat: '63/100', title: 'Slow mobile performance is turning people away', body: 'Google scores the site at 63 out of 100 on mobile — well below the 90+ threshold considered good. Most people visiting the site are on their phones, and a sluggish experience means they\'ll leave before they\'ve read anything. For a club trying to attract new junior players, seniors, and sponsors, that first impression matters enormously.' },
    { stat: '3.4MB', title: 'The page is too heavy to load quickly on mobile', body: 'At 3.4MB, the homepage is carrying far more data than it needs to — typically a result of uncompressed images, unused code, and bloated scripts. On a typical UK mobile connection, that translates to a noticeable wait before anything appears on screen. Visitors don\'t wait; they go elsewhere.' },
    { stat: '950ms', title: 'Nearly a full second wasted on unused JavaScript alone', body: 'Google\'s diagnostics found 179KB of JavaScript that loads on every visit but is never actually used — costing visitors almost a full second of delay. That\'s before any images or content have even started to appear. Removing it is a straightforward fix that would make the site feel significantly faster overnight.' },
    { stat: '0 of 6', title: 'Zero security headers — the site is completely exposed', body: 'None of the six standard HTTP security headers are in place, meaning the site offers no browser-level protection against clickjacking, cross-site scripting, or data sniffing. This is a red flag for anyone technically minded — including potential sponsors or partners — and it can cause modern browsers to display quiet warnings that undermine trust.' },
    { stat: 'No data', title: 'Google has no real-world performance data for this site', body: 'Core Web Vitals — Google\'s official measure of how real visitors experience a site — returned no data at all. This usually means traffic is too low or the site isn\'t being indexed effectively. Without this data, Google can\'t confidently rank the site, and the club is invisible in local searches at the exact moment people are looking for a football club to join.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s costing you visitors right now',
      bullets: ['Strip out the 179KB of unused JavaScript and 147KB of unused CSS to cut over 1.7 seconds from load time', 'Compress and properly size images to bring the 3.4MB page weight down to under 1MB', 'Add all 6 missing security headers to remove browser-level warnings and protect site visitors'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Give Google and visitors the signals they need',
      bullets: ['Write and publish a proper meta description so the site appears with a compelling summary in Google search results', 'Add structured local data (schema markup) including the club\'s Bradford address, so Google can confidently surface it in local searches', 'Embed and display Google Reviews in schema so star ratings appear directly in search results', 'Fix the broken sitemap scan pages (/wp-sitemap-posts-post-1.xml and /wp-sitemap-posts-page-1.xml) so Google can crawl and index all content correctly'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn visitors into members, volunteers, and sponsors',
      bullets: ['Configure the existing chatbot to qualify and capture enquiries from prospective players, parents of juniors, and sponsorship leads — 24 hours a day', 'Set up automated follow-up from the contact form so no enquiry goes cold, even during training nights or match days', 'Build out dedicated landing pages for junior sign-ups, senior trials, and sponsorship opportunities — giving each audience a clear, specific path to take action'],
    },
  ],

  prognosisRows: [
    { today: 'Mobile performance score of 63 — site loads slowly and visitors drop off before engaging', after: 'Performance score targets 85+ after JavaScript, CSS, and image optimisation', why: 'Removing 326KB of unused code and compressing assets cuts over 1.7 seconds from load time' },
    { today: 'No meta description means Google shows random text in search results, reducing click-throughs', after: 'A crafted meta description appears in every search result, clearly explaining who Albion Sports are and prompting clicks', why: 'Google uses the meta description as the preview snippet — it directly influences whether someone clicks your result or a competitor\'s' },
    { today: 'Zero security headers leave the site exposed and can trigger silent browser warnings', after: 'All 6 security headers in place, removing warnings and meeting modern browser standards', why: 'Security headers are a quick server-level fix that immediately improve trust signals for visitors and Google alike' },
    { today: 'No structured address or review data means the club doesn\'t appear in local map or star-rating results', after: 'Schema markup makes the club eligible for local pack listings and star ratings directly in Google search', why: 'Structured data tells Google exactly what the business is, where it is, and how it\'s rated — unlocking richer, more prominent search appearances' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'The existing chatbot can be configured to handle enquiries from parents looking to register junior players or seniors seeking trial information — capturing leads even during Saturday fixtures when no one is at a desk.' },
    { title: 'Lead automation', description: 'Automated follow-up sequences from the contact form mean every sponsorship or membership enquiry gets a timely, professional response without relying on someone remembering to check their inbox.' },
    { title: 'Data entry automation', description: 'New member registrations, trial sign-ups, and sponsor details can be automatically logged into a central system, removing the admin burden from volunteers and committee members.' },
    { title: 'Image optimisation', description: 'The site currently carries a 3.4MB page load — properly compressing and resizing the gallery and team photos alone could cut that by more than half and dramatically improve mobile speed.' },
    { title: 'Security hardening', description: 'All 6 missing security headers — including Content Security Policy, X-Frame-Options, and Strict-Transport-Security — will be implemented at server level to fully protect visitors and meet modern browser standards.' },
    { title: 'SEO & content', description: 'The site is missing a meta description, has no local schema markup, and no Bradford address in structured data — all of which need to be in place before the site can compete for local search visibility in West Yorkshire.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['wpBakery', 'PHP', 'MySQL', 'Nginx'],
  },
}
