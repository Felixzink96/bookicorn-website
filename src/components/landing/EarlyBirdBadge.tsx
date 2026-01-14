'use client'

import { motion } from 'framer-motion'

interface EarlyBirdBadgeProps {
  spotsLeft?: number
}

export function EarlyBirdBadge({ spotsLeft = 8 }: EarlyBirdBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary-500/10 border border-primary-500/20"
    >
      {/* Ping indicator */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500" />
      </span>

      {/* Text */}
      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
        Early Bird - Nur noch {spotsLeft} Platze
      </span>
    </motion.div>
  )
}
