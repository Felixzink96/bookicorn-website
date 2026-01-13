'use client'

import { Check, X } from 'lucide-react'

interface ProConListProps {
  value: {
    pros?: string[]
    cons?: string[]
    layout?: 'side-by-side' | 'stacked'
  }
}

export function ProConList({ value }: ProConListProps) {
  const pros = value.pros || []
  const cons = value.cons || []
  const layout = value.layout || 'side-by-side'

  if (layout === 'stacked') {
    return (
      <div className="my-8 space-y-4">
        {/* Pros */}
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 overflow-hidden">
          <div className="bg-emerald-500 px-5 py-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Check className="w-5 h-5" />
              Vorteile
            </h4>
          </div>
          <ul className="p-5 space-y-3">
            {pros.map((pro, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[var(--theme-text)]"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-500" />
                </span>
                <span className="text-sm">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="rounded-2xl bg-red-500/5 border border-red-500/20 overflow-hidden">
          <div className="bg-red-500 px-5 py-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <X className="w-5 h-5" />
              Nachteile
            </h4>
          </div>
          <ul className="p-5 space-y-3">
            {cons.map((con, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[var(--theme-text)]"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                  <X className="w-3 h-3 text-red-500" />
                </span>
                <span className="text-sm">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // Side-by-side layout
  return (
    <div className="my-8 grid md:grid-cols-2 gap-4">
      {/* Pros */}
      <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 overflow-hidden">
        <div className="bg-emerald-500 px-5 py-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Check className="w-5 h-5" />
            Vorteile
          </h4>
        </div>
        <ul className="p-5 space-y-3">
          {pros.map((pro, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[var(--theme-text)]"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-emerald-500" />
              </span>
              <span className="text-sm">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 overflow-hidden">
        <div className="bg-red-500 px-5 py-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <X className="w-5 h-5" />
            Nachteile
          </h4>
        </div>
        <ul className="p-5 space-y-3">
          {cons.map((con, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[var(--theme-text)]"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                <X className="w-3 h-3 text-red-500" />
              </span>
              <span className="text-sm">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
