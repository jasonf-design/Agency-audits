import type { ClientData, TerritoryData } from './types'
import { data as confidental } from '@/clients/confidental/data'
import { data as deepcarDental } from '@/clients/deepcar-dental/data'
import { data as deepcar } from '@/clients/deepcar/data'
import { data as smileDental } from '@/clients/smile-dental/data'
import { data as harleyPrivate } from '@/clients/harley-private/data'
import { data as harleyDental } from '@/clients/harley-dental/data'
import { data as albionSports } from '@/clients/albion-sports/data'
import { data as eko19 } from '@/clients/eko19/data'
import { data as s10Dental } from '@/clients/s10-dental/data'
import { data as barlowCars } from '@/clients/barlow-cars/data'
import { data as eastMidlands } from '@/territories/east-midlands'

// ── Client registry ───────────────────────────────────────────────────────────
// Add one import + one entry here when a new client data file is created.
export const allClients: ClientData[] = [
  confidental,
  deepcarDental,
  deepcar,
  smileDental,
  harleyPrivate,
  harleyDental,
  albionSports,
  eko19,
  s10Dental,
  barlowCars,
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
