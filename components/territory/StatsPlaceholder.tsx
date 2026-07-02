// Future home of rep performance stats pulled from the attribution log:
// audits generated, confirmed conversions, revenue share earned.
// The attribution log exists (data/attribution-log.json) but has no conversion
// data yet — wire this up once billing/invoicing is tracked alongside it.
export default function StatsPlaceholder() {
  return (
    <section style={{ padding: '56px 0', borderTop: '1px solid var(--stone-line)' }}>
      <div className="wrap">
        <div style={{
          fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: 13,
          letterSpacing: '0.12em', color: 'var(--orange-dim)', marginBottom: 14,
        }}>
          Rep performance
        </div>
        <div style={{
          background: 'var(--warn-bg)', border: '1px solid #e8cf9d', borderRadius: 10,
          padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#7a5a13',
        }}>
          Conversion and revenue-share data will appear here once billing is linked to the attribution log.
          The audit trail is already being recorded — this panel just needs that second data source.
        </div>
      </div>
    </section>
  )
}
