import Link from 'next/link'
import { allClients } from '@/lib/clients'
import { AGENCY_NAME } from '@/lib/brand'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0e0e0e' }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 52, borderBottom: '1px solid #222',
        background: '#111', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 15, color: '#fff', textDecoration: 'none', letterSpacing: '-0.01em' }}>
            {AGENCY_NAME} <span style={{ color: 'var(--orange)', fontWeight: 400 }}>admin</span>
          </Link>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { href: '/admin/leads', label: 'Pipeline' },
              { href: '/admin/generate', label: 'New audit' },
              { href: '/', label: 'Reports' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: 'var(--font-space)', fontSize: 13, color: '#aaa',
                textDecoration: 'none', padding: '6px 12px', borderRadius: 6,
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '32px 28px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 26, color: '#fff', marginBottom: 4 }}>
              Audit reports
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666' }}>
              {allClients.length} report{allClients.length !== 1 ? 's' : ''} published
            </p>
          </div>
          <Link href="/admin/generate" style={{
            background: 'var(--orange)', color: '#fff',
            fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 13,
            padding: '10px 18px', borderRadius: 8, textDecoration: 'none',
          }}>
            + New audit
          </Link>
        </div>

        {allClients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'var(--font-space)', color: '#444', fontSize: 15, marginBottom: 16 }}>
              No reports yet.
            </p>
            <Link href="/admin/generate" style={{
              color: 'var(--orange)', fontFamily: 'var(--font-space)', fontSize: 14, textDecoration: 'none',
            }}>
              Run your first audit →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {allClients.map((c) => (
              <Link key={c.slug} href={`/clients/${c.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 10, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 15, color: '#fff' }}>
                    {c.businessName}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#555' }}>
                    {c.reportDate} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
