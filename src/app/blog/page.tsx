'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, User, BookOpen, Filter, X, ChevronDown, Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import SplitText from '@/components/ui/SplitText'
import { LoadingState } from '@/components/patterns/LoadingState'
import { client, isSanityConfigured } from '../../../sanity/lib/client'
import { postsQuery, categoriesQuery } from '../../../sanity/lib/queries'
import { urlFor } from '../../../sanity/lib/image'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage?: any
  publishedAt: string
  content?: any[]
  author?: {
    name: string
    image: any
  }
  category?: {
    title: string
    slug?: { current: string }
    color?: string
  }
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
  color?: string
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
} as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

// Calculate reading time from Portable Text content
function calculateReadingTime(content: any[]): number {
  if (!content) return 0

  const WORDS_PER_MINUTE = 200
  let wordCount = 0

  const extractText = (blocks: any[]): void => {
    blocks.forEach((block) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: any) => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).filter(Boolean).length
          }
        })
      } else if (block._type === 'callout' && block.content) {
        wordCount += block.content.split(/\s+/).filter(Boolean).length
      } else if (block._type === 'featureList' && block.items) {
        block.items.forEach((item: any) => {
          if (item.text) wordCount += item.text.split(/\s+/).filter(Boolean).length
        })
      } else if (block._type === 'accordion' && block.items) {
        block.items.forEach((item: any) => {
          if (item.question) wordCount += item.question.split(/\s+/).filter(Boolean).length
          if (item.answer) wordCount += item.answer.split(/\s+/).filter(Boolean).length
        })
      } else if (block._type === 'timeline' && block.items) {
        block.items.forEach((item: any) => {
          if (item.title) wordCount += item.title.split(/\s+/).filter(Boolean).length
          if (item.description) wordCount += item.description.split(/\s+/).filter(Boolean).length
        })
      } else if (block._type === 'proConList') {
        if (block.pros) block.pros.forEach((t: string) => { wordCount += t.split(/\s+/).filter(Boolean).length })
        if (block.cons) block.cons.forEach((t: string) => { wordCount += t.split(/\s+/).filter(Boolean).length })
      } else if (block._type === 'quote' && block.text) {
        wordCount += block.text.split(/\s+/).filter(Boolean).length
      }
    })
  }

  extractText(content)
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

// Read time filter options
const readTimeOptions = [
  { label: 'Alle', value: null },
  { label: 'Kurz (< 5 min)', value: 'short', max: 5 },
  { label: 'Mittel (5-10 min)', value: 'medium', min: 5, max: 10 },
  { label: 'Lang (> 10 min)', value: 'long', min: 10 },
]

