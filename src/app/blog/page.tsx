'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import LiquidEther from '@/components/ui/LiquidEther'
import { client, isSanityConfigured } from '../../../sanity/lib/client'
import { postsQuery, categoriesQuery } from '../../../sanity/lib/queries'
import { urlFor } from '../../../sanity/lib/image'

// Rainbow colors matching our logo/button gradient
const rainbowColors = ['#a855f7', '#ec4899', '#facc15', '#22d3ee', '#a855f7']

// Placeholder blog posts - used when Sanity is not configured
const placeholderPosts = [
  {
    _id: '1',
    title: 'Warum FIFO Credits das fairste System sind',
    excerpt:
      'First In, First Out - warum dieses Prinzip für deine Kunden am fairsten ist und wie du es optimal nutzt.',
    publishedAt: '2024-01-15',
    slug: { current: 'fifo-credits-fairstes-system' },
    readTime: 5,
    category: { title: 'Credit-System', color: '#84cc16' },
  },
  {
    _id: '2',
    title: '10 Tipps für mehr Buchungen in deinem Studio',
    excerpt:
      'Praktische Strategien um deine Auslastung zu steigern - ohne teure Marketing-Kampagnen.',
    publishedAt: '2024-01-10',
    slug: { current: '10-tipps-mehr-buchungen' },
    readTime: 8,
    category: { title: 'Marketing', color: '#3b82f6' },
  },
  {
    _id: '3',
    title: 'Der ultimative Vergleich: Bookicorn vs. Eversports',
    excerpt:
      'Ein ehrlicher Vergleich beider Plattformen - Funktionen, Preise und was wirklich zählt.',
    publishedAt: '2024-01-05',
    slug: { current: 'bookicorn-vs-eversports-vergleich' },
    readTime: 12,
    category: { title: 'Vergleich', color: '#f59e0b' },
  },
]

const defaultCategories = ['Alle', 'Credit-System', 'Marketing', 'Vergleich', 'Tutorials', 'News']

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
  category: {
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(placeholderPosts)
  const [categories, setCategories] = useState<string[]>(defaultCategories)
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [loading, setLoading] = useState(true)
  const [usingSanity, setUsingSanity] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if Sanity is configured
        if (isSanityConfigured() && client) {
          const [postsData, categoriesData] = await Promise.all([
            client.fetch(postsQuery),
            client.fetch(categoriesQuery),
          ])

          if (postsData && postsData.length > 0) {
            setPosts(postsData)
            setUsingSanity(true)
          }

          if (categoriesData && categoriesData.length > 0) {
            const categoryTitles = ['Alle', ...categoriesData.map((c: Category) => c.title)]
            setCategories(categoryTitles)
          }
        }
      } catch (error) {
        console.error('Error fetching from Sanity:', error)
        // Keep using placeholder posts
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

  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[50vh] flex items-center">
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
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Insights, Tipps und Best Practices für dein Studio-Management.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surfaceHover)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="group flex flex-col rounded-2xl bg-[var(--theme-surface)] shadow-lg ring-1 ring-[var(--theme-border)] overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
                  {post.coverImage && usingSanity && (
                    <Image
                      src={urlFor(post.coverImage).width(400).height(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={post.publishedAt}
                        className="text-[var(--theme-textTertiary)]"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {post.category && (
                        <span
                          className="rounded-full px-3 py-1.5 font-medium"
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
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold leading-6 text-[var(--theme-text)] group-hover:text-primary-600">
                        <Link href={`/blog/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--theme-textSecondary)]">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-[var(--theme-textTertiary)]">
                      {post.readTime} min Lesezeit
                    </span>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                    >
                      Weiterlesen
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-[var(--theme-textSecondary)]">
              Keine Beiträge in dieser Kategorie gefunden.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-[var(--theme-surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--theme-text)]">
              Bleib auf dem Laufenden
            </h2>
            <p className="mt-4 text-lg text-[var(--theme-textSecondary)]">
              Neue Artikel direkt in dein Postfach. Kein Spam, versprochen.
            </p>
            <form className="mt-6 flex max-w-md mx-auto gap-x-4">
              <input
                type="email"
                required
                placeholder="Deine Email"
                className="min-w-0 flex-auto rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-3.5 py-2 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button type="submit" variant="primary" size="sm">
                Abonnieren
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
