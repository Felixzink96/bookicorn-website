import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export interface DocMeta {
  title: string
  description: string
  slug: string
}

export interface DocContent extends DocMeta {
  content: string
}

// Get all docs slugs for static generation
export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = []

  function walkDir(dir: string, prefix: string[] = []) {
    if (!fs.existsSync(dir)) return

    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walkDir(filePath, [...prefix, file])
      } else if (file.endsWith('.mdx')) {
        const slug = file === 'index.mdx'
          ? prefix
          : [...prefix, file.replace('.mdx', '')]
        if (slug.length > 0) {
          slugs.push(slug)
        }
      }
    }
  }

  walkDir(docsDirectory)
  return slugs
}

// Get doc by slug
export function getDocBySlug(slugArray: string[]): DocContent | null {
  try {
    // Try direct file first
    let fullPath = path.join(docsDirectory, ...slugArray) + '.mdx'

    // If not found, try index.mdx in folder
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(docsDirectory, ...slugArray, 'index.mdx')
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      title: data.title || 'Untitled',
      description: data.description || '',
      slug: slugArray.join('/'),
      content,
    }
  } catch (error) {
    console.error('Error reading doc:', error)
    return null
  }
}

// Navigation structure
export interface NavItem {
  title: string
  slug: string
  items?: NavItem[]
}

export interface NavSection {
  title: string
  slug: string
  icon?: string
  items: NavItem[]
}

// Get navigation structure
export function getDocsNavigation(): NavSection[] {
  return [
    {
      title: 'Erste Schritte',
      slug: 'getting-started',
      icon: 'Rocket',
      items: [
        { title: 'Übersicht', slug: 'getting-started' },
        { title: 'Studio einrichten', slug: 'getting-started/studio-einrichten' },
        { title: 'Erster Kurs', slug: 'getting-started/erster-kurs' },
        { title: 'Erste Buchung', slug: 'getting-started/erste-buchung' },
      ],
    },
    {
      title: 'Kursverwaltung',
      slug: 'kurse',
      icon: 'Calendar',
      items: [
        { title: 'Übersicht', slug: 'kurse' },
        { title: 'Kurs erstellen', slug: 'kurse/kurs-erstellen' },
        { title: 'Termine erstellen', slug: 'kurse/termine-erstellen' },
        { title: 'Kategorien', slug: 'kurse/kategorien' },
        { title: 'Warteliste', slug: 'kurse/warteliste' },
        { title: 'Stornierung', slug: 'kurse/stornierung' },
      ],
    },
    {
      title: 'Credit-System',
      slug: 'credits',
      icon: 'CreditCard',
      items: [
        { title: 'Übersicht', slug: 'credits' },
        { title: 'FIFO erklärt', slug: 'credits/fifo-erklaert' },
        { title: 'Pakete erstellen', slug: 'credits/pakete-erstellen' },
        { title: 'Aktivierungsmodi', slug: 'credits/aktivierungsmodi' },
        { title: 'Gültigkeit', slug: 'credits/gueltigkeit' },
        { title: 'Trainer-Credits', slug: 'credits/trainer-credits' },
      ],
    },
    {
      title: 'Trainer',
      slug: 'trainer',
      icon: 'Users',
      items: [
        { title: 'Übersicht', slug: 'trainer' },
        { title: 'Trainer anlegen', slug: 'trainer/trainer-anlegen' },
        { title: 'Berechtigungen', slug: 'trainer/berechtigungen' },
        { title: 'Verdienste', slug: 'trainer/verdienste' },
        { title: 'Trainer-Dashboard', slug: 'trainer/trainer-dashboard' },
      ],
    },
    {
      title: 'Buchungen',
      slug: 'buchungen',
      icon: 'BookOpen',
      items: [
        { title: 'Übersicht', slug: 'buchungen' },
        { title: 'Bestätigung', slug: 'buchungen/buchung-bestaetigen' },
        { title: 'Teilnehmer', slug: 'buchungen/teilnehmer' },
        { title: 'Check-In', slug: 'buchungen/check-in' },
        { title: 'Stornieren', slug: 'buchungen/stornieren' },
      ],
    },
    {
      title: 'Standorte',
      slug: 'standorte',
      icon: 'MapPin',
      items: [
        { title: 'Übersicht', slug: 'standorte' },
        { title: 'Standort anlegen', slug: 'standorte/standort-anlegen' },
        { title: 'Räume', slug: 'standorte/raeume' },
      ],
    },
    {
      title: 'Zahlungen',
      slug: 'zahlungen',
      icon: 'Wallet',
      items: [
        { title: 'Übersicht', slug: 'zahlungen' },
        { title: 'Stripe einrichten', slug: 'zahlungen/stripe-einrichten' },
        { title: 'Direktzahlung', slug: 'zahlungen/direktzahlung' },
        { title: 'Rechnungen', slug: 'zahlungen/rechnungen' },
        { title: 'Revenue Sharing', slug: 'zahlungen/revenue-sharing' },
      ],
    },
    {
      title: 'Kunden',
      slug: 'kunden',
      icon: 'UserCircle',
      items: [
        { title: 'Übersicht', slug: 'kunden' },
        { title: 'Kunden anlegen', slug: 'kunden/kunden-anlegen' },
        { title: 'Credits verwalten', slug: 'kunden/credits-verwalten' },
        { title: 'Kommunikation', slug: 'kunden/kommunikation' },
      ],
    },
    {
      title: 'Einstellungen',
      slug: 'einstellungen',
      icon: 'Settings',
      items: [
        { title: 'Übersicht', slug: 'einstellungen' },
        { title: 'Buchungsregeln', slug: 'einstellungen/buchungsregeln' },
        { title: 'E-Mail-Templates', slug: 'einstellungen/email-templates' },
        { title: 'Branding', slug: 'einstellungen/branding' },
        { title: 'Benachrichtigungen', slug: 'einstellungen/benachrichtigungen' },
      ],
    },
  ]
}

// Get prev/next doc for navigation
export function getPrevNextDocs(currentSlug: string): { prev: NavItem | null; next: NavItem | null } {
  const nav = getDocsNavigation()
  const allDocs: NavItem[] = []

  nav.forEach(section => {
    section.items.forEach(item => {
      allDocs.push(item)
    })
  })

  const currentIndex = allDocs.findIndex(doc => doc.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null,
  }
}
