'use client'

import { Divider as UIDivider, DividerVariant } from '@/components/ui/Divider'

interface DividerBlockProps {
  value: {
    style?: DividerVariant
  }
}

export function Divider({ value }: DividerBlockProps) {
  return <UIDivider variant={value.style} />
}
