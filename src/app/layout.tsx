import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/lib/theme-context'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bookicorn.com'),
  title: {
    default: 'Bookicorn - Die Kursplattform für Yoga & Fitness Studios',
    template: '%s | Bookicorn',
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
  ],
  authors: [{ name: 'Bookicorn' }],
  creator: 'Bookicorn',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.bookicorn.com',
    siteName: 'Bookicorn',
    title: 'Bookicorn - Die Kursplattform für Yoga & Fitness Studios',
    description:
      'Verwalte Kurse, Buchungen und Credits für dein Studio. Die moderne Alternative zu Eversports.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bookicorn - Studio Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bookicorn - Die Kursplattform für Yoga & Fitness Studios',
    description: 'Verwalte Kurse, Buchungen und Credits für dein Studio.',
    images: ['/og-image.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
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
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
