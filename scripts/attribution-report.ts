#!/usr/bin/env tsx
/**
 * Usage:
 *   npm run attribution-report
 *   npm run attribution-report -- --territory="East Midlands"
 */

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import type { AttributionEntry } from '../lib/types'

const filterTerritory = process.argv.find((a) => a.startsWith('--territory='))?.split('=').slice(1).join('=')

const logPath = resolve(process.cwd(), 'data', 'attribution-log.json')

if (!existsSync(logPath)) {
  console.log('No attribution log found yet. Run npm run generate to create the first entry.')
  process.exit(0)
}

const entries: AttributionEntry[] = JSON.parse(readFileSync(logPath, 'utf-8'))

const filtered = filterTerritory
  ? entries.filter((e) => e.territory.toLowerCase() === filterTerritory.toLowerCase())
  : entries

if (filtered.length === 0) {
  console.log(filterTerritory
    ? `No entries found for territory: "${filterTerritory}"`
    : 'Attribution log is empty.')
  process.exit(0)
}

// Group by territory → rep
const byTerritory: Record<string, Record<string, AttributionEntry[]>> = {}
for (const e of filtered) {
  byTerritory[e.territory]              ??= {}
  byTerritory[e.territory][e.referredBy] ??= []
  byTerritory[e.territory][e.referredBy].push(e)
}

const line = '─'.repeat(60)

console.log(`\n${line}`)
console.log('  ATTRIBUTION REPORT' + (filterTerritory ? ` — ${filterTerritory}` : ' — ALL TERRITORIES'))
console.log(`  Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`)
console.log(line)

for (const [territory, byRep] of Object.entries(byTerritory)) {
  console.log(`\nTERRITORY: ${territory}`)
  for (const [rep, repEntries] of Object.entries(byRep)) {
    console.log(`  Rep: ${rep} — ${repEntries.length} audit${repEntries.length !== 1 ? 's' : ''} generated`)
    for (const e of repEntries) {
      console.log(`    • ${e.businessName || e.slug}  (${e.url})  —  ${e.dateGenerated}`)
    }
  }
}

console.log(`\n${line}`)
console.log(`  Total audits: ${filtered.length}`)
console.log(`  Note: this log records audit generation only. Whether an audit converted`)
console.log(`  to a paying client is tracked separately in billing/invoicing.`)
console.log(`${line}\n`)
