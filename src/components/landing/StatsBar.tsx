'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

interface Stat {
  value: number
  suffix: string
  label: string
  decimals?: number
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Studios vertrauen uns' },
  { value: 50000, suffix: '+', label: 'Buchungen verarbeitet' },
  { value: 4.9, suffix: '', label: 'Sterne Bewertung', decimals: 1 },
]

function AnimatedCounter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  const formatValue = (val: number) => {
    if (decimals > 0) {
      return val.toFixed(decimals)
    }
    return Math.floor(val).toLocaleString('de-DE')
  }

  return (
    <span ref={ref}>
      {formatValue(count)}{suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12 border-y border-[var(--theme-border)]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <p className="text-4xl sm:text-5xl font-black text-[var(--theme-text)]">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              {stat.label.includes('Sterne') && (
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
