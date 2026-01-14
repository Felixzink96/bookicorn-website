'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getLoginUrl } from '@/lib/config'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Button from '@/components/ui/Button'
import BookicornLogo from '@/components/icons/BookicornLogo'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Preise', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Dokumentation', href: '/docs' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dynamische URLs
  const loginUrl = getLoginUrl()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--theme-background)]/80 backdrop-blur-xl border-b border-[var(--theme-border)]/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BookicornLogo className="h-8 w-auto" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons + Theme Toggle */}
          <motion.div
            className="hidden md:flex md:items-center md:gap-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ThemeToggle />
            <Link
              href={loginUrl}
              className="text-sm font-medium text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] transition-colors"
            >
              Anmelden
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Anfragen
              </Button>
            </Link>
          </motion.div>

          {/* Mobile: Theme Toggle + Menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surface)] hover:text-[var(--theme-text)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Menu</span>
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surface)] hover:text-[var(--theme-text)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="border-t border-[var(--theme-border)] pt-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href={loginUrl}
                    className="block rounded-md px-3 py-2 text-base font-medium text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surface)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Anmelden
                  </Link>
                  <div className="px-3 mt-2">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth>
                        Anfragen
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
