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
      {/* Mesh gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
            radial-gradient(at 80% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            radial-gradient(at 60% 80%, rgba(250, 204, 21, 0.2) 0%, transparent 50%),
            radial-gradient(at 30% 70%, rgba(34, 211, 238, 0.25) 0%, transparent 50%),
            var(--theme-background)
          `
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
