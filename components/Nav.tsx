import Link from 'next/link'
import { AGENCY_NAME, AGENCY_EMAIL, AGENCY_CTA_NAV } from '@/lib/brand'

interface NavProps {
  ctaSubject?: string
}

export default function Nav({ ctaSubject = 'Website check-up' }: NavProps) {
  const href = `mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(ctaSubject)}`
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(237,231,221,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--stone-line)',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px' }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-space)',
          fontWeight: 700,
          fontSize: 19,
          letterSpacing: '-0.02em',
          textDecoration: 'none',
          color: 'var(--ink)',
        }}>
          {AGENCY_NAME}<span style={{ color: 'var(--orange)' }}>.</span>
        </Link>
        <a href={href} style={{
          background: 'var(--ink)',
          color: 'var(--stone)',
          fontFamily: 'var(--font-space)',
          fontWeight: 600,
          fontSize: 14,
          padding: '10px 18px',
          borderRadius: 100,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          {AGENCY_CTA_NAV}
        </a>
      </div>
    </nav>
  )
}
