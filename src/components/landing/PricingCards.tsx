'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { RegisterButton } from '@/components/ui/CTAButton'

const earlyBirdFeatures = [
  'Unbegrenzte Kurse',
  'Bis zu 3 Trainer',
  'Online-Zahlungen',
  'Mobile App fur Kunden',
  'Wartelisten-Automatik',
  'Zoom Integration',
]

const enterpriseFeatures = [
  'Alles aus Early Bird',
  'Unbegrenzte Trainer',
  'Multi-Standort',
  'White-Label App',
  'Priority Support',
  'API Zugang',
]

interface PricingCardsProps {
  spotsLeft?: number
}

export function PricingCards({ spotsLeft = 8 }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Early Bird Card - Featured */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative group"
      >
        {/* Rainbow gradient border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-75 blur-sm group-hover:opacity-100 transition duration-500" />

        {/* Card content */}
        <div className="relative rounded-2xl bg-[var(--theme-background)] p-8 h-full flex flex-col">
          {/* Badge */}
          <div className="absolute -top-4 -right-4">
            <span className="flex h-8 w-8 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-8 w-8 bg-primary-500 text-white text-xs font-bold items-center justify-center">
                {spotsLeft}
              </span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 mb-2">
              POPULAR
            </span>
            <h3 className="text-2xl font-bold text-[var(--theme-text)]">
              Early Bird
            </h3>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-primary-600 dark:text-primary-500">
                29EUR
              </span>
              <span className="text-[var(--theme-textSecondary)]">/Monat</span>
            </div>
            <p className="text-sm text-[var(--theme-textTertiary)] mt-1 line-through">
              danach 49EUR/Monat
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8 flex-1">
            {earlyBirdFeatures.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-sm text-[var(--theme-text)]">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <RegisterButton variant="primary" size="lg" className="w-full">
            Jetzt Platz sichern
          </RegisterButton>
        </div>
      </motion.div>

      {/* Enterprise Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
        className="relative rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-8 h-full flex flex-col"
      >
        {/* Header */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--theme-border)] text-[var(--theme-textSecondary)] mb-2">
            SCALE
          </span>
          <h3 className="text-2xl font-bold text-[var(--theme-text)]">
            Enterprise
          </h3>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[var(--theme-text)]">
              Auf Anfrage
            </span>
          </div>
          <p className="text-sm text-[var(--theme-textTertiary)] mt-1">
            Fur grossere Studios
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8 flex-1">
          {enterpriseFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--theme-border)] flex items-center justify-center">
                <Check className="w-3 h-3 text-[var(--theme-textSecondary)]" />
              </div>
              <span className="text-sm text-[var(--theme-textSecondary)]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className={cn(
            "group flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold border transition-colors",
            "border-[var(--theme-border)] hover:bg-[var(--theme-background)]",
            "text-[var(--theme-text)]"
          )}
        >
          Kontakt aufnehmen
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  )
}
