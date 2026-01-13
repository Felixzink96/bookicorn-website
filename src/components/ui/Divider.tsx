'use client'

import { cn } from '@/lib/utils'

export type DividerVariant = 'line' | 'dotted' | 'gradient' | 'space-sm' | 'space-md' | 'space-lg'

interface DividerProps {
  variant?: DividerVariant
  className?: string
}

export function Divider({ variant = 'line', className }: DividerProps) {
  if (variant === 'space-sm') {
    return <div className={cn('my-6', className)} />
  }

  if (variant === 'space-md') {
    return <div className={cn('my-10', className)} />
  }

  if (variant === 'space-lg') {
    return <div className={cn('my-16', className)} />
  }

  if (variant === 'dotted') {
    return (
      <div className={cn('my-10 flex items-center justify-center gap-2', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]" />
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={cn('my-10', className)}>
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>
    )
  }

  // Default line
  return (
    <div className={cn('my-10', className)}>
      <div className="h-px bg-[var(--theme-border)]" />
    </div>
  )
}

export default Divider
