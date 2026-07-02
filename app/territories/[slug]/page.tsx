import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allTerritories, getClientsByTerritory } from '@/lib/clients'
import { AGENCY_NAME } from '@/lib/brand'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import TerritoryHero from '@/components/territory/TerritoryHero'
import ClientCard from '@/components/territory/ClientCard'
import StatsPlaceholder from '@/components/territory/StatsPlaceholder'

export async function generateStaticParams() {
  return allTerritories.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const territory = allTerritories.find((t) => t.slug === slug)
  if (!territory) return {}
  return {
    title: `${territory.name} — Territory Hub · ${AGENCY_NAME}`,
    description: `Audit reports for the ${territory.name} territory, managed by ${territory.repName}.`,
  }
}

export default async function TerritoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const territory = allTerritories.find((t) => t.slug === slug)
  if (!territory) notFound()

  const clients = getClientsByTerritory(territory.name)
  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <Nav />
      <TerritoryHero territory={territory} clientCount={clients.length} />

      <section style={{ padding: '0 0 74px' }}>
        <div className="wrap">
          <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: 'var(--orange-dim)', marginBottom: 24 }}>
            Check-ups in this territory
          </div>
          {clients.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
              No audits generated yet for this territory.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {clients.map((c) => (
                <ClientCard key={c.slug} client={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      <StatsPlaceholder />
      <SiteFooter reportDate={today} />
    </>
  )
}
