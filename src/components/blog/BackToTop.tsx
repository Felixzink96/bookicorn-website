'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showBackToTop) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-lg hover:bg-[var(--theme-surfaceHover)] transition-all cursor-pointer"
      title="Nach oben"
    >
      <ChevronUp className="w-5 h-5 text-[var(--theme-text)]" />
    </button>
  )
}
