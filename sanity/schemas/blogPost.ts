import { defineField, defineType } from 'sanity'

// ============================================
// REUSABLE CONTENT BLOCKS
// ============================================

// Callout/Alert Box
const calloutBlock = {
  type: 'object',
  name: 'callout',
  title: 'Callout Box',
  fields: [
    {
      name: 'variant',
      title: 'Variante',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Tipp', value: 'tip' },
          { title: 'Warnung', value: 'warning' },
          { title: 'Erfolg', value: 'success' },
          { title: 'Hinweis', value: 'note' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    },
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Optional - wird fett dargestellt',
    },
    {
      name: 'content',
      title: 'Inhalt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: { title: 'title', variant: 'variant', content: 'content' },
    prepare({ title, variant, content }: { title?: string; variant?: string; content?: string }) {
      const labels: Record<string, string> = {
        info: 'Info',
        tip: 'Tipp',
        warning: 'Warnung',
        success: 'Erfolg',
        note: 'Hinweis',
      }
      return {
        title: title || content?.substring(0, 50) || 'Callout',
        subtitle: `Callout: ${labels[variant || 'info']}`,
      }
    },
  },
}

// CTA Button
const ctaButtonBlock = {
  type: 'object',
  name: 'ctaButton',
  title: 'CTA Button',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'variant',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Lime)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
          { title: 'Ghost (Transparent)', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'size',
      title: 'Groesse',
      type: 'string',
      options: {
        list: [
          { title: 'Klein', value: 'sm' },
          { title: 'Normal', value: 'md' },
          { title: 'Gross', value: 'lg' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'fullWidth',
      title: 'Volle Breite',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { text: 'text', variant: 'variant' },
    prepare({ text, variant }: { text?: string; variant?: string }) {
      return {
        title: text || 'Button',
        subtitle: `CTA Button (${variant || 'primary'})`,
      }
    },
  },
}

// Feature/Check Liste
const featureListBlock = {
  type: 'object',
  name: 'featureList',
  title: 'Feature Liste',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Optional',
    },
    {
      name: 'items',
      title: 'Eintraege',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            {
              name: 'highlighted',
              title: 'Hervorgehoben',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: { text: 'text' },
            prepare({ text }: { text?: string }) {
              return { title: text || 'Eintrag' }
            },
          },
        },
      ],
    },
    {
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Checkmarks', value: 'check' },
          { title: 'Punkte', value: 'bullet' },
          { title: 'Nummern', value: 'number' },
          { title: 'Pfeile', value: 'arrow' },
          { title: 'Plus', value: 'plus' },
        ],
      },
      initialValue: 'check',
    },
    {
      name: 'columns',
      title: 'Spalten',
      type: 'number',
      options: {
        list: [1, 2, 3],
      },
      initialValue: 1,
    },
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }: { title?: string; items?: any[] }) {
      return {
        title: title || 'Feature Liste',
        subtitle: `${items?.length || 0} Eintraege`,
      }
    },
  },
}

// Pro/Contra Liste
const proConListBlock = {
  type: 'object',
  name: 'proConList',
  title: 'Pro/Contra Liste',
  fields: [
    {
      name: 'pros',
      title: 'Vorteile',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'cons',
      title: 'Nachteile',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Nebeneinander', value: 'side-by-side' },
          { title: 'Untereinander', value: 'stacked' },
        ],
      },
      initialValue: 'side-by-side',
    },
  ],
  preview: {
    select: { pros: 'pros', cons: 'cons' },
    prepare({ pros, cons }: { pros?: string[]; cons?: string[] }) {
      return {
        title: 'Pro/Contra Liste',
        subtitle: `${pros?.length || 0} Pro, ${cons?.length || 0} Contra`,
      }
    },
  },
}

