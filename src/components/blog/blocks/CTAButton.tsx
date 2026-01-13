'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  value: {
    text?: string
    url?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
  }
}

export function CTAButton({ value }: CTAButtonProps) {
  const text = value.text || 'Mehr erfahren'
  const url = value.url || '#'
  const variant = value.variant || 'primary'
  const size = value.size || 'md'
  const fullWidth = value.fullWidth ?? false

  return (
    <div className={`my-8 ${fullWidth ? 'w-full' : 'inline-block'}`}>
      <Link href={url} className={fullWidth ? 'block' : 'inline-block'}>
        <Button
          variant={variant}
          size={size}
          icon={ArrowRight}
          iconPosition="right"
          fullWidth={fullWidth}
        >
          {text}
        </Button>
      </Link>
    </div>
  )
}
