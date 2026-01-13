'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { client, isSanityConfigured } from '../../../../sanity/lib/client'
import { postBySlugQuery } from '../../../../sanity/lib/queries'
import { urlFor } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import LiquidEther from '@/components/ui/LiquidEther'

// Rainbow colors matching our logo/button gradient
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
  author: {
    name: string
    image: any
    role: string
    bio: string
  }
  category: {
    title: string
    slug: { current: string }
    color: string
  }
}

// Custom components for PortableText
const portableTextComponents: any = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-[var(--theme-textTertiary)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href || '#'}
        className="text-primary-600 hover:text-primary-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold text-[var(--theme-text)]">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--theme-text)]">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-primary-500 pl-4 italic text-[var(--theme-textSecondary)]">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 text-[var(--theme-textSecondary)] leading-relaxed">{children}</p>
    ),
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        if (isSanityConfigured() && client) {
          const data = await client.fetch(postBySlugQuery, { slug: params.slug })
          setPost(data)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--theme-background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--theme-background)] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[var(--theme-text)]">Beitrag nicht gefunden</h1>
        <Link href="/blog" className="mt-4 text-primary-600 hover:text-primary-700">
          Zurück zum Blog
        </Link>
      </div>
    )
  }

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
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="text-center">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-[var(--theme-textSecondary)] hover:text-primary-600 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Blog
            </Link>

            {/* Category */}
            {post.category && (
              <span
                className="inline-block rounded-full px-4 py-1.5 text-sm font-medium mb-4"
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
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--theme-text)] leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--theme-textSecondary)]">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min Lesezeit</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12 -mt-8 relative aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.content && (
            <PortableText value={post.content} components={portableTextComponents} />
          )}
        </div>

        {/* Author Box */}
        {post.author && (
          <div className="mt-16 pt-8 border-t border-[var(--theme-border)]">
            <div className="flex items-start gap-4">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(80).height(80).url()}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold text-[var(--theme-text)]">{post.author.name}</h3>
                {post.author.role && (
                  <p className="text-sm text-[var(--theme-textTertiary)]">{post.author.role}</p>
                )}
                {post.author.bio && (
                  <p className="mt-2 text-[var(--theme-textSecondary)]">{post.author.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
