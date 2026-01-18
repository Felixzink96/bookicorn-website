'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function AGBPage() {
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
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--theme-text)]">Allgemeine Geschäftsbedingungen</h1>
              <p className="text-sm text-[var(--theme-textSecondary)]">Zuletzt aktualisiert: Januar 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">1. Geltungsbereich</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
            </p>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-4 mb-4">
              <p className="text-[var(--theme-text)]">
                <strong>[FIRMENNAME]</strong><br />
                [Straße und Hausnummer]<br />
                [PLZ] [Stadt]<br />
                Deutschland<br /><br />
                (nachfolgend &quot;Anbieter&quot;)
              </p>
            </div>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              und den Nutzern der Plattform Bookicorn (nachfolgend &quot;Nutzer&quot; oder &quot;Teilnehmer&quot;), die über die Website www.bookicorn.com Kurse buchen oder die Plattform nutzen.
            </p>
            <p className="text-[var(--theme-textSecondary)]">
              Es gelten ausschließlich diese AGB. Abweichende Bedingungen des Nutzers werden nicht anerkannt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">2. Vertragsgegenstand</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Bookicorn ist eine Plattform zur Buchung und Verwaltung von Kursen, die von verschiedenen Studios und Trainern angeboten werden. Der Anbieter stellt die technische Infrastruktur zur Verfügung.
            </p>
            <p className="text-[var(--theme-textSecondary)]">
              Die Kurse selbst werden von den jeweiligen Studios oder Trainern durchgeführt. Der Vertrag über die Kursteilnahme kommt zwischen dem Nutzer und dem jeweiligen Studio/Trainer zustande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">3. Registrierung und Nutzerkonto</h2>

            <h3 className="text-lg font-medium mb-3 text-[var(--theme-text)]">3.1 Registrierung</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Die Nutzung der Buchungsfunktionen setzt eine Registrierung voraus. Bei der Registrierung sind vollständige und wahrheitsgemäße Angaben zu machen.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">3.2 Pflichten des Nutzers</h3>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li>Zugangsdaten sind vertraulich zu behandeln</li>
              <li>Der Nutzer haftet für alle Aktivitäten unter seinem Konto</li>
              <li>Verdacht auf Missbrauch ist unverzüglich zu melden</li>
              <li>Änderungen der Kontaktdaten sind zeitnah zu aktualisieren</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">3.3 Kündigung des Nutzerkontos</h3>
            <p className="text-[var(--theme-textSecondary)]">
              Der Nutzer kann sein Konto jederzeit kündigen. Bestehende Buchungen und erworbene Credits bleiben von der Kündigung unberührt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">4. Kursbuchung</h2>

            <h3 className="text-lg font-medium mb-3 text-[var(--theme-text)]">4.1 Buchungsvorgang</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Die Darstellung der Kurse stellt ein verbindliches Angebot dar. Mit der Buchung nimmt der Nutzer dieses Angebot an. Der Vertrag kommt mit der Buchungsbestätigung zustande.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">4.2 Voraussetzungen</h3>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li>Vollständige Registrierung</li>
              <li>Ausreichend Credits oder gültige Zahlungsmethode</li>
              <li>Freie Plätze im gewünschten Kurs</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">4.3 Warteliste</h3>
            <p className="text-[var(--theme-textSecondary)]">
              Ist ein Kurs ausgebucht, kann der Nutzer sich auf eine Warteliste setzen lassen. Bei Freiwerden eines Platzes wird der Nutzer automatisch benachrichtigt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">5. Credit-System</h2>

            <h3 className="text-lg font-medium mb-3 text-[var(--theme-text)]">5.1 Erwerb von Credits</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Credits können über die Plattform erworben werden. Die Zahlung erfolgt über Stripe. Credits werden nach erfolgreicher Zahlung dem Nutzerkonto gutgeschrieben.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">5.2 Gültigkeit</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Credits sind ab Kaufdatum für die angegebene Gültigkeitsdauer nutzbar. Die Gültigkeitsdauer wird beim Kauf angezeigt.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">5.3 Verwendung (FIFO-Prinzip)</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Bei der Einlösung von Credits werden zuerst die ältesten (zuerst ablaufenden) Credits verwendet (First In, First Out).
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">5.4 Keine Auszahlung</h3>
            <p className="text-[var(--theme-textSecondary)]">
              Eine Auszahlung von Credits in Bargeld ist nicht möglich. Nicht genutzte Credits verfallen nach Ablauf der Gültigkeitsdauer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">6. Stornierung und Rückerstattung</h2>

            <h3 className="text-lg font-medium mb-3 text-[var(--theme-text)]">6.1 Stornierung durch den Nutzer</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Buchungen können bis zur jeweils angegebenen Stornofrist kostenfrei storniert werden. Die Stornofrist wird bei der Buchung angezeigt und kann je nach Kurs variieren.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">6.2 Rückerstattung</h3>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li>Bei rechtzeitiger Stornierung: Volle Rückerstattung der Credits</li>
              <li>Bei verspäteter Stornierung: Keine Rückerstattung, sofern nicht anders vereinbart</li>
              <li>Bei Ausfall durch den Anbieter: Volle Rückerstattung der Credits</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">6.3 Kursausfall</h3>
            <p className="text-[var(--theme-textSecondary)]">
              Muss ein Kurs vom Studio oder Trainer abgesagt werden, werden die verwendeten Credits automatisch zurückerstattet. Der Nutzer wird über den Ausfall informiert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">7. Preise und Zahlung</h2>

            <h3 className="text-lg font-medium mb-3 text-[var(--theme-text)]">7.1 Preise</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Alle angegebenen Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer, sofern nicht anders angegeben.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">7.2 Zahlungsabwicklung</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Die Zahlungsabwicklung erfolgt über Stripe. Es stehen verschiedene Zahlungsmethoden zur Verfügung (Kreditkarte, SEPA-Lastschrift, etc.). Die verfügbaren Zahlungsmethoden werden beim Checkout angezeigt.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">7.3 Rechnungsstellung</h3>
            <p className="text-[var(--theme-textSecondary)]">
              Nach erfolgter Zahlung erhält der Nutzer eine Rechnung per E-Mail.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">8. Datenschutz</h2>
            <p className="text-[var(--theme-textSecondary)]">
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <Link href="/datenschutz" className="text-blue-600 dark:text-blue-400 underline">Datenschutzerklärung</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">9. Widerrufsrecht</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Verbraucher haben ein 14-tägiges Widerrufsrecht. Das Widerrufsrecht erlischt bei digitalen Inhalten und Dienstleistungen, wenn mit der Ausführung begonnen wurde und der Verbraucher ausdrücklich zugestimmt hat.
            </p>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-4">
              <p className="text-[var(--theme-text)] font-medium mb-2">Widerrufsbelehrung</p>
              <p className="text-[var(--theme-textSecondary)] text-sm">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z.B. E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">10. Schlussbestimmungen</h2>

            <h3 className="text-lg font-medium mb-3 text-[var(--theme-text)]">10.1 Anwendbares Recht</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">10.2 Salvatorische Klausel</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">10.3 Online-Streitbeilegung</h3>
            <p className="text-[var(--theme-textSecondary)]">
              Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren teilzunehmen.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
