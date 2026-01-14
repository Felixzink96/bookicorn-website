'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Rocket,
  Calendar,
  CreditCard,
  Users,
  MapPin,
  Wallet,
  UserCircle,
  Settings,
  Search,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import { PopularDocs } from '@/components/docs/PopularDocs'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Calendar,
  CreditCard,
  Users,
  MapPin,
  Wallet,
  UserCircle,
  Settings,
  BookOpen,
}

const sections = [
  {
    name: 'Erste Schritte',
    description: 'Alles was du brauchst um loszulegen',
    icon: 'Rocket',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/getting-started', available: true },
      { name: 'Studio einrichten', href: '/docs/getting-started/studio-einrichten', available: true },
      { name: 'Erster Kurs', href: '/docs/getting-started/erster-kurs', available: true },
      { name: 'Erste Buchung', href: '/docs/getting-started/erste-buchung', available: true },
    ],
  },
  {
    name: 'Kursverwaltung',
    description: 'Kurse, Termine und Buchungen',
    icon: 'Calendar',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/kurse', available: true },
      { name: 'Kurs erstellen', href: '/docs/kurse/kurs-erstellen', available: true },
      { name: 'Termine erstellen', href: '/docs/kurse/termine-erstellen', available: true },
      { name: 'Kategorien', href: '/docs/kurse/kategorien', available: true },
      { name: 'Warteliste', href: '/docs/kurse/warteliste', available: true },
      { name: 'Stornierung', href: '/docs/kurse/stornierung', available: true },
    ],
  },
  {
    name: 'Credit-System',
    description: 'Das Herzstück deiner Kursverwaltung',
    icon: 'CreditCard',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/credits', available: true },
      { name: 'FIFO erklärt', href: '/docs/credits/fifo-erklaert', available: true },
      { name: 'Pakete erstellen', href: '/docs/credits/pakete-erstellen', available: true },
      { name: 'Aktivierungsmodi', href: '/docs/credits/aktivierungsmodi', available: true },
      { name: 'Gültigkeit', href: '/docs/credits/gueltigkeit', available: true },
      { name: 'Trainer-Credits', href: '/docs/credits/trainer-credits', available: true },
    ],
  },
  {
    name: 'Trainer & Team',
    description: 'Alles rund ums Team-Management',
    icon: 'Users',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/trainer', available: true },
      { name: 'Trainer anlegen', href: '/docs/trainer/trainer-anlegen', available: true },
      { name: 'Berechtigungen', href: '/docs/trainer/berechtigungen', available: true },
      { name: 'Verdienste', href: '/docs/trainer/verdienste', available: true },
      { name: 'Trainer-Dashboard', href: '/docs/trainer/trainer-dashboard', available: true },
    ],
  },
  {
    name: 'Buchungen',
    description: 'Buchungssystem verwalten',
    icon: 'BookOpen',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/buchungen', available: true },
      { name: 'Bestätigung', href: '/docs/buchungen/buchung-bestaetigen', available: true },
      { name: 'Teilnehmer', href: '/docs/buchungen/teilnehmer', available: true },
      { name: 'Check-In', href: '/docs/buchungen/check-in', available: true },
      { name: 'Stornieren', href: '/docs/buchungen/stornieren', available: true },
    ],
  },
  {
    name: 'Standorte',
    description: 'Mehrere Locations verwalten',
    icon: 'MapPin',
    color: 'from-cyan-500 to-teal-600',
    bgColor: 'bg-cyan-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/standorte', available: true },
      { name: 'Standort anlegen', href: '/docs/standorte/standort-anlegen', available: true },
      { name: 'Räume', href: '/docs/standorte/raeume', available: true },
    ],
  },
  {
    name: 'Zahlungen',
    description: 'Stripe, Rechnungen & Finanzen',
    icon: 'Wallet',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/zahlungen', available: false },
      { name: 'Stripe einrichten', href: '/docs/zahlungen/stripe-einrichten', available: false },
      { name: 'Direktzahlung', href: '/docs/zahlungen/direktzahlung', available: false },
      { name: 'Rechnungen', href: '/docs/zahlungen/rechnungen', available: false },
    ],
  },
  {
    name: 'Kunden',
    description: 'Kundenverwaltung & CRM',
    icon: 'UserCircle',
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/kunden', available: false },
      { name: 'Kunden anlegen', href: '/docs/kunden/kunden-anlegen', available: false },
      { name: 'Credits verwalten', href: '/docs/kunden/credits-verwalten', available: false },
      { name: 'Kommunikation', href: '/docs/kunden/kommunikation', available: false },
    ],
  },
  {
    name: 'Einstellungen',
    description: 'Konfiguration und Anpassung',
    icon: 'Settings',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-500/10',
    links: [
      { name: 'Übersicht', href: '/docs/einstellungen', available: false },
      { name: 'Buchungsregeln', href: '/docs/einstellungen/buchungsregeln', available: false },
      { name: 'E-Mail-Templates', href: '/docs/einstellungen/email-templates', available: false },
      { name: 'Branding', href: '/docs/einstellungen/branding', available: false },
    ],
  },
]

