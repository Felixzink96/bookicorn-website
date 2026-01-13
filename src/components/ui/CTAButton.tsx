'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getRegisterUrl, getLoginUrl } from '@/lib/config'
import { cn } from '@/lib/utils'

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25
}

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'white'
  size?: 'sm' | 'md' | 'lg'
  plan?: string
  children: React.ReactNode
  className?: string
}

export function RegisterButton({
  variant = 'primary',
  size = 'md',
  plan,
  children,
  className = '',
}: CTAButtonProps) {
  const href = getRegisterUrl(plan)

  const baseStyles = 'inline-flex items-center justify-center font-medium cursor-pointer'

  const sizeStyles = {
    sm: variant === 'primary' ? 'text-sm' : 'px-3 py-1.5 text-sm gap-2 rounded-full',
    md: variant === 'primary' ? 'text-base' : 'px-5 py-2.5 text-base gap-2 rounded-full',
    lg: variant === 'primary' ? 'text-lg' : 'px-6 py-3 text-lg gap-3 rounded-full',
  }

  // Primary variant with rainbow gradient
  if (variant === 'primary') {
    return (
      <Link href={href}>
        <motion.span
          className={cn(
            baseStyles,
            'btn-rainbow-gradient text-[var(--theme-text)]',
            sizeStyles[size],
            className
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          <span className="btn-content-wrapper">
            <span className="whitespace-nowrap">{children}</span>
          </span>
        </motion.span>
      </Link>
    )
  }

  // White variant
  if (variant === 'white') {
    return (
      <Link href={href}>
        <motion.span
          className={cn(
            baseStyles,
            'bg-white text-[var(--theme-background)] hover:bg-gray-100',
            sizeStyles[size],
            className
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          <span className="whitespace-nowrap">{children}</span>
        </motion.span>
      </Link>
    )
  }

  // Secondary variant
  return (
    <Link href={href}>
      <motion.span
        className={cn(
          baseStyles,
          'bg-[var(--theme-surface)] text-[var(--theme-text)] border border-[var(--theme-border)] hover:bg-[var(--theme-surfaceHover)]',
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
      >
        <span className="whitespace-nowrap">{children}</span>
      </motion.span>
    </Link>
  )
}

export function LoginButton({
  variant = 'secondary',
  size = 'md',
  children,
  className = '',
}: Omit<CTAButtonProps, 'plan'>) {
  const href = getLoginUrl()

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors'

  const variants = {
    primary: 'text-[var(--theme-text)]',
    secondary: 'text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)]',
    white: 'text-white hover:text-gray-200',
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
