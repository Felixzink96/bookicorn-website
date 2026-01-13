'use client'

import { useState } from 'react'
import { Link2, Linkedin, Twitter, Facebook, Check } from 'lucide-react'

interface SocialShareProps {
  url: string
  title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
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
