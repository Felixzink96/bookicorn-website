'use client'

import { FileText, FileImage, FileSpreadsheet, File, Download } from 'lucide-react'

interface FileDownloadProps {
  value: {
    title?: string
    description?: string
    fileUrl?: string
    fileName?: string
    fileSize?: string
  }
}

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase()

  if (['pdf'].includes(ext || '')) return FileText
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) return FileImage
  if (['xls', 'xlsx', 'csv'].includes(ext || '')) return FileSpreadsheet
  return File
}

export function FileDownload({ value }: FileDownloadProps) {
  const fileName = value.fileName || 'download'
  const Icon = getFileIcon(fileName)

  return (
    <a
      href={value.fileUrl || '#'}
      download
      className="my-6 flex items-center gap-4 p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] group transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[var(--theme-text)] truncate">
          {value.title || fileName}
        </h4>
        {value.description && (
          <p className="text-sm text-[var(--theme-textSecondary)] truncate">
            {value.description}
          </p>
        )}
        {value.fileSize && (
          <span className="text-xs text-[var(--theme-textTertiary)]">
            {value.fileSize}
          </span>
        )}
      </div>

      {/* Download icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
        <Download className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
      </div>
    </a>
  )
}
