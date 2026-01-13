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
    <>
      {/* Animated gradient background - always visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[var(--theme-background)]" />

        {/* Gradient orbs */}
        <div
          className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-[10%] -right-[150px] w-[500px] h-[500px] rounded-full animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute bottom-[5%] left-[20%] w-[400px] h-[400px] rounded-full animate-float-fast"
          style={{
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute -bottom-[100px] right-[10%] w-[550px] h-[550px] rounded-full animate-float-slow-reverse"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 60%)',
            filter: 'blur(55px)',
          }}
        />
      </div>

      {/* LiquidEther - loaded on user interaction */}
      {shouldLoad && (
        <div
          className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${
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
    </>
  )
}