// Trennlinie/Spacer
const dividerBlock = {
  type: 'object',
  name: 'divider',
  title: 'Trennlinie',
  fields: [
    {
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Linie', value: 'line' },
          { title: 'Gepunktet', value: 'dotted' },
          { title: 'Abstand (klein)', value: 'space-sm' },
          { title: 'Abstand (mittel)', value: 'space-md' },
          { title: 'Abstand (gross)', value: 'space-lg' },
        ],
      },
      initialValue: 'line',
    },
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }: { style?: string }) {
      const labels: Record<string, string> = {
        line: 'Linie',
        dotted: 'Gepunktet',
        'space-sm': 'Abstand S',
        'space-md': 'Abstand M',
        'space-lg': 'Abstand L',
      }
      return {
        title: 'Trennlinie',
        subtitle: labels[style || 'line'],
      }
    },
  },
}

// Code Block
const codeBlock = {
  type: 'object',
  name: 'codeBlock',
  title: 'Code Block',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 12,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'language',
      title: 'Sprache',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash/Shell', value: 'bash' },
          { title: 'Python', value: 'python' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
      initialValue: 'javascript',
    },
    {
      name: 'filename',
      title: 'Dateiname',
      type: 'string',
      description: 'Optional - wird als Tab angezeigt',
    },
    {
      name: 'highlightLines',
      title: 'Hervorgehobene Zeilen',
      type: 'string',
      description: 'z.B. "1,3-5,7" fuer Zeilen 1, 3-5 und 7',
    },
    {
      name: 'showLineNumbers',
      title: 'Zeilennummern anzeigen',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { filename: 'filename', language: 'language' },
    prepare({ filename, language }: { filename?: string; language?: string }) {
      return {
        title: filename || 'Code Block',
        subtitle: language || 'Code',
      }
    },
  },
}

// Statistiken/Zahlen
const statsBlock = {
  type: 'object',
  name: 'stats',
  title: 'Statistiken',
  fields: [
    {
      name: 'items',
      title: 'Zahlen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Wert',
              type: 'string',
              description: 'z.B. "500+", "99%", "24/7"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Beschreibung',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
              description: 'z.B. "ab", "bis zu"',
            },
            {
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'z.B. "%", "EUR", "+"',
            },
          ],
          preview: {
            select: { value: 'value', label: 'label' },
            prepare({ value, label }: { value?: string; label?: string }) {
              return { title: value || 'Stat', subtitle: label }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Nebeneinander', value: 'row' },
          { title: 'Grid (2x2)', value: 'grid' },
          { title: 'Zentriert', value: 'center' },
        ],
      },
      initialValue: 'row',
    },
    {
      name: 'variant',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'default' },
          { title: 'Karten', value: 'cards' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }: { items?: any[] }) {
      return {
        title: 'Statistiken',
        subtitle: `${items?.length || 0} Zahlen`,
      }
    },
  },
}

// Zitat/Testimonial
const quoteBlock = {
  type: 'object',
  name: 'quote',
  title: 'Zitat',
  fields: [
    {
      name: 'text',
      title: 'Zitat',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Position/Rolle',
      type: 'string',
      description: 'z.B. "CEO, Firma XY"',
    },
    {
      name: 'avatar',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'variant',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Einfach', value: 'simple' },
          { title: 'Mit Rahmen', value: 'bordered' },
          { title: 'Hervorgehoben', value: 'highlighted' },
          { title: 'Gross', value: 'large' },
        ],
      },
      initialValue: 'simple',
    },
  ],
  preview: {
    select: { text: 'text', author: 'author' },
    prepare({ text, author }: { text?: string; author?: string }) {
      return {
        title: text?.substring(0, 60) || 'Zitat',
        subtitle: author ? `- ${author}` : 'Zitat',
      }
    },
  },
}

