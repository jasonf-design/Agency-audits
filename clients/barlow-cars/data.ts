import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'barlow-cars',
  businessName: 'Barlow Cars',
  url: 'https://Barlowcars.co.uk',
  reportDate: '2026-07-21',

  heroHeadline: {
    before:   'Good reputation.\nWebsite needs ',
    emphasis: 'urgent work.',
  },
  heroSubheading: 'We ran Barlow Cars\' website through Google\'s own diagnostic tools and found a business with a clear, trustworthy offer that its website is quietly undermining — slow load times, weak security, and missing trust signals are costing real enquiries every day.',
  heroMeta: [
    { primary: 'Chesterfield, S18', secondary: 'Est. locally' },
    { primary: '30+ Years Motor Trade Experience', secondary: 'Car buying & concierge specialists' },
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
    performance:   { score: 73,   note: 'A score of 73 on mobile means the page is visibly slow to load — likely dragged down by a 3.8MB page weight, which is over three times heavier than it should be for a simple lead-capture site.' },
    accessibility: { score: 63, note: 'A score of 63 is a failing grade — meaning a meaningful portion of visitors, including those using screen readers or with visual impairments, will struggle to use the site, which also puts the business at legal risk under UK accessibility guidelines.' },
    bestPractices: { score: 96, note: 'At 96, the site follows most technical best practices well — the main outlier is a serious shortfall in security headers that leaves visitors\' data exposed.' },
    seo:           { score: 91,           note: 'An SEO score of 91 is solid on paper, but without real-world Core Web Vitals data registered with Google, rankings may be suppressed — Google can\'t reward a site it hasn\'t been able to fully measure.' },
  },

  diagnosisFindings: [
    { stat: '3.8MB', title: 'The page is far too heavy', body: 'At 3.8MB, the Barlow Cars homepage is carrying far more data than it needs to — most well-optimised sites of this type come in under 1MB. On a typical mobile connection, this adds several seconds to the load time before a visitor even sees the page. In a market where someone is deciding in seconds whether to get a valuation from you or a competitor, every extra second costs you.' },
    { stat: '73 / 100', title: 'Mobile performance is holding back conversions', body: 'Google\'s own data shows that 53% of mobile users abandon a site that takes more than 3 seconds to load. With a mobile performance score of 73, Barlow Cars is almost certainly crossing that threshold for a significant share of visitors. Most car sellers browsing on their phone will simply go elsewhere without ever filling in the valuation form.' },
    { stat: '1 of 6', title: 'Security headers are almost entirely missing', body: 'Only 1 of 6 standard security headers are in place on this site. These headers are the basic protections that tell browsers how to handle your site safely — without them, visitors are more exposed to data interception and the site appears untrustworthy to security-conscious browsers. It also signals to Google that the site\'s security hygiene is poor, which can affect rankings.' },
    { stat: '63 / 100', title: 'Accessibility failures affect real customers — and carry legal risk', body: 'An accessibility score of 63 means the site is likely failing on contrast ratios, missing alt text, or lacking proper label structure — the kind of issues that make the site genuinely difficult to use for people with visual or cognitive impairments. Under the Equality Act 2010, UK businesses have a duty to ensure their digital presence is accessible, and failing that opens the door to complaints and reputational damage.' },
    { stat: 'No data', title: 'Google has no Core Web Vitals data for this site', body: 'Core Web Vitals are the real-world speed and experience scores Google uses to rank sites — and for Barlow Cars, there\'s no data registered at all. This typically means not enough visitors are reaching the site for Google to build a picture, which suggests organic visibility is lower than it should be. Without this data, the site is essentially invisible in one of Google\'s key ranking signals.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Fix what\'s losing you leads right now',
      bullets: ['Compress and properly format all images on the homepage to bring the 3.8MB page weight below 1MB and cut mobile load time dramatically', 'Implement the 5 missing security headers to protect visitors and remove a red flag that both Google and security-aware browsers are picking up on', 'Add structured data markup for the business address and contact details so Google can display Barlow Cars correctly in local search results'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Build a site that earns trust automatically',
      bullets: ['Resolve the accessibility failures dragging the score down to 63 — fix colour contrast, form labels, and missing image descriptions', 'Connect the site to Google\'s Search Console and ensure enough traffic is being driven to generate Core Web Vitals field data, unlocking a key Google ranking signal', 'Integrate Google Reviews schema so star ratings appear directly in search results, giving Barlow Cars instant credibility before anyone clicks', 'Audit and tighten the valuation form flow to reduce friction — ensure it works flawlessly on mobile where most visitors will be completing it'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn the website into a 24/7 lead machine',
      bullets: ['Create dedicated local landing pages targeting nearby towns and search terms like \'sell my car in Sheffield\' or \'car buyer near me\' to capture more organic traffic', 'Add a review generation workflow that automatically prompts sellers to leave a Google review after a successful collection and payment', 'Deploy follow-up automation to re-engage anyone who filled in the valuation form but didn\'t confirm — a timed SMS or email sequence can recover a meaningful share of these lost leads'],
    },
  ],

  prognosisRows: [
    { today: '3.8MB homepage takes several seconds to load on mobile', after: 'Page loads in under 1.5 seconds after image compression and optimisation', why: 'Reducing page weight is the single fastest way to improve mobile load time and stop visitors bouncing before they see the valuation form' },
    { today: 'Only 1 of 6 security headers present — site flagged as under-secured', after: 'All 6 headers in place, site passes security checks cleanly', why: 'Security headers take hours to implement and immediately remove a trust and compliance risk that affects both visitors and Google\'s assessment of the site' },
    { today: 'No address or reviews visible in Google search results', after: 'Business address and star rating appear in search listings via structured data', why: 'Adding schema markup for local business details and reviews directly improves click-through rates from search without changing rankings' },
    { today: 'Accessibility score of 63 — site hard to use for many visitors, legal exposure exists', after: 'Accessibility score above 85 — site usable for all visitors, legal risk removed', why: 'Most accessibility fixes are quick code changes that immediately improve usability and bring the site in line with UK legal expectations' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'Barlow Cars already has a chatbot in place — we can audit and optimise it to ensure it\'s actively capturing valuation enquiries outside business hours rather than just sitting idle on the page.' },
    { title: 'Lead automation', description: 'Every valuation request submitted through the site can trigger an instant, personalised follow-up sequence — so no lead goes cold waiting for a manual response.' },
    { title: 'Data entry automation', description: 'When a seller submits their reg number, mileage, and contact details, that data can flow automatically into a CRM or spreadsheet without anyone typing a thing.' },
    { title: 'Image optimisation', description: 'The site\'s 3.8MB page weight is almost certainly dominated by uncompressed images — we strip that down to under 1MB without any visible quality loss.' },
    { title: 'Security hardening', description: 'We implement the 5 missing headers — including X-Frame-Options, X-Content-Type-Options, and Referrer-Policy — to bring the site from 1 of 6 to a full pass.' },
    { title: 'SEO & content', description: 'Barlow Cars has no location-specific landing pages beyond Chesterfield — we create content targeting nearby cities like Sheffield, Dronfield, and Mansfield to capture more regional search traffic.' },
  ],

  aiRecommendations: [
    { tool: 'AI Voice Agent', impact: 'high', why: 'Barlow Cars is a one-person or small-team operation taking inbound enquiries by phone — an AI voice agent ensures that every call from a seller trying to book a valuation is answered instantly, even when Simon is out on a collection or unavailable, so no deal is lost to voicemail.' },
    { tool: 'Follow-up Automation', impact: 'high', why: 'Car sellers comparing offers will fill in multiple valuation forms at once — an automated follow-up sequence triggered within minutes of a Barlow Cars submission keeps the business front of mind and dramatically increases the chance of converting that enquiry before a competitor does.' },
    { tool: 'Review Generation', impact: 'quick-win', why: 'Barlow Cars has no Google Reviews visible in its schema despite clearly having satisfied customers — an automated post-sale review request sent by SMS after every completed car purchase would quickly build a public rating that drives trust and local search visibility.' },
    { tool: 'AI Content & SEO', impact: 'medium', why: 'The site currently targets Chesterfield but misses the far larger search volumes in surrounding areas like Sheffield and Mansfield — AI-generated local landing pages for each town would expand organic reach without requiring ongoing manual content work.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['PHP', 'MySQL', 'Hostinger CDN'],
  },
}
