import type { Grade } from './types'

export function lighthouseGrade(score: number): Grade {
  if (score >= 100) return 'A+'
  if (score >= 95) return 'A'
  if (score >= 90) return 'A-'
  if (score >= 75) return 'B'
  if (score >= 60) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

export function coreVitalsGrade(pass: boolean | null): Grade {
  if (pass === null) return 'C'
  return pass ? 'A' : 'F'
}

export function securityHeadersGrade(presentCount: number): Grade {
  if (presentCount >= 6) return 'A+'
  if (presentCount >= 5) return 'A'
  if (presentCount >= 4) return 'A-'
  if (presentCount >= 3) return 'B'
  if (presentCount >= 2) return 'C'
  if (presentCount >= 1) return 'D'
  return 'F'
}

export function leadCaptureGrade(mechanismCount: number): Grade {
  if (mechanismCount >= 3) return 'A+'
  if (mechanismCount >= 2) return 'A'
  if (mechanismCount >= 1) return 'C'
  return 'F'
}

export function reputationGrade(rating: number, count: number): Grade {
  if (rating >= 4.8 && count >= 50) return 'A+'
  if (rating >= 4.5 && count >= 30) return 'A'
  if (rating >= 4.5) return 'A-'
  if (rating >= 4.0) return 'B'
  if (rating >= 3.5) return 'C'
  if (rating >= 3.0) return 'D'
  return 'F'
}

export function gradeColour(grade: Grade): 'green' | 'yellow' | 'red' {
  if (grade === 'A+' || grade === 'A' || grade === 'A-') return 'green'
  if (grade === 'B' || grade === 'C' || grade === 'D') return 'yellow'
  return 'red'
}
