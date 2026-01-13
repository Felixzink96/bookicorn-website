'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '../../../../sanity/lib/image'

interface GalleryProps {
  value: {
    images?: Array<{
      asset: { _ref: string }
      alt?: string
      caption?: string
      _key: string
    }>
    columns?: 2 | 3 | 4
  }
}

export function Gallery({ value }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const images = value.images || []
  const columns = value.columns || 3

  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setTimeout(() => setIsVisible(true), 10)
  }

  const closeLightbox = () => {
    setIsVisible(false)
    setTimeout(() => setLightboxIndex(null), 200)
  }

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <>
      <div className={`my-8 grid ${gridClass[columns]} gap-3`}>
        {images.map((image, index) => (
          <button
            key={image._key}
            className="relative aspect-square rounded-xl overflow-hidden border border-[var(--theme-border)] group transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={urlFor(image.asset).width(400).height(400).url()}
              alt={image.alt || ''}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className={`relative max-w-5xl max-h-[85vh] w-full h-full transition-all duration-200 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[lightboxIndex].asset).width(1600).url()}
              alt={images[lightboxIndex].alt || ''}
              fill
              className="object-contain"
            />
          </div>

          {/* Caption */}
          {images[lightboxIndex].caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
              {images[lightboxIndex].caption}
            </div>
          )}
        </div>
      )}
    </>
  )
}
