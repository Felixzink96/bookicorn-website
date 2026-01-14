'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpotsCounterProps {
  total?: number
  taken?: number
  className?: string
}

export function SpotsCounter({ total = 10, taken = 2, className }: SpotsCounterProps) {
  const available = total - taken

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Spots visualization */}
      <div className="flex gap-3 justify-center">
        {[...Array(total)].map((_, i) => {
          const isTaken = i < taken
          const isAvailable = !isTaken

          return (
            <motion.div
              key={i}
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.3 + i * 0.08,
                type: 'spring',
                stiffness: 300,
                damping: 15
              }}
            >
              {/* Glow effect for available spots */}
              {isAvailable && (
                <motion.div
                  className="absolute -inset-1 rounded-full bg-primary-500/40 blur-md"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Spot dot */}
              <div
                className={cn(
                  'relative w-4 h-4 rounded-full transition-all duration-300',
                  isTaken
                    ? 'bg-zinc-400 dark:bg-zinc-600'
                    : 'bg-primary-500 shadow-[0_0_15px_rgba(132,204,22,0.5)]'
                )}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Label */}
      <motion.p
        className="text-sm text-[var(--theme-textSecondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-primary-500 font-bold">{available} Platze</span>
        {' '}zum Early Bird Preis verfugbar
      </motion.p>
    </div>
  )
}
