import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'
import SingleOpenDetails from '@/components/SingleOpenDetails'
import { constructMetadata, PAGE_SEO } from './seo'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata = constructMetadata(PAGE_SEO.home)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ScrollReveal />
        <SingleOpenDetails />
        {children}
      </body>
    </html>
  )
}

