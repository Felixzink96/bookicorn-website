'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

interface PricingCardProps {
  value: {
    name?: string
    price?: string
    period?: string
    description?: string
    features?: string[]
    ctaText?: string
    ctaUrl?: string
    highlighted?: boolean
  }
}

export function PricingCard({ value }: PricingCardProps) {
  const highlighted = value.highlighted ?? false
  const features = value.features || []

  return (
    <div
      className={`my-8 p-6 rounded-2xl border relative transition-transform duration-200 hover:-translate-y-1 ${
        highlighted
          ? 'border-primary-500 bg-primary-500/5'
          : 'border-[var(--theme-border)] bg-[var(--theme-surface)]'
      }`}
    >
      {/* Highlight badge */}
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500 text-white">
            Empfohlen
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center pb-6 border-b border-[var(--theme-border)]">
        <h3 className="text-lg font-semibold text-[var(--theme-text)]">
          {value.name}
        </h3>
        {value.description && (
          <p className="mt-1 text-sm text-[var(--theme-textSecondary)]">
            {value.description}
          </p>
        )}
        <div className="mt-4">
          <span className="text-4xl font-bold text-[var(--theme-text)]">
            {value.price}
          </span>
          {value.period && (
            <span className="text-[var(--theme-textSecondary)]">
              /{value.period}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="py-6 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-600" />
            </span>
            <span className="text-[var(--theme-textSecondary)]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {value.ctaText && value.ctaUrl && (
        <Link href={value.ctaUrl} className="block">
          <Button
            variant={highlighted ? 'primary' : 'secondary'}
            fullWidth
          >
            {value.ctaText}
          </Button>
        </Link>
      )}
    </div>
  )
}
