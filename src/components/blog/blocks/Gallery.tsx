'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  const images = value.images || []
  const columns = value.columns || 3

  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

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

  return (
    <>
      <div className={`my-8 grid ${gridClass[columns]} gap-3`}>
        {images.map((image, index) => (
          <motion.button
            key={image._key}
            className="relative aspect-square rounded-xl overflow-hidden border border-[var(--theme-border)] group"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Image
              src={urlFor(image.asset).width(400).height(400).url()}
              alt={image.alt || ''}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            <motion.div
              key={lightboxIndex}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={urlFor(images[lightboxIndex].asset).width(1600).url()}
                alt={images[lightboxIndex].alt || ''}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Caption */}
            {images[lightboxIndex].caption && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {images[lightboxIndex].caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
