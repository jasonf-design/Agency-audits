'use client'

import { useEffect, useRef } from 'react'
import type { ClientData } from '@/lib/types'

const IMPACT_META: Record<string, { label: string; colour: string }> = {
  high:       { label: 'High Impact',  colour: '#f97316' },
  'quick-win': { label: 'Quick Win',   colour: '#22c55e' },
  medium:     { label: 'Medium',       colour: '#a855f7' },
}

const TOOL_ICONS: Record<string, string> = {
  'AI Voice Agent':        '📞',
  'AI Web Chat':           '💬',
  'Lead Qualification':    '🎯',
  'Appointment Reminders': '🔔',
  'Review Generation':     '⭐',
  'Follow-up Automation':  '↩',
  'AI Content & SEO':      '✍',
}

interface Props {
  data: Pick<ClientData, 'businessName' | 'aiRecommendations'>
}

export default function AiRecommendationsSection({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); io.disconnect() } },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const recs = data.aiRecommendations ?? []
  if (recs.length === 0) return null

  return (
    <section style={{ background: 'var(--ink)', color: 'var(--stone)', padding: '74px 0' }}>
      <div className="wrap">
        <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: '#a89e8e', marginBottom: 14 }}>
          07 · AI strategy
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 14, letterSpacing: '-0.01em' }}>
          What AI can do for {data.businessName} right now.
        </h2>
        <p style={{ maxWidth: 600, color: '#c9c0b2', fontSize: 17, marginBottom: 44 }}>
          Ranked by return — the tools that generate enquiries, reduce admin, and recover lost leads within 90 days.
        </p>

        <div ref={ref} className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(recs.length, 2)}, 1fr)`,
          gap: 16,
        }}>
          {recs.map((rec, i) => {
            const impact = IMPACT_META[rec.impact] ?? IMPACT_META.medium
            const icon = TOOL_ICONS[rec.tool] ?? '⚡'
            return (
              <div key={i} style={{
                background: '#1a1a1a',
                border: `1px solid #2a2a2a`,
                borderRadius: 14,
                padding: '28px 26px',
                borderTop: `3px solid ${impact.colour}`,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: impact.colour, background: impact.colour + '1a',
                    border: `1px solid ${impact.colour}44`,
                    padding: '3px 9px', borderRadius: 6,
                  }}>
                    {impact.label}
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 19, marginBottom: 10, color: '#fff' }}>
                  {rec.tool}
                </h4>
                <p style={{ fontSize: 15, color: '#c9c0b2', lineHeight: 1.6 }}>
                  {rec.why}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
