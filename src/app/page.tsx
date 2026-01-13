'use client'

import Link from 'next/link'
import {
  Calendar,
  CreditCard,
  Users,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Check,
  Star,
} from 'lucide-react'
import { RegisterButton } from '@/components/ui/CTAButton'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'

const features = [
  {
    name: 'Intelligentes Credit-System',
    description:
      'FIFO-basiertes Credit-Management mit flexiblen Aktivierungsmodi. Credits verfallen automatisch nach Ablaufdatum.',
    icon: CreditCard,
  },
  {
    name: 'Einfache Kursverwaltung',
    description:
      'Erstelle Kurse, Serien und Termine in Sekunden. Online- und Offline-Kurse werden vollständig unterstützt.',
    icon: Calendar,
  },
  {
    name: 'Trainer-Management',
    description:
      '3 flexible Verdienstmodelle: Stundensatz, Prozentsatz oder Pauschal. Automatische Abrechnung inklusive.',
    icon: Users,
  },
  {
    name: 'Umfassende Analytics',
    description:
      'Behalte den Überblick mit Echtzeit-Statistiken, Revenue-Charts und Health-Score für dein Studio.',
    icon: BarChart3,
  },
  {
    name: 'Blitzschnelle Performance',
    description:
      'Optimiert für Geschwindigkeit. Deine Kunden buchen Kurse in unter 3 Sekunden.',
    icon: Zap,
  },
  {
    name: 'Enterprise-Sicherheit',
    description:
      'Row-Level Security, verschlüsselte Zahlungen via Stripe, und DSGVO-konform.',
    icon: Shield,
  },
]

const testimonials = [
  {
    quote:
      'Bookicorn hat unsere Kursbuchung komplett revolutioniert. Das Credit-System ist genial!',
    author: 'Maria S.',
    role: 'Inhaberin, Yoga Studio München',
    rating: 5,
  },
  {
    quote:
      'Endlich eine Alternative ohne hohe Marketplace-Gebühren. Unsere Marge ist deutlich gestiegen.',
    author: 'Thomas K.',
    role: 'Geschäftsführer, CrossFit Box Berlin',
    rating: 5,
  },
  {
    quote:
      'Die Trainer-Abrechnung spart uns jeden Monat Stunden an Arbeit. Absolut empfehlenswert!',
    author: 'Sandra M.',
    role: 'Studio Managerin, Pilates & More',
    rating: 5,
  },
]

const comparisonPoints = [
  { feature: 'Marketplace-Gebühren', bookicorn: '0%', competitor: '25%' },
  { feature: 'Credit-Aktivierungsmodi', bookicorn: '4 Modi', competitor: '1 Modus' },
  { feature: 'Trainer-Verdienstmodelle', bookicorn: '3 Modelle', competitor: 'Add-on' },
  { feature: 'Custom Themes', bookicorn: '10+ Themes', competitor: 'Standard' },
  { feature: 'Widget Builder', bookicorn: 'Drag & Drop', competitor: 'iFrame' },
  { feature: 'Vertragsbindung', bookicorn: 'Keine', competitor: '12 Monate' },
]

export default function HomePage() {
  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero Section with LiquidEther Background */}
      <div className="relative isolate overflow-hidden min-h-[90vh] flex items-center">
        <LazyLiquidEther />

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 w-full">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center rounded-full bg-[var(--theme-surface)] px-4 py-1.5 text-sm font-medium text-primary-600 ring-1 ring-inset ring-primary-600/20 backdrop-blur-sm">
              <span className="mr-2">Neu</span>
              <span className="h-1 w-1 rounded-full bg-primary-600" />
              <span className="ml-2">Ohne Marketplace-Gebühren</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl">
              Die Kursplattform für{' '}
              <span className="gradient-text">moderne Studios</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Verwalte Kurse, Buchungen und Credits für dein Yoga, Fitness oder
              Wellness Studio. Ohne versteckte Gebühren, ohne lange Vertragsbindung.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <RegisterButton variant="primary" size="lg">
                Kostenlos starten
              </RegisterButton>
              <Link
                href="/features"
                className="group text-sm font-semibold leading-6 text-[var(--theme-text)] flex items-center gap-1"
              >
                Alle Features ansehen
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center justify-center gap-x-6 text-sm text-[var(--theme-textSecondary)]">
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-primary-500" />
                <span>Keine Kreditkarte nötig</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-primary-500" />
                <span>Setup in 5 Minuten</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-primary-500" />
                <span>DSGVO-konform</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Alles was du brauchst
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--theme-text)] sm:text-4xl">
            Funktionen die den Unterschied machen
          </p>
          <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
            Entwickelt für Studios die wachsen wollen. Ohne Kompromisse.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-[var(--theme-text)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-[var(--theme-textSecondary)]">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-[var(--theme-surface)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Vergleich
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--theme-text)] sm:text-4xl">
              Warum Studios zu Bookicorn wechseln
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-[var(--theme-border)] sm:mt-20 lg:mx-0 lg:flex lg:max-w-none bg-[var(--theme-background)]">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-[var(--theme-text)]">
                Der faire Vergleich
              </h3>
              <p className="mt-6 text-base leading-7 text-[var(--theme-textSecondary)]">
                Wir verstecken nichts. Hier siehst du wie wir im Vergleich zu anderen
                Anbietern abschneiden.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-primary-600">
                  Feature-Vergleich
                </h4>
                <div className="h-px flex-auto bg-[var(--theme-border)]" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--theme-textSecondary)] sm:grid-cols-2 sm:gap-6"
              >
                {comparisonPoints.map((point) => (
                  <li key={point.feature} className="flex gap-x-3">
                    <Check
                      className="h-6 w-5 flex-none text-primary-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-[var(--theme-text)]">{point.feature}:</strong> {point.bookicorn}{' '}
                      <span className="text-[var(--theme-textTertiary)]">vs. {point.competitor}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-[#09090b] py-10 text-center ring-1 ring-inset ring-white/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-300">
                    Spare bis zu
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      25%
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-300">
                      Gebühren
                    </span>
                  </p>
                  <div className="mt-10">
                    <RegisterButton variant="white" size="lg" className="w-full">
                      Jetzt wechseln
                    </RegisterButton>
                  </div>
                  <p className="mt-6 text-xs leading-5 text-gray-400">
                    Keine Vertragsbindung. Jederzeit kündbar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--theme-text)] sm:text-4xl">
              Das sagen unsere Kunden
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="flex flex-col justify-between rounded-3xl bg-[var(--theme-surface)] p-8 shadow-lg ring-1 ring-[var(--theme-border)]"
              >
                <div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-lg leading-7 text-[var(--theme-textSecondary)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 border-t border-[var(--theme-border)] pt-6">
                  <p className="text-base font-semibold text-[var(--theme-text)]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--theme-textTertiary)]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bereit durchzustarten?
            <br />
            <span className="text-primary-200">Starte heute kostenlos.</span>
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <RegisterButton variant="white" size="lg">
              Kostenlos starten
            </RegisterButton>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-white hover:text-primary-100"
            >
              Kontakt aufnehmen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
