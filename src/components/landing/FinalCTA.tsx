'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-primary-600 uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                Jetzt starten
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--theme-text)] mb-4">
                Bereit für moderne Kursverwaltung?
              </h2>
              <p className="text-lg text-[var(--theme-textSecondary)] mb-8">
                Teste Bookicorn kostenlos und entdecke, wie einfach Studio-Management sein kann.
                Keine Kreditkarte erforderlich.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Kontakt aufnehmen
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="secondary" size="lg">
                    Mehr erfahren
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-8 border-t border-[var(--theme-border)]">
                <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--theme-textTertiary)]">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>14 Tage kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keine Kreditkarte</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>DSGVO-konform</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="hidden lg:block relative h-full min-h-[400px] bg-gradient-to-br from-primary-500/10 via-[#2D61F0]/10 to-[#A6D30F]/10">
              <Image
                src="/images/KursHub-Moderne-Kursplattform.png"
                alt="Bookicorn Dashboard"
                fill
                className="object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-surface)]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
