import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/lib/theme-context'
import CookieConsentWrapper from '@/components/cookies/CookieConsentWrapper'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://manager.bookicorn.net'),
  title: {
    default: 'Bookicorn für Studios - Die moderne Kursplattform',
    template: '%s | Bookicorn für Studios',
  },
  description:
    'Verwalte Kurse, Buchungen und Credits für dein Studio. Die moderne Alternative zu Eversports - ohne Marketplace-Gebühren.',
  keywords: [
    'Yoga Studio Software',
    'Fitness Studio Software',
    'Kursbuchung',
    'Studio Management',
    'Eversports Alternative',
    'Credit System',
    'Pilates Software',
  ],
  authors: [{ name: 'Bookicorn' }],
  creator: 'Bookicorn',
  publisher: 'Bookicorn',
  icons: {
    icon: [
      { url: '/bookicorn-icon.svg', type: 'image/svg+xml' },
      { url: '/bookicorn-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/bookicorn-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://manager.bookicorn.net',
    siteName: 'Bookicorn für Studios',
    title: 'Bookicorn für Studios - Die moderne Kursplattform',
    description:
      'Verwalte Kurse, Buchungen und Credits für dein Studio. Die moderne Alternative zu Eversports.',
    images: [
      {
        url: '/bookicorn-logo.png',
        width: 1200,
        height: 630,
        alt: 'Bookicorn - Studio Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bookicorn für Studios - Die moderne Kursplattform',
    description: 'Verwalte Kurse, Buchungen und Credits für dein Studio.',
    images: ['/bookicorn-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://manager.bookicorn.net',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Preconnect to Sanity CDN for faster image loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://m2fpcq3b.apicdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://m2fpcq3b.apicdn.sanity.io" />
        {/* Calendly Widget */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" async />
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CookieConsentWrapper>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CookieConsentWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
