'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, ArrowRight } from 'lucide-react'

export function ContactCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-violet-500/5" />

      <div className="relative p-5">
        {/* Header with availability indicator */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider">
            Dein Ansprechpartner
          </p>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20">
            {/* Pulsating dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
              Erreichbar
            </span>
          </div>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 ring-2 ring-[var(--theme-border)]">
            <Image
              src="/images/daniel-placeholder.jpg"
              alt="Daniel"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            {/* Fallback initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-600">D</span>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="font-semibold text-[var(--theme-text)] text-sm">
              Daniel
            </h4>
            <p className="text-xs text-[var(--theme-textTertiary)]">
              Gründer & Support
            </p>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-[var(--theme-textSecondary)] mb-4 leading-relaxed">
          Fragen zu Bookicorn? Ich helfe dir gerne persönlich weiter.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="group flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">
            Kontakt aufnehmen
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
