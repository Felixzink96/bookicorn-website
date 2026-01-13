'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, ChevronUp } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

interface MobileTOCProps {
  headings: TOCItem[]
}

export function MobileTOC({ headings }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [activeId, setActiveId] = useState(headings[0]?.id || '')

  // Track active heading via scroll
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      let newActiveId = headings[0]?.id || ''

      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id)
        if (element) {
          const elementTop = element.offsetTop
          if (elementTop <= scrollPosition) {
            newActiveId = headings[i].id
            break
          }
        }
      }

      setActiveId(newActiveId)
    }

    const timeoutId = setTimeout(handleScroll, 200)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [headings])

  // Delay content show after morph animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 150)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isOpen])

  if (headings.length === 0) return null

  const activeHeading = headings.find((h) => h.id === activeId) || headings[0]
  const activeIndex = headings.findIndex((h) => h.id === activeId)
  const progress = headings.length > 1 ? ((activeIndex + 1) / headings.length) * 100 : 100

  const scrollToHeading = (id: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const offset = 120
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        })
      }
    }, 300)
  }

  return (
    <div className="lg:hidden fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 backdrop-blur-sm pointer-events-auto"
            style={{ backgroundColor: 'var(--theme-overlay)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Single morphing container - stays at bottom, expands upward */}
      <motion.div
        layout
        onClick={() => !isOpen && setIsOpen(true)}
        className={`pointer-events-auto fixed bottom-6 ${isOpen ? 'left-4 right-4' : 'left-1/2 -translate-x-1/2'}`}
        style={{
          width: isOpen ? 'auto' : '300px',
          backgroundColor: isOpen ? 'var(--theme-surface)' : 'var(--theme-surfaceTranslucent)',
          backdropFilter: isOpen ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: isOpen ? 'none' : 'blur(16px)',
          borderRadius: isOpen ? 24 : 50,
          boxShadow: isOpen
            ? '0 25px 50px -12px var(--theme-shadowStrong)'
            : '0 10px 40px -10px var(--theme-shadow)',
          border: '1px solid var(--theme-border)',
          cursor: isOpen ? 'default' : 'pointer',
          overflow: 'hidden',
        }}
        transition={{
          layout: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
          },
        }}
        whileHover={!isOpen ? { scale: 1.02 } : undefined}
        whileTap={!isOpen ? { scale: 0.98 } : undefined}
      >
        {/* Collapsed Content */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 pl-2 pr-3 py-2"
          >
            {/* Progress Ring */}
            <div className="relative w-8 h-8 flex-shrink-0">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  strokeWidth="2.5"
                  style={{ stroke: 'var(--theme-border)' }}
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-primary-500"
                  strokeDasharray={75.4}
                  strokeDashoffset={75.4 - (75.4 * progress) / 100}
                  style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <List className="w-3.5 h-3.5 text-primary-500" />
              </div>
            </div>

            {/* Current Section - truncates naturally */}
            <span className="flex-1 min-w-0 text-sm font-medium text-[var(--theme-text)] truncate">
              {activeHeading?.text}
            </span>

            {/* Chevron */}
            <ChevronUp className="w-4 h-4 text-[var(--theme-textTertiary)] flex-shrink-0" />
          </motion.div>
        )}

        {/* Expanded Content */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <List className="w-4 h-4 text-primary-500" />
                </div>
                <span className="text-sm font-semibold text-[var(--theme-text)]">
                  Inhaltsverzeichnis
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="w-8 h-8 rounded-full bg-[var(--theme-surfaceHover)] hover:bg-[var(--theme-border)] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </button>
            </div>

            {/* Headings List */}
            <nav className="max-h-[45vh] overflow-y-auto overscroll-contain">
              <ul className="py-2">
                {headings.map((heading, index) => {
                  const isActive = activeId === heading.id
                  return (
                    <motion.li
                      key={heading.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          scrollToHeading(heading.id)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-3 ${
                          heading.level === 'h3' ? 'pl-12' : ''
                        } ${
                          isActive
                            ? 'text-primary-500 bg-primary-500/10'
                            : 'text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surfaceHover)]'
                        }`}
                      >
                        {heading.level === 'h2' && (
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            isActive ? 'bg-primary-500' : 'bg-[var(--theme-textTertiary)]'
                          }`} />
                        )}
                        <span className={isActive ? 'font-medium' : ''}>{heading.text}</span>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Progress Footer */}
            <div className="px-4 py-3 border-t border-[var(--theme-border)] bg-[var(--theme-surface)]">
              <div className="flex items-center justify-between text-xs text-[var(--theme-textTertiary)] mb-2">
                <span>{activeIndex + 1} von {headings.length} Abschnitten</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-[var(--theme-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
