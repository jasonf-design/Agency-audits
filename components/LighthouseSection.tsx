'use client'

import { useEffect, useRef } from 'react'
import type { ClientData } from '@/lib/types'
import InfoTip from './InfoTip'

function scoreColour(score: number): string {
  if (score >= 90) return 'var(--good)'
  if (score >= 50) return 'var(--warn)'
  return 'var(--bad)'
}

interface GaugeMeta {
  label: string
  tipTerm: string
  tipTitle: string
  tipBody: string
}

const GAUGE_META: GaugeMeta[] = [
  {
    label:    'Speed score',
    tipTerm:  'Performance',
    tipTitle: 'How fast the page loads overall',
    tipBody:  "A single number from 0 to 100 summing up everything about how fast — or slow — the page is. Google's benchmark: 90+ is good, below 50 is a serious problem. Most patients are on a phone with a typical mobile connection.",
  },
  {
    label:    'Usability',
    tipTerm:  'Accessibility',
    tipTitle: 'How usable it is for everyone',
    tipBody:  "Checks whether the site works for patients who use screen readers, have visual impairments, navigate by keyboard, or rely on assistive technology. It also covers colour contrast — can older patients read the text comfortably?",
  },
  {
    label:    'Technical health',
    tipTerm:  'Best Practices',
    tipTitle: 'Whether the site follows modern web standards',
    tipBody:  "Checks for things browsers and search engines expect to see: secure connections, no errors in the console, no outdated code. Issues here don't always affect patients directly but they do signal to Google that the site is well-maintained.",
  },
  {
    label:    'Google-readability',
    tipTerm:  'SEO',
    tipTitle: 'How well search engines can read the page',
    tipBody:  "Checks whether the page is structured in a way Google can understand — page titles, descriptions, headings, links. A high score here means Google can read the site; it doesn't mean Google ranks it highly, though — that's also affected by speed and content.",
  },
]

interface LighthouseSectionProps {
  data: Pick<ClientData, 'lighthouse'>
}

export default function LighthouseSection({ data }: LighthouseSectionProps) {
  const { lighthouse } = data
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

  const scores = [
    lighthouse.performance,
    lighthouse.accessibility,
    lighthouse.bestPractices,
    lighthouse.seo,
  ]

  return (
    <section style={{ padding: '74px 0' }}>
      <div className="wrap">
        <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: 'var(--orange-dim)', marginBottom: 14 }}>
          02 · Google's full check-up
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 14, letterSpacing: '-0.01em' }}>
          Four tests, scored out of 100.
        </h2>
        <p style={{ maxWidth: 600, color: 'var(--ink-soft)', fontSize: 17, marginBottom: 44 }}>
          Run on a mobile phone with a typical connection — the same conditions most of their patients are actually browsing in.
        </p>

        <div ref={ref} className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {scores.map((s, i) => {
            const meta = GAUGE_META[i]
            return (
              <div key={meta.tipTerm} style={{
                background: '#fff',
                border: '1px solid var(--stone-line)',
                borderRadius: 14,
                padding: '26px 20px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-space)',
                  fontWeight: 700,
                  fontSize: 44,
                  lineHeight: 1,
                  color: scoreColour(s.score),
                }}>
                  {s.score}
                </div>
                {/* Friendly name */}
                <div style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {meta.label}
                  <InfoTip term={meta.tipTerm} title={meta.tipTitle} body={meta.tipBody} />
                </div>
                {/* Technical name */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', opacity: 0.5, marginTop: 4 }}>
                  {meta.tipTerm}
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 10, lineHeight: 1.5 }}>
                  {s.note}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
