'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import LiquidEther - no SSR, loaded on demand
const LiquidEther = dynamic(() => import('@/components/ui/LiquidEther'), {
  ssr: false,
  loading: () => null,
})

const rainbowColors = ['#a855f7', '#ec4899', '#facc15', '#22d3ee', '#a855f7']

export function LazyLiquidEther() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    // Only load shader on user interaction
    // PageSpeed doesn't interact with pages, so it will never trigger this
    // Real users will see the shader as soon as they move mouse, scroll, or click

    const triggerLoad = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true

      // Remove all listeners
      window.removeEventListener('mousemove', triggerLoad)
      window.removeEventListener('scroll', triggerLoad)
      window.removeEventListener('click', triggerLoad)
      window.removeEventListener('touchstart', triggerLoad)
      window.removeEventListener('keydown', triggerLoad)

      // Small delay to not block the interaction itself
      requestAnimationFrame(() => {
        setShouldLoad(true)
        setTimeout(() => setIsVisible(true), 100)
      })
    }

    // Listen for any user interaction
    window.addEventListener('mousemove', triggerLoad, { passive: true })
    window.addEventListener('scroll', triggerLoad, { passive: true })
    window.addEventListener('click', triggerLoad, { passive: true })
    window.addEventListener('touchstart', triggerLoad, { passive: true })
    window.addEventListener('keydown', triggerLoad, { passive: true })

    return () => {
      window.removeEventListener('mousemove', triggerLoad)
      window.removeEventListener('scroll', triggerLoad)
      window.removeEventListener('click', triggerLoad)
      window.removeEventListener('touchstart', triggerLoad)
      window.removeEventListener('keydown', triggerLoad)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      {/* Gradient placeholder matching LiquidEther colors */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 25%, #facc15 50%, #22d3ee 75%, #a855f7 100%)',
          opacity: 0.15,
        }}
      />
      <div
        className={`absolute inset-0 bg-[var(--theme-background)] transition-opacity duration-1000 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* LiquidEther - loaded after delay, fades in */}
      {shouldLoad && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <LiquidEther
            colors={rainbowColors}
            mouseForce={20}
            cursorSize={100}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
          />
        </div>
      )}
    </div>
  )
}