// Vergleichstabelle
const comparisonTableBlock = {
  type: 'object',
  name: 'comparisonTable',
  title: 'Vergleichstabelle',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'columns',
      title: 'Spalten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            {
              name: 'highlighted',
              title: 'Hervorgehoben',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: { name: 'name' },
            prepare({ name }: { name?: string }) {
              return { title: name || 'Spalte' }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.min(2).max(4),
    },
    {
      name: 'rows',
      title: 'Zeilen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'feature', title: 'Feature', type: 'string' },
            {
              name: 'values',
              title: 'Werte',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'value',
                      title: 'Wert',
                      type: 'string',
                      description: 'Text, "true" fuer Check, "false" fuer X',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { feature: 'feature' },
            prepare({ feature }: { feature?: string }) {
              return { title: feature || 'Zeile' }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', columns: 'columns', rows: 'rows' },
    prepare({ title, columns, rows }: { title?: string; columns?: any[]; rows?: any[] }) {
      return {
        title: title || 'Vergleichstabelle',
        subtitle: `${columns?.length || 0} Spalten, ${rows?.length || 0} Zeilen`,
      }
    },
  },
}

// Akkordeon/FAQ
const accordionBlock = {
  type: 'object',
  name: 'accordion',
  title: 'Akkordeon/FAQ',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Eintraege',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Frage/Titel',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Antwort/Inhalt',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'defaultOpen',
              title: 'Standardmaessig offen',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }: { question?: string }) {
              return { title: question || 'FAQ' }
            },
          },
        },
      ],
    },
    {
      name: 'allowMultiple',
      title: 'Mehrere gleichzeitig offen',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }: { title?: string; items?: any[] }) {
      return {
        title: title || 'Akkordeon',
        subtitle: `${items?.length || 0} Eintraege`,
      }
    },
  },
}

// Video Embed
const videoBlock = {
  type: 'object',
  name: 'video',
  title: 'Video',
  fields: [
    {
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube oder Vimeo URL',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'caption',
      title: 'Beschreibung',
      type: 'string',
    },
    {
      name: 'aspectRatio',
      title: 'Seitenverhaeltnis',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '1:1', value: '1/1' },
          { title: '9:16 (Vertikal)', value: '9/16' },
        ],
      },
      initialValue: '16/9',
    },
  ],
  preview: {
    select: { title: 'title', url: 'url' },
    prepare({ title, url }: { title?: string; url?: string }) {
      return {
        title: title || 'Video',
        subtitle: url,
      }
    },
  },
}

// Bild Galerie
const galleryBlock = {
  type: 'object',
  name: 'gallery',
  title: 'Bildergalerie',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Bildunterschrift' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2 Spalten)', value: 'grid-2' },
          { title: 'Grid (3 Spalten)', value: 'grid-3' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Slider', value: 'slider' },
        ],
      },
      initialValue: 'grid-2',
    },
    {
      name: 'lightbox',
      title: 'Lightbox aktivieren',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'title', images: 'images' },
    prepare({ title, images }: { title?: string; images?: any[] }) {
      return {
        title: title || 'Galerie',
        subtitle: `${images?.length || 0} Bilder`,
      }
    },
  },
}

// Timeline/Schritte
const timelineBlock = {
  type: 'object',
  name: 'timeline',
  title: 'Timeline/Schritte',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Schritte',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 2,
            },
            {
              name: 'date',
              title: 'Datum/Label',
              type: 'string',
              description: 'z.B. "Schritt 1", "2024", "Tag 1"',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide Icon Name (optional)',
            },
          ],
          preview: {
            select: { title: 'title', date: 'date' },
            prepare({ title, date }: { title?: string; date?: string }) {
              return { title: title || 'Schritt', subtitle: date }
            },
          },
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Vertikal', value: 'vertical' },
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Alternierend', value: 'alternating' },
        ],
      },
      initialValue: 'vertical',
    },
    {
      name: 'numbered',
      title: 'Nummeriert',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }: { title?: string; items?: any[] }) {
      return {
        title: title || 'Timeline',
        subtitle: `${items?.length || 0} Schritte`,
      }
    },
  },
}

// Person/Team Card
const personCardBlock = {
  type: 'object',
  name: 'personCard',
  title: 'Person/Team Card',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Rolle/Position',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        { name: 'email', title: 'E-Mail', type: 'email' },
        { name: 'website', title: 'Website', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertikal', value: 'vertical' },
          { title: 'Kompakt', value: 'compact' },
        ],
      },
      initialValue: 'horizontal',
    },
  ],
  preview: {
    select: { name: 'name', role: 'role' },
    prepare({ name, role }: { name?: string; role?: string }) {
      return { title: name || 'Person', subtitle: role }
    },
  },
}

