export type Grade = 'A+' | 'A' | 'A-' | 'B' | 'C' | 'D' | 'F'

export type VitalStatus = 'good' | 'needs-work' | 'poor' | 'no-data'

export interface HeroMeta {
  primary: string
  secondary: string
}

export interface ReportCardItem {
  label: string
  grade: Grade
}

export interface CoreVital {
  metric: 'LCP' | 'TTFB' | 'FCP' | 'CLS' | 'INP'
  displayValue: string
  status: VitalStatus
}

export interface LighthouseScore {
  score: number
  note: string
}

export interface DiagnosisFinding {
  stat: string
  title: string
  body: string
}

export interface TreatmentPhase {
  phaseLabel: string
  title: string
  bullets: string[]
}

export interface PrognosisRow {
  today: string
  after: string
  why: string
}

export interface ServiceItem {
  title: string
  description: string
}

export interface TechStack {
  cms: string | null
  hosting: string | null
  other: string[]
}

export interface ClientData {
  slug: string
  businessName: string
  url: string
  reportDate: string

  territory: string
  referredBy: string

  heroHeadline: {
    before: string
    emphasis: string
  }
  heroSubheading: string
  heroMeta: HeroMeta[]

  reportCard: ReportCardItem[]

  coreVitalsPass: boolean
  coreVitals: [
    CoreVital & { metric: 'LCP' },
    CoreVital & { metric: 'TTFB' },
    CoreVital & { metric: 'FCP' },
    CoreVital & { metric: 'CLS' },
    CoreVital & { metric: 'INP' },
  ]

  lighthouse: {
    performance: LighthouseScore
    accessibility: LighthouseScore
    bestPractices: LighthouseScore
    seo: LighthouseScore
  }

  diagnosisFindings: DiagnosisFinding[]

  treatmentPlan: [TreatmentPhase, TreatmentPhase, TreatmentPhase]

  prognosisRows: PrognosisRow[]

  services: ServiceItem[]

  techStack: TechStack
}

export interface TerritoryData {
  slug: string
  name: string
  repName: string
  repEmail: string
  repPhone: string | null
  introBl: string
}

export interface AttributionEntry {
  slug: string
  businessName: string
  url: string
  territory: string
  referredBy: string
  dateGenerated: string
}
