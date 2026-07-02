import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, Newsreader } from 'next/font/google'
import './globals.css'
import { AGENCY_NAME, AGENCY_DOMAIN } from '@/lib/brand'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: `Website Check-Up — ${AGENCY_NAME}`,
  description: `Digital audit reports by ${AGENCY_DOMAIN}`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}>
        {children}
      </body>
    </html>
  )
}
