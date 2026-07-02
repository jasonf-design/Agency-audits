import type { TerritoryData } from '@/lib/types'

interface TerritoryHeroProps {
  territory: TerritoryData
  clientCount: number
}

export default function TerritoryHero({ territory, clientCount }: TerritoryHeroProps) {
  return (
    <header style={{ padding: '76px 0 56px' }}>
      <div className="wrap">
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'var(--orange-dim)', marginBottom: 18,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 26, height: 1, background: 'var(--orange)', display: 'inline-block', flexShrink: 0 }} />
          Territory hub · {territory.name}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-space)', fontWeight: 600,
          fontSize: 'clamp(34px, 5.2vw, 52px)', lineHeight: 1.06,
          maxWidth: 720, marginBottom: 22, letterSpacing: '-0.01em',
        }}>
          {territory.name}
        </h1>

        <p style={{ fontSize: 19, maxWidth: 600, color: 'var(--ink-soft)', marginBottom: 36 }}>
          {territory.introBl}
        </p>

        <div style={{
          display: 'flex', gap: 28, flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)',
          borderTop: '1px solid var(--stone-line)', paddingTop: 20,
        }}>
          <div>
            <strong style={{ color: 'var(--ink)', display: 'block', fontSize: 14, fontFamily: 'var(--font-space)' }}>
              {territory.repName}
            </strong>
            Territory rep
          </div>
          <div>
            <strong style={{ color: 'var(--ink)', display: 'block', fontSize: 14, fontFamily: 'var(--font-space)' }}>
              {territory.repEmail}
            </strong>
            Rep contact
          </div>
          <div>
            <strong style={{ color: 'var(--ink)', display: 'block', fontSize: 14, fontFamily: 'var(--font-space)' }}>
              {clientCount}
            </strong>
            Audits generated
          </div>
        </div>
      </div>
    </header>
  )
}
