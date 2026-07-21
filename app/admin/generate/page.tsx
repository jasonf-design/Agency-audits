'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { AGENCY_NAME } from '@/lib/brand'

interface AuditResult {
  slug: string
  url: string
  reportDate: string
  pagesScanned: string[]
  perPageScores: Array<{ url: string; scores: { performance: number; accessibility: number; bestPractices: number; seo: number } | null }>
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

const VITAL_FRIENDLY: Record<string, { name: string; plain: string }> = {
  LCP:  { name: 'Main content loads',  plain: 'How fast the big image or headline appears. Under 2.5s = good.' },
  TTFB: { name: 'Server responds',     plain: 'Time before the server starts sending data. Slow TTFB drags everything else down.' },
  FCP:  { name: 'Something appears',   plain: 'When anything first shows on screen. Long gap → visitors assume the site is broken.' },
  CLS:  { name: 'Page stays steady',   plain: 'Whether elements jump around while loading. 0 is perfect.' },
  INP:  { name: 'Responds to taps',    plain: 'Delay between tapping a button and the page reacting.' },
}

function GeneratePage() {
  const [url, setUrl]           = useState('')
  const [name, setName]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [phase, setPhase]       = useState('')
  const [result, setResult]     = useState<AuditResult | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [copied, setCopied]     = useState(false)
  const [pageReady, setPageReady] = useState(false)
  const textareaRef             = useRef<HTMLTextAreaElement>(null)
  const pollRef                 = useRef<ReturnType<typeof setInterval> | null>(null)
  const leadIdRef               = useRef<string | null>(null)

  useEffect(() => {
    const params  = new URLSearchParams(window.location.search)
    const company = params.get('company')
    const website = params.get('website')
    const leadId  = params.get('leadId')
    if (company) setName(company)
    if (website) setUrl(website)
    if (leadId)  leadIdRef.current = leadId
  }, [])

  function slugify(n: string) {
    return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function normaliseUrl(raw: string): string {
    const trimmed = raw.trim()
    if (!trimmed) return trimmed
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return `https://${trimmed}`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url || !name) return
    const normUrl = normaliseUrl(url)
    if (normUrl !== url) setUrl(normUrl)
    setLoading(true)
    setResult(null)
    setError(null)
    setCopied(false)

    const slug = slugify(name)
    setPhase('Step 1 of 3 — Running Google speed test (20–60 seconds)…')

    try {
      const params = new URLSearchParams({ url: normUrl, slug, name })
      const res = await fetch(`/api/audit?${params}`)
      setPhase('Step 2 of 3 — Writing report with AI…')
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data: AuditResult = await res.json()
      setResult(data)
      setPageReady(false)

      // Save audit_slug back to the pipeline record if launched from a lead
      if (data.published && leadIdRef.current) {
        fetch('/api/leads/pipeline', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ companyId: leadIdRef.current, audit_slug: data.slug, stage: 'audited' }),
        }).catch(() => {})
      }

      // Poll every 5s until Vercel's rebuild is done and the page returns 200
      if (data.published && data.publishedUrl) {
        if (pollRef.current) clearInterval(pollRef.current)
        pollRef.current = setInterval(async () => {
          try {
            const check = await fetch(`/api/check-page?url=${encodeURIComponent(data.publishedUrl!)}`)
            const { ready } = await check.json()
            if (ready) {
              setPageReady(true)
              clearInterval(pollRef.current!)
            }
          } catch { /* still building */ }
        }, 5000)
      }
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
            Enter the business URL and we'll pull the data from Google automatically.
            You'll get a ready-to-use data file with everything that could be automated already filled in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 14, padding: 28, border: '1px solid var(--stone-line)', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              {label('Business website URL *')}
              {input({ type: 'text', value: url, onChange: (e) => setUrl(e.target.value), placeholder: 'eko19.com', required: true })}
            </div>
            <div>
              {label('Business name *')}
              {input({ type: 'text', value: name, onChange: (e) => setName(e.target.value), placeholder: 'Barlow Cars', required: true })}
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

            {/* Pages scanned */}
            {result.pagesScanned && result.pagesScanned.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid var(--stone-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 12 }}>
                  Pages scanned ({result.pagesScanned.length})
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {result.perPageScores.map((p) => {
                    const path = (() => { try { return new URL(p.url).pathname || '/' } catch { return p.url } })()
                    const s = p.scores
                    return (
                      <div key={p.url} style={{ background: 'var(--stone)', borderRadius: 8, padding: '10px 14px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)', marginBottom: s ? 8 : 0 }}>
                          {path}
                        </p>
                        {s ? (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                            {[
                              { label: 'Perf', val: s.performance },
                              { label: 'A11y', val: s.accessibility },
                              { label: 'BP',   val: s.bestPractices },
                              { label: 'SEO',  val: s.seo },
                            ].map(({ label, val }) => (
                              <div key={label} style={{ textAlign: 'center' }}>
                                <div style={{
                                  fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 18,
                                  color: val >= 90 ? '#1F7A43' : val >= 50 ? '#A66B14' : '#C13030',
                                }}>{val}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>{label}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C13030' }}>scan failed</p>
                        )}
                      </div>
                    )
                  })}
                </div>
                {result.lighthouse && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', marginTop: 12 }}>
                    Scores below show the worst result across all pages scanned.
                  </p>
                )}
              </div>
            )}

            {/* Scores */}
            {result.lighthouse && (
              <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid var(--stone-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 16 }}>
                  Lighthouse scores (mobile — worst across all pages)
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {result.coreVitals.map((v) => {
                    const meta = VITAL_FRIENDLY[v.metric]
                    return (
                      <div key={v.metric} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <StatusDot status={v.status} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                            <span style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>
                              {meta?.name ?? v.metric}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)' }}>{v.metric}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginLeft: 'auto' }}>{v.displayValue}</span>
                          </div>
                          {meta && (
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', marginTop: 2, lineHeight: 1.5 }}>
                              {meta.plain}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
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

            {/* Back to lead link — shown when audit was launched from a pipeline lead */}
            {leadIdRef.current && (
              <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#555' }}>
                  Audit linked to pipeline record. Stage set to Audited.
                </div>
                <Link href={`/admin/leads/${leadIdRef.current}`} style={{
                  background: '#7c3aed22', border: '1px solid #7c3aed44', color: '#a78bfa',
                  fontFamily: 'var(--font-space)', fontSize: 13, padding: '8px 14px',
                  borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap',
                }}>
                  ← Back to lead
                </Link>
              </div>
            )}

            {/* Published confirmation */}
            {result.published && result.publishedUrl ? (
              <div style={{ background: 'var(--good)', borderRadius: 14, padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{pageReady ? '✓' : '⏳'}</div>
                <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 10 }}>
                  {pageReady ? 'Report live' : 'Building…'}
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
                  {pageReady
                    ? 'Your report is ready. Click below to open it.'
                    : 'Vercel is rebuilding — the button will appear automatically when it\'s live.'}
                </p>
                {pageReady && (
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
                )}
                {result.alreadyExisted && pageReady && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                    This client already existed — the report was updated in place.
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

export default function AdminGeneratePage() {
  return (
    <Suspense>
      <GeneratePage />
    </Suspense>
  )
}
