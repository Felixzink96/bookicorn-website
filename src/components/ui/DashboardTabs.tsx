'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { activeTheme } from '@/config/theme'

interface Tab {
  id: string
  label: string
  icon?: LucideIcon
  badge?: number | string
  ariaLabel?: string
}

interface DashboardTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
  inline?: boolean
  fullWidth?: boolean
}

export default function DashboardTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  inline = false,
  fullWidth = false
}: DashboardTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0
  })
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0
  })
  const [isSticky, setIsSticky] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const mobileTabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const tabsContainerRef = useRef<HTMLDivElement | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (tabsContainerRef.current) {
        const parent = tabsContainerRef.current.parentElement?.parentElement
        if (parent) {
          const rect = parent.getBoundingClientRect()
          setIsSticky(rect.top <= 64)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab]
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      })
    }

    const updateMobileIndicator = () => {
      const activeMobileElement = mobileTabRefs.current[activeTab]
      const container = scrollContainerRef.current
      if (activeMobileElement && container) {
        setMobileIndicatorStyle({
          left: activeMobileElement.offsetLeft - container.scrollLeft,
          width: activeMobileElement.offsetWidth,
        })
      }
    }

    updateMobileIndicator()
  }, [activeTab, tabs])

  // Update mobile indicator position during scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      const activeMobileElement = mobileTabRefs.current[activeTab]
      if (activeMobileElement) {
        setMobileIndicatorStyle({
          left: activeMobileElement.offsetLeft - container.scrollLeft,
          width: activeMobileElement.offsetWidth,
        })
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [activeTab])

  // Auto-scroll to center active tab on mobile
  useEffect(() => {
    const activeTabElement = mobileTabRefs.current[activeTab]
    const container = scrollContainerRef.current

    if (activeTabElement && container) {
      const scrollTimeout = setTimeout(() => {
        const tabCenter = activeTabElement.offsetLeft + (activeTabElement.offsetWidth / 2)
        const containerCenter = container.offsetWidth / 2
        const scrollPosition = tabCenter - containerCenter

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        })
      }, 400)

      return () => clearTimeout(scrollTimeout)
    }
  }, [activeTab])

  return (
    <div
      ref={tabsContainerRef}
      className={cn(
        inline ? "inline-block" : "w-full",
        className
      )}
    >
      {/* Desktop Tabs */}
      <div className="hidden md:block relative">
        <div className={cn(
          "relative rounded-full border border-[var(--theme-border)] overflow-hidden transition-all duration-300",
          isSticky
            ? "bg-white/60 backdrop-blur-md dark:bg-zinc-900/60"
            : "bg-[var(--theme-surface)]"
        )}>
          <div className={cn("flex items-center gap-0 p-1", fullWidth && "w-full")} role="tablist" aria-label="Ansichtsoptionen">
            {/* Animated Sliding Indicator */}
            <motion.div
              className="absolute h-[calc(100%-8px)] rounded-full"
              style={{ ...indicatorStyle, zIndex: 0, backgroundColor: `${activeTheme.primary}15` }}
              layoutId="tab-indicator"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35
              }}
            />

            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <motion.button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el }}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2.5 rounded-full font-medium whitespace-nowrap",
                    fullWidth && "flex-1 justify-center"
                  )}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={tab.ariaLabel || tab.label}
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 25
                    }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: {
                      type: "spring",
                      stiffness: 600,
                      damping: 20
                    }
                  }}
                >
                  {Icon && (
                    <motion.div
                      className="relative z-10"
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        y: isActive ? -1 : 0
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-all duration-200",
                          !isActive && "text-[var(--theme-textSecondary)]"
                        )}
                        style={isActive ? { color: activeTheme.primary } : undefined}
                      />
                    </motion.div>
                  )}
                  <span
                    className={cn(
                      "text-sm transition-all duration-200 relative z-10",
                      isActive
                        ? "font-semibold"
                        : "text-[var(--theme-textSecondary)] font-medium"
                    )}
                    style={isActive ? { color: activeTheme.primary } : undefined}
                  >{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={cn(
                      "ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full transition-all duration-300 border",
                      isActive
                        ? "bg-[var(--theme-text)]/10 text-[var(--theme-text)] border-[var(--theme-text)]/20"
                        : "bg-[var(--theme-background)] text-[var(--theme-textSecondary)] border-[var(--theme-border)]"
                    )}>
                      {tab.badge}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className={cn("md:hidden", inline ? "" : "w-full")}>
        <div className={cn(
          "relative rounded-full border border-[var(--theme-border)] overflow-hidden transition-all duration-300",
          inline ? "inline-flex" : "w-full",
          isSticky
            ? "bg-white/60 backdrop-blur-md dark:bg-zinc-900/60"
            : "bg-[var(--theme-surface)]"
        )}>
          {/* Mobile Sliding Indicator */}
          <motion.div
            className="absolute h-[calc(100%-8px)] rounded-full pointer-events-none top-1"
            style={{ ...mobileIndicatorStyle, zIndex: 0, backgroundColor: `${activeTheme.primary}15` }}
            layoutId="tab-indicator-mobile"
            transition={
              isScrolling
                ? { type: "tween", duration: 0 }
                : {
                    type: "spring",
                    stiffness: 500,
                    damping: 35
                  }
            }
          />
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            <div className={cn("flex items-center gap-0 p-1", fullWidth ? "w-full" : "min-w-max")} role="tablist" aria-label="Ansichtsoptionen">

          {tabs.map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <motion.button
                key={tab.id}
                ref={(el) => { mobileTabRefs.current[tab.id] = el }}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 rounded-full font-medium whitespace-nowrap",
                  fullWidth && "flex-1 justify-center"
                )}
                role="tab"
                aria-selected={isActive}
                aria-label={tab.ariaLabel || tab.label}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    type: "spring",
                    stiffness: 600,
                    damping: 20
                  }
                }}
              >
                {Icon && (
                  <motion.div
                    className="relative z-10"
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      y: isActive ? -1 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-all duration-200",
                        !isActive && "text-[var(--theme-textSecondary)]"
                      )}
                      style={isActive ? { color: activeTheme.primary } : undefined}
                    />
                  </motion.div>
                )}
                <span
                  className={cn(
                    "text-sm transition-all duration-200 relative z-10",
                    isActive
                      ? "font-semibold"
                      : "text-[var(--theme-textSecondary)] font-medium"
                  )}
                  style={isActive ? { color: activeTheme.primary } : undefined}
                >{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={cn(
                    "ml-0.5 px-1.5 py-0.5 text-xs font-semibold rounded-full transition-all duration-300 border",
                    isActive
                      ? "bg-[var(--theme-text)]/10 text-[var(--theme-text)] border-[var(--theme-text)]/20"
                      : "bg-[var(--theme-background)] text-[var(--theme-textSecondary)] border-[var(--theme-border)]"
                  )}>
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            )
          })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
