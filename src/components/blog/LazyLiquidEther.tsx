'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import LiquidEther - no SSR, loaded on demand
const LiquidEther = dynamic(() => import('@/components/ui/LiquidEther'), {
  ssr: false,
  loading: () => null,
})

const rainbowColors = ['#a855f7', '#ec4899', '#facc15', '#22d3ee', '#a855f7']

interface LazyLiquidEtherProps {
  delay?: number // Delay in ms before loading shader
}

export function LazyLiquidEther({ delay = 2500 }: LazyLiquidEtherProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Wait for the page to be fully interactive before loading shader
    // This ensures Core Web Vitals (LCP, FID) are measured first

    const loadShader = () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setShouldLoad(true)
          // Fade in after a brief moment
          setTimeout(() => setIsVisible(true), 100)
        }, { timeout: delay })
      } else {
        setTimeout(() => {
          setShouldLoad(true)
          setTimeout(() => setIsVisible(true), 100)
        }, delay)
      }
    }

    // Start timer after page load
    if (document.readyState === 'complete') {
      loadShader()
    } else {
      window.addEventListener('load', loadShader)
      return () => window.removeEventListener('load', loadShader)
    }
  }, [delay])

  return (
    <div className="absolute inset-0 -z-10">
      {/* Gradient placeholder - always visible initially */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50/50 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 transition-opacity duration-1000 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
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
