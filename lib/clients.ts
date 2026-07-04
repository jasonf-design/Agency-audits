import type { ClientData, TerritoryData } from './types'
import { data as confidental } from '@/clients/confidental/data'
import { data as deepcarDental } from '@/clients/deepcar-dental/data'
import { data as deepcar } from '@/clients/deepcar/data'
import { data as eastMidlands } from '@/territories/east-midlands'

// ── Client registry ───────────────────────────────────────────────────────────
// Add one import + one entry here when a new client data file is created.
export const allClients: ClientData[] = [
  confidental,
  deepcarDental,
  deepcar,
]

// ── Territory registry ────────────────────────────────────────────────────────
export const allTerritories: TerritoryData[] = [
  eastMidlands,
]

export function getClientsByTerritory(territoryName: string): ClientData[] {
  return allClients.filter(
    (c) => c.territory.toLowerCase() === territoryName.toLowerCase(),
  )
}
