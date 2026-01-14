'use client'

import Link from 'next/link'
import { TrendingUp, Flame } from 'lucide-react'
import { usePopularDocs } from '@/hooks/useDocViews'

// Mapping von Slug zu Titel
const docTitles: Record<string, string> = {
  'getting-started': 'Erste Schritte Übersicht',
  'getting-started/studio-einrichten': 'Studio einrichten',
  'getting-started/erster-kurs': 'Ersten Kurs erstellen',
  'getting-started/erste-buchung': 'Erste Buchung testen',
  'kurse': 'Kursverwaltung Übersicht',
  'kurse/kurs-erstellen': 'Kurs erstellen',
  'kurse/termine-erstellen': 'Termine erstellen',
  'kurse/kategorien': 'Kategorien verwalten',
  'kurse/warteliste': 'Wartelisten verstehen',
  'kurse/stornierung': 'Stornierungsregeln',
  'credits': 'Credit-System Übersicht',
  'credits/fifo-erklaert': 'FIFO Credit-System erklärt',
  'credits/pakete-erstellen': 'Credit-Pakete anlegen',
  'credits/aktivierungsmodi': 'Aktivierungsmodi',
  'credits/gueltigkeit': 'Credit Gültigkeit',
  'credits/trainer-credits': 'Trainer-Credits',
  'trainer': 'Trainer-Verwaltung Übersicht',
  'trainer/trainer-anlegen': 'Trainer anlegen',
  'trainer/berechtigungen': 'Trainer-Berechtigungen',
  'trainer/verdienste': 'Trainer-Verdienste',
  'trainer/trainer-dashboard': 'Trainer-Dashboard',
  'buchungen': 'Buchungssystem Übersicht',
  'buchungen/buchung-bestaetigen': 'Buchungen bestätigen',
  'buchungen/teilnehmer': 'Teilnehmer verwalten',
  'buchungen/check-in': 'Check-In System',
  'buchungen/stornieren': 'Buchungen stornieren',
  'standorte': 'Standorte & Räume Übersicht',
  'standorte/standort-anlegen': 'Standort anlegen',
  'standorte/raeume': 'Räume konfigurieren',
}

// Fallback Artikel wenn noch keine Views vorhanden
const defaultArticles = [
  { slug: 'credits/fifo-erklaert', title: 'FIFO Credit-System erklärt' },
  { slug: 'getting-started/erster-kurs', title: 'Ersten Kurs erstellen' },
  { slug: 'credits/pakete-erstellen', title: 'Credit-Pakete anlegen' },
  { slug: 'kurse/warteliste', title: 'Wartelisten verstehen' },
]

export function PopularDocs() {
  const { popularDocs, loading } = usePopularDocs()

  // Zeige entweder echte Popular Docs oder Fallback
  const articles = popularDocs.length > 0
    ? popularDocs.slice(0, 4).map(doc => ({
        slug: doc.slug,
        title: docTitles[doc.slug] || doc.slug,
        views: doc.views
      }))
    : defaultArticles

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--theme-textTertiary)]">
          <TrendingUp className="w-4 h-4" />
          Beliebt:
        </span>
        {loading ? (
          // Loading state
          <>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="h-8 w-32 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] animate-pulse"
              />
            ))}
          </>
        ) : (
          articles.map((article) => (
            <Link
              key={article.slug}
              href={`/docs/${article.slug}`}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-textSecondary)] hover:border-primary-300 hover:text-primary-600 transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 group-hover:text-primary-600 transition-colors" />
              {article.title}
              {'views' in article && article.views > 1 && (
                <span className="ml-1 text-[10px] text-[var(--theme-textTertiary)]">
                  ({article.views})
                </span>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
