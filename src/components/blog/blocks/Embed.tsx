'use client'

interface EmbedProps {
  value: {
    url?: string
    html?: string
    aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto'
  }
}

export function Embed({ value }: EmbedProps) {
  const aspectRatio = value.aspectRatio || '16:9'

  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    'auto': '',
  }

  // If HTML is provided, render it directly
  if (value.html) {
    return (
      <div
        className={`my-8 rounded-xl overflow-hidden border border-[var(--theme-border)] ${aspectClasses[aspectRatio]}`}
        dangerouslySetInnerHTML={{ __html: value.html }}
      />
    )
  }

  // Otherwise use iframe with URL
  if (value.url) {
    return (
      <div
        className={`my-8 rounded-xl overflow-hidden border border-[var(--theme-border)] ${aspectClasses[aspectRatio]} bg-[var(--theme-surface)]`}
      >
        <iframe
          src={value.url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return null
}
