'use client'

import { motion } from 'framer-motion'
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from 'lucide-react'

interface InfoBoxProps {
  value: {
    type?: 'info' | 'warning' | 'error' | 'success' | 'help'
    title?: string
    content?: string
  }
}

const typeConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    iconColor: 'text-red-500',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-500',
  },
  help: {
    icon: HelpCircle,
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-500',
  },
}

export function InfoBox({ value }: InfoBoxProps) {
  const type = value.type || 'info'
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <motion.div
      className={`my-6 p-4 rounded-xl border ${config.border} ${config.bg}`}
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          {value.title && (
            <h4 className="font-semibold text-[var(--theme-text)] mb-1">
              {value.title}
            </h4>
          )}
          {value.content && (
            <p className="text-sm text-[var(--theme-textSecondary)] leading-relaxed">
              {value.content}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
