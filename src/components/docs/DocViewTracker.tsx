'use client'

import { useTrackDocView } from '@/hooks/useDocViews'

export function DocViewTracker({ slug }: { slug: string }) {
  useTrackDocView(slug)
  return null
}
