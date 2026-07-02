'use client'

import { useEffect, useRef } from 'react'
import type { ClientData } from '@/lib/types'

interface PrognosisSectionProps {
  data: Pick<ClientData, 'prognosisRows' | 'businessName'>
}

function RevealDiv({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className="reveal" style={style}>{children}</div>
}

export default function PrognosisSection({ data }: PrognosisSectionProps) {
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--stone)', padding: '74px 0' }}>
      <div className="wrap">
        <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: '#a89e8e', marginBottom: 14 }}>
          05 · Prognosis
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 14, letterSpacing: '-0.01em' }}>
          What good looks like.
        </h2>
        <p style={{ maxWidth: 600, color: '#c9c0b2', fontSize: 17, marginBottom: 44 }}>
          Planning estimates, not promises — a real baseline comes from a look at their analytics and enquiry volume, which we'd do in the first week of working together.
        </p>

        <RevealDiv style={{
          background: 'var(--warn-bg)',
          border: '1px solid #e8cf9d',
          borderRadius: 10,
          padding: '14px 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: '#7a5a13',
          marginBottom: 32,
        }}>
          These are illustrative, based on patterns from similar practices — not {data.businessName}'s measured traffic yet.
        </RevealDiv>

        <RevealDiv style={{ overflowX: 'auto', background: '#fff', borderRadius: 14, padding: '8px 8px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr>
                {['Today', 'After Phase 1', 'Why'].map((h) => (
                  <th key={h} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em',
                    textAlign: 'left', color: 'var(--ink-soft)', padding: '12px 14px',
                    borderBottom: '2px solid var(--ink)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.prognosisRows.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--stone-line)', verticalAlign: 'top', color: 'var(--ink)', fontWeight: 600, fontFamily: 'var(--font-space)' }}>
                    {row.today}
                  </td>
                  <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--stone-line)', verticalAlign: 'top', color: 'var(--ink)' }}>
                    {row.after}
                  </td>
                  <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--stone-line)', verticalAlign: 'top', color: 'var(--ink)' }}>
                    {row.why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealDiv>
      </div>
    </section>
  )
}