const quickStartSteps = [
  { step: '1', title: 'Studio einrichten', description: 'Grundeinstellungen konfigurieren', href: '/docs/getting-started/studio-einrichten' },
  { step: '2', title: 'Ersten Kurs erstellen', description: 'Kurs mit Terminen anlegen', href: '/docs/getting-started/erster-kurs' },
  { step: '3', title: 'Credits einrichten', description: 'Pakete für deine Kunden', href: '/docs/credits/pakete-erstellen' },
  { step: '4', title: 'Buchung testen', description: 'Alles durchspielen', href: '/docs/getting-started/erste-buchung' },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSections = searchQuery
    ? sections.map(section => ({
        ...section,
        links: section.links.filter(link =>
          link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(section => section.links.length > 0)
    : sections

  return (
    <div className="bg-[var(--theme-background)] min-h-screen">
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-surface)]/80 backdrop-blur-sm border border-[var(--theme-border)] mb-6">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-[var(--theme-text)]">Dokumentation</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-5xl lg:text-6xl">
              Lerne Bookicorn kennen
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Alles was du wissen musst um dein Studio erfolgreich zu verwalten.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-lg mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl opacity-0 group-focus-within:opacity-20 blur-xl transition-all duration-300" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-textTertiary)]" />
                  <input
                    type="search"
                    placeholder="Dokumentation durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-4 pl-12 text-[var(--theme-text)] shadow-lg placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--theme-surface)] to-[var(--theme-background)] border border-[var(--theme-border)] p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-violet-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--theme-text)]">Schnellstart</h2>
          </div>
          <p className="text-[var(--theme-textSecondary)] mb-8">
            In 4 einfachen Schritten zu deiner ersten Buchung.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickStartSteps.map((item, index) => (
              <Link
                key={item.step}
                href={item.href}
                className="group relative p-5 rounded-xl bg-[var(--theme-background)] border border-[var(--theme-border)] hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--theme-text)] group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--theme-textTertiary)]">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-[var(--theme-textTertiary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Articles - Dynamisch basierend auf Views */}
      <PopularDocs />

      {/* Sections Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSections.map((section) => {
            const Icon = iconMap[section.icon] || BookOpen

            return (
              <motion.div
                key={section.name}
                variants={itemVariants}
                className="group rounded-2xl border border-[var(--theme-border)] p-6 hover:border-[var(--theme-borderHover)] hover:shadow-xl transition-all bg-[var(--theme-surface)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${section.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--theme-text)]">
                      {section.name}
                    </h2>
                    <p className="text-xs text-[var(--theme-textTertiary)]">{section.description}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.available ? (
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--theme-textSecondary)] hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                          {link.name}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--theme-textTertiary)] cursor-not-allowed">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--theme-surfaceHover)] text-[var(--theme-textTertiary)]">
                            Soon
                          </span>
                          {link.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Help CTA */}
      <div className="bg-[var(--theme-surface)] border-t border-[var(--theme-border)] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 mb-6">
              <HelpCircle className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--theme-text)] sm:text-3xl">
              Nicht gefunden was du suchst?
            </h2>
            <p className="mt-4 text-lg text-[var(--theme-textSecondary)]">
              Unser Support-Team hilft dir gerne weiter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Kontakt aufnehmen
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="secondary" size="lg">
                  FAQ ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
