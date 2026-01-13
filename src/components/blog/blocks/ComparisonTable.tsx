'use client'

import { Check, X, Minus } from 'lucide-react'

interface ComparisonTableProps {
  value: {
    title?: string
    columns?: Array<{
      name: string
      highlighted?: boolean
      _key: string
    }>
    rows?: Array<{
      feature: string
      values: Array<{ value: string; _key: string } | string>
      _key: string
    }>
  }
}

function CellValue({ value }: { value: string }) {
  // Handle undefined or non-string values
  if (value === undefined || value === null) {
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--theme-surface)]">
        <Minus className="w-4 h-4 text-[var(--theme-textTertiary)]" />
      </span>
    )
  }

  const stringValue = String(value)
  const lowerValue = stringValue.toLowerCase().trim()

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

  return <span className="text-sm text-[var(--theme-text)]">{stringValue}</span>
}

export function ComparisonTable({ value }: ComparisonTableProps) {
  const columns = value.columns || []
  const rows = value.rows || []

  // Extract cell value - handles both object and string formats
  const getCellValue = (cell: { value: string; _key: string } | string): string => {
    if (typeof cell === 'string') return cell
    return cell?.value || ''
  }

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-[var(--theme-border)]">
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--theme-surface)]">
            {columns.map((col, i) => (
              <th
                key={col._key || i}
                className={`text-center p-4 font-semibold border-b border-[var(--theme-border)] ${
                  col.highlighted
                    ? 'text-primary-600 bg-primary-500/5'
                    : i === 0
                      ? 'text-left text-[var(--theme-text)]'
                      : 'text-[var(--theme-textSecondary)]'
                }`}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row._key}
              className="border-b last:border-b-0 border-[var(--theme-border)] transition-colors hover:bg-[var(--theme-surfaceHover)]"
            >
              <td className="p-4 text-sm text-[var(--theme-text)]">
                {row.feature}
              </td>
              {row.values.map((cellValue, colIndex) => {
                const isHighlighted = columns[colIndex + 1]?.highlighted
                return (
                  <td
                    key={colIndex}
                    className={`p-4 text-center ${
                      isHighlighted ? 'bg-primary-500/5' : ''
                    }`}
                  >
                    <div className="flex justify-center">
                      <CellValue value={getCellValue(cellValue)} />
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
