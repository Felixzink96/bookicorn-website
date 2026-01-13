'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Circle } from 'lucide-react'

interface TimelineProps {
  value: {
    items?: Array<{
      date: string
      title: string
      description?: string
      _key: string
    }>
  }
}

export function Timeline({ value }: TimelineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const items = value.items || []

  return (
    <div ref={ref} className="my-10 relative">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 rounded-full" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item._key}
            className="relative pl-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              delay: index * 0.1,
            }}
          >
            {/* Dot */}
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--theme-background)] border-2 border-primary-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
            </div>

            {/* Content */}
            <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-600 mb-2">
                {item.date}
              </span>
              <h4 className="font-semibold text-[var(--theme-text)]">
                {item.title}
              </h4>
              {item.description && (
                <p className="mt-1 text-sm text-[var(--theme-textSecondary)]">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
