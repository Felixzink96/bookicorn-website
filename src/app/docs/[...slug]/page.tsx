import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CreditCard,
  Users,
  MapPin,
  Wallet,
  UserCircle,
  Settings,
  Rocket,
  HelpCircle,
} from 'lucide-react'
import { getDocBySlug, getDocsNavigation, getPrevNextDocs, getAllDocSlugs, type NavSection } from '@/lib/docs'
import Button from '@/components/ui/Button'
import { DocViewTracker } from '@/components/docs/DocViewTracker'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Calendar,
  CreditCard,
  Users,
  MapPin,
  Wallet,
  UserCircle,
  Settings,
  BookOpen,
  HelpCircle,
}

// Generate static params
export async function generateStaticParams() {
  const slugs = getAllDocSlugs()
  return slugs.map(slug => ({ slug }))
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocBySlug(slug)

  if (!doc) {
    return { title: 'Seite nicht gefunden' }
  }

  return {
    title: `${doc.title} | Bookicorn Docs`,
    description: doc.description,
  }
}

// MDX components
const mdxComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-bold text-[var(--theme-text)] mt-8 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-[var(--theme-text)] mt-10 mb-4 pb-2 border-b border-[var(--theme-border)]">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-[var(--theme-text)] mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-lg font-semibold text-[var(--theme-text)] mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-[var(--theme-textSecondary)] leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--theme-textSecondary)]">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-[var(--theme-textSecondary)]">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <Link
      href={href || '#'}
      className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
    >
      {children}
    </Link>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-[var(--theme-text)]">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="px-1.5 py-0.5 rounded bg-[var(--theme-surface)] text-primary-600 text-sm font-mono border border-[var(--theme-border)]">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="pl-4 border-l-4 border-primary-500 italic text-[var(--theme-textSecondary)] my-4">
      {children}
    </blockquote>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-[var(--theme-surface)]">{children}</thead>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody className="divide-y divide-[var(--theme-border)]">{children}</tbody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="border-b border-[var(--theme-border)]">{children}</tr>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-semibold text-[var(--theme-text)] border border-[var(--theme-border)]">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-[var(--theme-textSecondary)] border border-[var(--theme-border)]">{children}</td>
  ),
  hr: () => (
    <hr className="my-8 border-[var(--theme-border)]" />
  ),
}

// Sidebar component
function DocsSidebar({ navigation, currentSlug }: { navigation: NavSection[]; currentSlug: string }) {
  return (
    <nav className="space-y-6">
      {navigation.map((section) => {
        const Icon = iconMap[section.icon || 'BookOpen']
        const isCurrentSection = currentSlug.startsWith(section.slug)

        return (
          <div key={section.slug}>
            <div className="flex items-center gap-2 mb-2">
              {Icon && <Icon className="w-4 h-4 text-[var(--theme-textTertiary)]" />}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-textTertiary)]">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-1 ml-6">
              {section.items.map((item) => {
                const isActive = currentSlug === item.slug
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 font-medium'
                          : 'text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surfaceHover)]'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

// Main page component
export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugString = slug.join('/')
  const doc = getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  const navigation = getDocsNavigation()
  const { prev, next } = getPrevNextDocs(slugString)

  // Find current section for breadcrumb
  const currentSection = navigation.find(section =>
    section.items.some(item => item.slug === slugString)
  )

  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      {/* Track page view */}
      <DocViewTracker slug={slugString} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 relative">
          {/* Sidebar */}
          <aside className="hidden lg:block py-12 relative">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-[var(--theme-textTertiary)] hover:text-primary-600 mb-6">
                <ArrowLeft className="w-4 h-4" />
                Alle Docs
              </Link>
              <DocsSidebar navigation={navigation} currentSlug={slugString} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="py-12 min-w-0 relative z-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--theme-textTertiary)] mb-8">
              <Link href="/docs" className="hover:text-primary-600 transition-colors">
                Docs
              </Link>
              {currentSection && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <Link
                    href={`/docs/${currentSection.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {currentSection.title}
                  </Link>
                </>
              )}
              <ChevronRight className="w-4 h-4" />
              <span className="text-[var(--theme-text)] font-medium truncate">{doc.title}</span>
            </nav>

            {/* Article */}
            <article className="prose prose-lg max-w-none">
              <MDXRemote source={doc.content} components={mdxComponents} />
            </article>

            {/* Prev/Next Navigation */}
            <div className="mt-16 pt-8 border-t border-[var(--theme-border)]">
              <div className="flex justify-between gap-4">
                {prev ? (
                  <Link
                    href={`/docs/${prev.slug}`}
                    className="group flex-1 p-4 rounded-xl border border-[var(--theme-border)] hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <span className="text-xs text-[var(--theme-textTertiary)] uppercase tracking-wider">
                      Zurück
                    </span>
                    <span className="mt-1 flex items-center gap-2 text-[var(--theme-text)] font-medium group-hover:text-primary-600">
                      <ArrowLeft className="w-4 h-4" />
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {next ? (
                  <Link
                    href={`/docs/${next.slug}`}
                    className="group flex-1 p-4 rounded-xl border border-[var(--theme-border)] hover:border-primary-300 hover:shadow-md transition-all text-right"
                  >
                    <span className="text-xs text-[var(--theme-textTertiary)] uppercase tracking-wider">
                      Weiter
                    </span>
                    <span className="mt-1 flex items-center justify-end gap-2 text-[var(--theme-text)] font-medium group-hover:text-primary-600">
                      {next.title}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 p-6 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <HelpCircle className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--theme-text)]">Fragen oder Feedback?</h3>
                  <p className="mt-1 text-sm text-[var(--theme-textSecondary)]">
                    Wir helfen dir gerne weiter. Kontaktiere unser Support-Team.
                  </p>
                  <Link href="/contact" className="inline-block mt-3">
                    <Button variant="secondary" size="sm">
                      Kontakt aufnehmen
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
