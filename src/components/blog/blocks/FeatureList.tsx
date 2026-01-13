'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

interface FeatureListProps {
  value: {
    items?: Array<{
      text: string
      highlighted?: boolean
      _key: string
    }>
    style?: 'check' | 'arrow' | 'sparkle'
    columns?: 1 | 2
  }
}

const iconMap = {
  check: Check,
  arrow: ArrowRight,
  sparkle: Sparkles,
}

export function FeatureList({ value }: FeatureListProps) {
  const items = value.items || []
  const style = value.style || 'check'
  const columns = value.columns || 1
  const Icon = iconMap[style]

  const gridClass = columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'

  return (
    <ul className={`my-6 grid ${gridClass} gap-3`}>
      {items.map((item) => (
        <motion.li
          key={item._key}
          className={`
            flex items-start gap-3 p-3 rounded-xl transition-colors
            ${item.highlighted
              ? 'bg-primary-500/10 border border-primary-500/20'
              : 'bg-[var(--theme-surface)] border border-[var(--theme-border)]'
            }
          `}
          whileHover={{
            scale: 1.01,
            backgroundColor: item.highlighted
              ? 'rgba(132, 204, 22, 0.15)'
              : 'var(--theme-surfaceHover)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span
            className={`
              flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5
              ${item.highlighted
                ? 'bg-primary-500 text-white'
                : 'bg-primary-500/20 text-primary-600'
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
          </span>
          <span
            className={`text-sm ${
              item.highlighted
                ? 'font-medium text-[var(--theme-text)]'
                : 'text-[var(--theme-textSecondary)]'
            }`}
          >
            {item.text}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}
