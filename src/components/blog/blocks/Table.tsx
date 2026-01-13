'use client'

import { motion } from 'framer-motion'

interface TableProps {
  value: {
    headers?: string[]
    rows?: Array<{
      cells: string[]
      _key: string
    }>
    striped?: boolean
  }
}

export function Table({ value }: TableProps) {
  const headers = value.headers || []
  const rows = value.rows || []
  const striped = value.striped ?? true

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-[var(--theme-border)]">
      <table className="w-full">
        {headers.length > 0 && (
          <thead>
            <tr className="bg-[var(--theme-surface)] border-b border-[var(--theme-border)]">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-sm font-semibold text-[var(--theme-text)]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={row._key}
              className={`border-b last:border-b-0 border-[var(--theme-border)] ${
                striped && rowIndex % 2 === 1 ? 'bg-[var(--theme-surface)]' : ''
              }`}
              whileHover={{ backgroundColor: 'var(--theme-surfaceHover)' }}
              transition={{ duration: 0.15 }}
            >
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm text-[var(--theme-textSecondary)]"
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
