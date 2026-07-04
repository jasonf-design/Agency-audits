'use client'

import { useEffect, useRef } from 'react'
import type { ReportCardItem } from '@/lib/types'
import { gradeColour } from '@/lib/grading'
import InfoTip from './InfoTip'

const GRADE_COLOR: Record<ReturnType<typeof gradeColour>, string> = {
  green:  '#7fd8a0',
  yellow: '#f0c674',
  red:    '#f28b82',
}

const CARD_TIPS: Record<string, { title: string; body: string }> = {
  'Performance': {
    title: 'Overall website speed score',
    body:  "A single number from 0 to 100 measuring how fast the page loads on a mobile phone. Google's benchmark: 90+ is good, below 50 is a serious problem. Slow sites rank lower and lose patients before the page even opens.",
  },
  'Core Web Vitals': {
    title: "Google's official speed test",
    body:  "Google runs three specific speed measurements and uses the results to decide where to rank websites in search results. A failing grade here directly hurts rankings on Google.",
  },
  'Lead capture': {
    title: 'Ways to capture a new patient enquiry',
    body:  "Counts how many ways a potential patient can get in touch without picking up the phone — online booking, a chatbot, a contact form. Every missing option is lost business outside office hours.",
  },
  'Security headers': {
    title: 'Protection against web attacks',
    body:  "Behind-the-scenes settings that protect the website and its visitors from common online threats. Invisible to patients, but browsers and Google both check for them.",
  },
  'Accessibility': {
    title: 'How usable it is for every patient',
    body:  "Checks whether the site works for patients who use screen readers, have visual impairments, or navigate by keyboard. Also covers colour contrast — can older patients read the text comfortably? Google factors this into rankings.",
  },
  'Best practices': {
    title: 'Following modern web standards',
    body:  "Whether the site uses up-to-date, secure, error-free code. Doesn't directly affect patients, but signals to Google and browsers that the site is trustworthy.",
  },
  'On-page SEO': {
    title: 'How well Google can read the site',
    body:  "Checks page titles, descriptions, headings and link structure. A high score means Google can understand the site — it doesn't guarantee top rankings, but it removes a barrier.",
  },
  'Reputation': {
    title: 'Google review rating and volume',
    body:  "Based on the practice's Google star rating and number of reviews. Strong reviews are one of the biggest factors in a patient choosing one dentist over another from a search results page.",
  },
}

interface ReportCardProps {
  items: ReportCardItem[]
  patientLabel: string
}

export default function ReportCard({ items, patientLabel }: ReportCardProps) {
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
    <div ref={ref} className="reveal" style={{
      marginTop: 44,
      background: 'var(--ink)',
      borderRadius: 18,
      padding: 36,
      color: 'var(--stone)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 16, right: 24,
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: '#a89e8e',
      }}>
        PATIENT: {patientLabel}
      </div>

      <div style={{ fontFamily: 'var(--font-space)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a89e8e', marginBottom: 22 }}>
        Report card — where they stand today
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        background: '#3a332c',
        borderRadius: 12,
      }}>
        {items.map((item, i) => {
          const colour = GRADE_COLOR[gradeColour(item.grade)]
          const tip = CARD_TIPS[item.label]
          const br = {
            borderTopLeftRadius:     i === 0                    ? 12 : 0,
            borderTopRightRadius:    i === 3                    ? 12 : 0,
            borderBottomLeftRadius:  i === items.length - 4     ? 12 : 0,
            borderBottomRightRadius: i === items.length - 1     ? 12 : 0,
          }
          return (
            <div key={item.label} style={{ background: 'var(--ink)', padding: '22px 16px', textAlign: 'center', ...br }}>
              <div style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 38, lineHeight: 1, color: colour }}>
                {item.grade}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#a89e8e', marginTop: 8,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}>
                {item.label}
                {tip && (
                  <InfoTip light term={item.label} title={tip.title} body={tip.body} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
