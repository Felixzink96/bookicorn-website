'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

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
    const triggerLoad = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true

      window.removeEventListener('mousemove', triggerLoad)
      window.removeEventListener('scroll', triggerLoad)
      window.removeEventListener('click', triggerLoad)
      window.removeEventListener('touchstart', triggerLoad)
      window.removeEventListener('keydown', triggerLoad)

      requestAnimationFrame(() => {
        setShouldLoad(true)
        setTimeout(() => setIsVisible(true), 100)
      })
    }

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
      {/* Base background */}
      <div className="absolute inset-0 bg-[var(--theme-background)]" />

      {/* Light mode gradient */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
            radial-gradient(at 100% 100%, rgba(34, 211, 238, 0.4) 0%, transparent 50%),
            radial-gradient(at 0% 100%, rgba(250, 204, 21, 0.3) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* Dark mode gradient - more vibrant */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.5) 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.45) 0%, transparent 50%),
            radial-gradient(at 100% 100%, rgba(34, 211, 238, 0.5) 0%, transparent 50%),
            radial-gradient(at 0% 100%, rgba(250, 204, 21, 0.35) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)
          `,
        }}
      />

      {/* Animated glow layer - light mode */}
      <div className="absolute inset-0 animate-pulse-slow dark:hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 30% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 40%),
              radial-gradient(at 70% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* Animated glow layer - dark mode */}
      <div className="absolute inset-0 animate-pulse-slow hidden dark:block">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 30% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 40%),
              radial-gradient(at 70% 80%, rgba(34, 211, 238, 0.4) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* LiquidEther - loaded on user interaction */}
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
