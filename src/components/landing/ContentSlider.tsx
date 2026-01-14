'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, FileText, ArrowRight, ArrowLeft, Clock, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'
import { urlFor } from '../../../sanity/lib/image'
import DashboardTabs from '@/components/ui/DashboardTabs'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: any
  publishedAt?: string
  category?: {
    title: string
    color?: string
  }
}

interface DocItem {
  slug: string
  title: string
  description: string
  icon: string
}

const popularDocs: DocItem[] = [
  { slug: 'getting-started', title: 'Schnelleinstieg', description: 'In 5 Minuten dein Studio online bringen.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { slug: 'credits/fifo-erklaert', title: 'Credit-System', description: 'FIFO-Prinzip und Aktivierungsmodi verstehen.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { slug: 'trainer/verdienste', title: 'Trainer-Verdienste', description: 'Die 3 Verdienstmodelle fur deine Trainer.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { slug: 'buchungen/check-in', title: 'QR Check-In', description: 'Schneller Check-In per Smartphone.', icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z' },
]

interface ContentSliderProps {
  blogPosts?: BlogPost[]
}

const contentTabs = [
  { id: 'blog', label: 'Blog', icon: Newspaper },
  { id: 'docs', label: 'Dokumentation', icon: BookOpen },
]

export function ContentSlider({ blogPosts = [] }: ContentSliderProps) {
  const [activeTab, setActiveTab] = useState<string>('blog')
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Header with tabs and navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)] mb-6"
          >
            Bleib auf dem Laufenden
          </motion.h2>

          {/* DashboardTabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <DashboardTabs
              tabs={contentTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              inline
            />
          </motion.div>
        </div>

        {/* Navigation arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden md:flex gap-2"
        >
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full border border-[var(--theme-border)] hover:bg-[var(--theme-surface)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--theme-textSecondary)]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full border border-[var(--theme-border)] hover:bg-[var(--theme-surface)] transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-[var(--theme-textSecondary)]" />
          </button>
        </motion.div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {activeTab === 'blog' ? (
          blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))
          ) : (
            // Placeholder cards if no blog posts
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] md:w-[400px] snap-start"
              >
                <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-3xl overflow-hidden">
                  <div className="h-56 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-tr from-primary-800 to-lime-900 opacity-50" />
                    <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      TIPS
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[var(--theme-textTertiary)] mb-3">12. Mai 2024</div>
                    <div className="h-6 rounded bg-[var(--theme-border)] animate-pulse mb-4" />
                    <div className="h-4 rounded bg-[var(--theme-border)] animate-pulse w-2/3" />
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          popularDocs.map((doc) => (
            <DocCard key={doc.slug} doc={doc} />
          ))
        )}
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link
          href={activeTab === 'blog' ? '/blog' : '/docs'}
          className="group inline-flex items-center gap-2 text-primary-500 font-bold hover:text-primary-600 transition-colors"
        >
          Alle {activeTab === 'blog' ? 'Artikel' : 'Docs'} ansehen
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage)?.width(800).height(450).url() : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="flex-shrink-0 w-[300px] md:w-[400px] snap-start"
    >
      <div className="group bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all duration-300">
        {/* Image */}
        <div className="h-56 relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-primary-800 to-lime-900 opacity-50" />
          )}
          {post.category && (
            <div
              className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: post.category.color || '#84cc16' }}
            >
              {post.category.title}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {post.publishedAt && (
            <div className="text-xs text-[var(--theme-textTertiary)] mb-3">
              {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          )}
          <h3 className="text-xl font-bold text-[var(--theme-text)] line-clamp-2 mb-4 group-hover:text-primary-500 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-[var(--theme-textSecondary)] line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}
          <span className="text-primary-500 font-bold inline-flex items-center group/link">
            <span>Mehr lesen</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function DocCard({ doc }: { doc: DocItem }) {
  return (
    <Link
      href={`/docs/${doc.slug}`}
      className="flex-shrink-0 w-[300px] snap-start"
    >
      <div className="h-full group bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-3xl p-8 hover:border-primary-500/50 transition-all duration-300">
        {/* Icon */}
        <div className="w-12 h-12 bg-[var(--theme-background)] rounded-xl flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={doc.icon} />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[var(--theme-text)] mb-3 group-hover:text-primary-500 transition-colors">
          {doc.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--theme-textSecondary)] mb-6">
          {doc.description}
        </p>

        {/* Link */}
        <span className="text-[var(--theme-textTertiary)] hover:text-primary-500 transition-colors text-sm font-bold">
          Dokumentation offnen &rarr;
        </span>
      </div>
    </Link>
  )
}
