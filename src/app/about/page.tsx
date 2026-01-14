'use client'

import Link from 'next/link'
import { Heart, Target, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import SplitText from '@/components/ui/SplitText'

const values = [
  {
    name: 'Fairness',
    description:
      'Keine versteckten Gebühren, keine Marketplace-Provisionen. Was du siehst ist was du zahlst.',
    icon: Heart,
  },
  {
    name: 'Fokus',
    description:
      'Wir bauen genau das was Studios wirklich brauchen. Nicht mehr, nicht weniger.',
    icon: Target,
  },
  {
    name: 'Geschwindigkeit',
    description:
      'Schnelle Software, schneller Support, schnelle Weiterentwicklung.',
    icon: Zap,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[50vh] flex items-center">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <SplitText
              text="Über Bookicorn"
              tag="h1"
              className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl"
              delay={30}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Wir glauben dass Studio-Management einfach, fair und erschwinglich
              sein sollte.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text)]">
            Unsere Mission
          </h2>
          <div className="mt-6 space-y-6 text-lg text-[var(--theme-textSecondary)]">
            <p>
              Bookicorn entstand aus einer einfachen Frustration: Bestehende
              Studio-Management-Tools waren entweder zu teuer, zu kompliziert
              oder beides.
            </p>
            <p>
              Wir haben gesehen wie Studios bis zu 25% ihrer Einnahmen an
              Marketplace-Gebühren verlieren. Wie sie in 12-Monats-Verträgen
              gefangen sind. Wie sie Features bezahlen die sie nie nutzen.
            </p>
            <p>
              Also haben wir Bookicorn gebaut. Eine Plattform die genau das
              bietet was Studios brauchen - nicht mehr, nicht weniger. Ohne
              versteckte Gebühren, ohne lange Bindung, ohne Kompromisse.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[var(--theme-surface)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text)]">
              Unsere Werte
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <value.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <dt className="mt-6 text-xl font-semibold text-[var(--theme-text)]">
                    {value.name}
                  </dt>
                  <dd className="mt-4 text-base text-[var(--theme-textSecondary)]">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text)]">
              In Zahlen
            </h2>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center rounded-2xl bg-[var(--theme-surface)] p-8">
              <dt className="text-sm text-[var(--theme-textSecondary)]">Studios</dt>
              <dd className="mt-2 text-4xl font-bold text-[var(--theme-text)]">100+</dd>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-[var(--theme-surface)] p-8">
              <dt className="text-sm text-[var(--theme-textSecondary)]">Buchungen/Monat</dt>
              <dd className="mt-2 text-4xl font-bold text-[var(--theme-text)]">50k+</dd>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-[var(--theme-surface)] p-8">
              <dt className="text-sm text-[var(--theme-textSecondary)]">Uptime</dt>
              <dd className="mt-2 text-4xl font-bold text-[var(--theme-text)]">99.9%</dd>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-[var(--theme-surface)] p-8">
              <dt className="text-sm text-[var(--theme-textSecondary)]">Support-Antwort</dt>
              <dd className="mt-2 text-4xl font-bold text-[var(--theme-text)]">&lt;24h</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bereit loszulegen?
            <br />
            <span className="text-primary-200">Teste Bookicorn kostenlos.</span>
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link href="https://app.bookicorn.com/auth/studio-register">
              <Button variant="secondary" size="lg">
                Kostenlos starten
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
