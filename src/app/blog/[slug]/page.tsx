'use client'

import { useEffect, useState, use, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link2,
  Linkedin,
  Twitter,
  Facebook,
  ChevronRight,
  ChevronUp,
  ArrowRight,
  Check,
  List,
  X,
} from 'lucide-react'
import { client, isSanityConfigured } from '../../../../sanity/lib/client'
import { postBySlugQuery, relatedPostsQuery } from '../../../../sanity/lib/queries'
import { urlFor } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Button from '@/components/ui/Button'
import LiquidEther from '@/components/ui/LiquidEther'
import { LoadingState } from '@/components/patterns/LoadingState'
import { customBlockComponents } from '@/components/blog/BlockRenderers'

const rainbowColors = ['#a855f7', '#ec4899', '#facc15', '#22d3ee', '#a855f7']

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: any
  publishedAt: string
  readTime: number
  content: any[]
  categoryId: string
  author: {
    name: string
    image: any
    role: string
    bio: string
  }
  category: {
    _id: string
    title: string
    slug: { current: string }
    color: string
  }
}

interface RelatedPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: any
  publishedAt: string
  readTime: number
  category: {
    title: string
    slug: { current: string }
    color: string
  }
}

interface TOCItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

// Extract headings from PortableText content using Sanity's _key
function extractHeadings(content: any[]): TOCItem[] {
  if (!content) return []

  const headings: TOCItem[] = []

  content.forEach((block) => {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      const text = block.children
        ?.map((child: any) => child.text)
        .join('') || ''

      if (text && block._key) {
        headings.push({
          id: `heading-${block._key}`,
          text,
          level: block.style as 'h2' | 'h3',
        })
      }
    }
  })

  return headings
}

// Social Share Component
function SocialShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider">
        Teilen
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surfaceHover)] border border-[var(--theme-border)] transition-colors cursor-pointer"
          title="Link kopieren"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[var(--theme-success)]" />
          ) : (
            <Link2 className="w-4 h-4 text-[var(--theme-textSecondary)]" />
          )}
        </button>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surfaceHover)] border border-[var(--theme-border)] transition-colors"
            title={`Auf ${link.name} teilen`}
          >
            <link.icon className="w-4 h-4 text-[var(--theme-textSecondary)]" />
          </a>
        ))}
      </div>
    </div>
  )
}

