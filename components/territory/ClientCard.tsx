import Link from 'next/link'
import type { ClientData } from '@/lib/types'
import { gradeColour } from '@/lib/grading'

const GRADE_COLOR: Record<ReturnType<typeof gradeColour>, string> = {
  green:  '#1F7A43',
  yellow: '#A66B14',
  red:    '#C13030',
}

interface ClientCardProps {
  client: ClientData
}

export default function ClientCard({ client }: ClientCardProps) {
  const perfItem = client.reportCard.find((r) => r.label === 'Performance')
  const perfGrade = perfItem?.grade ?? '?'
  const colour = perfItem ? GRADE_COLOR[gradeColour(perfItem.grade)] : 'var(--ink-soft)'

  const formatted = new Date(client.reportDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <Link href={`/clients/${client.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{
        background: '#fff',
        border: '1px solid var(--stone-line)',
        borderRadius: 14,
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 16,
        transition: 'border-color 0.2s',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 18, marginBottom: 6 }}>
            {client.businessName}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)' }}>
            {client.url.replace(/^https?:\/\//, '')} · Audited {formatted}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 28, color: colour }}>
            {perfGrade}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Performance
          </div>
        </div>
      </div>
    </Link>
  )
}
