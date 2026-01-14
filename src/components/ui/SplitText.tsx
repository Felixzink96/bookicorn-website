'use client'

import React, { useRef, useEffect, useState, useMemo, useId } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  textAlign?: React.CSSProperties['textAlign']
  onAnimationComplete?: () => void
  startDelay?: number
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 30,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = 'center',
  tag = 'p',
  onAnimationComplete,
  startDelay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const uniqueId = useId()
  const charClass = `split-char-${uniqueId.replace(/:/g, '')}`
  const wordClass = `split-word-${uniqueId.replace(/:/g, '')}`

  // Initial styles applied via CSS to prevent flash
  const initialStyle: React.CSSProperties = {
    opacity: from.opacity as number ?? 0,
    transform: `translateY(${from.y ?? 40}px)`,
  }

  // Wait for mount + fonts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof document !== 'undefined') {
        if (document.fonts.status === 'loaded') {
          setIsReady(true)
        } else {
          document.fonts.ready.then(() => setIsReady(true))
        }
      }
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  // Split text into elements with initial hidden state
  const splitElements = useMemo(() => {
    if (splitType === 'words') {
      return text.split(' ').map((word, i, arr) => (
        <span
          key={i}
          className={`${wordClass} inline-block`}
          style={initialStyle}
        >
          {word}
          {i < arr.length - 1 && <span>&nbsp;</span>}
        </span>
      ))
    }

    return text.split('').map((char, i) => {
      if (char === ' ') {
        return (
          <span
            key={i}
            className={`${charClass} inline-block`}
            style={initialStyle}
          >
            &nbsp;
          </span>
        )
      }
      if (char === '\n') {
        return <br key={i} />
      }
      return (
        <span
          key={i}
          className={`${charClass} inline-block`}
          style={initialStyle}
        >
          {char}
        </span>
      )
    })
  }, [text, splitType, charClass, wordClass, initialStyle])

  // GSAP Animation
  useEffect(() => {
    if (!containerRef.current || !isReady) return

    const container = containerRef.current
    const selector = splitType === 'words' ? `.${wordClass}` : `.${charClass}`
    const targets = container.querySelectorAll(selector)

    if (targets.length === 0) return

    // Create animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top ${(1 - threshold) * 100}%`,
          once: true,
        },
      })

      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        delay: startDelay,
        onComplete: onAnimationComplete,
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [isReady, splitType, to, duration, ease, delay, threshold, startDelay, onAnimationComplete, charClass, wordClass])

  const content = splitElements

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign, display: 'block' }}
    >
      {tag === 'h1' && <h1 className="m-0 leading-tight">{content}</h1>}
      {tag === 'h2' && <h2 className="m-0 leading-tight">{content}</h2>}
      {tag === 'h3' && <h3 className="m-0 leading-tight">{content}</h3>}
      {tag === 'h4' && <h4 className="m-0 leading-tight">{content}</h4>}
      {tag === 'h5' && <h5 className="m-0 leading-tight">{content}</h5>}
      {tag === 'h6' && <h6 className="m-0 leading-tight">{content}</h6>}
      {tag === 'p' && <p className="m-0">{content}</p>}
      {tag === 'span' && <span>{content}</span>}
      {tag === 'div' && <div>{content}</div>}
    </div>
  )
}

export default SplitText
