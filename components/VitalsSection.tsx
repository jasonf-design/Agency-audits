'use client'

import { useEffect, useRef } from 'react'
import type { ClientData, CoreVital, VitalStatus } from '@/lib/types'
import InfoTip from './InfoTip'

const STATUS_LABEL: Record<VitalStatus, string> = {
  'good':       'Good',
  'needs-work': 'Needs work',
  'poor':       'Poor',
  'no-data':    'No data',
}

const STATUS_STYLE: Record<VitalStatus, { bg: string; color: string }> = {
  'good':       { bg: 'var(--good)',  color: '#fff' },
  'needs-work': { bg: 'var(--bad)',   color: '#fff' },
  'poor':       { bg: 'var(--bad)',   color: '#fff' },
  'no-data':    { bg: '#4a423a',      color: '#c9c0b2' },
}

const VITAL_CARD_STYLE: Record<VitalStatus, React.CSSProperties> = {
  'good':       { border: '1px solid var(--good)',  background: 'var(--ink-soft)' },
  'needs-work': { border: '1px solid var(--bad)',   background: 'linear-gradient(180deg, rgba(209,67,67,0.12), transparent)' },
  'poor':       { border: '1px solid var(--bad)',   background: 'linear-gradient(180deg, rgba(209,67,67,0.12), transparent)' },
  'no-data':    { border: '1px solid #3a332c',      background: 'var(--ink-soft)' },
}

interface VitalMeta {
  friendlyName: string
  tipTitle: string
  tipBody: string
}

const VITAL_META: Record<CoreVital['metric'], VitalMeta> = {
  LCP: {
    friendlyName: 'Main content loads',
    tipTitle:     'How fast the page fully appears',
    tipBody:      "Measures how long the main content — usually the big image or headline — takes to appear. Google wants this under 2.5 seconds. Slower than that and patients start to wonder if the site is broken.",
  },
  TTFB: {
    friendlyName: 'Server responds',
    tipTitle:     'How quickly the server wakes up',
    tipBody:      "The time from the moment a patient clicks a link to when the server starts sending back the page. If this is slow, everything else is slow — like a receptionist taking 2 minutes to pick up the phone before the conversation can start.",
  },
  FCP: {
    friendlyName: 'Something appears',
    tipTitle:     'When anything first shows on screen',
    tipBody:      "How long before the patient sees anything at all — even a loading indicator. If this takes too long, most people assume the site is down and press back.",
  },
  CLS: {
    friendlyName: 'Page stays steady',
    tipTitle:     'Whether the page jumps around',
    tipBody:      "Measures how much the page shifts while it's loading. A score of 0 is perfect — nothing moves. A high score means a patient tries to tap a button and misses because it jumped out from under their finger.",
  },
  INP: {
    friendlyName: 'Responds to taps',
    tipTitle:     'How fast the page reacts',
    tipBody:      "Measures the delay between a patient tapping something and the page responding. A sluggish response feels like the site is ignoring them.",
  },
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

interface VitalsSectionProps {
  data: Pick<ClientData, 'coreVitalsPass' | 'coreVitals'>
}

export default function VitalsSection({ data }: VitalsSectionProps) {
  const { coreVitalsPass, coreVitals } = data
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--stone)', padding: '74px 0' }}>
      <div className="wrap">
        <div style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.12em', color: '#a89e8e', marginBottom: 14 }}>
          01 · Speed test
        </div>
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 38px)', maxWidth: 640, marginBottom: 14, letterSpacing: '-0.01em' }}>
          Real patients, real mobile phones, real result.
        </h2>
        <p style={{ maxWidth: 600, color: '#c9c0b2', fontSize: 17, marginBottom: 8 }}>
          This isn't a lab estimate — it's Google's own record of what actual visitors experienced on their phones over the last 28 days.
        </p>
        <p style={{ maxWidth: 600, color: '#8a8074', fontSize: 14, fontFamily: 'var(--font-mono)', marginBottom: 44 }}>
          Tap the <strong style={{ color: '#c9c0b2' }}>?</strong> on any metric to see what it means in plain English.
        </p>

        <RevealDiv>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: coreVitalsPass ? 'var(--good)' : 'var(--bad)',
            color: '#fff',
            fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 14,
            padding: '8px 16px', borderRadius: 100, marginBottom: 36,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
            Google speed assessment: {coreVitalsPass ? 'PASSED' : 'FAILED'}
            <InfoTip
              light
              term="Core Web Vitals"
              title="Google's official speed scorecard"
              body="Google runs three specific speed tests and uses the results to decide where to rank websites in search results. Failing this assessment pushes the site further down in Google — meaning patients searching 'dentist Sheffield' are less likely to find it."
            />
          </div>
        </RevealDiv>

        <RevealDiv style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 14,
        }}>
          {coreVitals.map((v) => {
            const meta = VITAL_META[v.metric]
            return (
              <div key={v.metric} style={{ borderRadius: 12, padding: '20px 16px', ...VITAL_CARD_STYLE[v.status] }}>
                {/* Friendly name + info button */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#c9c0b2', lineHeight: 1.3, fontFamily: 'var(--font-space)', fontWeight: 500 }}>
                    {meta.friendlyName}
                  </div>
                  <InfoTip light term={v.metric} title={meta.tipTitle} body={meta.tipBody} />
                </div>
                {/* Technical acronym */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6a6058', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  {v.metric}
                </div>
                {/* Value */}
                <div style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 26 }}>
                  {v.displayValue}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 8,
                  display: 'inline-block', padding: '3px 8px', borderRadius: 5,
                  ...STATUS_STYLE[v.status],
                }}>
                  {STATUS_LABEL[v.status]}
                </span>
              </div>
            )
          })}
        </RevealDiv>
      </div>
    </section>
  )
}
