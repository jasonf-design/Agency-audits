# Agency Audits

Digital check-up reports for local businesses, built with Next.js App Router and deployed on Vercel.

Each client gets a personalised audit page at `/clients/[slug]`. Territory hubs live at `/territories/[slug]`. Adding a new client is one data file; no template editing required.

---

## For the non-technical team

### Running the report generator

**Before you start:** make sure `.env.local` exists in the project folder (copy `.env.local.example` and fill in the API keys — ask the technical team if you don't have them).

Open a terminal in the project folder and run:

```bash
npm run generate -- --url=https://example-dental.co.uk --slug=example-dental \
  --territory="East Midlands" --referredBy="James Allen"
```

- `--url` — the practice website (required)
- `--slug` — a short URL-safe name, lowercase, hyphens only (required)
- `--territory` — the sales territory name, e.g. `"East Midlands"` (defaults to `"direct"` if omitted)
- `--referredBy` — the rep who introduced this lead, e.g. `"James Allen"` (defaults to `"direct"` if omitted)

The script will call Google PageSpeed and WhatCMS automatically, then write a data file at `clients/[slug]/data.ts`.

### What to fill in manually after running the generator

At the end of the run, the script prints a list of fields that still need a human. At minimum:

| Field | Where to find it |
|-------|-----------------|
| `businessName` | The practice's trading name |
| `heroHeadline` | Write a 2-line headline — the `emphasis` word renders in orange |
| `heroSubheading` | 1–2 sentences referencing the business name and Google reviews |
| `heroMeta` | Address, trading-since year, any notable credentials |
| `diagnosisFindings` | Use the printed opportunity list as a starting point; write the narrative |
| `treatmentPlan` bullets | Tailor Phase 1–3 to this specific practice |
| `prognosisRows` | 3–4 before/after/why rows |
| `services` descriptions | Keep the 6 titles; rewrite descriptions for this practice |
| `reportCard: Lead capture` | Count how many of these are live: booking widget, chatbot, contact form |
| `reportCard: Reputation` | Check Google Maps for rating and review count |

Then add one import line in `lib/clients.ts`:

```typescript
import { data as exampleDental } from '@/clients/example-dental/data'
// and add exampleDental to the allClients array
```

### Previewing the page locally

```bash
npm run dev
```

Then open [http://localhost:3000/clients/example-dental](http://localhost:3000/clients/example-dental) in your browser.

### Viewing the territory hub

```bash
# East Midlands territory hub
http://localhost:3000/territories/east-midlands
```

---

## Attribution report

To see all audits generated and by which rep:

```bash
npm run attribution-report
```

To filter by territory:

```bash
npm run attribution-report -- --territory="East Midlands"
```

This shows when each audit was generated and by which rep. It does **not** show which became paying clients — that link lives in billing/invoicing and is tracked separately. The log is the audit trail for crediting a rep with an introduction.

---

## Adding a new territory

1. Create `territories/[slug].ts` following the pattern in `territories/east-midlands.ts`
2. Import it in `lib/clients.ts` and add it to `allTerritories`
3. Tag client data files with the matching `territory:` value

---

## Deploying to Vercel

```bash
vercel deploy --prod
```

Or push to `main` — Vercel will build automatically if the project is connected.

---

## Project structure (quick reference)

```
clients/[slug]/data.ts     — one file per prospect; all client-specific data lives here
territories/[slug].ts      — territory data files (rep name, contact, blurb)
lib/brand.ts               — agency name, domain, email, CTA text (rebrand = one file)
lib/grading.ts             — score → letter grade conversion
lib/clients.ts             — registry: import new clients/territories here
data/attribution-log.json  — append-only audit trail (version-controlled)
scripts/generate-report.ts — runs PageSpeed + WhatCMS, writes the data file
```
