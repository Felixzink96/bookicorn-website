'use client'

import SplitText from '@/components/ui/SplitText'

interface AnimatedTitleProps {
  title: string
  className?: string
}

export function AnimatedTitle({ title, className }: AnimatedTitleProps) {
  return (
    <SplitText
      text={title}
      tag="h1"
      className={className}
      delay={25}
      duration={0.5}
      from={{ opacity: 0, y: 30 }}
      to={{ opacity: 1, y: 0 }}
    />
  )
}
