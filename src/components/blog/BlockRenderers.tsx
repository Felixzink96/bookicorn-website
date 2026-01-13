'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Play,
  Download,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  FileVideo,
  File,
  ExternalLink,
  Copy,
  ArrowRight,
  Plus,
  Minus,
  Quote,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Sparkles,
  Zap,
} from 'lucide-react'
import { urlFor } from '../../../sanity/lib/image'

// ============================================
// CALLOUT BOX - Distinctive left accent design
// ============================================
interface CalloutProps {
  value: {
    variant?: 'info' | 'tip' | 'warning' | 'success' | 'note'
    title?: string
    content: string
  }
}

const calloutStyles = {
  info: {
    icon: Info,
    accent: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-500',
    glow: 'shadow-blue-500/20',
  },
  tip: {
    icon: Lightbulb,
    accent: 'from-amber-400 to-yellow-300',
    iconBg: 'bg-amber-500',
    glow: 'shadow-amber-500/20',
  },
  warning: {
    icon: AlertTriangle,
    accent: 'from-red-500 to-orange-400',
    iconBg: 'bg-red-500',
    glow: 'shadow-red-500/20',
  },
  success: {
    icon: CheckCircle2,
    accent: 'from-emerald-500 to-green-400',
    iconBg: 'bg-emerald-500',
    glow: 'shadow-emerald-500/20',
  },
  note: {
    icon: Bell,
    accent: 'from-violet-500 to-purple-400',
    iconBg: 'bg-violet-500',
    glow: 'shadow-violet-500/20',
  },
}

