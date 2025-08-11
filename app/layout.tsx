import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OmniBeat AI — Voice & Social Automations',
  description: 'Always on, always on-brand. Be reachable. Stay visible.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'OmniBeat AI — Voice & Social Automations',
    description: 'Always on, always on-brand. Be reachable. Stay visible.',
    url: 'https://omnibeat-site.vercel.app',
    siteName: 'OmniBeat AI',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniBeat AI — Voice & Social Automations',
    description: 'Always on, always on-brand. Be reachable. Stay visible.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
