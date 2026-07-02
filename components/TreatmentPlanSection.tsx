'use client'

import { useEffect, useRef } from 'react'
import type { ClientData } from '@/lib/types'

interface TreatmentPlanSectionProps {
  data: Pick<ClientData, 'treatmentPlan'>
}

export default function TreatmentPlanSection({ data }: TreatmentPlanSectionProps) {
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

  return (
    <section style={{ padding: '74px 0' }}>
      <div className="wrap">
        <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: 'var(--orange-dim)', marginBottom: 14 }}>
          04 · Treatment plan
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 14, letterSpacing: '-0.01em' }}>
          Where we'd start, and why.
        </h2>
        <p style={{ maxWidth: 600, color: 'var(--ink-soft)', fontSize: 17, marginBottom: 44 }}>
          Three phases, ordered by impact and how fast they pay off — not by what's easiest for us to build.
        </p>

        <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {data.treatmentPlan.map((phase, i) => (
            <div key={i} style={{
              background: 'var(--ink-soft)',
              borderRadius: 14,
              padding: '28px 24px',
              borderTop: '3px solid var(--orange)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {phase.phaseLabel}
              </div>
              <h4 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 21, marginBottom: 14, color: 'var(--stone)' }}>
                {phase.title}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {phase.bullets.map((b, j) => (
                  <li key={j} style={{
                    fontSize: 15,
                    color: '#c9c0b2',
                    padding: '10px 0 10px 22px',
                    position: 'relative',
                    borderTop: j === 0 ? 'none' : '1px solid #3a332c',
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
