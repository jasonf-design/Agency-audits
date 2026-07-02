'use client'

import { useState, useEffect, useRef } from 'react'

interface InfoTipProps {
  term: string    // technical name shown small, e.g. "LCP"
  title: string   // plain-English label, e.g. "How fast the main content loads"
  body: string    // fuller plain-English explanation
  light?: boolean // true = dark text on light background (for use on dark sections)
}

export default function InfoTip({ term, title, body, light = false }: InfoTipProps) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() }
    }
    function handleClick(e: MouseEvent) {
      if (!btnRef.current?.contains(e.target as Node) && !popRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Explain: ${term}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: `1.5px solid ${light ? 'rgba(255,255,255,0.35)' : 'rgba(20,16,13,0.25)'}`,
          background: 'transparent',
          color: light ? 'rgba(255,255,255,0.6)' : 'rgba(20,16,13,0.45)',
          fontSize: 11,
          fontFamily: 'var(--font-space)',
          fontWeight: 700,
          cursor: 'pointer',
          flexShrink: 0,
          lineHeight: 1,
          padding: 0,
          transition: 'border-color 0.15s, color 0.15s',
        }}
      >
        ?
      </button>

      {open && (
        <div
          ref={popRef}
          role="dialog"
          aria-label={`Explanation: ${term}`}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 10,
            width: 280,
            background: '#fff',
            border: '1px solid var(--stone-line)',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: '0 8px 28px rgba(20,16,13,0.18)',
            zIndex: 200,
            color: 'var(--ink)',
          }}
        >
          {/* Arrow */}
          <span style={{
            position: 'absolute',
            bottom: -7,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: 12,
            height: 12,
            background: '#fff',
            border: '1px solid var(--stone-line)',
            borderTop: 'none',
            borderLeft: 'none',
          }} />

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--orange-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            {term}
          </p>
          <p style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 15, marginBottom: 8, lineHeight: 1.3 }}>
            {title}
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
            {body}
          </p>
        </div>
      )}
    </span>
  )
}
