'use client'

import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

interface TableOfContentsProps {
  headings: TOCItem[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeadingId, setActiveHeadingId] = useState(headings[0]?.id || '')

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

      setActiveHeadingId(newActiveId)
    }

    const timeoutId = setTimeout(handleScroll, 200)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-1">
      <div className="flex items-center gap-2 text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider mb-3">
        <List className="w-4 h-4" />
        Inhalt
      </div>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById(heading.id)
            if (element) {
              const offset = 120
              const elementPosition = element.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - offset
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
            }
          }}
          className={`
            block py-1.5 text-sm transition-all duration-200 border-l-2
            ${heading.level === 'h3' ? 'pl-6' : 'pl-4'}
            ${activeHeadingId === heading.id
              ? 'border-primary-500 text-primary-600 font-medium'
              : 'border-transparent text-[var(--theme-textTertiary)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border)]'
            }
          `}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
