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
              <p className="text-sm text-[var(--theme-textSecondary)]">Angaben gemäß § 5 TMG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Anbieter</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <p className="text-[var(--theme-text)] text-lg">
                <strong>[FIRMENNAME]</strong>
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-2">
                [Rechtsform, z.B. GmbH, UG (haftungsbeschränkt), Einzelunternehmen]
              </p>
              <p className="text-[var(--theme-textSecondary)] mt-4">
                [Straße und Hausnummer]<br />
                [PLZ] [Stadt]<br />
                Deutschland
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Kontakt</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--theme-textSecondary)]">Telefon</p>
                  <p className="text-[var(--theme-text)]">[+49 XXX XXXXXXX]</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--theme-textSecondary)]">E-Mail</p>
                  <p className="text-[var(--theme-text)]">[kontakt@beispiel.de]</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Vertretungsberechtigte Person(en)</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <p className="text-[var(--theme-text)]">
                <strong>Geschäftsführer / Inhaber:</strong><br />
                [Vorname Nachname]
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Registereintrag</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[var(--theme-textSecondary)]">Registergericht</p>
                  <p className="text-[var(--theme-text)]">[Amtsgericht Stadt]</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--theme-textSecondary)]">Registernummer</p>
                  <p className="text-[var(--theme-text)]">[HRB XXXXX]</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--theme-textSecondary)] mt-2 italic">
              (Nur bei Eintrag im Handelsregister, Vereinsregister, Partnerschaftsregister oder Genossenschaftsregister erforderlich)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Umsatzsteuer-ID</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <p className="text-sm text-[var(--theme-textSecondary)]">Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG</p>
              <p className="text-[var(--theme-text)] mt-1 font-mono">[DE XXXXXXXXX]</p>
            </div>
            <p className="text-sm text-[var(--theme-textSecondary)] mt-2 italic">
              (Nur erforderlich, wenn eine USt-ID vorhanden ist)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-6">
              <p className="text-[var(--theme-text)]">
                [Vorname Nachname]<br />
                [Straße und Hausnummer]<br />
                [PLZ] [Stadt]
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">EU-Streitschlichtung</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            </p>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            <p className="text-[var(--theme-textSecondary)] mt-4">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Haftung für Inhalte</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="text-[var(--theme-textSecondary)]">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Haftung für Links</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p className="text-[var(--theme-textSecondary)]">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">Urheberrecht</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p className="text-[var(--theme-textSecondary)]">
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

          {/* Hinweis für den Nutzer */}
          <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Hinweis</h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Alle mit [PLATZHALTER] gekennzeichneten Stellen müssen mit Ihren tatsächlichen Firmendaten ersetzt werden. Diese Seite dient als Vorlage und ist erst nach Ausfüllen aller Pflichtangaben rechtsgültig.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