// Sort options
const sortOptions = [
  { label: 'Neueste zuerst', value: 'newest' },
  { label: 'Älteste zuerst', value: 'oldest' },
  { label: 'Kürzeste zuerst', value: 'shortest' },
  { label: 'Längste zuerst', value: 'longest' },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedReadTime, setSelectedReadTime] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isSanityConfigured() || !client) {
          setError('Blog wird gerade eingerichtet...')
          setLoading(false)
          return
        }

        const [postsData, categoriesData] = await Promise.all([
          client.fetch(postsQuery),
          client.fetch(categoriesQuery),
        ])

        if (postsData) {
          setPosts(postsData)
        }

        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData)
        }
      } catch (err) {
        console.error('Error fetching from Sanity:', err)
        setError('Fehler beim Laden der Beiträge')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(post => post.category?.title === selectedCategory)
    }

    // Read time filter
    if (selectedReadTime) {
      const option = readTimeOptions.find(o => o.value === selectedReadTime)
      if (option) {
        result = result.filter(post => {
          const time = calculateReadingTime(post.content || [])
          if (option.max && !option.min) return time < option.max
          if (option.min && !option.max) return time >= option.min
          if (option.min && option.max) return time >= option.min && time < option.max
          return true
        })
      }
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case 'shortest':
          return calculateReadingTime(a.content || []) - calculateReadingTime(b.content || [])
        case 'longest':
          return calculateReadingTime(b.content || []) - calculateReadingTime(a.content || [])
        case 'newest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })

    return result
  }, [posts, selectedCategory, selectedReadTime, sortBy, searchQuery])

  const activeFiltersCount = [selectedCategory, selectedReadTime, searchQuery].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedReadTime(null)
    setSearchQuery('')
  }

  return (
    <div className="bg-[var(--theme-background)] min-h-screen">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[35vh] flex items-center">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <SplitText
              text="Blog"
              tag="h1"
              className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-5xl"
              delay={30}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <p className="mt-4 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Tipps, Strategien und Neuigkeiten rund um Studio-Management.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {!loading && posts.length > 0 && (
        <div className="sticky top-16 z-30 bg-[var(--theme-background)]/95 backdrop-blur-md border-b border-[var(--theme-border)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="py-4">
              {/* Main filter row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-textTertiary)]" />
                  <input
                    type="text"
                    placeholder="Artikel suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] text-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>

                {/* Category Pills */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === null
                        ? 'bg-primary-600 text-white'
                        : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surfaceHover)] border border-[var(--theme-border)]'
                    }`}
                  >
                    Alle
                  </button>
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.title
                          ? 'text-white'
                          : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surfaceHover)] border border-[var(--theme-border)]'
                      }`}
                      style={
                        selectedCategory === category.title
                          ? { backgroundColor: category.color || 'var(--color-primary-600)' }
                          : undefined
                      }
                    >
                      {category.title}
                    </button>
                  ))}
                </div>

                {/* Filter Toggle (Mobile + Extra filters) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    showFilters || activeFiltersCount > 0
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                      : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surfaceHover)] border border-[var(--theme-border)]'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-textTertiary)] pointer-events-none" />
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surfaceHover)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Zurücksetzen</span>
                  </button>
                )}
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-[var(--theme-border)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mobile Category Filter */}
                    <div className="md:hidden">
                      <label className="block text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider mb-2">
                        Kategorie
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === null
                              ? 'bg-primary-600 text-white'
                              : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] border border-[var(--theme-border)]'
                          }`}
                        >
                          Alle
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category._id}
                            onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              selectedCategory === category.title
                                ? 'text-white'
                                : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] border border-[var(--theme-border)]'
                            }`}
                            style={
                              selectedCategory === category.title
                                ? { backgroundColor: category.color || 'var(--color-primary-600)' }
                                : undefined
                            }
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Read Time Filter */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider mb-2">
                        Lesezeit
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {readTimeOptions.map((option) => (
                          <button
                            key={option.label}
                            onClick={() => setSelectedReadTime(selectedReadTime === option.value ? null : option.value)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              selectedReadTime === option.value
                                ? 'bg-primary-600 text-white'
                                : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] border border-[var(--theme-border)]'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Info */}
      {!loading && posts.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6">
          <p className="text-sm text-[var(--theme-textTertiary)]">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Artikel' : 'Artikel'} gefunden
            {activeFiltersCount > 0 && (
              <span> mit aktiven Filtern</span>
            )}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {loading ? (
          <LoadingState text="Beiträge werden geladen..." delay={0} />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-[var(--theme-textSecondary)]">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <p className="text-xl font-medium text-[var(--theme-text)]">
              Noch keine Beiträge vorhanden
            </p>
            <p className="mt-2 text-[var(--theme-textSecondary)]">
              Schau bald wieder vorbei!
            </p>
          </motion.div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--theme-surface)] mb-6">
              <Search className="w-8 h-8 text-[var(--theme-textTertiary)]" />
            </div>
            <p className="text-xl font-medium text-[var(--theme-text)]">
              Keine Artikel gefunden
            </p>
            <p className="mt-2 text-[var(--theme-textSecondary)]">
              Versuche es mit anderen Filtern oder Suchbegriffen.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Filter zurücksetzen
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post, index) => (
              <motion.article key={post._id} variants={cardVariants}>
                <Link href={`/blog/${post.slug.current}`} className="group block h-full">
                  <div className="h-full rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] overflow-hidden transition-all hover:border-[var(--theme-borderHover)] hover:shadow-lg flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {post.coverImage?.asset ? (
                        <Image
                          src={urlFor(post.coverImage).width(400).height(250).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[var(--theme-surfaceHover)]" />
                      )}

                      {/* Category Badge */}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-block rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                            style={{
                              backgroundColor: post.category.color
                                ? `${post.category.color}dd`
                                : 'rgba(0,0,0,0.6)',
                              color: '#fff',
                            }}
                          >
                            {post.category.title}
                          </span>
                        </div>
                      )}

                      {/* Read Time Badge */}
                      {post.content && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                            <Clock className="w-3 h-3" />
                            {calculateReadingTime(post.content)} min
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-[var(--theme-text)] line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-sm text-[var(--theme-textSecondary)] line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-[var(--theme-textTertiary)]">
                          {post.author && (
                            <div className="flex items-center gap-1.5">
                              {post.author.image?.asset ? (
                                <Image
                                  src={urlFor(post.author.image).width(20).height(20).url()}
                                  alt={post.author.name}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                  <User className="w-2.5 h-2.5 text-primary-600" />
                                </div>
                              )}
                              <span className="truncate max-w-[80px]">{post.author.name}</span>
                            </div>
                          )}
                          {post.publishedAt && (
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--theme-textTertiary)] group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-[var(--theme-surface)] border-t border-[var(--theme-border)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--theme-text)]">
              Keine Neuigkeiten verpassen
            </h2>
            <p className="mt-4 text-[var(--theme-textSecondary)]">
              Erhalte die neuesten Artikel und Updates direkt in dein Postfach.
            </p>
            <form className="mt-8 flex max-w-md mx-auto gap-3">
              <input
                type="email"
                required
                placeholder="deine@email.de"
                className="flex-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
              <Button type="submit" variant="primary">
                Abonnieren
              </Button>
            </form>
            <p className="mt-4 text-xs text-[var(--theme-textTertiary)]">
              Kein Spam. Jederzeit abmelden.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
