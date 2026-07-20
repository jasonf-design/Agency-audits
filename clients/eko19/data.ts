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
    emphasis: 'urgent work',
  },
  heroSubheading: 'We ran Eko19.com through Google\'s own diagnostic tools and found a site that offers strong renewable energy services but is actively losing potential business clients due to speed, security, and trust signal problems. No Google Reviews schema, no structured address data, and a mobile performance score of 59 means the site is harder to find — and harder to trust — than it should be.',
  heroMeta: [
    { primary: 'Hartington, Derbyshire', secondary: 'TODO: trading since' },
    { primary: 'Commercial Renewable Energy & Monitoring', secondary: 'Solar, BESS, EV Charging & LED' },
    { primary: '2 of 3', secondary: 'Chatbot & contact form live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'D' },
    { label: 'Core Web Vitals',  grade: 'C'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'F'  },
    { label: 'Accessibility',    grade: 'B' },
    { label: 'Best practices',   grade: 'A'   },
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
    performance:   { score: 59,   note: 'The homepage scores 59 out of 100 on mobile performance — dragged down primarily by 241KB of unused JavaScript and 168KB of unused CSS that make visitors wait over 2 seconds longer than necessary before the page becomes usable.' },
    accessibility: { score: 76, note: 'A score of 76 suggests there are elements on the page — likely contrast issues, missing labels, or poorly structured headings — that make the site harder to use for some visitors and flag a quality concern to Google.' },
    bestPractices: { score: 96, note: 'At 96, best practices are the strongest score on the site, which is a solid foundation, though the complete absence of security headers undermines what is otherwise a technically clean build.' },
    seo:           { score: 77,           note: 'A score of 77 is not bad, but with no meta description, no structured address data, and no review schema in place, the site is leaving significant local and commercial search visibility on the table regardless of that score.' },
  },

  diagnosisFindings: [
    { stat: '59 / 100', title: 'Mobile performance is failing potential clients', body: 'More than half of B2B website visits now happen on mobile, and Google scores Eko19.com at just 59 out of 100 for mobile performance. A slow-loading site on mobile signals an unprofessional first impression to a facilities manager or business owner researching renewable energy providers. Google also uses this score as a ranking factor, so a poor result here means fewer people find the site in the first place.' },
    { stat: '4.8MB', title: 'The page is carrying too much unnecessary weight', body: 'At 4.8MB, the total page weight is significantly heavier than it needs to be for a services website. Oversized pages take longer to load on every connection, especially mobile data, and the biggest culprits here are 241KB of unused JavaScript and 168KB of unused CSS that are being loaded but never used. Stripping these out alone could save over 2 seconds of load time for every visitor.' },
    { stat: '0 of 6', title: 'Zero security headers — a serious trust and risk issue', body: 'Eko19.com has none of the six standard HTTP security headers in place. These headers tell browsers how to protect visitors from common attacks like cross-site scripting and data interception. For a commercial energy company asking businesses to trust them with infrastructure decisions, a site that fails basic security hygiene sends the wrong signal — and some enterprise procurement teams will flag this during supplier vetting.' },
    { stat: 'No data', title: 'Core Web Vitals show no real-world field data', body: 'Google\'s Core Web Vitals — the metrics that directly influence search rankings — returned no data for Eko19.com. This typically means the site has not generated enough real-visitor traffic for Google to measure it, which in itself suggests the site is not attracting the volume of traffic it should be. Without this data, Google cannot confidently rank the site for competitive commercial search terms.' },
    { stat: 'Missing', title: 'No meta description, address schema, or review signals', body: 'The site has no meta description, meaning Google writes its own preview text for search results — often poorly. There is no structured address data, so the business does not appear correctly in local map packs, and there are no Google Review signals embedded in the site\'s code. For a commercial services company, these three gaps together significantly reduce click-through rates from search and erode trust before a prospect has even landed on the page.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s driving visitors away right now',
      bullets: ['Remove the 241KB of unused JavaScript causing a 1,420ms delay on every page load', 'Strip out the 168KB of unused CSS to cut a further 900ms from mobile load times', 'Compress and lazy-load images to bring the 4.8MB page weight down to under 1.5MB', 'Implement all 6 missing HTTP security headers to protect visitors and pass enterprise supplier checks'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Give Google everything it needs to rank and trust the site',
      bullets: ['Write and publish a targeted meta description for every key service page to control how Eko19 appears in search results', 'Add structured address and business schema so the company appears correctly in Google Maps and local search packs', 'Embed Google Review schema to surface star ratings directly in search results and increase click-through rates', 'Resolve the two sitemap pages that failed to scan so Google can fully crawl and index all service content'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn the site into a lead generation engine for commercial clients',
      bullets: ['Upgrade the chatbot to a trained AI assistant that can qualify commercial enquiries — sector, site type, energy spend — outside business hours', 'Build automated email follow-up sequences triggered by contact form submissions so no commercial lead goes cold', 'Create dedicated landing pages for high-value services (Solar PPAs, BESS, EV Infrastructure) with conversion-focused copy targeting procurement and estates decision-makers'],
    },
  ],

  prognosisRows: [
    { today: 'Mobile performance score of 59 — site loads slowly and ranks lower in Google', after: 'Target score of 85+ after JavaScript, CSS, and image optimisation', why: 'Removing unused code and compressing assets cuts over 2 seconds from load time' },
    { today: 'No meta description — Google writes its own, often irrelevant, search snippet', after: 'Custom meta descriptions on all key pages driving higher click-through from search', why: 'Controlled messaging in search results directly improves qualified traffic' },
    { today: 'Zero security headers — site fails basic enterprise security checks', after: 'All 6 security headers implemented, site passes standard supplier vetting tools', why: 'Security headers are a one-time technical fix with immediate trust and safety benefits' },
    { today: 'No structured data — business address and reviews invisible to Google', after: 'Business appears in local map packs with star ratings visible in search results', why: 'Schema markup tells Google exactly who Eko19 is, where they operate, and how clients rate them' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'An AI chatbot trained on Eko19\'s services can qualify commercial enquiries — capturing site type, energy spend, and project timelines — at any hour, so no inbound lead from a facilities manager or developer goes unanswered overnight.' },
    { title: 'Lead automation', description: 'Automated follow-up sequences triggered by the existing contact form mean every business that submits an enquiry receives a tailored, prompt response without any manual effort from the Eko19 team.' },
    { title: 'Data entry automation', description: 'Enquiry data from the contact form and chatbot can be automatically routed into a CRM or pipeline tool, eliminating manual data entry and ensuring every commercial lead is tracked from first contact to close.' },
    { title: 'Image optimisation', description: 'With the site currently weighing in at 4.8MB, professional image compression and lazy-loading alone could cut page weight by more than half and noticeably improve load speed for every visitor.' },
    { title: 'Security hardening', description: 'Eko19.com currently has zero of the six standard HTTP security headers in place — including Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security — all of which can be implemented quickly to protect visitors and pass enterprise procurement checks.' },
    { title: 'SEO & content', description: 'With no meta descriptions, missing address schema, and no review signals in place, dedicated service pages for Solar PPAs, BESS, and EV infrastructure need structured content and technical markup to compete for the commercial search terms Eko19\'s ideal clients are actually using.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'WooCommerce', 'PHP', 'MySQL', 'Cloudflare'],
  },
}
