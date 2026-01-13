'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Info, AlertTriangle, CheckCircle, FileText } from 'lucide-react'

interface CalloutProps {
  value: {
    variant?: 'tip' | 'info' | 'warning' | 'success' | 'note'
    title?: string
    content?: string
  }
}

const variantConfig = {
  tip: {
    icon: Lightbulb,
    gradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
  },
  info: {
    icon: Info,
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
  },
  warning: {
    icon: AlertTriangle,
    gradient: 'from-red-500 to-rose-500',
    iconBg: 'bg-red-500',
    borderColor: 'border-red-500/30',
    bgColor: 'bg-red-500/5',
  },
  success: {
    icon: CheckCircle,
    gradient: 'from-emerald-500 to-green-500',
    iconBg: 'bg-emerald-500',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
  },
  note: {
    icon: FileText,
    gradient: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-violet-500/5',
  },
}

export function Callout({ value }: CalloutProps) {
  const variant = value.variant || 'info'
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <motion.div
      className={`relative my-8 rounded-2xl border ${config.borderColor} ${config.bgColor} overflow-hidden`}
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Gradient accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${config.gradient}`} />

      <div className="flex gap-4 p-6 pl-7">
        {/* Icon with background */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          {value.title && (
            <h4 className="font-semibold text-[var(--theme-text)] mb-1">
              {value.title}
            </h4>
          )}
          {value.content && (
            <p className="text-[var(--theme-textSecondary)] text-sm leading-relaxed">
              {value.content}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
