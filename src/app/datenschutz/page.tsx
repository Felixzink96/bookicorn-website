'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useConsent } from '@/lib/cookie-consent/consent-context';

export default function DatenschutzPage() {
  const { openSettings } = useConsent();

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
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--theme-text)]">Datenschutzerklärung</h1>
              <p className="text-sm text-[var(--theme-textSecondary)]">Zuletzt aktualisiert: Januar 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">1. Verantwortlicher</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-4 mb-4">
              <p className="text-[var(--theme-text)]">
                <strong>[FIRMENNAME]</strong><br />
                [Straße und Hausnummer]<br />
                [PLZ] [Stadt]<br />
                Deutschland<br /><br />
                E-Mail: [datenschutz@beispiel.de]<br />
                Telefon: [+49 XXX XXXXXXX]
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">2. Überblick der Verarbeitungen</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen:
            </p>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li>Bestandsdaten (z.B. Namen, Adressen)</li>
              <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
              <li>Inhaltsdaten (z.B. Eingaben in Formularen)</li>
              <li>Nutzungsdaten (z.B. besuchte Seiten, Zugriffszeiten)</li>
              <li>Meta- und Kommunikationsdaten (z.B. IP-Adressen, Geräteinformationen)</li>
              <li>Vertragsdaten (z.B. Vertragsgegenstand, Laufzeit)</li>
              <li>Zahlungsdaten (z.B. Bankverbindung, Zahlungshistorie)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">3. Rechtsgrundlagen</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Nachfolgend informieren wir Sie über die Rechtsgrundlagen der Verarbeitung personenbezogener Daten:
            </p>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung in die Verarbeitung gegeben.</li>
              <li><strong>Vertragserfüllung (Art. 6 Abs. 1 S. 1 lit. b DSGVO)</strong> - Die Verarbeitung ist für die Erfüllung eines Vertrags erforderlich.</li>
              <li><strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c DSGVO)</strong> - Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich.</li>
              <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)</strong> - Die Verarbeitung ist zur Wahrung unserer berechtigten Interessen erforderlich.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">4. Registrierung, Anmeldung und Nutzerkonto</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung werden die erforderlichen Pflichtangaben den Nutzern mitgeteilt und zu Zwecken der Bereitstellung des Nutzerkontos verarbeitet.
            </p>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li><strong>Verarbeitete Daten:</strong> E-Mail-Adresse, Name, Passwort (verschlüsselt)</li>
              <li><strong>Rechtsgrundlage:</strong> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li><strong>Löschung:</strong> Nach Kündigung des Nutzerkontos, spätestens nach 30 Tagen</li>
            </ul>
            <p className="text-[var(--theme-textSecondary)] mt-4">
              Wir nutzen <strong>Supabase</strong> als Authentifizierungsdienst. Supabase ist ein Dienst von Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">5. Kursbuchungen und Zahlungsabwicklung</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Wenn Sie über unsere Plattform Kurse buchen, verarbeiten wir die für die Durchführung erforderlichen Daten.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">5.1 Buchungsdaten</h3>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li>Name und Kontaktdaten</li>
              <li>Gebuchte Kurse und Termine</li>
              <li>Buchungshistorie</li>
              <li>Credit-Guthaben</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-6 text-[var(--theme-text)]">5.2 Zahlungsabwicklung mit Stripe</h3>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Für die Zahlungsabwicklung nutzen wir den Zahlungsdienstleister <strong>Stripe</strong> (Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, USA).
            </p>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li><strong>Verarbeitete Daten:</strong> Zahlungsdaten (Kreditkartennummer, Bankverbindung), Rechnungsadresse, Transaktionsdaten</li>
              <li><strong>Rechtsgrundlage:</strong> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li><strong>Datenschutzhinweise Stripe:</strong> <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">https://stripe.com/de/privacy</a></li>
            </ul>
            <p className="text-[var(--theme-textSecondary)] mt-4">
              Stripe ist nach dem EU-US Data Privacy Framework zertifiziert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">6. Cookies und ähnliche Technologien</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Wir setzen Cookies und ähnliche Technologien ein. Detaillierte Informationen finden Sie in unserer Cookie-Richtlinie.
            </p>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Sie können Ihre Cookie-Einstellungen jederzeit anpassen:
            </p>
            <Button variant="secondary" onClick={openSettings}>
              Cookie-Einstellungen öffnen
            </Button>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">7. Hosting</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Unsere Website wird bei <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet.
            </p>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li><strong>Verarbeitete Daten:</strong> IP-Adressen, Zugriffsdaten, Meta-Daten</li>
              <li><strong>Rechtsgrundlage:</strong> Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)</li>
              <li><strong>Datenschutzhinweise Vercel:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">https://vercel.com/legal/privacy-policy</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">8. Ihre Rechte</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Sie haben folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
            </p>
            <ul className="list-disc pl-6 text-[var(--theme-textSecondary)] space-y-2">
              <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre verarbeiteten Daten verlangen.</li>
              <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
              <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
              <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung widersprechen.</li>
              <li><strong>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Sie können erteilte Einwilligungen jederzeit widerrufen.</li>
            </ul>
            <p className="text-[var(--theme-textSecondary)] mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <strong>[datenschutz@beispiel.de]</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">9. Beschwerderecht</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[var(--theme-text)]">10. Änderungen dieser Datenschutzerklärung</h2>
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen des Dienstes anzupassen. Die aktuelle Version ist stets auf dieser Seite verfügbar.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