// Download/File Link
const fileDownloadBlock = {
  type: 'object',
  name: 'fileDownload',
  title: 'Download/Datei',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'string',
    },
    {
      name: 'file',
      title: 'Datei',
      type: 'file',
    },
    {
      name: 'externalUrl',
      title: 'Oder: Externe URL',
      type: 'url',
      description: 'Falls keine Datei hochgeladen',
    },
    {
      name: 'fileType',
      title: 'Dateityp',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Word', value: 'doc' },
          { title: 'Excel', value: 'xls' },
          { title: 'ZIP', value: 'zip' },
          { title: 'Bild', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Sonstige', value: 'other' },
        ],
      },
    },
    {
      name: 'fileSize',
      title: 'Dateigroesse',
      type: 'string',
      description: 'z.B. "2.5 MB"',
    },
  ],
  preview: {
    select: { title: 'title', fileType: 'fileType' },
    prepare({ title, fileType }: { title?: string; fileType?: string }) {
      return {
        title: title || 'Download',
        subtitle: fileType?.toUpperCase() || 'Datei',
      }
    },
  },
}

// Einfache Tabelle
const tableBlock = {
  type: 'object',
  name: 'table',
  title: 'Tabelle',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'headers',
      title: 'Spaltenkoepfe',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'rows',
      title: 'Zeilen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'cells',
              title: 'Zellen',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }: { cells?: string[] }) {
              return { title: cells?.join(' | ') || 'Zeile' }
            },
          },
        },
      ],
    },
    {
      name: 'striped',
      title: 'Gestreift',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'compact',
      title: 'Kompakt',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', headers: 'headers', rows: 'rows' },
    prepare({ title, headers, rows }: { title?: string; headers?: string[]; rows?: any[] }) {
      return {
        title: title || 'Tabelle',
        subtitle: `${headers?.length || 0} Spalten, ${rows?.length || 0} Zeilen`,
      }
    },
  },
}

// Info Box mit Icon
const infoBoxBlock = {
  type: 'object',
  name: 'infoBox',
  title: 'Info Box',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Inhalt',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide Icon Name (z.B. "info", "lightbulb", "alert-triangle")',
    },
    {
      name: 'variant',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'default' },
          { title: 'Hervorgehoben', value: 'highlighted' },
          { title: 'Rahmen', value: 'bordered' },
          { title: 'Gefuellt', value: 'filled' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: { title: 'title', content: 'content' },
    prepare({ title, content }: { title?: string; content?: string }) {
      return {
        title: title || content?.substring(0, 50) || 'Info Box',
        subtitle: 'Info Box',
      }
    },
  },
}

// Newsletter/CTA Box
const newsletterBoxBlock = {
  type: 'object',
  name: 'newsletterBox',
  title: 'Newsletter Box',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Newsletter abonnieren',
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 2,
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Abonnieren',
    },
    {
      name: 'variant',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'default' },
          { title: 'Kompakt', value: 'compact' },
          { title: 'Mit Hintergrund', value: 'filled' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Newsletter Box',
        subtitle: 'Newsletter Anmeldung',
      }
    },
  },
}

