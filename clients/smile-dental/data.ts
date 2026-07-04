import type { ClientData } from '@/lib/types'

export const data: ClientData = {
  slug: 'smile-dental',
  businessName: 'Smile Dental',
  url: 'https://smile-dentalcare.co.uk/',
  reportDate: '2026-07-04',

  territory: 'East Midlands',
  referredBy: 'James Allen',

  heroHeadline: {
    before:   'Multi-location practice.\nWebsite needs ',
    emphasis: 'urgent attention',
  },
  heroSubheading: 'We ran smile-dentalcare.co.uk through Google\'s own diagnostic tools and found a practice operating across 40+ UK locations — with a website that\'s actively turning away the patients it should be winning. The technical issues below are costing Smile Dental real appointments every single day.',
  heroMeta: [
    { primary: 'smile-dentalcare.co.uk', secondary: 'TODO: trading since' },
    { primary: 'NHS & Private — Multi-site Group', secondary: 'General, Cosmetic & Specialist' },
    { primary: '2 of 3', secondary: 'Booking widget & contact form live' },
  ],

  reportCard: [
    { label: 'Performance',      grade: 'F' },
    { label: 'Core Web Vitals',  grade: 'F'  },
    { label: 'Lead capture',     grade: 'A' },
    { label: 'Security headers', grade: 'F'  },
    { label: 'Accessibility',    grade: 'B' },
    { label: 'Best practices',   grade: 'A-'   },
    { label: 'On-page SEO',      grade: 'A-'  },
    { label: 'Reputation',       grade: 'B'  },
  ],

  coreVitalsPass: false,
  coreVitals: [
    { metric: 'LCP', displayValue: '3.5s', status: 'needs-work' },
    { metric: 'TTFB', displayValue: '1.5s', status: 'needs-work' },
    { metric: 'FCP', displayValue: '3.0s', status: 'poor' },
    { metric: 'CLS', displayValue: '1.00', status: 'good' },
    { metric: 'INP', displayValue: '91ms', status: 'good' },
  ],

  lighthouse: {
    performance:   { score: 45,   note: 'A mobile performance score of 45 out of 100 is a failing grade — over 1MB of JavaScript and 214KB of CSS is loading on every page visit that the site never actually uses, directly inflating load times for patients on their phones.' },
    accessibility: { score: 87, note: 'Scoring 87 means some users — including those with visual impairments or screen readers — are likely hitting barriers that could also be flagged as compliance issues for a healthcare provider.' },
    bestPractices: { score: 92, note: 'At 92, the site follows most modern web standards, but with zero security headers in place, the remaining gaps are significant enough to undermine patient trust and browser safety warnings.' },
    seo:           { score: 92,           note: 'An SEO score of 92 looks strong on paper, but it means nothing if the page loads too slowly for Google to rank it — Core Web Vitals failures directly suppress search rankings regardless of on-page SEO.' },
  },

  diagnosisFindings: [
    { stat: '45 / 100', title: 'Mobile performance is failing', body: 'Nearly half of all web traffic in the UK happens on mobile phones — and Google scores your site at just 45 out of 100 on mobile performance. That means patients searching for a dentist on their lunch break are waiting far too long for your site to load, and most of them will leave before it does. Every second of delay reduces the chance someone books an appointment.' },
    { stat: '10.4MB', title: 'The page is too heavy to load quickly', body: 'Your homepage is carrying 10.4MB of data — that\'s roughly the size of 10 high-resolution photos loading every time someone visits. On a typical mobile connection, this creates a sluggish, frustrating experience before a patient has even read a single word about your practice. Trimming this down to under 3MB would make an immediate, noticeable difference.' },
    { stat: '3.0s FCP', title: 'Patients see a blank screen for 3 seconds', body: 'First Contentful Paint — the moment anything visible appears on screen — is 3.0 seconds, rated \'poor\' by Google. For context, research consistently shows that 53% of mobile users abandon a site that takes longer than 3 seconds to load. Your site is right on that cliff edge, and the 3.5-second LCP means the main content arrives even later than that.' },
    { stat: '0 of 6', title: 'No security headers are in place', body: 'Your site has none of the six standard HTTP security headers that modern websites use to protect visitors. For a healthcare provider collecting patient contact details and booking requests, this is a serious concern — it leaves the site exposed to certain types of attack and may trigger warnings in security-conscious browsers. It also signals to Google that the site isn\'t following current best practices.' },
    { stat: 'Not found', title: 'Google can\'t see your address or reviews in the page data', body: 'Neither your practice address nor your Google Reviews are embedded in the site\'s structured data — the behind-the-scenes code that Google reads to populate search results, map listings, and star ratings. With 40+ locations, this is a significant missed opportunity: local patients searching for a nearby dentist are far less likely to find Smile Dental prominently in local search results.' },
  ],

  treatmentPlan: [
    {
      phaseLabel: 'Phase 1 — Stop the leak',
      title: 'Cut load time and fix what\'s costing you patients today',
      bullets: ['Remove or defer the 1,004KB of unused JavaScript that\'s adding over a second to every page load', 'Strip out the 214KB of unused CSS bloating the homepage and slowing the first visible render', 'Compress and properly size images to bring the 10.4MB page weight down to an acceptable level', 'Implement the six missing HTTP security headers to protect patient data and pass browser security checks'],
    },
    {
      phaseLabel: 'Phase 2 — Fix the foundations',
      title: 'Build the trust signals Google and patients are looking for',
      bullets: ['Add structured data (schema markup) for each practice location so Google can surface your address, phone number, and opening hours in search results', 'Embed Google Reviews schema on location pages so star ratings appear directly in search results — for a multi-site group this is a major credibility driver', 'Rewrite the page title to remove the awkward duplication (\'Smile Dental Care\' appears twice) and the vague \'Best High Quality\' claim, which Google discounts', 'Update the meta description to include location-specific hooks that match what local patients are actually searching for'],
    },
    {
      phaseLabel: 'Phase 3 — Grow the funnel',
      title: 'Turn more visitors into booked appointments',
      bullets: ['Deploy a 24/7 AI chatbot to handle after-hours enquiries across all locations — a group this size will have patients trying to book outside business hours every night of the week', 'Automate follow-up for incomplete bookings and contact form submissions so no lead goes cold without a response', 'Build location-specific landing pages optimised for high-value treatments (implants, clear aligners, cosmetic) in each of your key regions to capture patients searching locally'],
    },
  ],

  prognosisRows: [
    { today: 'Mobile performance score of 45 — site loads slowly and frustrates visitors before they\'ve read a word', after: 'Target score of 75+ after JavaScript, CSS, and image optimisation', why: 'Removing over 1MB of unused code and compressing the 10.4MB page directly cuts load time for real visitors' },
    { today: 'First Contentful Paint of 3.0s rated \'poor\' — patients see a blank screen long enough to leave', after: 'FCP below 1.8s, moving into the \'good\' threshold Google rewards with higher rankings', why: 'Deferring unused scripts means the visible page content loads first, without waiting for background code to finish' },
    { today: 'Zero security headers — patient data is unprotected and browsers may flag the site as unsafe', after: 'All 6 standard security headers in place, passing browser and Google security checks', why: 'Security headers are a simple server-side configuration change with an immediate and complete fix' },
    { today: 'No address or review data in structured schema — Google can\'t show star ratings or location details in search results', after: 'Rich results appearing in Google search for each location, including stars, address, and phone number', why: 'Adding LocalBusiness schema for each of your 40+ sites gives Google exactly what it needs to feature them prominently in local searches' },
  ],

  services: [
    { title: '24/7 chatbot', description: 'With practices stretching from Cornwall to Aberdeen, Smile Dental has patients trying to enquire and book outside of any single team\'s working hours — a trained AI chatbot captures those leads the moment they land on the site, day or night.' },
    { title: 'Lead automation', description: 'Smile Dental already has a booking widget and contact form live, but without automated follow-up, any enquiry that doesn\'t convert immediately is likely going cold — automation ensures every submission gets a timely, personalised response without adding to reception workload.' },
    { title: 'Data entry automation', description: 'Across 40+ locations, manual handling of patient enquiries, form submissions, and appointment data is a significant administrative burden — automation can route, log, and action incoming data without staff having to touch it.' },
    { title: 'Image optimisation', description: 'Your homepage is currently loading 10.4MB of data on every visit — professional image compression and next-generation formatting alone could cut that by 60–70%, delivering an immediate improvement in real-world load speed.' },
    { title: 'Security hardening', description: 'Smile Dental\'s site currently has none of the six standard HTTP security headers in place — we implement all of them (including Content-Security-Policy, X-Frame-Options, and HSTS) to protect patient data and meet modern healthcare web standards.' },
    { title: 'SEO & content', description: 'Despite covering 40+ locations and a full range of NHS, private, and specialist treatments, the site lacks local structured data and location-specific content — we create the schema markup and targeted landing pages that put each practice in front of patients searching nearby.' },
  ],

  techStack: {
    cms:     'WordPress',
    hosting: null,
    other:   ['Elementor', 'PHP', 'MySQL', 'Apache HTTP Server'],
  },
}
