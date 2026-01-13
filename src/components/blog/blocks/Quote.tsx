'use client'

import { Quote as QuoteIcon } from 'lucide-react'

interface QuoteProps {
  value: {
    text?: string
    author?: string
    role?: string
  }
}

export function Quote({ value }: QuoteProps) {
  return (
    <blockquote
      className="relative my-10 pl-8 py-4 transition-transform duration-200 hover:translate-x-1"
    >
      {/* Gradient line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 rounded-full" />

      {/* Quote icon */}
      <div className="absolute -left-3 top-0 w-8 h-8 rounded-full bg-[var(--theme-background)] border border-[var(--theme-border)] flex items-center justify-center">
        <QuoteIcon className="w-4 h-4 text-primary-500" />
      </div>

      <p className="text-xl font-medium text-[var(--theme-text)] italic leading-relaxed">
        &ldquo;{value.text}&rdquo;
      </p>

      {(value.author || value.role) && (
        <footer className="mt-4 flex items-center gap-2">
          <span className="font-medium text-[var(--theme-text)]">
            {value.author}
          </span>
          {value.role && (
            <>
              <span className="text-[var(--theme-textTertiary)]">&mdash;</span>
              <span className="text-[var(--theme-textSecondary)]">
                {value.role}
              </span>
            </>
          )}
        </footer>
      )}
    </blockquote>
  )
}
