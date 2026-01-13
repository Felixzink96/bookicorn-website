'use client'

import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'

interface ComparisonTableProps {
  value: {
    headers?: string[]
    rows?: Array<{
      feature: string
      values: string[]
      _key: string
    }>
  }
}

function CellValue({ value }: { value: string }) {
  const lowerValue = value.toLowerCase().trim()

  if (lowerValue === 'ja' || lowerValue === 'yes' || lowerValue === 'true') {
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
        <Check className="w-4 h-4 text-emerald-500" />
      </span>
    )
  }

  if (lowerValue === 'nein' || lowerValue === 'no' || lowerValue === 'false') {
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20">
        <X className="w-4 h-4 text-red-500" />
      </span>
    )
  }

  if (lowerValue === '-' || lowerValue === '') {
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--theme-surface)]">
        <Minus className="w-4 h-4 text-[var(--theme-textTertiary)]" />
      </span>
    )
  }

  return <span className="text-sm text-[var(--theme-text)]">{value}</span>
}

export function ComparisonTable({ value }: ComparisonTableProps) {
  const headers = value.headers || []
  const rows = value.rows || []

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-[var(--theme-border)]">
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--theme-surface)]">
            <th className="text-left p-4 font-semibold text-[var(--theme-text)] border-b border-[var(--theme-border)]">
              Feature
            </th>
            {headers.map((header, i) => (
              <th
                key={i}
                className={`text-center p-4 font-semibold border-b border-[var(--theme-border)] ${
                  i === 0 ? 'text-primary-600 bg-primary-500/5' : 'text-[var(--theme-textSecondary)]'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={row._key}
              className="border-b last:border-b-0 border-[var(--theme-border)]"
              whileHover={{ backgroundColor: 'var(--theme-surfaceHover)' }}
              transition={{ duration: 0.15 }}
            >
              <td className="p-4 text-sm text-[var(--theme-text)]">
                {row.feature}
              </td>
              {row.values.map((cellValue, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-4 text-center ${
                    colIndex === 0 ? 'bg-primary-500/5' : ''
                  }`}
                >
                  <div className="flex justify-center">
                    <CellValue value={cellValue} />
                  </div>
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
