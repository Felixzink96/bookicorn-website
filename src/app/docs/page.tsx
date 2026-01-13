'use client'

import Link from 'next/link'
import {
  BookOpen,
  Rocket,
  Code,
  CreditCard,
  Users,
  Calendar,
  Settings,
  HelpCircle,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'

const sections = [
  {
    name: 'Erste Schritte',
    description: 'Alles was du brauchst um loszulegen',
    icon: Rocket,
    links: [
      { name: 'Schnellstart-Guide', href: '/docs/getting-started' },
      { name: 'Studio einrichten', href: '/docs/getting-started/studio-setup' },
      { name: 'Erster Kurs erstellen', href: '/docs/getting-started/first-course' },
      { name: 'Trainer hinzufügen', href: '/docs/getting-started/add-trainer' },
    ],
  },
  {
    name: 'Credit-System',
    description: 'Das Herzstück deiner Kursverwaltung',
    icon: CreditCard,
    links: [
      { name: 'FIFO verstehen', href: '/docs/credits/fifo' },
      { name: 'Credit-Pakete erstellen', href: '/docs/credits/packages' },
      { name: 'Aktivierungsmodi', href: '/docs/credits/activation-modes' },
      { name: 'Ablaufdaten', href: '/docs/credits/expiration' },
    ],
  },
  {
    name: 'Kursverwaltung',
    description: 'Kurse, Termine und Buchungen',
    icon: Calendar,
    links: [
      { name: 'Kurse erstellen', href: '/docs/courses/create' },
      { name: 'Serien-Termine', href: '/docs/courses/series' },
      { name: 'Wartelisten', href: '/docs/courses/waitlist' },
      { name: 'Check-In System', href: '/docs/courses/checkin' },
    ],
  },
  {
    name: 'Trainer & Team',
    description: 'Alles rund ums Team-Management',
    icon: Users,
    links: [
      { name: 'Trainer anlegen', href: '/docs/trainers/create' },
      { name: 'Verdienstmodelle', href: '/docs/trainers/earnings' },
      { name: 'Vertretungen', href: '/docs/trainers/substitutions' },
      { name: 'Berechtigungen', href: '/docs/trainers/permissions' },
    ],
  },
  {
    name: 'Einstellungen',
    description: 'Konfiguration und Anpassung',
    icon: Settings,
    links: [
      { name: 'Branding & Themes', href: '/docs/settings/branding' },
      { name: 'Email-Templates', href: '/docs/settings/email-templates' },
      { name: 'Buchungsregeln', href: '/docs/settings/booking-rules' },
      { name: 'Stripe-Integration', href: '/docs/settings/stripe' },
    ],
  },
  {
    name: 'API & Integrationen',
    description: 'Für Entwickler und technische Teams',
    icon: Code,
    links: [
      { name: 'API-Übersicht', href: '/docs/api/overview' },
      { name: 'Authentifizierung', href: '/docs/api/authentication' },
      { name: 'Webhooks', href: '/docs/api/webhooks' },
      { name: 'Widget-Integration', href: '/docs/api/widgets' },
    ],
  },
]

const popularArticles = [
  { name: 'Wie funktioniert das FIFO Credit-System?', href: '/docs/credits/fifo' },
  { name: 'Stripe einrichten', href: '/docs/settings/stripe' },
  { name: 'Widget auf meiner Website einbinden', href: '/docs/api/widgets' },
  { name: 'Trainer-Verdienste konfigurieren', href: '/docs/trainers/earnings' },
]

export default function DocsPage() {
  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[50vh] flex items-center">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl">
              Dokumentation
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Alles was du wissen musst um Bookicorn optimal zu nutzen.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Dokumentation durchsuchen..."
                  className="w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 pl-10 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-[var(--theme-textTertiary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/20 p-6">
          <h2 className="text-sm font-semibold text-primary-900 dark:text-primary-100">
            Beliebte Artikel
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {popularArticles.map((article) => (
              <Link
                key={article.name}
                href={article.href}
                className="rounded-full bg-[var(--theme-background)] px-4 py-2 text-sm font-medium text-[var(--theme-text)] shadow-sm hover:bg-[var(--theme-surfaceHover)] transition-colors"
              >
                {article.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.name}
              className="rounded-2xl border border-[var(--theme-border)] p-6 hover:border-primary-300 hover:shadow-lg transition-all bg-[var(--theme-surface)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <section.icon className="h-5 w-5 text-primary-600" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--theme-text)]">
                  {section.name}
                </h2>
              </div>
              <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">{section.description}</p>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Help CTA */}
      <div className="bg-[var(--theme-surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <HelpCircle className="mx-auto h-10 w-10 text-[var(--theme-textTertiary)]" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--theme-text)]">
              Nicht gefunden was du suchst?
            </h2>
            <p className="mt-4 text-lg text-[var(--theme-textSecondary)]">
              Unser Support-Team hilft dir gerne weiter.
            </p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button variant="primary">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
