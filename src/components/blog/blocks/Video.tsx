'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface VideoProps {
  value: {
    url?: string
    caption?: string
    aspectRatio?: '16:9' | '4:3' | '1:1'
  }
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/
  )
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return null
}

export function Video({ value }: VideoProps) {
  const url = value.url || ''
  const caption = value.caption
  const aspectRatio = value.aspectRatio || '16:9'

  const embedUrl = getEmbedUrl(url)

  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }

  if (!embedUrl) {
    return (
      <div className="my-8 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-8 text-center">
        <Play className="w-12 h-12 mx-auto text-[var(--theme-textTertiary)] mb-4" />
        <p className="text-[var(--theme-textSecondary)]">
          Video nicht verfuegbar
        </p>
      </div>
    )
  }

  return (
    <motion.figure
      className="my-8"
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div
        className={`relative ${aspectClasses[aspectRatio]} rounded-xl overflow-hidden border border-[var(--theme-border)] bg-black`}
      >
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--theme-textSecondary)]">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
