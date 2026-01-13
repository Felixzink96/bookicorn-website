'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionProps {
  value: {
    items?: Array<{
      title: string
      content: string
      _key: string
    }>
  }
}

export function Accordion({ value }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = value.items || []

  return (
    <div className="my-8 space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item._key}
            className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] overflow-hidden"
          >
            <motion.button
              className="w-full flex items-center justify-between p-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              whileHover={{ backgroundColor: 'var(--theme-surfaceHover)' }}
              transition={{ duration: 0.15 }}
            >
              <span className="font-medium text-[var(--theme-text)]">
                {item.title}
              </span>
              <motion.span
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <ChevronDown className="w-4 h-4 text-primary-600" />
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="px-4 pb-4 text-sm text-[var(--theme-textSecondary)] leading-relaxed border-t border-[var(--theme-border)] pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
