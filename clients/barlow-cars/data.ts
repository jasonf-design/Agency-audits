import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'barlow-cars',
  businessName: 'Barlow Cars',
  url: 'https://barlowcars.co.uk',
  reportDate: '2026-07-21',

  heroHeadline: {
    before:   'Good reputation.\nWebsite needs ',
    emphasis: 'urgent work',
  },
  heroSubheading: 'We ran barlowcars.co.uk through Google\'s own diagnostic tools and found a site that communicates the right message but is losing enquiries to slow load times, weak security, and accessibility gaps that quietly push visitors away before they ever request a valuation.',
  heroMeta: [
    { primary: 'Chesterfield, Derbyshire (S18)', secondary: 'Est. locally' },
    { primary: '30+ Years Motor Industry Experience', secondary: 'Car buying & concierge specialists' },
    { primary: '2 of 3', secondary: 'Booking, chatbot, contact form live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'C' },
    { label: 'Core Web Vitals',  grade: 'C'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'D'  },
    { label: 'Accessibility',    grade: 'C' },
    { label: 'Best practices',   grade: 'A'   },
    { label: 'On-page SEO',      grade: 'A-'  },
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
    performance:   { score: 73,   note: 'A mobile performance score of 73 is being dragged down by a 3.8MB page and unused CSS adding roughly 150ms of unnecessary delay — on a site where first impressions decide whether someone requests a valuation or hits back.' },
    accessibility: { score: 63, note: 'The accessibility score of 63 suggests the site has contrast, labelling, or navigation issues that make it harder to use for a significant portion of visitors — and signals to Google that the experience isn\'t fully inclusive.' },
    bestPractices: { score: 96, note: 'At 96, best practices is the strongest score here — the site is using HTTPS and avoiding most common technical pitfalls, which is a solid baseline to build on.' },
    seo:           { score: 91,           note: 'An SEO score of 91 means the technical foundations are mostly in place, but without structured data for the business address or reviews showing up in schema, Google can\'t confidently surface Barlow Cars in local results where purchase-ready buyers are searching.' },
  },

  diagnosisFindings: [
    { stat: '3.8MB', title: 'The page is too heavy for mobile visitors', body: 'At 3.8MB, the homepage is significantly over the recommended size for a mobile-first website. Most people searching \'sell my car Chesterfield\' are on their phone — and a heavy page means they\'re waiting longer before they can even read your offer or fill in the valuation form. Every extra second of load time measurably reduces the number of people who stay on the page.' },
    { stat: '63 / 100', title: 'Accessibility issues are costing you visitors — and rankings', body: 'A score of 63 for accessibility is the weakest number across the entire audit. This means some visitors — particularly those using screen readers or with visual impairments — are likely struggling to use the site properly. Google also factors accessibility into how it evaluates page quality, so this low score is quietly working against your search rankings too.' },
    { stat: '1 of 6', title: 'The site is almost completely unprotected by security headers', body: 'Only one of six recommended security headers is in place. These headers are the digital equivalent of locks on your doors — they protect visitors from certain types of attacks and signal to browsers that your site is trustworthy. Missing five of them means browsers like Chrome may flag the site, and savvy visitors who check may lose confidence before submitting their details.' },
    { stat: 'No data', title: 'Google has no real-world speed data for this site', body: 'All five Core Web Vitals fields — the metrics Google uses to judge real visitor experience — came back with no data. This typically means traffic volumes are too low for Google to collect a reliable sample. Without that data, Google can\'t give the site a performance signal in search rankings, which puts Barlow Cars at a disadvantage against competitors who do have this data.' },
    { stat: 'Not found', title: 'Your address and reviews aren\'t visible to Google in structured data', body: 'The site has no structured data telling Google your address or showcasing your Google reviews. This means when someone searches for a local car buyer near Chesterfield, Google is less likely to display Barlow Cars in the prominent local map results — the listings with star ratings and addresses that get the most clicks from buyers ready to act.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s sending visitors away',
      bullets: ['Compress and optimise the page assets to reduce the 3.8MB page weight and cut load time for mobile visitors arriving from search', 'Remove or defer the unused CSS identified in the audit to recover the ~150ms delay before the page becomes usable', 'Add the five missing security headers to protect visitors and remove any browser trust warnings that may be appearing before people submit their details'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Build the trust signals Google and buyers expect',
      bullets: ['Add structured data (schema markup) for Barlow Cars\' address so the site qualifies for local map pack listings in Chesterfield and surrounding areas', 'Add review schema to pull your Google ratings directly into search results, giving potential sellers social proof before they even click', 'Resolve the accessibility issues scoring 63 — fix colour contrast, form field labels, and navigation structure to make the valuation form easy for everyone to use', 'Set up Core Web Vitals tracking so Google can start collecting real visitor experience data and factor it into your rankings'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn traffic into valuations, automatically',
      bullets: ['Implement automated follow-up for valuation form submissions that don\'t convert within 48 hours — a short SMS or email re-engaging the seller before they go elsewhere', 'Add a Review Generation flow that automatically asks satisfied sellers for a Google review after payment clears, building the rating count that drives future trust', 'Create location-specific landing pages targeting nearby towns and searches like \'sell my car Sheffield\' or \'sell my car Derbyshire\' to capture a wider pool of motivated sellers'],
    },
  ],

  prognosisRows: [
    { today: '3.8MB page weight slows down every mobile visitor before they reach the valuation form', after: 'Optimised assets cut load time materially, reducing drop-off before the form is even seen', why: 'Compressing images and removing unused CSS directly reduces bytes the browser has to download' },
    { today: 'Only 1 of 6 security headers in place — browsers may flag trust warnings to cautious visitors', after: 'All 6 headers implemented, removing any friction for visitors about to submit personal details', why: 'Security headers are a server-level configuration change with immediate effect once deployed' },
    { today: 'No address or review schema — Barlow Cars is invisible in Google\'s local map pack results', after: 'Structured data in place, making the site eligible to appear in local listings with star ratings shown', why: 'Schema markup directly feeds the data Google uses to build local search features' },
    { today: 'Accessibility score of 63 limits usability and signals poor experience quality to Google', after: 'Accessibility score lifted toward 85+, improving usability for all visitors and strengthening page quality signals', why: 'Fixing form labels, contrast ratios, and navigation structure resolves the majority of flagged issues' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'A car-selling enquiry at 9pm on a Sunday shouldn\'t go unanswered — an always-on chatbot can capture the seller\'s reg, mileage, and contact details and have them ready in your inbox by Monday morning.' },
    { title: 'Lead automation', description: 'When someone fills in the valuation form on barlowcars.co.uk, automated follow-up ensures they receive an immediate acknowledgement and a reminder if they haven\'t heard back — keeping Barlow Cars front of mind while they\'re still deciding.' },
    { title: 'Data entry automation', description: 'Valuation requests, seller details, and vehicle information coming in through the form can be automatically logged into your workflow — removing the manual step of copying details from email into wherever you track your pipeline.' },
    { title: 'Image optimisation', description: 'With a 3.8MB page, compressing and correctly sizing your images alone could recover significant load time for the mobile visitors most likely to be searching \'sell my car\' from their phone.' },
    { title: 'Security hardening', description: 'Five of six recommended security headers are currently missing — we implement Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, X-Content-Type-Options, and Permissions-Policy to bring the site up to modern browser security standards.' },
    { title: 'SEO & content', description: 'Barlow Cars currently has no location-specific landing pages beyond Chesterfield — targeted pages for Sheffield, Dronfield, Mansfield, and surrounding areas would capture sellers across a much wider search radius.' },
  ],

  aiRecommendations: [
    { tool: 'AI Voice Agent', impact: 'high', why: 'A sole-trader or small-team car buying service like Barlow Cars almost certainly misses inbound calls when out collecting vehicles or handling transactions — an AI voice agent can answer, quote the process, capture the seller\'s vehicle details, and book a callback without anyone needing to be available.' },
    { tool: 'Follow-up Automation', impact: 'high', why: 'Car sellers comparing offers from multiple buyers will go with whoever responds fastest — automated follow-up triggered the moment a valuation form is submitted means Barlow Cars is always first to engage, even outside business hours.' },
    { tool: 'Review Generation', impact: 'quick-win', why: 'With no review schema detected on the site and no visible star ratings in Google search results, Barlow Cars is missing the single most persuasive trust signal for sellers choosing between local car buyers — an automated review request sent after payment clears costs nothing and compounds over time.' },
    { tool: 'AI Content & SEO', impact: 'medium', why: 'Barlow Cars\' coverage area clearly extends beyond Chesterfield, but the site has no pages targeting nearby towns — AI-generated local landing pages for Sheffield, Dronfield, Mansfield, and Matlock would systematically capture sellers searching in those areas without requiring manual copywriting.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['PHP', 'MySQL', 'Hostinger CDN'],
  },
}
