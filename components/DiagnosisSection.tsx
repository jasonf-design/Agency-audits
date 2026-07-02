'use client'

import { useEffect, useRef } from 'react'
import type { ClientData } from '@/lib/types'

interface DiagnosisSectionProps {
  data: Pick<ClientData, 'diagnosisFindings'>
}

export default function DiagnosisSection({ data }: DiagnosisSectionProps) {
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
    <section style={{ background: 'var(--ink)', color: 'var(--stone)', padding: '74px 0' }}>
      <div className="wrap">
        <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: '#a89e8e', marginBottom: 14 }}>
          03 · Diagnosis
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 44, letterSpacing: '-0.01em' }}>
          What's actually slowing the patient down.
        </h2>

        <div ref={ref} className="reveal">
          {data.diagnosisFindings.map((f, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: 24,
              padding: '26px 0',
              borderTop: '1px solid var(--stone-line)',
              ...(i === data.diagnosisFindings.length - 1 ? { borderBottom: '1px solid var(--stone-line)' } : {}),
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 22, color: 'var(--orange)', lineHeight: 1.2 }}>
                {f.stat}
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 19, marginBottom: 6 }}>{f.title}</h4>
                <p style={{ color: '#c9c0b2', fontSize: 16 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
