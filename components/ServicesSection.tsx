'use client'

import { useEffect, useRef } from 'react'
import type { ClientData } from '@/lib/types'

interface ServicesSectionProps {
  data: Pick<ClientData, 'services'>
}

export default function ServicesSection({ data }: ServicesSectionProps) {
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
          06 · What we'd handle
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 14, letterSpacing: '-0.01em' }}>
          The full scope of work.
        </h2>
        <p style={{ maxWidth: 600, color: 'var(--ink-soft)', fontSize: 17, marginBottom: 44 }}>
          Same approach we've already built and proven for other clients — applied to this site and customer journey.
        </p>

        <div ref={ref} className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--stone-line)',
          border: '1px solid var(--stone-line)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {data.services.map((s, i) => (
            <div key={i} style={{ background: 'var(--stone)', padding: '28px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange-dim)', marginBottom: 10 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{s.title}</h4>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
