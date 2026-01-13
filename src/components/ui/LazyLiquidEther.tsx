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
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-[var(--theme-background)]" />

      {/* Animated aurora-like gradient */}
      <div className="absolute inset-0">
        {/* Primary purple blob - top left */}
        <div
          className="absolute w-[80vw] h-[80vh] -top-[20%] -left-[20%] animate-float-slow"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #a855f7 0deg, #ec4899 120deg, #a855f7 240deg, #ec4899 360deg)',
            filter: 'blur(100px)',
            opacity: 0.4,
            borderRadius: '50%',
          }}
        />

        {/* Cyan/teal blob - bottom right */}
        <div
          className="absolute w-[70vw] h-[70vh] -bottom-[20%] -right-[20%] animate-float-medium"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #22d3ee 0deg, #3b82f6 120deg, #22d3ee 240deg, #a855f7 360deg)',
            filter: 'blur(100px)',
            opacity: 0.35,
            borderRadius: '50%',
          }}
        />

        {/* Yellow accent - center */}
        <div
          className="absolute w-[50vw] h-[50vh] top-[30%] left-[25%] animate-float-fast"
          style={{
            background: 'radial-gradient(circle, #facc15 0%, #f97316 50%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.25,
            borderRadius: '50%',
          }}
        />

        {/* Pink highlight - top right */}
        <div
          className="absolute w-[40vw] h-[40vh] -top-[10%] right-[10%] animate-float-slow-reverse"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, #d946ef 50%, transparent 70%)',
            filter: 'blur(70px)',
            opacity: 0.3,
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

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
