'use client'

import Link from 'next/link'
import { RegisterButton } from '@/components/ui/CTAButton'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import SplitText from '@/components/ui/SplitText'
import {
  Calendar,
  CreditCard,
  Users,
  BarChart3,
  Zap,
  Shield,
  Palette,
  Globe,
  Bell,
  QrCode,
  FileText,
  Settings,
  Check,
  ArrowRight,
} from 'lucide-react'

const featureCategories = [
  {
    name: 'Buchungen & Credits',
    description: 'Das Herzstück deiner Kursverwaltung',
    features: [
      {
        name: 'FIFO Credit-System',
        description:
          'Älteste Credits werden automatisch zuerst verwendet. Volle Transparenz für dich und deine Kunden.',
        icon: CreditCard,
      },
      {
        name: '4 Aktivierungsmodi',
        description:
          'Sofort, ab Startdatum, bei erster Nutzung oder nach X Tagen - du entscheidest wann Credits aktiv werden.',
        icon: Settings,
      },
      {
        name: 'Trainer-gebundene Pakete',
        description:
          'Verkaufe Credits die nur bei bestimmten Trainern eingelöst werden können.',
        icon: Users,
      },
      {
        name: 'Automatische Warteliste',
        description:
          'Volle Kurse? Kein Problem. Kunden landen automatisch auf der Warteliste und rücken nach.',
        icon: Bell,
      },
    ],
  },
  {
    name: 'Kursverwaltung',
    description: 'Alles für deinen perfekten Stundenplan',
    features: [
      {
        name: 'Serien & Wiederkehrende Termine',
        description:
          'Erstelle einmal, nutze immer wieder. Serien-Templates für effiziente Planung.',
        icon: Calendar,
      },
      {
        name: 'Online & Hybrid Kurse',
        description:
          'Biete Kurse vor Ort, online oder beides gleichzeitig an.',
        icon: Globe,
      },
      {
        name: 'QR-Code Check-In',
        description:
          'Teilnehmer checken selbstständig ein - kein Papierkram mehr.',
        icon: QrCode,
      },
      {
        name: 'Konfigurierbare Stornofrist',
        description:
          'Pro Kurs individuell einstellbar: 24h, 48h oder wie du möchtest.',
        icon: Settings,
      },
    ],
  },
  {
    name: 'Trainer & Team',
    description: 'Alles für dein Team an einem Ort',
    features: [
      {
        name: '3 Verdienstmodelle',
        description:
          'Stundensatz, Prozent vom Umsatz oder Pauschal pro Kurs - ohne Zusatzkosten.',
        icon: CreditCard,
      },
      {
        name: 'Vertretungsmanagement',
        description:
          'Trainer können Vertretungen anfragen und übernehmen. Automatische Benachrichtigungen.',
        icon: Users,
      },
      {
        name: 'Trainer-Portal',
        description:
          'Eigener Zugang für Trainer mit Stundenübersicht und Verdienstabrechnungen.',
        icon: FileText,
      },
      {
        name: 'CSV Export',
        description:
          'Monatliche Zusammenfassungen für deine Buchhaltung.',
        icon: FileText,
      },
    ],
  },
  {
    name: 'Design & Branding',
    description: 'Dein Studio, dein Look',
    features: [
      {
        name: '10+ Themes',
        description:
          'TrustBlue, Orange, Purple, Green, Nature, Ocean und mehr. Sofort einsatzbereit.',
        icon: Palette,
      },
      {
        name: 'Custom Colors',
        description:
          'Eigene Primärfarben und Gradienten für perfekte Marken-Konsistenz.',
        icon: Palette,
      },
      {
        name: 'Widget Builder',
        description:
          'Drag & Drop Widgets für deine Website. Kein iFrame-Chaos.',
        icon: Settings,
      },
      {
        name: 'White-Label Option',
        description:
          'Dein Logo, deine Domain - Bookicorn bleibt unsichtbar.',
        icon: Globe,
      },
    ],
  },
  {
    name: 'Analytics & Reporting',
    description: 'Datenbasierte Entscheidungen treffen',
    features: [
      {
        name: 'Echtzeit Dashboard',
        description:
          'Buchungen, Umsatz, Member-Wachstum - alles auf einen Blick.',
        icon: BarChart3,
      },
      {
        name: 'Health Score',
        description:
          'Automatische Bewertung deines Studio-Setups mit Verbesserungsvorschlägen.',
        icon: Zap,
      },
      {
        name: 'Revenue Charts',
        description:
          'Monatliche, quartalsweise und jährliche Umsatzentwicklung.',
        icon: BarChart3,
      },
      {
        name: 'Top-Kurse Ranking',
        description:
          'Welche Kurse performen am besten? Daten statt Bauchgefühl.',
        icon: BarChart3,
      },
    ],
  },
  {
    name: 'Sicherheit & Compliance',
    description: 'Enterprise-Grade für jede Studiogröße',
    features: [
      {
        name: 'Row-Level Security',
        description:
          'Jedes Studio sieht nur seine eigenen Daten. Garantiert.',
        icon: Shield,
      },
      {
        name: 'DSGVO-konform',
        description:
          'Hosting in Deutschland, Datenschutz nach EU-Standard.',
        icon: Shield,
      },
      {
        name: 'Stripe Integration',
        description:
          'PCI-konforme Zahlungen. Keine Kreditkartendaten auf unseren Servern.',
        icon: CreditCard,
      },
      {
        name: 'Audit Trail',
        description:
          'Vollständiges Activity Log aller Änderungen.',
        icon: FileText,
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[60vh] flex items-center">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <SplitText
              text="Alle Features auf einen Blick"
              tag="h1"
              className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl"
              delay={30}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Entwickelt für Studios die mehr wollen. Jede Funktion wurde
              designed um dir Zeit zu sparen und deinen Kunden das beste
              Erlebnis zu bieten.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <RegisterButton variant="primary" size="lg">
                Kostenlos ausprobieren
              </RegisterButton>
              <Link
                href="/pricing"
                className="text-sm font-semibold leading-6 text-[var(--theme-text)]"
              >
                Preise ansehen <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIdx) => (
        <div
          key={category.name}
          className={categoryIdx % 2 === 0 ? 'bg-[var(--theme-background)]' : 'bg-[var(--theme-surface)]'}
        >
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {category.name}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--theme-text)] sm:text-4xl">
                {category.description}
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {category.features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-[var(--theme-text)]">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-[var(--theme-textSecondary)]">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Überzeugt?
            <br />
            <span className="text-primary-200">Starte jetzt kostenlos.</span>
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <RegisterButton variant="white" size="lg">
              Kostenlos starten
            </RegisterButton>
          </div>
        </div>
      </div>
    </div>
  )
}
