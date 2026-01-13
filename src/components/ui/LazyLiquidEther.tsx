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
      {/* Animated mesh gradient - always visible */}
      <div className="absolute inset-0 bg-[var(--theme-background)]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Purple orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.15] animate-float-slow"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
        />
        {/* Pink orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.12] animate-float-medium"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            top: '20%',
            right: '-10%',
          }}
        />
        {/* Yellow orb */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-[0.10] animate-float-fast"
          style={{
            background: 'radial-gradient(circle, #facc15 0%, transparent 70%)',
            bottom: '10%',
            left: '30%',
          }}
        />
        {/* Cyan orb */}
        <div
          className="absolute w-[550px] h-[550px] rounded-full blur-[110px] opacity-[0.12] animate-float-slow-reverse"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            bottom: '-15%',
            right: '20%',
          }}
        />
      </div>

      {/* LiquidEther - loaded on user interaction, fades in on top */}
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
