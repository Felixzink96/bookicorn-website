'use client'

import { Check, ArrowRight, Sparkles, Circle, Plus } from 'lucide-react'

interface FeatureListProps {
  value: {
    items?: Array<{
      text: string
      highlighted?: boolean
      _key: string
    }>
    style?: 'check' | 'bullet' | 'number' | 'arrow' | 'plus'
    columns?: 1 | 2 | 3
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  check: Check,
  arrow: ArrowRight,
  sparkle: Sparkles,
  bullet: Circle,
  plus: Plus,
}

export function FeatureList({ value }: FeatureListProps) {
  const items = value.items || []
  const style = value.style || 'check'
  const columns = value.columns || 1
  const Icon = iconMap[style] || Check // Fallback to Check if style not found

  const gridClass =
    columns === 3 ? 'sm:grid-cols-3' :
    columns === 2 ? 'sm:grid-cols-2' :
    'grid-cols-1'

  return (
    <ul className={`my-6 grid ${gridClass} gap-3`}>
      {items.map((item, index) => (
        <li
          key={item._key}
          className={`
            flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01]
            ${item.highlighted
              ? 'bg-primary-500/10 border border-primary-500/20 hover:bg-primary-500/15'
              : 'bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:bg-[var(--theme-surfaceHover)]'
            }
          `}
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
            {style === 'number' ? (
              <span className="text-xs font-bold">{index + 1}</span>
            ) : (
              <Icon className="w-3.5 h-3.5" />
            )}
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
        </li>
      ))}
    </ul>
  )
}
