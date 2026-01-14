'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, TrendingUp, Calculator, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// Competitor data with their platform fees
const competitors = {
  'Eversports': { fee: 0.25, color: 'text-orange-500', bgColor: 'bg-orange-500' },
  'Urban Sports Club': { fee: 0.35, color: 'text-blue-500', bgColor: 'bg-blue-500' },
  'ClassPass': { fee: 0.50, color: 'text-indigo-500', bgColor: 'bg-indigo-500' },
  'Fitogram': { fee: 0.15, color: 'text-red-500', bgColor: 'bg-red-500' },
} as const

type CompetitorName = keyof typeof competitors

export function FeeSavingsCalculator() {
  const [revenue, setRevenue] = useState(10000)
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorName>('Urban Sports Club')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const competitorFee = competitors[selectedCompetitor].fee
  const bookicornFee = 0 // Aktuell 0%, max 5% in Zukunft

  const competitorCost = revenue * competitorFee
  const bookicornCost = revenue * bookicornFee
  const savings = competitorCost - bookicornCost
  const yearlySavings = savings * 12

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent rounded-3xl" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-sm font-medium text-[var(--theme-textSecondary)] mb-6"
          >
            <Calculator className="w-4 h-4 text-primary-500" />
            Ersparnis-Rechner
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)]"
          >
            Vergleiche und spare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-[var(--theme-textSecondary)] max-w-2xl mx-auto"
          >
            Andere Plattformen nehmen einen riesigen Teil deines Umsatzes. Wir nicht.
          </motion.p>
        </div>

        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Competitor Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]"
          >
            <label className="block text-sm font-medium text-[var(--theme-textSecondary)] mb-3">
              Vergleich mit
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 p-4 rounded-xl border transition-all",
                  "bg-[var(--theme-background)] text-[var(--theme-text)]",
                  isDropdownOpen
                    ? "border-primary-500 ring-2 ring-primary-500/20"
                    : "border-[var(--theme-border)] hover:border-primary-500/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-3 h-3 rounded-full", competitors[selectedCompetitor].bgColor)} />
                  <span className="font-medium">{selectedCompetitor}</span>
                  <span className="text-sm text-[var(--theme-textTertiary)]">
                    ({(competitorFee * 100).toFixed(0)}% Gebuhren)
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-[var(--theme-textSecondary)] transition-transform",
                  isDropdownOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 py-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] shadow-xl"
                  >
                    {Object.entries(competitors).map(([name, data]) => (
                      <button
                        key={name}
                        onClick={() => {
                          setSelectedCompetitor(name as CompetitorName)
                          setIsDropdownOpen(false)
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                          selectedCompetitor === name
                            ? "bg-primary-500/10"
                            : "hover:bg-[var(--theme-surface)]"
                        )}
                      >
                        <div className={cn("w-3 h-3 rounded-full", data.bgColor)} />
                        <span className="font-medium text-[var(--theme-text)]">{name}</span>
                        <span className="text-sm text-[var(--theme-textTertiary)]">
                          {(data.fee * 100).toFixed(0)}%
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Revenue Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <label className="text-sm font-medium text-[var(--theme-textSecondary)]">
                Dein monatlicher Umsatz
              </label>
              <div className="text-2xl font-bold text-primary-500">
                {formatCurrency(revenue)}
              </div>
            </div>

            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-2 bg-[var(--theme-border)] rounded-full appearance-none cursor-pointer accent-primary-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30"
            />

            <div className="flex justify-between text-xs text-[var(--theme-textTertiary)] mt-2">
              <span>1.000 EUR</span>
              <span>50.000 EUR</span>
            </div>
          </motion.div>
        </div>

        {/* Comparison boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Competitor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 overflow-hidden"
          >
            {/* Animated bar */}
            <div className="absolute bottom-0 left-0 right-0 h-full">
              <motion.div
                className="absolute bottom-0 w-full bg-red-500/10"
                initial={{ height: 0 }}
                animate={{ height: `${competitorFee * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span className={cn("text-sm font-medium", competitors[selectedCompetitor].color)}>
                  {selectedCompetitor}
                </span>
              </div>
              <p className="text-7xl font-black text-red-500 tracking-tight">
                -{formatCurrency(competitorCost)}
              </p>
              <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
                Gebuhren ca. {(competitorFee * 100).toFixed(0)}%
              </p>
            </div>
          </motion.div>

          {/* Bookicorn */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative p-8 rounded-2xl bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/30 overflow-hidden"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-primary-500/20 blur-xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Animated bar */}
            <div className="absolute bottom-0 left-0 right-0 h-full">
              <motion.div
                className="absolute bottom-0 w-full bg-primary-500/10"
                initial={{ height: 0 }}
                animate={{ height: `${bookicornFee * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-bold text-primary-500">Bookicorn</span>
              </div>
              <p className="text-7xl font-black gradient-text tracking-tight">
                -{formatCurrency(bookicornCost)}
              </p>
              <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
                Aktuell <span className="font-semibold text-primary-500">0%</span> Gebuhren
              </p>
            </div>
          </motion.div>
        </div>

        {/* Savings highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${savings}-${selectedCompetitor}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <div className="inline-block relative">
              {/* Rainbow border */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 via-yellow-400 to-cyan-400 opacity-60" />

              <div className="relative p-8 sm:p-10 rounded-2xl bg-[var(--theme-background)]">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  <p className="text-sm font-medium text-[var(--theme-textSecondary)]">
                    Du sparst gegenuber {selectedCompetitor}
                  </p>
                </div>
                <p className="text-6xl sm:text-7xl font-black gradient-text">
                  {formatCurrency(savings)}
                </p>
                <p className="mt-1 text-sm text-[var(--theme-textTertiary)]">pro Monat</p>

                <div className="mt-6 pt-6 border-t border-[var(--theme-border)]">
                  <p className="text-lg text-[var(--theme-textSecondary)]">
                    Das sind <span className="text-3xl font-bold text-primary-500">{formatCurrency(yearlySavings)}</span> im Jahr!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Info note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs text-[var(--theme-textTertiary)]"
        >
          * Nur fur den Festpreis von 29 EUR/Monat. Keine versteckten Kosten, keine Provisionen.
        </motion.p>
      </div>
    </div>
  )
}
