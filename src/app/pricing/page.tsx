'use client'

import Link from 'next/link'
import { Check, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import SplitText from '@/components/ui/SplitText'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    price: { monthly: '0', annually: '0' },
    description: 'Perfekt um Bookicorn kennenzulernen.',
    features: [
      'Bis zu 50 Buchungen/Monat',
      '1 Standort',
      '2 Trainer',
      'Basis Credit-System',
      'Email Support',
    ],
    notIncluded: [
      'Mehrere Standorte',
      'Unbegrenzte Trainer',
      'Custom Branding',
      'API Zugang',
    ],
    cta: 'Kostenlos starten',
    href: 'https://app.bookicorn.com/auth/studio-register?plan=starter',
    featured: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    price: { monthly: '49', annually: '39' },
    description: 'Für wachsende Studios mit ambitionierten Zielen.',
    features: [
      'Unbegrenzte Buchungen',
      'Bis zu 3 Standorte',
      'Unbegrenzte Trainer',
      'Alle Credit-Modi',
      'Wartelisten-System',
      'Trainer-Verdienste',
      'Priority Support',
      'Widget Builder',
    ],
    notIncluded: ['White-Label', 'API Zugang', 'Dedicated Support'],
    cta: 'Jetzt starten',
    href: 'https://app.bookicorn.com/auth/studio-register?plan=professional',
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: { monthly: '149', annually: '119' },
    description: 'Für etablierte Studios und Ketten.',
    features: [
      'Alles aus Professional',
      'Unbegrenzte Standorte',
      'White-Label Option',
      'API Zugang',
      'Custom Integrations',
      'Dedicated Account Manager',
      'SLA Garantie',
      'Onboarding Support',
    ],
    notIncluded: [],
    cta: 'Kontakt aufnehmen',
    href: '/contact?plan=enterprise',
    featured: false,
  },
]

const faqs = [
  {
    question: 'Gibt es eine Vertragsbindung?',
    answer:
      'Nein! Du kannst jederzeit kündigen. Keine versteckten Klauseln, keine 12-Monats-Bindung.',
  },
  {
    question: 'Fallen Marketplace-Gebühren an?',
    answer:
      'Nein. Im Gegensatz zu anderen Anbietern berechnen wir keine prozentualen Gebühren auf deine Buchungen oder Neukunden.',
  },
  {
    question: 'Kann ich später upgraden?',
    answer:
      'Jederzeit! Du kannst deinen Plan mit einem Klick upgraden. Bereits gezahlte Beträge werden anteilig angerechnet.',
  },
  {
    question: 'Was passiert mit meinen Daten wenn ich kündige?',
    answer:
      'Du kannst alle deine Daten exportieren bevor du kündigst. Nach Kündigung werden Daten nach 30 Tagen gelöscht.',
  },
  {
    question: 'Bietet ihr Rabatte für Non-Profits?',
    answer:
      'Ja! Gemeinnützige Organisationen erhalten 50% Rabatt. Kontaktiere uns für Details.',
  },
  {
    question: 'Wie funktioniert der Support?',
    answer:
      'Starter: Email Support (48h). Professional: Priority Support (24h). Enterprise: Dedicated Manager + Chat.',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[50vh] flex items-center">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <SplitText
              text="Einfache, transparente Preise"
              tag="h1"
              className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl"
              delay={30}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Keine versteckten Gebühren. Keine Marketplace-Provision. Keine
              lange Vertragsbindung.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ${
                tier.featured
                  ? 'bg-[#09090b] ring-[#09090b]'
                  : 'ring-[var(--theme-border)] bg-[var(--theme-surface)]'
              }`}
            >
              <h3
                className={`text-lg font-semibold leading-8 ${
                  tier.featured ? 'text-white' : 'text-[var(--theme-text)]'
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  tier.featured ? 'text-gray-300' : 'text-[var(--theme-textSecondary)]'
                }`}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.featured ? 'text-white' : 'text-[var(--theme-text)]'
                  }`}
                >
                  {tier.price.monthly === '0' ? 'Kostenlos' : `€${tier.price.monthly}`}
                </span>
                {tier.price.monthly !== '0' && (
                  <span
                    className={`text-sm font-semibold leading-6 ${
                      tier.featured ? 'text-gray-300' : 'text-[var(--theme-textSecondary)]'
                    }`}
                  >
                    /Monat
                  </span>
                )}
              </p>
              <Link
                href={tier.href}
                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ${
                  tier.featured
                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600'
                }`}
              >
                {tier.cta}
              </Link>
              <ul
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  tier.featured ? 'text-gray-300' : 'text-[var(--theme-textSecondary)]'
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className={`h-6 w-5 flex-none ${
                        tier.featured ? 'text-white' : 'text-primary-600'
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li
                    key={feature}
                    className={`flex gap-x-3 ${
                      tier.featured ? 'text-gray-500' : 'text-[var(--theme-textTertiary)]'
                    }`}
                  >
                    <X className="h-6 w-5 flex-none" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Note */}
      <div className="bg-[var(--theme-surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--theme-text)]">
              Spare bis zu 25% im Vergleich
            </h2>
            <p className="mt-4 text-lg text-[var(--theme-textSecondary)]">
              Andere Anbieter berechnen bis zu 25% Provision auf Neukunden.
              Bei uns: 0%. Immer.
            </p>
            <Link
              href="/vergleich"
              className="mt-6 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Zum vollständigen Vergleich
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-[var(--theme-text)]">
            Häufig gestellte Fragen
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <dl className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-semibold leading-7 text-[var(--theme-text)]">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-[var(--theme-textSecondary)]">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Noch Fragen?
            <br />
            <span className="text-primary-200">Wir helfen gerne.</span>
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