// Preis Card
const pricingCardBlock = {
  type: 'object',
  name: 'pricingCard',
  title: 'Preis Card',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Preis',
      type: 'string',
      description: 'z.B. "29", "ab 99"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'currency',
      title: 'Waehrung',
      type: 'string',
      initialValue: 'EUR',
    },
    {
      name: 'interval',
      title: 'Intervall',
      type: 'string',
      options: {
        list: [
          { title: 'pro Monat', value: 'month' },
          { title: 'pro Jahr', value: 'year' },
          { title: 'einmalig', value: 'once' },
          { title: 'Individuell', value: 'custom' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'string',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            {
              name: 'included',
              title: 'Enthalten',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: { text: 'text', included: 'included' },
            prepare({ text, included }: { text?: string; included?: boolean }) {
              return { title: text || 'Feature', subtitle: included ? 'Enthalten' : 'Nicht enthalten' }
            },
          },
        },
      ],
    },
    {
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Jetzt starten',
    },
    {
      name: 'ctaUrl',
      title: 'Button Link',
      type: 'url',
    },
    {
      name: 'highlighted',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'z.B. "Beliebt", "Empfohlen"',
    },
  ],
  preview: {
    select: { title: 'title', price: 'price' },
    prepare({ title, price }: { title?: string; price?: string }) {
      return {
        title: title || 'Preis Card',
        subtitle: price ? `${price} EUR` : 'Preis Card',
      }
    },
  },
}

// Embed Block (Twitter, Instagram, etc.)
const embedBlock = {
  type: 'object',
  name: 'embed',
  title: 'Embed',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Twitter, Instagram, oder andere oEmbed-faehige URL',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Bildunterschrift',
      type: 'string',
    },
  ],
  preview: {
    select: { url: 'url' },
    prepare({ url }: { url?: string }) {
      return {
        title: 'Embed',
        subtitle: url,
      }
    },
  },
}

// ============================================
// MAIN BLOG POST SCHEMA
// ============================================

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Beitrag',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhalt', default: true },
    { name: 'meta', title: 'Metadaten' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Kurze Beschreibung fuer Vorschau (max. 200 Zeichen)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Titelbild',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      group: 'content',
      of: [
        // Standard Text Block
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Zitat', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Unterstrichen', value: 'underline' },
              { title: 'Durchgestrichen', value: 'strike-through' },
              { title: 'Highlight', value: 'highlight' },
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                  {
                    title: 'In neuem Tab oeffnen',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        // Standard Image
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Bildunterschrift',
            },
            {
              name: 'size',
              type: 'string',
              title: 'Groesse',
              options: {
                list: [
                  { title: 'Klein', value: 'small' },
                  { title: 'Normal', value: 'normal' },
                  { title: 'Gross', value: 'large' },
                  { title: 'Volle Breite', value: 'full' },
                ],
              },
              initialValue: 'normal',
            },
          ],
        },
        // Custom Blocks
        calloutBlock,
        ctaButtonBlock,
        featureListBlock,
        proConListBlock,
        dividerBlock,
        codeBlock,
        statsBlock,
        quoteBlock,
        comparisonTableBlock,
        accordionBlock,
        videoBlock,
        galleryBlock,
        timelineBlock,
        personCardBlock,
        fileDownloadBlock,
        tableBlock,
        infoBoxBlock,
        newsletterBoxBlock,
        pricingCardBlock,
        embedBlock,
      ],
    }),

    // === META GROUP ===
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veroeffentlichungsdatum',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'readTime',
      title: 'Lesezeit (Minuten)',
      type: 'number',
      group: 'meta',
      description: 'Geschaetzte Lesezeit in Minuten',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Auf der Startseite hervorheben',
    }),

    // === SEO GROUP ===
    defineField({
      name: 'seoTitle',
      title: 'SEO Titel',
      type: 'string',
      group: 'seo',
      description: 'Titel fuer Suchmaschinen (max. 60 Zeichen)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Beschreibung',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Beschreibung fuer Suchmaschinen (max. 160 Zeichen)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Bild',
      type: 'image',
      group: 'seo',
      description: 'Bild fuer Social Sharing (1200x630px empfohlen)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Von Suchmaschinen ausschliessen',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, author, publishedAt } = selection
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'Entwurf'
      return {
        ...selection,
        title: title || 'Ohne Titel',
        subtitle: [author && `von ${author}`, date].filter(Boolean).join(' - '),
      }
    },
  },
  orderings: [
    {
      title: 'Veroeffentlichungsdatum (Neueste)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Veroeffentlichungsdatum (Aelteste)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Titel (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
