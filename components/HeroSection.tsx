import type { ClientData } from '@/lib/types'
import ReportCard from './ReportCard'

interface HeroSectionProps {
  data: ClientData
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { heroHeadline, heroSubheading, heroMeta, businessName, url, reportDate } = data

  const formatted = new Date(reportDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
  const domain = url.replace(/^https?:\/\//, '')

  const headlineParts = heroHeadline.before.split('\n')

  return (
    <header style={{ padding: '76px 0 56px' }}>
      <div className="wrap">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--orange-dim)',
          marginBottom: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ width: 26, height: 1, background: 'var(--orange)', display: 'inline-block', flexShrink: 0 }} />
          Digital check-up · {domain} · {formatted}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-space)',
          fontWeight: 600,
          fontSize: 'clamp(34px, 5.2vw, 58px)',
          lineHeight: 1.04,
          maxWidth: 820,
          marginBottom: 22,
          letterSpacing: '-0.01em',
        }}>
          {headlineParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {part}
            </span>
          ))}
          <em style={{ fontStyle: 'normal', color: 'var(--orange-dim)' }}>{heroHeadline.emphasis}</em>
        </h1>

        <p style={{ fontSize: 19, maxWidth: 600, color: 'var(--ink-soft)', marginBottom: 36 }}>
          {heroSubheading}
        </p>

        <div style={{
          display: 'flex',
          gap: 28,
          flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: 'var(--ink-soft)',
          borderTop: '1px solid var(--stone-line)',
          paddingTop: 20,
        }}>
          {heroMeta.map((m, i) => (
            <div key={i}>
              <strong style={{ color: 'var(--ink)', display: 'block', fontSize: 14, fontFamily: 'var(--font-space)' }}>
                {m.primary}
              </strong>
              {m.secondary}
            </div>
          ))}
        </div>

        <ReportCard items={data.reportCard} patientLabel={`${businessName.toUpperCase()}: ${domain.toUpperCase()}`} />
      </div>
    </header>
  )
}
