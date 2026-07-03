'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { AGENCY_NAME } from '@/lib/brand'

interface AuditResult {
  slug: string
  url: string
  reportDate: string
  lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number } | null
  coreVitals: Array<{ metric: string; displayValue: string; status: string }> | null
  coreVitalsPass: boolean | null
  totalPageWeightKb: number | null
  topOpportunities: Array<{ title: string; savingsKb: number | null; savingsMs: number | null }>
  techStack: { cms: string | null; hosting: string | null; other: string[] }
  secHeaders: { presentCount: number; present: string[] }
  published: boolean
  publishedUrl: string | null
  alreadyExisted: boolean
  errors: string[]
  dataFileContent: string
  manualTodos: string[]
}

function ScoreChip({ label, score }: { label: string; score: number }) {
  const colour = score >= 90 ? '#1F7A43' : score >= 50 ? '#A66B14' : '#C13030'
  return (
    <div style={{ background: '#fff', border: '1px solid var(--stone-line)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 32, color: colour }}>{score}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginTop: 6 }}>{label}</div>
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const colour = status === 'good' ? '#1F7A43' : status === 'no-data' ? '#8a8074' : '#C13030'
  return <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: colour, marginRight: 6, flexShrink: 0 }} />
}

export default function AdminGeneratePage() {
  const [url, setUrl]           = useState('')
  const [name, setName]         = useState('')
  const [territory, setTerritory] = useState('East Midlands')
  const [referredBy, setReferredBy] = useState('James Allen')
  const [loading, setLoading]   = useState(false)
  const [phase, setPhase]       = useState('')
  const [result, setResult]     = useState<AuditResult | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [copied, setCopied]     = useState(false)
  const textareaRef             = useRef<HTMLTextAreaElement>(null)

  function slugify(n: string) {
    return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url || !name) return
    setLoading(true)
    setResult(null)
    setError(null)
    setCopied(false)

    const slug = slugify(name)
    setPhase('Step 1 of 3 — Running Google speed test (20–60 seconds)…')

    try {
      const params = new URLSearchParams({ url, slug, name, territory, referredBy })
      const res = await fetch(`/api/audit?${params}`)
      setPhase('Step 2 of 3 — Writing report with AI…')
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data: AuditResult = await res.json()
      setResult(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
      setPhase('')
    }
  }

  function copyToClipboard() {
    if (!result) return
    navigator.clipboard.writeText(result.dataFileContent).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const label = (s: string) => (
    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 8 }}>
      {s}
    </label>
  )

  const input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      style={{
        display: 'block', width: '100%', padding: '12px 14px',
        border: '1px solid var(--stone-line)', borderRadius: 8,
        fontFamily: 'var(--font-space)', fontSize: 15, color: 'var(--ink)',
        background: '#fff', outline: 'none',
      }}
    />
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--stone)', padding: '48px 28px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange-dim)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ← Back to reports
          </Link>
          <h1 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 28, marginTop: 16, letterSpacing: '-0.01em' }}>
            {AGENCY_NAME} — Run a new audit
          </h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: 8, fontSize: 15 }}>
            Enter the practice URL and we'll pull the data from Google automatically.
            You'll get a ready-to-use data file with everything that could be automated already filled in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 14, padding: 28, border: '1px solid var(--stone-line)', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              {label('Practice website URL *')}
              {input({ type: 'url', value: url, onChange: (e) => setUrl(e.target.value), placeholder: 'https://example-dental.co.uk', required: true })}
            </div>
            <div>
              {label('Practice name *')}
              {input({ type: 'text', value: name, onChange: (e) => setName(e.target.value), placeholder: 'Example Dental', required: true })}
            </div>
            <div>
              {label('Territory')}
              {input({ type: 'text', value: territory, onChange: (e) => setTerritory(e.target.value), placeholder: 'East Midlands' })}
            </div>
            <div>
              {label('Referred by')}
              {input({ type: 'text', value: referredBy, onChange: (e) => setReferredBy(e.target.value), placeholder: 'James Allen' })}
            </div>
          </div>

          {name && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)', marginBottom: 20 }}>
              Slug: <strong style={{ color: 'var(--ink)' }}>{slugify(name)}</strong> → page will live at <strong>/clients/{slugify(name)}</strong>
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !url || !name}
            style={{
              background: loading ? '#8a8074' : 'var(--ink)',
              color: 'var(--stone)',
              fontFamily: 'var(--font-space)',
              fontWeight: 600,
              fontSize: 15,
              padding: '14px 28px',
              borderRadius: 100,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              width: '100%',
            }}
          >
            {loading ? '⏳ Running audit…' : 'Run audit →'}
          </button>

          {phase && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)', marginTop: 14, textAlign: 'center' }}>
              {phase}
            </p>
          )}
        </form>

        {error && (
          <div style={{ background: 'var(--bad-bg)', border: '1px solid var(--bad)', borderRadius: 10, padding: '16px 20px', color: 'var(--bad)', fontFamily: 'var(--font-mono)', fontSize: 14, marginBottom: 32 }}>
            ✗ {error}
          </div>
        )}

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* API errors (non-fatal) */}
            {result.errors.length > 0 && (
              <div style={{ background: 'var(--warn-bg)', border: '1px solid #e8cf9d', borderRadius: 10, padding: '14px 18px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--warn)', marginBottom: 8 }}>API warnings</p>
                {result.errors.map((e, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#7a5a13' }}>⚠ {e}</p>
                ))}
              </div>
            )}

            {/* Scores */}
            {result.lighthouse && (
              <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid var(--stone-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 16 }}>
                  Lighthouse scores (mobile)
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <ScoreChip label="Performance"    score={result.lighthouse.performance}   />
                  <ScoreChip label="Accessibility"  score={result.lighthouse.accessibility} />
                  <ScoreChip label="Best Practices" score={result.lighthouse.bestPractices} />
                  <ScoreChip label="SEO"            score={result.lighthouse.seo}           />
                </div>
                {result.totalPageWeightKb && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)', marginTop: 14 }}>
                    Total page weight: <strong style={{ color: 'var(--ink)' }}>{(result.totalPageWeightKb / 1024).toFixed(1)}MB</strong>
                  </p>
                )}
              </div>
            )}

            {/* Core vitals */}
            {result.coreVitals && (
              <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid var(--stone-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 4 }}>
                  Core Web Vitals (field data)
                </p>
                <p style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 14,
                  color: result.coreVitalsPass === true ? '#1F7A43' : result.coreVitalsPass === false ? '#C13030' : 'var(--ink-soft)',
                  marginBottom: 16,
                }}>
                  {result.coreVitalsPass === true ? '✓ PASSED' : result.coreVitalsPass === false ? '✗ FAILED' : '— No field data'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.coreVitals.map((v) => (
                    <div key={v.metric} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                      <StatusDot status={v.status} />
                      <span style={{ width: 44, color: 'var(--ink-soft)' }}>{v.metric}</span>
                      <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{v.displayValue}</span>
                      <span style={{ color: 'var(--ink-soft)', fontSize: 12 }}>{v.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            {(result.techStack.cms || result.techStack.hosting || result.techStack.other.length > 0) && (
              <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid var(--stone-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 12 }}>Tech stack</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {result.techStack.cms     && <p><span style={{ color: 'var(--ink-soft)' }}>CMS: </span><strong>{result.techStack.cms}</strong></p>}
                  {result.techStack.hosting && <p><span style={{ color: 'var(--ink-soft)' }}>Hosting: </span><strong>{result.techStack.hosting}</strong></p>}
                  {result.techStack.other.length > 0 && <p><span style={{ color: 'var(--ink-soft)' }}>Other: </span>{result.techStack.other.join(', ')}</p>}
                </div>
              </div>
            )}

            {/* Security headers */}
            {result.secHeaders.presentCount >= 0 && (
              <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid var(--stone-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 8 }}>Security headers</p>
                <p style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 15 }}>
                  {result.secHeaders.presentCount} of 6 present
                  {result.secHeaders.present.length > 0 && (
                    <span style={{ fontWeight: 400, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)', marginLeft: 12 }}>
                      ({result.secHeaders.present.join(', ')})
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Manual TODOs — only shown if automation failed */}
            {result.manualTodos.length > 0 && (
              <div style={{ background: 'var(--warn-bg)', border: '1px solid #e8cf9d', borderRadius: 14, padding: 24 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--warn)', marginBottom: 14 }}>
                  Action needed before the report is live
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.manualTodos.map((t, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#7a5a13', paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Published confirmation */}
            {result.published && result.publishedUrl ? (
              <div style={{ background: 'var(--good)', borderRadius: 14, padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 10 }}>
                  Report published
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
                  Report sent to Vercel — wait about 60 seconds then click the link below:
                </p>
                <a
                  href={result.publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: '#fff',
                    color: 'var(--good)',
                    fontFamily: 'var(--font-space)',
                    fontWeight: 700,
                    fontSize: 15,
                    padding: '14px 28px',
                    borderRadius: 100,
                    textDecoration: 'none',
                    marginBottom: 16,
                  }}
                >
                  Open report →
                </a>
                {result.alreadyExisted && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                    Note: this client already existed — the report was updated, not created fresh.
                  </p>
                )}
              </div>
            ) : (
              /* Fallback: GitHub not connected yet — show copy panel */
              <div style={{ background: 'var(--ink)', borderRadius: 14, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a89e8e' }}>
                    GitHub not connected — copy this file manually
                  </p>
                  <button
                    onClick={copyToClipboard}
                    style={{
                      background: copied ? 'var(--good)' : 'var(--orange)',
                      color: '#fff', border: 'none', borderRadius: 100,
                      fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 13,
                      padding: '8px 18px', cursor: 'pointer',
                    }}
                  >
                    {copied ? '✓ Copied!' : 'Copy to clipboard'}
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  readOnly
                  value={result.dataFileContent}
                  rows={20}
                  style={{
                    width: '100%', background: '#0d0a08', color: '#c9c0b2',
                    border: '1px solid #3a332c', borderRadius: 8, padding: '16px',
                    fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, resize: 'vertical',
                  }}
                />
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
