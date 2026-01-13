'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import LiquidEther from '@/components/ui/LiquidEther'
import { LoadingState } from '@/components/patterns/LoadingState'
import { client, isSanityConfigured } from '../../../sanity/lib/client'
import { postsQuery, categoriesQuery } from '../../../sanity/lib/queries'
import { urlFor } from '../../../sanity/lib/image'

const rainbowColors = ['#a855f7', '#ec4899', '#facc15', '#22d3ee', '#a855f7']

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage?: any
  publishedAt: string
  readTime: number
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
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>(['Alle'])
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          const categoryTitles = ['Alle', ...categoriesData.map((c: Category) => c.title)]
          setCategories(categoryTitles)
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

  const filteredPosts =
    selectedCategory === 'Alle'
      ? posts
      : posts.filter((post) => post.category?.title === selectedCategory)

  const featuredPost = filteredPosts[0]
  const otherPosts = filteredPosts.slice(1)

  return (
    <div className="bg-[var(--theme-background)] min-h-screen">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[45vh] flex items-center">
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
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 w-full">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-surface)]/80 backdrop-blur-sm border border-[var(--theme-border)] mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-[var(--theme-text)]">Insights & Updates</span>
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Entdecke Tipps, Strategien und Neuigkeiten rund um Studio-Management.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      {!loading && posts.length > 0 && (
        <motion.div
          className="mx-auto max-w-7xl px-6 pt-12 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === selectedCategory
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surfaceHover)] border border-[var(--theme-border)]'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--theme-surface)] mb-6">
              <Sparkles className="w-10 h-10 text-[var(--theme-textTertiary)]" />
            </div>
            <p className="text-xl text-[var(--theme-textSecondary)]">
              Noch keine Beiträge vorhanden.
            </p>
            <p className="mt-2 text-[var(--theme-textTertiary)]">
              Schau bald wieder vorbei!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <Link href={`/blog/${featuredPost.slug.current}`}>
                  <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--theme-surface)] to-[var(--theme-background)] border border-[var(--theme-border)] hover:border-purple-500/50 transition-all duration-500">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Side */}
                      <div className="relative h-64 md:h-96 overflow-hidden">
                        {featuredPost.coverImage?.asset ? (
                          <Image
                            src={urlFor(featuredPost.coverImage).width(800).height(600).url()}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-400/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--theme-surface)] md:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-surface)] via-transparent to-transparent md:hidden" />

                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold shadow-lg">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        {featuredPost.category && (
                          <span
                            className="inline-block w-fit rounded-full px-3 py-1 text-xs font-medium mb-4"
                            style={{
                              backgroundColor: featuredPost.category.color
                                ? `${featuredPost.category.color}20`
                                : 'var(--theme-surfaceHover)',
                              color: featuredPost.category.color || 'var(--theme-text)',
                            }}
                          >
                            {featuredPost.category.title}
                          </span>
                        )}

                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-cyan-400 transition-all duration-300">
                          {featuredPost.title}
                        </h2>

                        <p className="mt-4 text-[var(--theme-textSecondary)] line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        <div className="mt-6 flex items-center gap-4 text-sm text-[var(--theme-textTertiary)]">
                          <time dateTime={featuredPost.publishedAt}>
                            {new Date(featuredPost.publishedAt).toLocaleDateString('de-DE', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                          {featuredPost.readTime && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {featuredPost.readTime} min
                              </span>
                            </>
                          )}
                        </div>

                        <div className="mt-8">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 group-hover:gap-3 transition-all duration-300">
                            Artikel lesen
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative gradient border on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1), rgba(34,211,238,0.1))',
                      }}
                    />
                  </article>
                </Link>
              </motion.div>
            )}

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {otherPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="group relative"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="relative overflow-hidden rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-purple-500/30 transition-all duration-500 h-full flex flex-col">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {post.coverImage?.asset ? (
                            <Image
                              src={urlFor(post.coverImage).width(400).height(250).url()}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-cyan-400/30" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-surface)] via-transparent to-transparent" />

                          {/* Category Badge */}
                          {post.category && (
                            <div className="absolute top-4 left-4">
                              <span
                                className="inline-block rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
                                style={{
                                  backgroundColor: post.category.color
                                    ? `${post.category.color}90`
                                    : 'rgba(0,0,0,0.5)',
                                  color: '#fff',
                                }}
                              >
                                {post.category.title}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col relative z-10">
                          <div className="flex items-center gap-3 text-xs text-[var(--theme-textTertiary)] mb-3">
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                            {post.readTime && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.readTime} min
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-lg font-semibold text-[var(--theme-text)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="mt-3 text-sm text-[var(--theme-textSecondary)] line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>

                          <div className="mt-4 pt-4 border-t border-[var(--theme-border)]">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--theme-textSecondary)] group-hover:text-primary-500 transition-colors">
                              Weiterlesen
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}

            {filteredPosts.length === 0 && posts.length > 0 && (
              <div className="text-center py-12">
                <p className="text-[var(--theme-textSecondary)]">
                  Keine Beiträge in dieser Kategorie gefunden.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-400/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text)]">
              Bleib auf dem Laufenden
            </h2>
            <p className="mt-4 text-lg text-[var(--theme-textSecondary)]">
              Erhalte die neuesten Artikel und Updates direkt in dein Postfach.
            </p>
            <form className="mt-8 flex max-w-md mx-auto gap-x-4">
              <input
                type="email"
                required
                placeholder="deine@email.de"
                className="min-w-0 flex-auto rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <Button type="submit" variant="primary" size="md">
                Abonnieren
              </Button>
            </form>
            <p className="mt-4 text-xs text-[var(--theme-textTertiary)]">
              Kein Spam. Jederzeit abmelden.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
