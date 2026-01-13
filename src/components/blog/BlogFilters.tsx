'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Filter, X, ChevronDown, Search } from 'lucide-react'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  color?: string
}

interface BlogFiltersProps {
  categories: Category[]
}

const readTimeOptions = [
  { label: 'Alle', value: '' },
  { label: 'Kurz (< 5 min)', value: 'short' },
  { label: 'Mittel (5-10 min)', value: 'medium' },
  { label: 'Lang (> 10 min)', value: 'long' },
]

const sortOptions = [
  { label: 'Neueste zuerst', value: 'newest' },
  { label: 'Älteste zuerst', value: 'oldest' },
  { label: 'Kürzeste zuerst', value: 'shortest' },
  { label: 'Längste zuerst', value: 'longest' },
]

export function BlogFilters({ categories }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const selectedCategory = searchParams.get('category') || ''
  const selectedReadTime = searchParams.get('readTime') || ''
  const sortBy = searchParams.get('sort') || 'newest'
  const searchQuery = searchParams.get('q') || ''

  const updateParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/blog?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const clearFilters = () => {
    router.push('/blog', { scroll: false })
  }

  const activeFiltersCount = [selectedCategory, selectedReadTime, searchQuery].filter(Boolean).length

  return (
    <>
      {/* Search & Filter Toggle Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-textTertiary)]" />
          <input
            type="text"
            placeholder="Artikel durchsuchen..."
            value={searchQuery}
            onChange={(e) => updateParams({ q: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text)] placeholder:text-[var(--theme-textTertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-colors
            ${showFilters || activeFiltersCount > 0
              ? 'bg-primary-500/10 border-primary-500/30 text-primary-600'
              : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-surfaceHover)]'
            }
          `}
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filter</span>
          {activeFiltersCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-500 text-white text-xs font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="appearance-none w-full sm:w-auto pl-4 pr-10 py-2.5 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-textTertiary)] pointer-events-none" />
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-4 p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
          <div className="flex flex-wrap gap-6">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider mb-2">
                Kategorie
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateParams({ category: '' })}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    !selectedCategory
                      ? 'bg-primary-500 text-white'
                      : 'bg-[var(--theme-surfaceHover)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-border)]'
                  }`}
                >
                  Alle
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => updateParams({ category: cat.title })}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.title
                        ? 'text-white'
                        : 'text-[var(--theme-textSecondary)] hover:bg-[var(--theme-border)]'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === cat.title
                        ? cat.color || 'var(--primary-500)'
                        : 'var(--theme-surfaceHover)',
                    }}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Read Time Filter */}
            <div className="min-w-[200px]">
              <label className="block text-xs font-medium text-[var(--theme-textTertiary)] uppercase tracking-wider mb-2">
                Lesezeit
              </label>
              <div className="flex flex-wrap gap-2">
                {readTimeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateParams({ readTime: option.value })}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      (selectedReadTime || '') === option.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-[var(--theme-surfaceHover)] text-[var(--theme-textSecondary)] hover:bg-[var(--theme-border)]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--theme-border)]">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-[var(--theme-textSecondary)] hover:text-primary-600 transition-colors"
              >
                <X className="w-4 h-4" />
                Alle Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Pills */}
      {activeFiltersCount > 0 && !showFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 text-sm">
              {selectedCategory}
              <button onClick={() => updateParams({ category: '' })} className="hover:text-primary-800">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {selectedReadTime && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 text-sm">
              {readTimeOptions.find(o => o.value === selectedReadTime)?.label}
              <button onClick={() => updateParams({ readTime: '' })} className="hover:text-primary-800">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 text-sm">
              "{searchQuery}"
              <button onClick={() => updateParams({ q: '' })} className="hover:text-primary-800">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </>
  )
}
