import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-code', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: 'Abdalrahman Alzoubi — Backend Developer & Software Engineer',
  description: 'Backend systems built for speed and scale. Explore Abdalrahman Alzoubi’s PHP and Laravel projects, real-time APIs, clean architecture, and engineering journey.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    title: 'Abdalrahman Alzoubi — Backend Developer & Software Engineer',
    description: 'Complex logic. Clean solutions. Explore systems engineered for speed, reliability, and scale.',
    images: [{ url: '/images/abdalrahman-alzoubi.png', width: 1670, height: 941, alt: 'Abdalrahman Alzoubi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdalrahman Alzoubi — Backend Developer',
    description: 'Complex logic. Clean solutions. Backend systems built for speed and scale.',
    images: ['/images/abdalrahman-alzoubi.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101011',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
