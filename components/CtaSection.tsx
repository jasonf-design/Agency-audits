import { AGENCY_EMAIL, AGENCY_CTA_BODY } from '@/lib/brand'

interface CtaSectionProps {
  businessName: string
}

export default function CtaSection({ businessName }: CtaSectionProps) {
  const subject = encodeURIComponent(`${businessName} website check-up`)
  return (
    <section id="cta" style={{ background: 'var(--orange)', color: 'var(--ink)', textAlign: 'center', padding: '88px 0' }}>
      <div className="wrap">
        <h2 style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16, letterSpacing: '-0.01em' }}>
          Ready for the treatment plan?
        </h2>
        <p style={{ maxWidth: 520, margin: '0 auto 32px', fontSize: 18, color: '#3a1c0e' }}>
          One short call to confirm the baseline — enquiry volume, current analytics — and we'll scope Phase 1 with a fixed cost and timeline.
        </p>
        <a
          href={`mailto:${AGENCY_EMAIL}?subject=${subject}`}
          style={{
            display: 'inline-block',
            background: 'var(--ink)',
            color: 'var(--stone)',
            fontFamily: 'var(--font-space)',
            fontWeight: 600,
            padding: '16px 34px',
            borderRadius: 100,
            textDecoration: 'none',
            fontSize: 16,
          }}
        >
          {AGENCY_CTA_BODY}
        </a>
      </div>
    </section>
  )
}
