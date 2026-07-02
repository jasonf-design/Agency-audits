import { AGENCY_DOMAIN } from '@/lib/brand'

interface SiteFooterProps {
  reportDate: string
}

export default function SiteFooter({ reportDate }: SiteFooterProps) {
  const formatted = new Date(reportDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
  return (
    <footer style={{ background: 'var(--ink)', color: '#8a8074', padding: '40px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>{AGENCY_DOMAIN}</div>
        <div>Check-up run {formatted} · Google PageSpeed Insights, mobile</div>
      </div>
    </footer>
  )
}
