'use client'

import { useEffect, useState } from 'react'

// Track a doc page view
export function useTrackDocView(slug: string) {
  useEffect(() => {
    // Only track once per session per page
    const sessionKey = `doc-viewed-${slug}`
    if (typeof window !== 'undefined' && !sessionStorage.getItem(sessionKey)) {
      fetch('/api/docs/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      }).catch(console.error)
      sessionStorage.setItem(sessionKey, 'true')
    }
  }, [slug])
}

// Get popular docs
export function usePopularDocs() {
  const [popularDocs, setPopularDocs] = useState<{ slug: string; views: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/docs/track')
      .then((res) => res.json())
      .then((data: Record<string, number>) => {
        const sorted = Object.entries(data)
          .map(([slug, views]) => ({ slug, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 6) // Top 6 most viewed
        setPopularDocs(sorted)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { popularDocs, loading }
}
