import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { client } from '../../../../sanity/lib/client'
import { postBySlugQuery, relatedPostsQuery } from '../../../../sanity/lib/queries'
import { urlFor } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import { customBlockComponents } from '@/components/blog/BlockRenderers'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { SocialShare } from '@/components/blog/SocialShare'
import { MobileTOC } from '@/components/blog/MobileTOC'
import { BackToTop } from '@/components/blog/BackToTop'
import { ContactCTA } from '@/components/blog/ContactCTA'
import { AnimatedTitle } from '@/components/blog/AnimatedTitle'

// Types
interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: any
  publishedAt: string
  content: any[]
  categoryId: string
  seoTitle?: string
  seoDescription?: string
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
  content?: any[]
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

// Helper functions
function calculateReadingTime(content: any[]): number {
  if (!content) return 0
  const WORDS_PER_MINUTE = 200
  let wordCount = 0

  content.forEach((block) => {
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

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

function extractHeadings(content: any[]): TOCItem[] {
  if (!content) return []
  const headings: TOCItem[] = []

  content.forEach((block) => {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      const text = block.children?.map((child: any) => child.text).join('') || ''
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

// Data fetching
async function getPost(slug: string): Promise<BlogPost | null> {
  if (!client) return null
  try {
    return await client.fetch(postBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getRelatedPosts(categoryId: string, postId: string): Promise<RelatedPost[]> {
  if (!client) return []
  try {
    return await client.fetch(relatedPostsQuery, { categoryId, postId }) || []
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Beitrag nicht gefunden' }
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.coverImage?.asset ? [urlFor(post.coverImage).width(1200).height(630).url()] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage?.asset ? [urlFor(post.coverImage).width(1200).height(630).url()] : undefined,
    },
  }
}

// Portable Text Components
function createPortableTextComponents() {
  return {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset) return null
        return (
          <figure className="my-8">
            <div className={`relative overflow-hidden rounded-xl ${
              value.size === 'small' ? 'max-w-md mx-auto' :
              value.size === 'large' ? 'max-w-4xl mx-auto' :
              value.size === 'full' ? 'w-full' : 'max-w-2xl mx-auto'
            }`}>
              <Image
                src={urlFor(value).width(1200).url()}
                alt={value.alt || ''}
                width={1200}
                height={675}
                className="rounded-xl w-full"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm text-[var(--theme-textTertiary)]">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
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
        <mark className="bg-primary-500/20 text-[var(--theme-text)] px-1 rounded">{children}</mark>
      ),
      underline: ({ children }: { children?: React.ReactNode }) => (
        <span className="underline underline-offset-2 decoration-primary-500">{children}</span>
      ),
      'strike-through': ({ children }: { children?: React.ReactNode }) => (
        <span className="line-through text-[var(--theme-textTertiary)]">{children}</span>
      ),
    },
    block: {
      h2: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
        const id = value?._key ? `heading-${value._key}` : undefined
        return (
          <h2 id={id} className="scroll-mt-32 mt-12 mb-4 text-2xl font-bold text-[var(--theme-text)]">
            {children}
          </h2>
        )
      },
      h3: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
        const id = value?._key ? `heading-${value._key}` : undefined
        return (
          <h3 id={id} className="scroll-mt-32 mt-8 mb-3 text-xl font-semibold text-[var(--theme-text)]">
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
        <p className="mb-6 text-[var(--theme-textSecondary)] leading-relaxed text-lg">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul className="my-6 ml-6 space-y-2 list-disc text-[var(--theme-textSecondary)]">{children}</ul>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol className="my-6 ml-6 space-y-2 list-decimal text-[var(--theme-textSecondary)]">{children}</ol>
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

// Sub-components
function AuthorCard({ author }: { author: BlogPost['author'] }) {
  if (!author) return null

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider">
        Autor
      </p>
      <div className="flex items-center gap-3">
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
        <div>
          <p className="font-medium text-[var(--theme-text)] text-sm">{author.name}</p>
          {author.role && (
            <p className="text-xs text-[var(--theme-textTertiary)]">{author.role}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function RelatedPostCard({ post }: { post: RelatedPost }) {
  const hasCoverImage = post.coverImage?.asset

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="h-full rounded-xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-background)] hover:shadow-lg transition-all duration-300">
        {hasCoverImage && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(400).height(250).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.category && (
              <div className="absolute top-3 left-3">
                <span
                  className="inline-block rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: post.category.color ? `${post.category.color}90` : 'rgba(0,0,0,0.5)',
                    color: '#fff',
                  }}
                >
                  {post.category.title}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-4">
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
            {post.content && <span>{calculateReadingTime(post.content)} min</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}

function CTABanner() {
  return (
    <div className="rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary-600 uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Jetzt starten
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold text-[var(--theme-text)] mb-4">
            Bereit für moderne Kursverwaltung?
          </h3>
          <p className="text-[var(--theme-textSecondary)] mb-6">
            Teste Bookicorn kostenlos und entdecke, wie einfach Studio-Management sein kann.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="https://app.bookicorn.com/register">
              <Button variant="primary" size="lg">Kostenlos starten</Button>
            </Link>
            <Link href="/features">
              <Button variant="secondary" size="lg">Mehr erfahren</Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block relative h-full min-h-[300px] bg-gradient-to-br from-primary-500/10 to-violet-500/10">
          <Image
            src="/images/KursHub-Moderne-Kursplattform.png"
            alt="Bookicorn Dashboard"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}

// Main Page Component (Server Component)
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = post.categoryId && post._id
    ? await getRelatedPosts(post.categoryId, post._id)
    : []

  const headings = extractHeadings(post.content || [])
  const hasCoverImage = post.coverImage?.asset
  const portableTextComponents = createPortableTextComponents()
  const readTime = calculateReadingTime(post.content || [])

  // Build the canonical URL
  const canonicalUrl = `https://www.bookicorn.com/blog/${slug}`

  return (
    <div className="min-h-screen">
      {/* Hero Header with Lazy-loaded LiquidEther for optimal PageSpeed */}
      <header className="relative isolate overflow-hidden">
        <LazyLiquidEther />
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
              {post.category && (
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{
                    backgroundColor: post.category.color ? `${post.category.color}20` : 'var(--theme-surface)',
                    color: post.category.color || 'var(--theme-text)',
                  }}
                >
                  {post.category.title}
                </span>
              )}

              <AnimatedTitle
                title={post.title}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--theme-text)] leading-tight"
              />

              {post.excerpt && (
                <p className="mt-6 text-lg text-[var(--theme-textSecondary)]">
                  {post.excerpt}
                </p>
              )}

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
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min Lesezeit</span>
                  </div>
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
                    fetchPriority="high"
                  />
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
                  fetchPriority="high"
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
          <article className="min-w-0">
            <div className="prose prose-lg max-w-none">
              {post.content && (
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              )}
            </div>

            {/* Author Box */}
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
                    <h3 className="font-semibold text-[var(--theme-text)]">{post.author.name}</h3>
                    {post.author.role && (
                      <p className="text-sm text-[var(--theme-textTertiary)]">{post.author.role}</p>
                    )}
                    {post.author.bio && (
                      <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">{post.author.bio}</p>
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
              <TableOfContents headings={headings} />

              {headings.length > 0 && <div className="h-px bg-[var(--theme-border)]" />}

              {/* Social Share */}
              <SocialShare url={canonicalUrl} title={post.title} />

              <div className="h-px bg-[var(--theme-border)]" />

              {/* Author Card */}
              <AuthorCard author={post.author} />

              <div className="h-px bg-[var(--theme-border)]" />

              {/* Contact CTA */}
              <ContactCTA />
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
              <h2 className="text-2xl font-bold text-[var(--theme-text)]">Ähnliche Artikel</h2>
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

      {/* Mobile TOC & Back to Top (Client Components) */}
      <MobileTOC headings={headings} />
      <BackToTop />
    </div>
  )
}
