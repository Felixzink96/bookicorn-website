'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2 } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      {/* Header */}
      <div className="border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--theme-text)]">Impressum</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-8">
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <p className="text-[var(--theme-text)] text-lg font-semibold">
                Unicorn Factory Media GmbH
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-2">
                Geschäftsführer: Daniel Haenle, Florian Konrad
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-4">
                In der Kolling 146<br />
                66450 Bexbach<br />
                Deutschland
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-4">
                Telefon: +49 (0)176 34357450<br />
                E-Mail: kontakt@unicorn-factory.net
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-4">
                Registergericht: Amtsgericht Saarbrücken<br />
                Registernummer: HRB 107099
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-4">
                Umsatzsteuer-Identifikationsnummer: DE340084710
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Verantwortlich für redaktionelle Inhalte</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <p className="text-[var(--theme-textSecondary)]">
                Daniel Haenle, Florian Konrad<br />
                In der Kolling 146<br />
                66450 Bexbach
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Bildnachweis</h2>
            <p className="text-[var(--theme-textSecondary)]">
              Angaben zu verwendeten Bildern finden Sie hier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Haftung für Inhalte</h2>
            <p className="text-[var(--theme-textSecondary)]">
              Für eigene Inhalte auf diesen Seiten wird nach den allgemeinen Grundsätzen gehaftet. Es besteht keine Pflicht, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu suchen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen bleiben unberührt. Eine Haftung entsteht erst ab Kenntnis einer konkreten Rechtsverletzung. Bei entsprechenden Hinweisen entfernen wir Inhalte umgehend.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Haftung für Links</h2>
            <p className="text-[var(--theme-textSecondary)]">
              Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße geprüft; rechtswidrige Inhalte waren damals nicht erkennbar. Eine permanente inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Urheberrecht</h2>
            <p className="text-[var(--theme-textSecondary)]">
              Die auf diesen Seiten erstellten Inhalte und Werke unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der gesetzlichen Grenzen bedürfen der vorherigen Zustimmung der jeweiligen Rechteinhaber. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Sofern Inhalte nicht vom Betreiber erstellt wurden, werden die Rechte Dritter beachtet. Hinweise auf Rechtsverletzungen nehmen wir entgegen und entfernen betroffene Inhalte umgehend.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
