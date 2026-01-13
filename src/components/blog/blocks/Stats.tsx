'use client'

import { useEffect, useRef, useState } from 'react'

interface StatsProps {
  value: {
    items?: Array<{
      value: string
      label: string
      _key: string
    }>
    layout?: 'row' | 'grid'
    variant?: 'minimal' | 'cards' | 'gradient'
  }
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-100px' }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return isInView
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    // Extract numeric part and suffix
    const match = value.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const numericValue = parseFloat(match[1])
    const suffix = match[2] || ''

    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    // Start from 0
    setDisplayValue('0' + suffix)

    const duration = 1500
    const steps = 40
    const stepTime = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * eased

      if (Number.isInteger(numericValue)) {
        setDisplayValue(Math.round(current) + suffix)
      } else {
        setDisplayValue(current.toFixed(1) + suffix)
      }

      if (currentStep >= steps) {
        clearInterval(timer)
        setDisplayValue(value)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [inView, value])

  return <span>{displayValue}</span>
}

export function Stats({ value }: StatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const items = value.items || []
  const variant = value.variant || 'cards'
  const layout = value.layout || 'row'

  const gridClass = layout === 'grid'
    ? 'grid grid-cols-2 gap-4 sm:gap-6'
    : 'flex flex-wrap justify-center gap-6 sm:gap-10'

  if (variant === 'minimal') {
    return (
      <div ref={ref} className={`my-10 ${gridClass}`}>
        {items.map((item) => (
          <div key={item._key} className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-[var(--theme-text)] tabular-nums">
              <CountUp value={item.value} inView={isInView} />
            </div>
            <div className="mt-2 text-sm text-[var(--theme-textSecondary)]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div ref={ref} className={`my-10 ${gridClass}`}>
        {items.map((item) => (
          <div
            key={item._key}
            className="text-center transition-transform hover:-translate-y-1"
          >
            <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tabular-nums">
              <CountUp value={item.value} inView={isInView} />
            </div>
            <div className="mt-2 text-sm font-medium text-[var(--theme-textSecondary)]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Cards variant (default)
  return (
    <div ref={ref} className={`my-10 ${gridClass}`}>
      {items.map((item) => (
        <div
          key={item._key}
          className="relative p-6 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-center overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative">
            <div className="text-3xl sm:text-4xl font-black text-[var(--theme-text)] tabular-nums">
              <CountUp value={item.value} inView={isInView} />
            </div>
            <div className="mt-2 text-sm text-[var(--theme-textSecondary)]">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
