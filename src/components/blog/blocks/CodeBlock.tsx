'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  value: {
    code?: string
    language?: string
    filename?: string
    showLineNumbers?: boolean
  }
}

export function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const code = value.code || ''
  const language = value.language || 'plaintext'
  const filename = value.filename
  const showLineNumbers = value.showLineNumbers ?? true

  const lines = code.split('\n')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-[var(--theme-border)] bg-[#0a0a0a]">
      {/* Header with macOS-style traffic lights */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="flex items-center gap-4">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
          </div>
          {/* Filename or language */}
          <span className="text-xs text-gray-500 font-mono">
            {filename || language}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Kopiert</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Kopieren</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none w-10 pr-4 text-right text-gray-600 flex-shrink-0">
                  {i + 1}
                </span>
              )}
              <code className="text-gray-300">{line || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
