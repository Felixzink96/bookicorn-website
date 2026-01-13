'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Twitter } from 'lucide-react'
import { urlFor } from '../../../../sanity/lib/image'

interface PersonCardProps {
  value: {
    name?: string
    role?: string
    bio?: string
    image?: { asset: { _ref: string } }
    email?: string
    linkedin?: string
    twitter?: string
  }
}

export function PersonCard({ value }: PersonCardProps) {
  const hasImage = value.image?.asset?._ref
  const hasSocials = value.email || value.linkedin || value.twitter

  return (
    <motion.div
      className="my-8 flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Avatar */}
      {hasImage ? (
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary-500/20">
          <Image
            src={urlFor(value.image!.asset).width(160).height(160).url()}
            alt={value.name || ''}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          {value.name?.charAt(0) || '?'}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[var(--theme-text)]">{value.name}</h4>
        {value.role && (
          <p className="text-sm text-primary-600 font-medium">{value.role}</p>
        )}
        {value.bio && (
          <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
            {value.bio}
          </p>
        )}

        {/* Social Links */}
        {hasSocials && (
          <div className="mt-4 flex items-center gap-2">
            {value.email && (
              <a
                href={`mailto:${value.email}`}
                className="p-2 rounded-lg bg-[var(--theme-background)] hover:bg-primary-500/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
            {value.linkedin && (
              <a
                href={value.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--theme-background)] hover:bg-primary-500/10 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
            {value.twitter && (
              <a
                href={value.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--theme-background)] hover:bg-primary-500/10 transition-colors"
              >
                <Twitter className="w-4 h-4 text-[var(--theme-textSecondary)]" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