export function CalloutBlock({ value }: CalloutProps) {
  const variant = value.variant || 'info'
  const style = calloutStyles[variant]
  const Icon = style.icon

  return (
    <div className="my-8 relative">
      {/* Gradient accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${style.accent}`} />

      <div className={`ml-5 p-5 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-lg ${style.glow}`}>
        <div className="flex gap-4">
          <div className={`flex-shrink-0 w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            {value.title && (
              <p className="font-bold text-[var(--theme-text)] mb-1">{value.title}</p>
            )}
            <p className="text-[var(--theme-textSecondary)] leading-relaxed">{value.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// CTA BUTTON - Rainbow gradient style
// ============================================
interface CTAButtonProps {
  value: {
    text: string
    url: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
  }
}

export function CTAButtonBlock({ value }: CTAButtonProps) {
  const size = value.size || 'md'
  const variant = value.variant || 'primary'

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  // Use rainbow gradient for primary, simple for others
  if (variant === 'primary') {
    return (
      <div className={`my-8 ${value.fullWidth ? 'w-full' : 'inline-block'}`}>
        <Link
          href={value.url}
          target={value.url.startsWith('http') ? '_blank' : undefined}
          rel={value.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`btn-rainbow-gradient inline-block ${sizeClasses[size]} ${value.fullWidth ? 'w-full' : ''}`}
        >
          <span className="btn-content-wrapper font-semibold text-[var(--theme-text)]">
            {value.text}
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    )
  }

  return (
    <div className={`my-8 ${value.fullWidth ? 'w-full' : 'inline-block'}`}>
      <Link
        href={value.url}
        target={value.url.startsWith('http') ? '_blank' : undefined}
        rel={value.url.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`
          inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
          ${variant === 'secondary'
            ? 'bg-[var(--theme-surface)] hover:bg-[var(--theme-surfaceHover)] text-[var(--theme-text)] border border-[var(--theme-border)] hover:border-primary-500/50'
            : 'hover:bg-[var(--theme-surface)] text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)]'
          }
          ${sizeClasses[size]} ${value.fullWidth ? 'w-full' : ''}
        `}
      >
        {value.text}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

// ============================================
// FEATURE LIST - Clean with lime accents
// ============================================
interface FeatureListProps {
  value: {
    title?: string
    items: Array<{ text: string; highlighted?: boolean }>
    style?: 'check' | 'bullet' | 'number' | 'arrow' | 'plus'
    columns?: 1 | 2 | 3
  }
}

export function FeatureListBlock({ value }: FeatureListProps) {
  const style = value.style || 'check'
  const columns = value.columns || 1

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  }

  const renderIcon = (index: number) => {
    switch (style) {
      case 'check':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        )
      case 'number':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{index + 1}</span>
          </div>
        )
      case 'arrow':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-primary-500" />
          </div>
        )
      case 'plus':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary-500" />
          </div>
        )
      default:
        return (
          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary-500" />
        )
    }
  }

  return (
    <div className="my-8">
      {value.title && (
        <h4 className="text-lg font-bold text-[var(--theme-text)] mb-4">{value.title}</h4>
      )}
      <ul className={`grid gap-3 ${columnClasses[columns]}`}>
        {value.items?.map((item, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
              item.highlighted
                ? 'bg-primary-500/10 border border-primary-500/20'
                : 'hover:bg-[var(--theme-surface)]'
            }`}
          >
            {renderIcon(index)}
            <span className={`text-[var(--theme-textSecondary)] leading-relaxed ${item.highlighted ? 'font-medium text-[var(--theme-text)]' : ''}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// PRO/CONTRA LIST - Bold two-column design
// ============================================
interface ProConListProps {
  value: {
    pros?: string[]
    cons?: string[]
    layout?: 'side-by-side' | 'stacked'
  }
}

export function ProConListBlock({ value }: ProConListProps) {
  const layout = value.layout || 'side-by-side'

  return (
    <div className={`my-8 ${layout === 'side-by-side' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}`}>
      {/* Pros */}
      {value.pros && value.pros.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-emerald-500/20 bg-emerald-500/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Vorteile</span>
          </div>
          {/* Items */}
          <ul className="p-4 space-y-3">
            {value.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-3">
                <Plus className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[var(--theme-textSecondary)]">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons */}
      {value.cons && value.cons.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-red-500/20 bg-red-500/10">
            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
              <X className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-red-600 dark:text-red-400">Nachteile</span>
          </div>
          {/* Items */}
          <ul className="p-4 space-y-3">
            {value.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-3">
                <Minus className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[var(--theme-textSecondary)]">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ============================================
// DIVIDER - Simple and elegant
// ============================================
interface DividerProps {
  value: {
    style?: 'line' | 'dotted' | 'space-sm' | 'space-md' | 'space-lg'
  }
}

export function DividerBlock({ value }: DividerProps) {
  const style = value.style || 'line'

  if (style.startsWith('space')) {
    const spaceClasses = {
      'space-sm': 'h-8',
      'space-md': 'h-16',
      'space-lg': 'h-24',
    }
    return <div className={spaceClasses[style as keyof typeof spaceClasses]} />
  }

  return (
    <div className="my-10 flex items-center justify-center">
      {style === 'line' ? (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent" />
      ) : (
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]"
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// CODE BLOCK - Premium terminal style
// ============================================
interface CodeBlockProps {
  value: {
    code: string
    language?: string
    filename?: string
    highlightLines?: string
    showLineNumbers?: boolean
  }
}

export function CodeBlockBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(value.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = value.code.split('\n')

  return (
    <div className="my-8 rounded-2xl overflow-hidden bg-[#0d0d0f] border border-[#1a1a1f] shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0c] border-b border-[#1a1a1f]">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-lg shadow-red-500/20" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-lg shadow-yellow-500/20" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-lg shadow-green-500/20" />
          </div>
          {value.filename && (
            <span className="text-sm text-gray-400 font-mono ml-2">{value.filename}</span>
          )}
          {!value.filename && value.language && (
            <span className="text-xs text-gray-500 uppercase tracking-wider ml-2 px-2 py-0.5 rounded bg-[#1a1a1f]">
              {value.language}
            </span>
          )}
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1f] hover:bg-[#252530] text-gray-400 hover:text-white text-xs transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Kopiert!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Kopieren</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-5 text-sm leading-relaxed font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex hover:bg-white/5 -mx-5 px-5">
                {value.showLineNumbers !== false && (
                  <span className="select-none w-10 pr-4 text-right text-gray-600 flex-shrink-0">
                    {i + 1}
                  </span>
                )}
                <span className="text-gray-300">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

// ============================================
// STATS - Bold numbers with gradient
// ============================================
interface StatsProps {
  value: {
    items: Array<{
      value: string
      label: string
      prefix?: string
      suffix?: string
    }>
    layout?: 'row' | 'grid' | 'center'
    variant?: 'default' | 'cards' | 'minimal'
  }
}

export function StatsBlock({ value }: StatsProps) {
  const layout = value.layout || 'row'
  const variant = value.variant || 'default'

  const layoutClasses = {
    row: 'flex flex-wrap justify-around gap-8',
    grid: 'grid grid-cols-2 gap-6',
    center: 'flex flex-col items-center gap-6',
  }

  return (
    <div className={`my-10 py-8 ${variant === 'cards' ? 'bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)]' : ''}`}>
      <div className={layoutClasses[layout]}>
        {value.items?.map((item, i) => (
          <div
            key={i}
            className={`text-center ${variant === 'cards' ? 'p-4' : ''}`}
          >
            <div className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 bg-clip-text text-transparent">
                {item.prefix}{item.value}{item.suffix}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--theme-textSecondary)] uppercase tracking-wider">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// QUOTE - Elegant with large quote mark
// ============================================
interface QuoteProps {
  value: {
    text: string
    author?: string
    role?: string
    avatar?: any
    variant?: 'simple' | 'bordered' | 'highlighted' | 'large'
  }
}

export function QuoteBlock({ value }: QuoteProps) {
  const variant = value.variant || 'simple'

  return (
    <figure className={`my-10 relative ${variant === 'large' ? 'text-center py-8' : ''}`}>
      {/* Large decorative quote */}
      <Quote
        className={`absolute text-primary-500/10 ${
          variant === 'large'
            ? 'w-24 h-24 -top-4 left-1/2 -translate-x-1/2'
            : 'w-16 h-16 -top-2 -left-2'
        }`}
        strokeWidth={1}
      />

      <div className={`relative ${variant !== 'large' ? 'pl-8' : ''}`}>
        <blockquote className={`${
          variant === 'large'
            ? 'text-2xl md:text-3xl font-light'
            : 'text-lg'
        } italic text-[var(--theme-text)] leading-relaxed`}>
          &ldquo;{value.text}&rdquo;
        </blockquote>
      </div>

      {(value.author || value.role) && (
        <figcaption className={`mt-6 flex items-center gap-4 ${variant === 'large' ? 'justify-center' : ''}`}>
          {value.avatar?.asset && (
            <Image
              src={urlFor(value.avatar).width(48).height(48).url()}
              alt={value.author || ''}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-primary-500/20"
            />
          )}
          <div className={variant === 'large' ? 'text-center' : ''}>
            {value.author && (
              <p className="font-semibold text-[var(--theme-text)]">{value.author}</p>
            )}
            {value.role && (
              <p className="text-sm text-[var(--theme-textTertiary)]">{value.role}</p>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  )
}

// ============================================
// COMPARISON TABLE
// ============================================
interface ComparisonTableProps {
  value: {
    title?: string
    columns: Array<{ name: string; highlighted?: boolean }>
    rows: Array<{ feature: string; values: Array<{ value: string }> }>
  }
}

export function ComparisonTableBlock({ value }: ComparisonTableProps) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-[var(--theme-border)] shadow-lg">
      {value.title && (
        <div className="px-6 py-4 bg-[var(--theme-surface)] border-b border-[var(--theme-border)]">
          <h4 className="font-bold text-[var(--theme-text)]">{value.title}</h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--theme-surface)]">
              <th className="text-left px-6 py-4 text-sm font-medium text-[var(--theme-textTertiary)]">
                Feature
              </th>
              {value.columns?.map((col, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-center text-sm font-bold ${
                    col.highlighted
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-[var(--theme-text)]'
                  }`}
                >
                  {col.name}
                  {col.highlighted && (
                    <span className="flex items-center justify-center gap-1 text-xs font-medium text-primary-500 mt-1">
                      <Sparkles className="w-3 h-3" />
                      Empfohlen
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows?.map((row, i) => (
              <tr
                key={i}
                className="border-t border-[var(--theme-border)] hover:bg-[var(--theme-surface)]/50 transition-colors"
              >
                <td className="px-6 py-4 text-[var(--theme-textSecondary)]">{row.feature}</td>
                {row.values?.map((cell, j) => {
                  const isHighlighted = value.columns?.[j]?.highlighted
                  const cellValue = cell.value

                  return (
                    <td
                      key={j}
                      className={`px-6 py-4 text-center ${isHighlighted ? 'bg-primary-500/5' : ''}`}
                    >
                      {cellValue === 'true' ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      ) : cellValue === 'false' ? (
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                          <X className="w-4 h-4 text-red-400" strokeWidth={2} />
                        </div>
                      ) : (
                        <span className="text-[var(--theme-text)] font-medium">{cellValue}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================
// ACCORDION/FAQ - Smooth interactions only
// ============================================
interface AccordionProps {
  value: {
    title?: string
    items: Array<{ question: string; answer: string; defaultOpen?: boolean }>
    allowMultiple?: boolean
  }
}

export function AccordionBlock({ value }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const initial = new Set<number>()
    value.items?.forEach((item, i) => {
      if (item.defaultOpen) initial.add(i)
    })
    return initial
  })

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(value.allowMultiple ? prev : [])
      if (prev.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="my-10">
      {value.title && (
        <h4 className="text-lg font-bold text-[var(--theme-text)] mb-4">{value.title}</h4>
      )}
      <div className="space-y-3">
        {value.items?.map((item, i) => {
          const isOpen = openItems.has(i)
          return (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-all ${
                isOpen
                  ? 'border-primary-500/30 bg-primary-500/5 shadow-lg shadow-primary-500/5'
                  : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-borderHover)]'
              }`}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className={`font-semibold ${isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-[var(--theme-text)]'}`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isOpen ? 'bg-primary-500' : 'bg-[var(--theme-surfaceHover)]'
                  }`}
                >
                  <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-[var(--theme-textTertiary)]'}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-[var(--theme-textSecondary)] leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// VIDEO
// ============================================
interface VideoProps {
  value: {
    url: string
    title?: string
    caption?: string
    aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16'
  }
}

function getVideoEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export function VideoBlock({ value }: VideoProps) {
  const embedUrl = getVideoEmbedUrl(value.url)
  const [isPlaying, setIsPlaying] = useState(false)

  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '9/16': 'aspect-[9/16] max-w-sm mx-auto',
  }

  if (!embedUrl) return null

  return (
    <figure className="my-10">
      <div className={`relative ${aspectClasses[value.aspectRatio || '16/9']} rounded-2xl overflow-hidden bg-black shadow-2xl`}>
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 to-black/40 group cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
            </div>
          </button>
        ) : (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={value.title || 'Video'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--theme-textTertiary)]">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

// ============================================
// GALLERY
// ============================================
interface GalleryProps {
  value: {
    title?: string
    images: Array<{ asset: any; alt?: string; caption?: string }>
    layout?: 'grid-2' | 'grid-3' | 'masonry' | 'slider'
    lightbox?: boolean
  }
}

export function GalleryBlock({ value }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const layout = value.layout || 'grid-2'

  const layoutClasses = {
    'grid-2': 'grid grid-cols-2 gap-4',
    'grid-3': 'grid grid-cols-2 md:grid-cols-3 gap-4',
    masonry: 'columns-2 md:columns-3 gap-4',
    slider: 'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4',
  }

  return (
    <figure className="my-10">
      {value.title && (
        <h4 className="text-lg font-bold text-[var(--theme-text)] mb-4">{value.title}</h4>
      )}
      <div className={layoutClasses[layout]}>
        {value.images?.map((img, i) => (
          <div
            key={i}
            className={`relative ${layout === 'masonry' ? 'mb-4 break-inside-avoid' : ''} ${layout === 'slider' ? 'flex-shrink-0 w-72 snap-center' : ''}`}
          >
            <button
              onClick={() => value.lightbox !== false && setActiveImage(i)}
              className={`block w-full overflow-hidden rounded-xl ${value.lightbox !== false ? 'cursor-zoom-in' : ''}`}
            >
              <Image
                src={urlFor(img).width(600).url()}
                alt={img.alt || ''}
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] mx-4"
            >
              <Image
                src={urlFor(value.images[activeImage]).width(1200).url()}
                alt={value.images[activeImage]?.alt || ''}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto rounded-lg"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  )
}

// ============================================
// TIMELINE
// ============================================
interface TimelineProps {
  value: {
    title?: string
    items: Array<{ title: string; description?: string; date?: string; icon?: string }>
    layout?: 'vertical' | 'horizontal' | 'alternating'
    numbered?: boolean
  }
}

export function TimelineBlock({ value }: TimelineProps) {
  const numbered = value.numbered !== false

  return (
    <div className="my-10">
      {value.title && (
        <h4 className="text-lg font-bold text-[var(--theme-text)] mb-6">{value.title}</h4>
      )}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300" />

        <div className="space-y-6">
          {value.items?.map((item, i) => (
            <div key={i} className="relative pl-14">
              {/* Node */}
              <div className="absolute left-0 w-10 h-10 rounded-full bg-primary-500 border-4 border-[var(--theme-background)] flex items-center justify-center shadow-lg shadow-primary-500/30">
                {numbered ? (
                  <span className="text-sm font-bold text-white">{i + 1}</span>
                ) : (
                  <Zap className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Content */}
              <div className="bg-[var(--theme-surface)] rounded-2xl p-5 border border-[var(--theme-border)] shadow-sm">
                {item.date && (
                  <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">{item.date}</span>
                )}
                <h5 className="font-bold text-[var(--theme-text)] mt-1">{item.title}</h5>
                {item.description && (
                  <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// PERSON CARD
// ============================================
interface PersonCardProps {
  value: {
    name: string
    role?: string
    bio?: string
    image?: any
    links?: {
      email?: string
      website?: string
      linkedin?: string
      twitter?: string
    }
    layout?: 'horizontal' | 'vertical' | 'compact'
  }
}

export function PersonCardBlock({ value }: PersonCardProps) {
  const layout = value.layout || 'horizontal'

  if (layout === 'compact') {
    return (
      <div className="my-6 inline-flex items-center gap-3 bg-[var(--theme-surface)] rounded-full pl-1.5 pr-4 py-1.5 border border-[var(--theme-border)]">
        {value.image?.asset ? (
          <Image
            src={urlFor(value.image).width(40).height(40).url()}
            alt={value.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">{value.name[0]}</span>
          </div>
        )}
        <div>
          <p className="font-semibold text-sm text-[var(--theme-text)]">{value.name}</p>
          {value.role && (
            <p className="text-xs text-[var(--theme-textTertiary)]">{value.role}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`my-8 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)] overflow-hidden shadow-lg ${
      layout === 'horizontal' ? 'flex flex-col sm:flex-row' : ''
    }`}>
      {value.image?.asset && (
        <div className={layout === 'horizontal' ? 'sm:w-48 flex-shrink-0' : ''}>
          <Image
            src={urlFor(value.image).width(300).height(300).url()}
            alt={value.name}
            width={300}
            height={300}
            className={`w-full ${layout === 'horizontal' ? 'h-48 sm:h-full' : 'aspect-square'} object-cover`}
          />
        </div>
      )}
      <div className="p-6 flex-1">
        <h4 className="text-xl font-bold text-[var(--theme-text)]">{value.name}</h4>
        {value.role && (
          <p className="text-primary-500 font-semibold mt-1">{value.role}</p>
        )}
        {value.bio && (
          <p className="mt-3 text-[var(--theme-textSecondary)] text-sm leading-relaxed">{value.bio}</p>
        )}
        {value.links && (
          <div className="mt-4 flex gap-2">
            {value.links.email && (
              <a href={`mailto:${value.links.email}`} className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            )}
            {value.links.website && (
              <a href={value.links.website} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
            {value.links.linkedin && (
              <a href={value.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {value.links.twitter && (
              <a href={value.links.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// FILE DOWNLOAD
// ============================================
interface FileDownloadProps {
  value: {
    title: string
    description?: string
    file?: { asset: { url: string } }
    externalUrl?: string
    fileType?: 'pdf' | 'doc' | 'xls' | 'zip' | 'image' | 'video' | 'other'
    fileSize?: string
  }
}

const fileIcons = {
  pdf: FileText,
  doc: FileText,
  xls: FileSpreadsheet,
  zip: FileArchive,
  image: FileImage,
  video: FileVideo,
  other: File,
}

const fileColors = {
  pdf: 'bg-red-500',
  doc: 'bg-blue-500',
  xls: 'bg-emerald-500',
  zip: 'bg-amber-500',
  image: 'bg-violet-500',
  video: 'bg-pink-500',
  other: 'bg-gray-500',
}

export function FileDownloadBlock({ value }: FileDownloadProps) {
  const url = value.file?.asset?.url || value.externalUrl
  const type = value.fileType || 'other'
  const Icon = fileIcons[type]

  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="my-6 flex items-center gap-4 p-5 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)] hover:border-primary-500/50 hover:shadow-lg transition-all group"
    >
      <div className={`w-12 h-12 rounded-xl ${fileColors[type]} flex items-center justify-center shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--theme-text)] group-hover:text-primary-500 transition-colors">
          {value.title}
        </p>
        {(value.description || value.fileSize) && (
          <p className="text-sm text-[var(--theme-textTertiary)] mt-0.5">
            {value.description}
            {value.description && value.fileSize && ' · '}
            {value.fileSize}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-full bg-[var(--theme-surfaceHover)] group-hover:bg-primary-500 flex items-center justify-center transition-colors">
        <Download className="w-5 h-5 text-[var(--theme-textTertiary)] group-hover:text-white transition-colors" />
      </div>
    </a>
  )
}

// ============================================
// TABLE
// ============================================
interface TableProps {
  value: {
    title?: string
    headers?: string[]
    rows?: Array<{ cells?: string[] }>
    striped?: boolean
    compact?: boolean
  }
}

export function TableBlock({ value }: TableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--theme-border)] shadow-sm">
      {value.title && (
        <div className="px-6 py-4 bg-[var(--theme-surface)] border-b border-[var(--theme-border)]">
          <h4 className="font-bold text-[var(--theme-text)]">{value.title}</h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          {value.headers && value.headers.length > 0 && (
            <thead>
              <tr className="bg-[var(--theme-surface)]">
                {value.headers.map((header, i) => (
                  <th
                    key={i}
                    className={`text-left px-6 ${value.compact ? 'py-3' : 'py-4'} text-sm font-bold text-[var(--theme-text)]`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {value.rows?.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-[var(--theme-border)] ${
                  value.striped !== false && i % 2 === 1 ? 'bg-[var(--theme-surface)]/50' : ''
                }`}
              >
                {row.cells?.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-6 ${value.compact ? 'py-3' : 'py-4'} text-[var(--theme-textSecondary)]`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================
// INFO BOX
// ============================================
interface InfoBoxProps {
  value: {
    title?: string
    content: string
    icon?: string
    variant?: 'default' | 'highlighted' | 'bordered' | 'filled'
  }
}

export function InfoBoxBlock({ value }: InfoBoxProps) {
  const variant = value.variant || 'default'

  const variantClasses = {
    default: 'bg-[var(--theme-surface)] border-[var(--theme-border)]',
    highlighted: 'bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-primary-500/30',
    bordered: 'bg-transparent border-[var(--theme-border)] border-2',
    filled: 'bg-primary-500/10 border-primary-500/20',
  }

  return (
    <div className={`my-8 rounded-2xl border p-6 ${variantClasses[variant]}`}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20">
          <Info className="w-5 h-5 text-white" />
        </div>
        <div>
          {value.title && (
            <h4 className="font-bold text-[var(--theme-text)] mb-2">{value.title}</h4>
          )}
          <p className="text-[var(--theme-textSecondary)] leading-relaxed">{value.content}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PRICING CARD
// ============================================
interface PricingCardProps {
  value: {
    title: string
    price: string
    currency?: string
    interval?: 'month' | 'year' | 'once' | 'custom'
    description?: string
    features?: Array<{ text: string; included?: boolean }>
    ctaText?: string
    ctaUrl?: string
    highlighted?: boolean
    badge?: string
  }
}

export function PricingCardBlock({ value }: PricingCardProps) {
  const intervalLabels = {
    month: '/Monat',
    year: '/Jahr',
    once: 'einmalig',
    custom: '',
  }

  return (
    <div className={`my-8 rounded-2xl overflow-hidden ${
      value.highlighted
        ? 'bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-2 border-primary-500/30 shadow-xl shadow-primary-500/10'
        : 'bg-[var(--theme-surface)] border border-[var(--theme-border)]'
    }`}>
      <div className="p-6">
        {/* Badge */}
        {value.badge && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary-500 text-white mb-4">
            <Sparkles className="w-3 h-3" />
            {value.badge}
          </span>
        )}

        {/* Title */}
        <h4 className="text-xl font-bold text-[var(--theme-text)]">{value.title}</h4>
        {value.description && (
          <p className="text-sm text-[var(--theme-textSecondary)] mt-1">{value.description}</p>
        )}

        {/* Price */}
        <div className="mt-4">
          <span className="text-4xl font-black bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
            {value.price}
          </span>
          <span className="text-lg text-[var(--theme-textSecondary)] ml-1">
            {value.currency || 'EUR'}
          </span>
          {value.interval && (
            <span className="text-[var(--theme-textTertiary)]">
              {intervalLabels[value.interval]}
            </span>
          )}
        </div>

        {/* Features */}
        {value.features && value.features.length > 0 && (
          <ul className="mt-6 space-y-3">
            {value.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                {feature.included !== false ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[var(--theme-surfaceHover)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-[var(--theme-textTertiary)]" />
                  </div>
                )}
                <span className={feature.included !== false ? 'text-[var(--theme-textSecondary)]' : 'text-[var(--theme-textTertiary)]'}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        {value.ctaUrl && (
          <Link
            href={value.ctaUrl}
            className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              value.highlighted
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-[var(--theme-surfaceHover)] hover:bg-primary-500 text-[var(--theme-text)] hover:text-white'
            }`}
          >
            {value.ctaText || 'Jetzt starten'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

// ============================================
// EMBED
// ============================================
interface EmbedProps {
  value: {
    url: string
    caption?: string
  }
}

export function EmbedBlock({ value }: EmbedProps) {
  return (
    <div className="my-8">
      <a
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)] hover:border-primary-500/50 hover:shadow-lg transition-all group"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
          <ExternalLink className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[var(--theme-text)] group-hover:text-primary-500 transition-colors truncate">
            {value.url}
          </p>
          {value.caption && (
            <p className="text-sm text-[var(--theme-textTertiary)] mt-0.5">{value.caption}</p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-[var(--theme-textTertiary)] group-hover:text-primary-500 transition-colors" />
      </a>
    </div>
  )
}

// ============================================
// EXPORT ALL RENDERERS (no newsletter)
// ============================================
export const customBlockComponents = {
  callout: CalloutBlock,
  ctaButton: CTAButtonBlock,
  featureList: FeatureListBlock,
  proConList: ProConListBlock,
  divider: DividerBlock,
  codeBlock: CodeBlockBlock,
  stats: StatsBlock,
  quote: QuoteBlock,
  comparisonTable: ComparisonTableBlock,
  accordion: AccordionBlock,
  video: VideoBlock,
  gallery: GalleryBlock,
  timeline: TimelineBlock,
  personCard: PersonCardBlock,
  fileDownload: FileDownloadBlock,
  table: TableBlock,
  infoBox: InfoBoxBlock,
  pricingCard: PricingCardBlock,
  embed: EmbedBlock,
}
