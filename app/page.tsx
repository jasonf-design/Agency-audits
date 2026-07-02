import Link from 'next/link'
import { allClients } from '@/lib/clients'
import { AGENCY_NAME } from '@/lib/brand'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '60px 28px' }}>
      <div className="wrap">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--orange-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24 }}>
          {AGENCY_NAME} — Audit reports
        </p>
        <h1 style={{ fontFamily: 'var(--font-space)', fontSize: 36, marginBottom: 40 }}>
          Client check-ups
        </h1>
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/admin/generate"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--orange)', color: '#fff',
              fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 14,
              padding: '12px 22px', borderRadius: 100, textDecoration: 'none',
            }}
          >
            + Run a new audit
          </Link>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {allClients.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/clients/${c.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  background: '#fff',
                  border: '1px solid var(--stone-line)',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-space)',
                  fontWeight: 600,
                }}
              >
                <span>{c.businessName}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)' }}>
                  {c.reportDate} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
