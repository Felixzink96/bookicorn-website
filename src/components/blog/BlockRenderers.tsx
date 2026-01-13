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
  StickyNote,
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
  Clock,
  Send,
} from 'lucide-react'
import { urlFor } from '../../../sanity/lib/image'

// ============================================
// CALLOUT BOX
// ============================================
interface CalloutProps {
  value: {
    variant?: 'info' | 'tip' | 'warning' | 'success' | 'note'
    title?: string
    content: string
  }
}

const calloutConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-600 dark:text-blue-400',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-600 dark:text-amber-400',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    iconColor: 'text-red-500',
    titleColor: 'text-red-600 dark:text-red-400',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-500',
    titleColor: 'text-emerald-600 dark:text-emerald-400',
  },
  note: {
    icon: StickyNote,
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-500',
    titleColor: 'text-violet-600 dark:text-violet-400',
  },
}

export function CalloutBlock({ value }: CalloutProps) {
  const variant = value.variant || 'info'
  const config = calloutConfig[variant]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 rounded-2xl ${config.bg} ${config.border} border overflow-hidden`}
    >
      <div className="p-5 flex gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          {value.title && (
            <p className={`font-semibold mb-1 ${config.titleColor}`}>{value.title}</p>
          )}
          <p className="text-[var(--theme-textSecondary)] leading-relaxed">{value.content}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// CTA BUTTON
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
  const variant = value.variant || 'primary'
  const size = value.size || 'md'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25',
    secondary: 'bg-[var(--theme-surface)] hover:bg-[var(--theme-surfaceHover)] text-[var(--theme-text)] border border-[var(--theme-border)]',
    ghost: 'bg-transparent hover:bg-[var(--theme-surface)] text-[var(--theme-text)]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`my-8 ${value.fullWidth ? 'w-full' : 'inline-block'}`}
    >
      <Link
        href={value.url}
        target={value.url.startsWith('http') ? '_blank' : undefined}
        rel={value.url.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`
          inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all
          ${sizeClasses[size]} ${variantClasses[variant]} ${value.fullWidth ? 'w-full' : ''}
        `}
      >
        <motion.span whileHover={{ x: 3 }} className="flex items-center gap-2">
          {value.text}
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </Link>
    </motion.div>
  )
}

// ============================================
// FEATURE LIST
// ============================================
interface FeatureListProps {
  value: {
    title?: string
    items: Array<{ text: string; highlighted?: boolean }>
    style?: 'check' | 'bullet' | 'number' | 'arrow' | 'plus'
    columns?: 1 | 2 | 3
  }
}

const listIcons = {
  check: Check,
  bullet: () => <span className="w-2 h-2 rounded-full bg-primary-500" />,
  number: null,
  arrow: ChevronRight,
  plus: Plus,
}

export function FeatureListBlock({ value }: FeatureListProps) {
  const style = value.style || 'check'
  const columns = value.columns || 1
  const Icon = listIcons[style]

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8"
    >
      {value.title && (
        <h4 className="text-lg font-semibold text-[var(--theme-text)] mb-4">{value.title}</h4>
      )}
      <ul className={`grid gap-3 ${columnClasses[columns]}`}>
        {value.items?.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 ${
              item.highlighted
                ? 'bg-primary-500/10 rounded-xl p-3 -mx-3'
                : ''
            }`}
          >
            {style === 'number' ? (
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 text-primary-600 text-sm font-medium flex items-center justify-center">
                {index + 1}
              </span>
            ) : Icon ? (
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                {typeof Icon === 'function' && Icon.toString().includes('span') ? (
                  <Icon />
                ) : (
                  <Icon className="w-3.5 h-3.5 text-primary-500" />
                )}
              </span>
            ) : (
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
              </span>
            )}
            <span className={`text-[var(--theme-textSecondary)] ${item.highlighted ? 'font-medium text-[var(--theme-text)]' : ''}`}>
              {item.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

// ============================================
// PRO/CONTRA LIST
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

  const ProsList = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-emerald-500/10 rounded-2xl p-5 border border-emerald-500/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-emerald-500" />
        </div>
        <h4 className="font-semibold text-emerald-600 dark:text-emerald-400">Vorteile</h4>
      </div>
      <ul className="space-y-2">
        {value.pros?.map((pro, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-2 text-[var(--theme-textSecondary)]"
          >
            <Plus className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            {pro}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )

  const ConsList = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-red-500/10 rounded-2xl p-5 border border-red-500/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
          <X className="w-4 h-4 text-red-500" />
        </div>
        <h4 className="font-semibold text-red-600 dark:text-red-400">Nachteile</h4>
      </div>
      <ul className="space-y-2">
        {value.cons?.map((con, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-2 text-[var(--theme-textSecondary)]"
          >
            <Minus className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            {con}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )

  return (
    <div className={`my-8 ${layout === 'side-by-side' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}`}>
      {value.pros && value.pros.length > 0 && <ProsList />}
      {value.cons && value.cons.length > 0 && <ConsList />}
    </div>
  )
}

// ============================================
// DIVIDER
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
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-10 flex items-center justify-center"
    >
      {style === 'line' ? (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent" />
      ) : (
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--theme-border)]"
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// CODE BLOCK
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl overflow-hidden bg-[#0a0a0b] border border-[#222]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#222]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {value.filename && (
            <span className="text-sm text-gray-400 font-mono">{value.filename}</span>
          )}
          {!value.filename && value.language && (
            <span className="text-xs text-gray-500 uppercase tracking-wider">{value.language}</span>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyCode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#222] text-gray-400 hover:text-white text-xs transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Kopiert</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Kopieren</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
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
    </motion.div>
  )
}

// ============================================
// STATS
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
    row: 'flex flex-wrap justify-center gap-8 md:gap-12',
    grid: 'grid grid-cols-2 gap-6',
    center: 'flex flex-col items-center gap-6',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-10 ${variant === 'cards' ? 'bg-[var(--theme-surface)] rounded-2xl p-8 border border-[var(--theme-border)]' : ''}`}
    >
      <div className={layoutClasses[layout]}>
        {value.items?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`text-center ${variant === 'cards' ? 'bg-[var(--theme-background)] rounded-xl p-5' : ''}`}
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
              {item.prefix}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
              >
                {item.value}
              </motion.span>
              {item.suffix}
            </div>
            <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// QUOTE
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

  const variantClasses = {
    simple: '',
    bordered: 'border border-[var(--theme-border)] rounded-2xl p-6',
    highlighted: 'bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-2xl p-6 border border-primary-500/20',
    large: 'text-center py-8',
  }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-10 ${variantClasses[variant]}`}
    >
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-500/30" />
        <blockquote className={`pl-8 ${variant === 'large' ? 'text-2xl md:text-3xl' : 'text-lg'} italic text-[var(--theme-text)] leading-relaxed`}>
          "{value.text}"
        </blockquote>
      </div>
      {(value.author || value.role) && (
        <figcaption className="mt-6 flex items-center gap-4">
          {value.avatar?.asset && (
            <Image
              src={urlFor(value.avatar).width(48).height(48).url()}
              alt={value.author || ''}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            {value.author && (
              <p className="font-semibold text-[var(--theme-text)]">{value.author}</p>
            )}
            {value.role && (
              <p className="text-sm text-[var(--theme-textTertiary)]">{value.role}</p>
            )}
          </div>
        </figcaption>
      )}
    </motion.figure>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 overflow-hidden rounded-2xl border border-[var(--theme-border)]"
    >
      {value.title && (
        <div className="px-6 py-4 bg-[var(--theme-surface)] border-b border-[var(--theme-border)]">
          <h4 className="font-semibold text-[var(--theme-text)]">{value.title}</h4>
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
                  className={`px-6 py-4 text-center text-sm font-semibold ${
                    col.highlighted
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-[var(--theme-text)]'
                  }`}
                >
                  {col.name}
                  {col.highlighted && (
                    <span className="block text-xs font-normal text-primary-500 mt-0.5">
                      Empfohlen
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows?.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-[var(--theme-border)]"
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
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : cellValue === 'false' ? (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-[var(--theme-text)]">{cellValue}</span>
                      )}
                    </td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// ============================================
// ACCORDION/FAQ
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      {value.title && (
        <h4 className="text-lg font-semibold text-[var(--theme-text)] mb-4">{value.title}</h4>
      )}
      <div className="space-y-3">
        {value.items?.map((item, i) => {
          const isOpen = openItems.has(i)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border overflow-hidden transition-colors ${
                isOpen
                  ? 'border-primary-500/30 bg-primary-500/5'
                  : 'border-[var(--theme-border)] bg-[var(--theme-surface)]'
              }`}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className={`font-medium ${isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-[var(--theme-text)]'}`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary-500' : 'text-[var(--theme-textTertiary)]'}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-[var(--theme-textSecondary)] leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
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
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
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
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <div className={`relative ${aspectClasses[value.aspectRatio || '16/9']} rounded-2xl overflow-hidden bg-black`}>
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 to-black/40 group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-2xl"
            >
              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
            </motion.div>
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
    </motion.figure>
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
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      {value.title && (
        <h4 className="text-lg font-semibold text-[var(--theme-text)] mb-4">{value.title}</h4>
      )}
      <div className={layoutClasses[layout]}>
        {value.images?.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
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
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
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
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.figure>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      {value.title && (
        <h4 className="text-lg font-semibold text-[var(--theme-text)] mb-6">{value.title}</h4>
      )}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300" />

        <div className="space-y-8">
          {value.items?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-14"
            >
              {/* Node */}
              <div className="absolute left-0 w-10 h-10 rounded-full bg-primary-500/20 border-2 border-primary-500 flex items-center justify-center">
                {numbered ? (
                  <span className="text-sm font-bold text-primary-500">{i + 1}</span>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </div>

              {/* Content */}
              <div className="bg-[var(--theme-surface)] rounded-2xl p-5 border border-[var(--theme-border)]">
                {item.date && (
                  <span className="text-xs text-primary-500 font-medium">{item.date}</span>
                )}
                <h5 className="font-semibold text-[var(--theme-text)] mt-1">{item.title}</h5>
                {item.description && (
                  <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="my-6 inline-flex items-center gap-3 bg-[var(--theme-surface)] rounded-full pl-1.5 pr-4 py-1.5 border border-[var(--theme-border)]"
      >
        {value.image?.asset ? (
          <Image
            src={urlFor(value.image).width(40).height(40).url()}
            alt={value.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary-500">{value.name[0]}</span>
          </div>
        )}
        <div>
          <p className="font-medium text-sm text-[var(--theme-text)]">{value.name}</p>
          {value.role && (
            <p className="text-xs text-[var(--theme-textTertiary)]">{value.role}</p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-8 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)] overflow-hidden ${
        layout === 'horizontal' ? 'flex flex-col sm:flex-row' : ''
      }`}
    >
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
          <p className="text-primary-500 font-medium mt-1">{value.role}</p>
        )}
        {value.bio && (
          <p className="mt-3 text-[var(--theme-textSecondary)] text-sm leading-relaxed">{value.bio}</p>
        )}
        {value.links && (
          <div className="mt-4 flex gap-2">
            {value.links.email && (
              <a href={`mailto:${value.links.email}`} className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500/20 transition-colors">
                <Mail className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
            {value.links.website && (
              <a href={value.links.website} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500/20 transition-colors">
                <Globe className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
            {value.links.linkedin && (
              <a href={value.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500/20 transition-colors">
                <Linkedin className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
            {value.links.twitter && (
              <a href={value.links.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[var(--theme-surfaceHover)] flex items-center justify-center hover:bg-primary-500/20 transition-colors">
                <Twitter className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
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
  pdf: 'text-red-500 bg-red-500/10',
  doc: 'text-blue-500 bg-blue-500/10',
  xls: 'text-emerald-500 bg-emerald-500/10',
  zip: 'text-amber-500 bg-amber-500/10',
  image: 'text-violet-500 bg-violet-500/10',
  video: 'text-pink-500 bg-pink-500/10',
  other: 'text-gray-500 bg-gray-500/10',
}

export function FileDownloadBlock({ value }: FileDownloadProps) {
  const url = value.file?.asset?.url || value.externalUrl
  const type = value.fileType || 'other'
  const Icon = fileIcons[type]

  if (!url) return null

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="my-6 flex items-center gap-4 p-5 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)] hover:border-primary-500/50 transition-colors group"
    >
      <div className={`w-12 h-12 rounded-xl ${fileColors[type]} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--theme-text)] group-hover:text-primary-500 transition-colors">
          {value.title}
        </p>
        {(value.description || value.fileSize) && (
          <p className="text-sm text-[var(--theme-textTertiary)] mt-0.5">
            {value.description}
            {value.description && value.fileSize && ' - '}
            {value.fileSize}
          </p>
        )}
      </div>
      <Download className="w-5 h-5 text-[var(--theme-textTertiary)] group-hover:text-primary-500 transition-colors" />
    </motion.a>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 overflow-hidden rounded-2xl border border-[var(--theme-border)]"
    >
      {value.title && (
        <div className="px-6 py-4 bg-[var(--theme-surface)] border-b border-[var(--theme-border)]">
          <h4 className="font-semibold text-[var(--theme-text)]">{value.title}</h4>
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
                    className={`text-left px-6 ${value.compact ? 'py-3' : 'py-4'} text-sm font-semibold text-[var(--theme-text)]`}
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
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-8 rounded-2xl border p-6 ${variantClasses[variant]}`}
    >
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-primary-500" />
        </div>
        <div>
          {value.title && (
            <h4 className="font-semibold text-[var(--theme-text)] mb-2">{value.title}</h4>
          )}
          <p className="text-[var(--theme-textSecondary)] leading-relaxed">{value.content}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// NEWSLETTER BOX
// ============================================
interface NewsletterBoxProps {
  value: {
    title?: string
    description?: string
    buttonText?: string
    variant?: 'default' | 'compact' | 'filled'
  }
}

export function NewsletterBoxBlock({ value }: NewsletterBoxProps) {
  const [email, setEmail] = useState('')
  const variant = value.variant || 'default'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="my-8"
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail eingeben..."
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text)] placeholder:text-[var(--theme-textTertiary)] focus:outline-none focus:border-primary-500"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            {value.buttonText || 'Abonnieren'}
          </motion.button>
        </form>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-10 rounded-2xl overflow-hidden ${
        variant === 'filled'
          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
          : 'bg-[var(--theme-surface)] border border-[var(--theme-border)]'
      }`}
    >
      <div className="p-8 text-center">
        <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
          variant === 'filled' ? 'bg-white/20' : 'bg-primary-500/20'
        }`}>
          <Send className={`w-6 h-6 ${variant === 'filled' ? 'text-white' : 'text-primary-500'}`} />
        </div>
        <h4 className={`text-xl font-bold mb-2 ${variant === 'filled' ? 'text-white' : 'text-[var(--theme-text)]'}`}>
          {value.title || 'Newsletter abonnieren'}
        </h4>
        {value.description && (
          <p className={`mb-6 ${variant === 'filled' ? 'text-white/80' : 'text-[var(--theme-textSecondary)]'}`}>
            {value.description}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine E-Mail-Adresse"
            className={`flex-1 px-4 py-3 rounded-xl focus:outline-none ${
              variant === 'filled'
                ? 'bg-white/20 border border-white/30 text-white placeholder:text-white/60'
                : 'bg-[var(--theme-background)] border border-[var(--theme-border)] text-[var(--theme-text)] placeholder:text-[var(--theme-textTertiary)]'
            }`}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              variant === 'filled'
                ? 'bg-white text-primary-600 hover:bg-white/90'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {value.buttonText || 'Abonnieren'}
          </motion.button>
        </form>
      </div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-8 rounded-2xl overflow-hidden ${
        value.highlighted
          ? 'bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-2 border-primary-500/30 shadow-xl shadow-primary-500/10'
          : 'bg-[var(--theme-surface)] border border-[var(--theme-border)]'
      }`}
    >
      <div className="p-6">
        {/* Badge */}
        {value.badge && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-500 text-white mb-4">
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
          <span className="text-4xl font-bold text-[var(--theme-text)]">
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
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-[var(--theme-textTertiary)] flex-shrink-0" />
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
            className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              value.highlighted
                ? 'bg-primary-500 hover:bg-primary-600 text-white'
                : 'bg-[var(--theme-surfaceHover)] hover:bg-primary-500/20 text-[var(--theme-text)]'
            }`}
          >
            {value.ctaText || 'Jetzt starten'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
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
  // For now, just show a link - full oEmbed would require server-side fetching
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8"
    >
      <a
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-5 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)] hover:border-primary-500/50 transition-colors group"
      >
        <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
          <ExternalLink className="w-5 h-5 text-primary-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[var(--theme-text)] group-hover:text-primary-500 transition-colors truncate">
            {value.url}
          </p>
          {value.caption && (
            <p className="text-sm text-[var(--theme-textTertiary)] mt-0.5">{value.caption}</p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-[var(--theme-textTertiary)] group-hover:text-primary-500 transition-colors" />
      </a>
    </motion.div>
  )
}

// ============================================
// EXPORT ALL RENDERERS
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
  newsletterBox: NewsletterBoxBlock,
  pricingCard: PricingCardBlock,
  embed: EmbedBlock,
}
