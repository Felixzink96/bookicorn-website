'use client'

import { useState, useRef, useEffect } from 'react'
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

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string; _key: string }
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[var(--theme-surfaceHover)]"
        onClick={onToggle}
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

      <div
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
        className="overflow-hidden transition-all duration-300 ease-out"
      >
        <div ref={contentRef}>
          <div className="px-4 pb-4 text-sm text-[var(--theme-textSecondary)] leading-relaxed border-t border-[var(--theme-border)] pt-4">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  )
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
      {items.map((item, index) => (
        <AccordionItem
          key={item._key}
          item={item}
          isOpen={openIndices.has(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}