// Table of Contents Component
function TableOfContents({
  headings,
  activeId,
}: {
  headings: TOCItem[]
  activeId: string
}) {
  if (headings.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="space-y-3">
      <p className="text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider">
        Inhalt
      </p>
      <ul className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm py-1.5 transition-all cursor-pointer hover:text-[var(--theme-text)] ${
                  heading.level === 'h3' ? 'pl-4' : ''
                } ${
                  isActive
                    ? 'text-[var(--theme-text)] font-bold'
                    : 'text-[var(--theme-textTertiary)]'
                }`}
              >
                {heading.text}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Mobile TOC Floating Snackbar Component - Smooth Morph Animation
function MobileTOC({
  headings,
  activeId,
}: {
  headings: TOCItem[]
  activeId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Delay content show after morph animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 150)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isOpen])

  if (headings.length === 0) return null

  const activeHeading = headings.find((h) => h.id === activeId) || headings[0]
  const activeIndex = headings.findIndex((h) => h.id === activeId)
  const progress = headings.length > 1 ? ((activeIndex + 1) / headings.length) * 100 : 100

  const scrollToHeading = (id: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const offset = 120
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        })
      }
    }, 300)
  }

  return (
    <div className="lg:hidden fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 backdrop-blur-sm pointer-events-auto"
            style={{ backgroundColor: 'var(--theme-overlay)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Single morphing container - stays at bottom, expands upward */}
      <motion.div
        layout
        onClick={() => !isOpen && setIsOpen(true)}
        className={`pointer-events-auto fixed bottom-6 ${isOpen ? 'left-4 right-4' : 'left-1/2 -translate-x-1/2'}`}
        style={{
          width: isOpen ? 'auto' : '300px',
          backgroundColor: isOpen ? 'var(--theme-surface)' : 'var(--theme-surfaceTranslucent)',
          backdropFilter: isOpen ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: isOpen ? 'none' : 'blur(16px)',
          borderRadius: isOpen ? 24 : 50,
          boxShadow: isOpen
            ? '0 25px 50px -12px var(--theme-shadowStrong)'
            : '0 10px 40px -10px var(--theme-shadow)',
          border: '1px solid var(--theme-border)',
          cursor: isOpen ? 'default' : 'pointer',
          overflow: 'hidden',
        }}
        transition={{
          layout: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
          },
        }}
        whileHover={!isOpen ? { scale: 1.02 } : undefined}
        whileTap={!isOpen ? { scale: 0.98 } : undefined}
      >
        {/* Collapsed Content */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 pl-2 pr-3 py-2"
          >
            {/* Progress Ring */}
            <div className="relative w-8 h-8 flex-shrink-0">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  strokeWidth="2.5"
                  style={{ stroke: 'var(--theme-border)' }}
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-primary-500"
                  strokeDasharray={75.4}
                  strokeDashoffset={75.4 - (75.4 * progress) / 100}
                  style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <List className="w-3.5 h-3.5 text-primary-500" />
              </div>
            </div>

            {/* Current Section - truncates naturally */}
            <span className="flex-1 min-w-0 text-sm font-medium text-[var(--theme-text)] truncate">
              {activeHeading?.text}
            </span>

            {/* Chevron */}
            <ChevronUp className="w-4 h-4 text-[var(--theme-textTertiary)] flex-shrink-0" />
          </motion.div>
        )}

        {/* Expanded Content */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <List className="w-4 h-4 text-primary-500" />
                </div>
                <span className="text-sm font-semibold text-[var(--theme-text)]">
                  Inhaltsverzeichnis
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="w-8 h-8 rounded-full bg-[var(--theme-surfaceHover)] hover:bg-[var(--theme-border)] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </button>
            </div>

            {/* Headings List */}
            <nav className="max-h-[45vh] overflow-y-auto overscroll-contain">
              <ul className="py-2">
                {headings.map((heading, index) => {
                  const isActive = activeId === heading.id
                  return (
                    <motion.li
                      key={heading.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          scrollToHeading(heading.id)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-3 ${
                          heading.level === 'h3' ? 'pl-12' : ''
                        } ${
                          isActive
                            ? 'text-primary-500 bg-primary-500/10'
                            : 'text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surfaceHover)]'
                        }`}
                      >
                        {heading.level === 'h2' && (
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            isActive ? 'bg-primary-500' : 'bg-[var(--theme-textTertiary)]'
                          }`} />
                        )}
                        <span className={isActive ? 'font-medium' : ''}>{heading.text}</span>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Progress Footer */}
            <div className="px-4 py-3 border-t border-[var(--theme-border)] bg-[var(--theme-surface)]">
              <div className="flex items-center justify-between text-xs text-[var(--theme-textTertiary)] mb-2">
                <span>{activeIndex + 1} von {headings.length} Abschnitten</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-[var(--theme-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// Author Card Component
function AuthorCard({ author }: { author: BlogPost['author'] }) {
  if (!author) return null

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider">
        Autor
      </p>
      <div className="flex items-start gap-3">
        {author.image?.asset ? (
          <Image
            src={urlFor(author.image).width(48).height(48).url()}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary-600" />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-[var(--theme-text)] text-sm">{author.name}</p>
          {author.role && (
            <p className="text-xs text-[var(--theme-textTertiary)]">{author.role}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Related Post Card Component
function RelatedPostCard({ post }: { post: RelatedPost }) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="h-full rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] overflow-hidden transition-all hover:border-[var(--theme-borderHover)] hover:shadow-lg">
        {post.coverImage?.asset && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(400).height(250).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          {post.category && (
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium mb-3"
              style={{
                backgroundColor: post.category.color
                  ? `${post.category.color}20`
                  : 'var(--theme-surface)',
                color: post.category.color || 'var(--theme-text)',
              }}
            >
              {post.category.title}
            </span>
          )}
          <h3 className="font-semibold text-[var(--theme-text)] line-clamp-2 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 text-xs text-[var(--theme-textTertiary)]">
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
            {post.readTime && <span>{post.readTime} min</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}

// CTA Banner Component
function CTABanner() {
  return (
    <div className="rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Content Side */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary-600 uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Jetzt starten
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold text-[var(--theme-text)] mb-4">
            Bereit für moderne Kursverwaltung?
          </h3>
          <p className="text-[var(--theme-textSecondary)] mb-6 text-lg leading-relaxed">
            Schluss mit Excel-Chaos und WhatsApp-Gruppen. Bookicorn gibt dir alles in einer Plattform: Buchungen, Credits, Trainer-Abrechnung und mehr.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Intelligentes Buchungssystem mit Warteliste',
              'Flexibles Credit-System (FIFO)',
              'Automatische Trainer-Abrechnung',
              'Echtzeit-Dashboard & Statistiken',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-[var(--theme-textSecondary)]">
                <Check className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <Link href="/contact">
              <Button variant="primary" className="w-full sm:w-auto">
                Kostenlos testen
              </Button>
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--theme-textSecondary)] hover:text-primary-600 transition-colors"
            >
              Alle Features ansehen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative hidden lg:block bg-[#0a0a0b] overflow-hidden">
          <Image
            src="/images/KursHub-Moderne-Kursplattform.png"
            alt="Bookicorn Dashboard - Moderne Kursverwaltung"
            width={800}
            height={600}
            className="w-full h-full object-cover object-left-top"
          />
          {/* Lime gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-surface)] via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Mobile Image */}
      <div className="lg:hidden relative aspect-[16/10] bg-[#0a0a0b] overflow-hidden">
        <Image
          src="/images/KursHub-Moderne-Kursplattform.png"
          alt="Bookicorn Dashboard"
          fill
          className="object-cover object-top"
        />
        {/* Lime gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 via-transparent to-transparent" />
      </div>
    </div>
  )
}

// Create PortableText components with heading IDs from content blocks
function createPortableTextComponents(content: any[]) {
  // Build a map of block keys to heading IDs
  const blockKeyToId = new Map<string, string>()
  content.forEach((block) => {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3') && block._key) {
      blockKeyToId.set(block._key, `heading-${block._key}`)
    }
  })

  return {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) return null
        const sizeClasses = {
          small: 'max-w-md mx-auto',
          normal: 'max-w-2xl mx-auto',
          large: 'max-w-4xl mx-auto',
          full: 'w-full',
        }
        const size = value.size || 'normal'
        return (
          <figure className={`my-8 ${sizeClasses[size as keyof typeof sizeClasses]}`}>
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ''}
              width={1200}
              height={675}
              className="rounded-xl w-full"
            />
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm text-[var(--theme-textTertiary)]">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      // Custom Block Types
      callout: ({ value }: { value: any }) => {
        const Component = customBlockComponents.callout
        return <Component value={value} />
      },
      ctaButton: ({ value }: { value: any }) => {
        const Component = customBlockComponents.ctaButton
        return <Component value={value} />
      },
      featureList: ({ value }: { value: any }) => {
        const Component = customBlockComponents.featureList
        return <Component value={value} />
      },
      proConList: ({ value }: { value: any }) => {
        const Component = customBlockComponents.proConList
        return <Component value={value} />
      },
      divider: ({ value }: { value: any }) => {
        const Component = customBlockComponents.divider
        return <Component value={value} />
      },
      codeBlock: ({ value }: { value: any }) => {
        const Component = customBlockComponents.codeBlock
        return <Component value={value} />
      },
      stats: ({ value }: { value: any }) => {
        const Component = customBlockComponents.stats
        return <Component value={value} />
      },
      quote: ({ value }: { value: any }) => {
        const Component = customBlockComponents.quote
        return <Component value={value} />
      },
      comparisonTable: ({ value }: { value: any }) => {
        const Component = customBlockComponents.comparisonTable
        return <Component value={value} />
      },
      accordion: ({ value }: { value: any }) => {
        const Component = customBlockComponents.accordion
        return <Component value={value} />
      },
      video: ({ value }: { value: any }) => {
        const Component = customBlockComponents.video
        return <Component value={value} />
      },
      gallery: ({ value }: { value: any }) => {
        const Component = customBlockComponents.gallery
        return <Component value={value} />
      },
      timeline: ({ value }: { value: any }) => {
        const Component = customBlockComponents.timeline
        return <Component value={value} />
      },
      personCard: ({ value }: { value: any }) => {
        const Component = customBlockComponents.personCard
        return <Component value={value} />
      },
      fileDownload: ({ value }: { value: any }) => {
        const Component = customBlockComponents.fileDownload
        return <Component value={value} />
      },
      table: ({ value }: { value: any }) => {
        const Component = customBlockComponents.table
        return <Component value={value} />
      },
      infoBox: ({ value }: { value: any }) => {
        const Component = customBlockComponents.infoBox
        return <Component value={value} />
      },
      newsletterBox: ({ value }: { value: any }) => {
        const Component = customBlockComponents.newsletterBox
        return <Component value={value} />
      },
      pricingCard: ({ value }: { value: any }) => {
        const Component = customBlockComponents.pricingCard
        return <Component value={value} />
      },
      embed: ({ value }: { value: any }) => {
        const Component = customBlockComponents.embed
        return <Component value={value} />
      },
    },
    marks: {
      link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
        <a
          href={value?.href || '#'}
          className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-semibold text-[var(--theme-text)]">{children}</strong>
      ),
      code: ({ children }: { children?: React.ReactNode }) => (
        <code className="px-1.5 py-0.5 rounded bg-[var(--theme-surface)] text-primary-600 text-sm font-mono">
          {children}
        </code>
      ),
      highlight: ({ children }: { children?: React.ReactNode }) => (
        <mark className="bg-primary-500/20 text-[var(--theme-text)] px-1 rounded">
          {children}
        </mark>
      ),
      underline: ({ children }: { children?: React.ReactNode }) => (
        <span className="underline underline-offset-2 decoration-primary-500">
          {children}
        </span>
      ),
      'strike-through': ({ children }: { children?: React.ReactNode }) => (
        <span className="line-through text-[var(--theme-textTertiary)]">
          {children}
        </span>
      ),
    },
    block: {
      h2: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
        const id = value?._key ? `heading-${value._key}` : undefined
        return (
          <h2
            id={id}
            className="scroll-mt-32 mt-12 mb-4 text-2xl font-bold text-[var(--theme-text)]"
          >
            {children}
          </h2>
        )
      },
      h3: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
        const id = value?._key ? `heading-${value._key}` : undefined
        return (
          <h3
            id={id}
            className="scroll-mt-32 mt-8 mb-3 text-xl font-semibold text-[var(--theme-text)]"
          >
            {children}
          </h3>
        )
      },
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="my-8 pl-6 border-l-4 border-primary-500 italic text-[var(--theme-textSecondary)] text-lg">
          {children}
        </blockquote>
      ),
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-6 text-[var(--theme-textSecondary)] leading-relaxed text-lg">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul className="my-6 ml-6 space-y-2 list-disc text-[var(--theme-textSecondary)]">
          {children}
        </ul>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol className="my-6 ml-6 space-y-2 list-decimal text-[var(--theme-textSecondary)]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
    },
  }
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeHeadingId, setActiveHeadingId] = useState('')
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        if (isSanityConfigured() && client) {
          const data = await client.fetch(postBySlugQuery, { slug })
          setPost(data)

          if (data?.content) {
            const extractedHeadings = extractHeadings(data.content)
            setHeadings(extractedHeadings)
            if (extractedHeadings.length > 0) {
              setActiveHeadingId(extractedHeadings[0].id)
            }
          }

          // Fetch related posts
          if (data?.categoryId && data?._id) {
            const related = await client.fetch(relatedPostsQuery, {
              categoryId: data.categoryId,
              postId: data._id,
            })
            setRelatedPosts(related || [])
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  // Scroll spy for TOC - runs after content is rendered
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      let newActiveId = headings[0]?.id || ''

      // Find the heading that's currently in view (iterate from bottom to top)
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id)
        if (element) {
          const elementTop = element.offsetTop
          if (elementTop <= scrollPosition) {
            newActiveId = headings[i].id
            break
          }
        }
      }

      setActiveHeadingId(newActiveId)
    }

    // Initial check after DOM is ready
    const timeoutId = setTimeout(handleScroll, 200)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [headings])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--theme-background)]">
        <LoadingState text="Artikel wird geladen..." delay={0} fullScreen />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--theme-background)] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[var(--theme-text)]">
          Beitrag nicht gefunden
        </h1>
        <Link
          href="/blog"
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Zurück zum Blog
        </Link>
      </div>
    )
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const portableTextComponents = createPortableTextComponents(post.content || [])

  const hasCoverImage = post.coverImage?.asset

  return (
    <div className="min-h-screen">
      {/* Hero Header with LiquidEther - Split Layout */}
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <LiquidEther
            colors={rainbowColors}
            mouseForce={20}
            cursorSize={100}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--theme-textTertiary)] mb-8">
            <Link href="/blog" className="hover:text-primary-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            {post.category && (
              <>
                <Link
                  href={`/blog?category=${post.category.slug.current}`}
                  className="hover:text-primary-600 transition-colors"
                  style={{ color: post.category.color }}
                >
                  {post.category.title}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-[var(--theme-textSecondary)] truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Split Layout: Content Left, Image Right */}
          <div className={`${hasCoverImage ? 'lg:grid lg:grid-cols-[1fr_400px] lg:gap-12 lg:items-center' : ''}`}>
            {/* Content Side */}
            <div>
              {/* Category Badge */}
              {post.category && (
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{
                    backgroundColor: post.category.color
                      ? `${post.category.color}20`
                      : 'var(--theme-surface)',
                    color: post.category.color || 'var(--theme-text)',
                  }}
                >
                  {post.category.title}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--theme-text)] leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-6 text-lg text-[var(--theme-textSecondary)]">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[var(--theme-textSecondary)]">
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.image?.asset ? (
                      <Image
                        src={urlFor(post.author.image).width(40).height(40).url()}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-[var(--theme-text)]">{post.author.name}</p>
                      {post.author.role && (
                        <p className="text-xs text-[var(--theme-textTertiary)]">{post.author.role}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-[var(--theme-textTertiary)]">
                  {post.publishedAt && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  {post.readTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min Lesezeit</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image - Desktop Right Side */}
            {hasCoverImage && (
              <div className="hidden lg:block relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={urlFor(post.coverImage).width(800).height(600).url()}
                    alt={post.coverImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Cover Image - Mobile Below */}
          {hasCoverImage && (
            <div className="mt-8 lg:hidden">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(post.coverImage).width(800).height(450).url()}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Article Content */}
          <article ref={articleRef} className="min-w-0">
            <div className="prose prose-lg max-w-none">
              {post.content && (
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              )}
            </div>

            {/* Author Box (Mobile & after content) */}
            {post.author && (
              <div className="mt-12 pt-8 border-t border-[var(--theme-border)]">
                <div className="flex items-start gap-4">
                  {post.author.image?.asset ? (
                    <Image
                      src={urlFor(post.author.image).width(64).height(64).url()}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[var(--theme-textTertiary)] uppercase tracking-wider mb-1">
                      Geschrieben von
                    </p>
                    <h3 className="font-semibold text-[var(--theme-text)]">
                      {post.author.name}
                    </h3>
                    {post.author.role && (
                      <p className="text-sm text-[var(--theme-textTertiary)]">
                        {post.author.role}
                      </p>
                    )}
                    {post.author.bio && (
                      <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <TableOfContents headings={headings} activeId={activeHeadingId} />

              {/* Divider */}
              {headings.length > 0 && (
                <div className="h-px bg-[var(--theme-border)]" />
              )}

              {/* Social Share */}
              <SocialShare url={currentUrl} title={post.title} />

              {/* Divider */}
              <div className="h-px bg-[var(--theme-border)]" />

              {/* Author Card */}
              <AuthorCard author={post.author} />
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
        <CTABanner />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-[var(--theme-surface)] border-t border-[var(--theme-border)] py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--theme-text)]">
                Ähnliche Artikel
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                Alle Artikel
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Blog */}
      <div className="border-t border-[var(--theme-border)] bg-[var(--theme-background)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--theme-textSecondary)] hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Blog
          </Link>
        </div>
      </div>

      {/* Mobile TOC Floating Bar */}
      <MobileTOC headings={headings} activeId={activeHeadingId} />
    </div>
  )
}
