import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allClients } from '@/lib/clients'
import { AGENCY_NAME } from '@/lib/brand'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import VitalsSection from '@/components/VitalsSection'
import LighthouseSection from '@/components/LighthouseSection'
import DiagnosisSection from '@/components/DiagnosisSection'
import TreatmentPlanSection from '@/components/TreatmentPlanSection'
import PrognosisSection from '@/components/PrognosisSection'
import ServicesSection from '@/components/ServicesSection'
import AiRecommendationsSection from '@/components/AiRecommendationsSection'
import CtaSection from '@/components/CtaSection'
import SiteFooter from '@/components/SiteFooter'

export async function generateStaticParams() {
  return allClients.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const client = allClients.find((c) => c.slug === slug)
  if (!client) return {}
  return {
    title: `${client.businessName} — Website Check-Up · ${AGENCY_NAME}`,
    description: `Digital audit report for ${client.businessName} by ${AGENCY_NAME}.`,
  }
}

export default async function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const client = allClients.find((c) => c.slug === slug)
  if (!client) notFound()

  const ctaSubject = `${client.businessName} website check-up`

  return (
    <>
      <Nav ctaSubject={ctaSubject} />
      <HeroSection data={client} />
      <VitalsSection data={client} />
      <LighthouseSection data={client} />
      <DiagnosisSection data={client} />
      <TreatmentPlanSection data={client} />
      <PrognosisSection data={client} />
      <ServicesSection data={client} />
      <AiRecommendationsSection data={client} />
      <CtaSection businessName={client.businessName} />
      <SiteFooter reportDate={client.reportDate} />
    </>
  )
}
