'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionProps {
  value: {
    title?: string
    items?: Array<{
      question: string
      answer: string
      defaultOpen?: boolean
      _key: string
    }>
    allowMultiple?: boolean
  }
}

export function Accordion({ value }: AccordionProps) {
  const items = value.items || []
  const allowMultiple = value.allowMultiple ?? false

  // Initialize open state based on defaultOpen
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
    const initial = new Set<number>()
    items.forEach((item, index) => {
      if (item.defaultOpen) initial.add(index)
    })
    return initial
  })

  const toggleItem = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="my-8 space-y-2">
      {value.title && (
        <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-4">
          {value.title}
        </h3>
      )}
      {items.map((item, index) => {
        const isOpen = openIndices.has(index)

        return (
          <div
            key={item._key}
            className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[var(--theme-surfaceHover)]"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-[var(--theme-text)]">
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown className="w-4 h-4 text-primary-600" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="px-4 pb-4 text-sm text-[var(--theme-textSecondary)] leading-relaxed border-t border-[var(--theme-border)] pt-4">
                    {item.answer}
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
