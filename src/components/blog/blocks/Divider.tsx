'use client'

interface DividerProps {
  value: {
    style?: 'line' | 'dotted' | 'gradient' | 'space-sm' | 'space-md' | 'space-lg'
  }
}

export function Divider({ value }: DividerProps) {
  const style = value.style || 'line'

  if (style === 'space-sm') return <div className="my-6" />
  if (style === 'space-md') return <div className="my-10" />
  if (style === 'space-lg') return <div className="my-16" />

  if (style === 'dotted') {
    return (
      <div className="my-10 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]" />
      </div>
    )
  }

  if (style === 'gradient') {
    return (
      <div className="my-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>
    )
  }

  // Default line
  return (
    <div className="my-10">
      <div className="h-px bg-[var(--theme-border)]" />
    </div>
  )
}
