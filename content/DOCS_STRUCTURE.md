# Bookicorn Dokumentation - Struktur

## Übersicht

Diese Dokumentation deckt alle Funktionen der Bookicorn Kursplattform ab. Die Docs sind in MDX geschrieben und im Git versioniert.

**Sprache:** Deutsch
**Format:** MDX (Markdown + JSX)
**Zielgruppe:** Studio-Betreiber, Administratoren, Trainer

---

## Dokumentations-Baum

```
/content/docs/
├── getting-started/           # Erste Schritte
│   ├── index.mdx              # Willkommen & Übersicht
│   ├── studio-einrichten.mdx  # Studio-Konto erstellen
│   ├── erster-kurs.mdx        # Ersten Kurs anlegen
│   └── erste-buchung.mdx      # Erste Buchung testen
│
├── kurse/                     # Kursverwaltung
│   ├── index.mdx              # Kursverwaltung Übersicht
│   ├── kurs-erstellen.mdx     # Neuen Kurs anlegen
│   ├── termine-erstellen.mdx  # Einzeltermine & Serien
│   ├── kategorien.mdx         # Kategorien verwalten
│   ├── warteliste.mdx         # Wartelisten-System
│   └── stornierung.mdx        # Stornierungsregeln
│
├── credits/                   # Credit-System
│   ├── index.mdx              # Credit-System Übersicht
│   ├── fifo-erklaert.mdx      # FIFO-Prinzip erklärt
│   ├── pakete-erstellen.mdx   # Credit-Pakete anlegen
│   ├── aktivierungsmodi.mdx   # Sofort, Erste Nutzung, Datum
│   ├── gueltigkeit.mdx        # Ablaufdaten & Verlängerung
│   └── trainer-credits.mdx    # Trainer-gebundene Credits
│
├── trainer/                   # Trainer-Management
│   ├── index.mdx              # Trainer-Verwaltung Übersicht
│   ├── trainer-anlegen.mdx    # Neuen Trainer erstellen
│   ├── berechtigungen.mdx     # Trainer-Berechtigungen
│   ├── verdienste.mdx         # 3 Verdienstmodelle erklärt
│   └── trainer-dashboard.mdx  # Was Trainer sehen können
│
├── buchungen/                 # Buchungssystem
│   ├── index.mdx              # Buchungssystem Übersicht
│   ├── buchung-bestaetigen.mdx # Manuelle Bestätigung
│   ├── teilnehmer.mdx         # Teilnehmer verwalten
│   ├── check-in.mdx           # QR-Code Check-In
│   └── stornieren.mdx         # Buchungen stornieren
│
├── standorte/                 # Standorte & Räume
│   ├── index.mdx              # Standorte & Räume Übersicht
│   ├── standort-anlegen.mdx   # Neuen Standort erstellen
│   └── raeume.mdx             # Räume konfigurieren
│
├── zahlungen/                 # Zahlungen & Stripe
│   ├── index.mdx              # Zahlungen Übersicht
│   ├── stripe-einrichten.mdx  # Stripe Connect Setup
│   ├── direktzahlung.mdx      # Kurse direkt bezahlen
│   ├── rechnungen.mdx         # Automatische Rechnungen
│   └── revenue-sharing.mdx    # Umsatzbeteiligung
│
├── kunden/                    # Kundenverwaltung
│   ├── index.mdx              # Kundenverwaltung Übersicht
│   ├── kunden-anlegen.mdx     # Manuell Kunden erstellen
│   ├── credits-verwalten.mdx  # Credits hinzufügen/entfernen
│   └── kommunikation.mdx      # E-Mails an Kunden
│
├── einstellungen/             # Studio-Einstellungen
│   ├── index.mdx              # Studio-Einstellungen Übersicht
│   ├── buchungsregeln.mdx     # Buchungsfenster & Stopp
│   ├── email-templates.mdx    # E-Mail-Vorlagen anpassen
│   ├── branding.mdx           # Logo, Farben, Theme
│   └── benachrichtigungen.mdx # Notification-Settings
│
├── widgets/                   # Website-Integration
│   ├── index.mdx              # Website-Integration Übersicht
│   ├── widget-builder.mdx     # Drag & Drop Builder
│   ├── einbetten.mdx          # Code auf Website einfügen
│   └── anpassen.mdx           # Styling & Optionen
│
├── mitglieder/                # Für Endkunden/Mitglieder
│   ├── index.mdx              # Mitglieder-Dashboard erklärt
│   ├── kurse-buchen.mdx       # Wie Kunden buchen
│   ├── credits-kaufen.mdx     # Credit-Kauf Prozess
│   └── profil.mdx             # Profil-Einstellungen
│
└── faq/                       # Häufige Fragen
    ├── index.mdx              # FAQ Übersicht
    ├── credits-faq.mdx        # Credit-System FAQ
    ├── buchungen-faq.mdx      # Buchungs-FAQ
    └── technisch-faq.mdx      # Technische FAQ
```

---

## Seitenanzahl nach Bereich

| Bereich | Seiten | Priorität |
|---------|--------|-----------|
| Getting Started | 4 | P1 - Essentiell |
| Kurse | 6 | P1 - Essentiell |
| Credits | 6 | P1 - Essentiell |
| Trainer | 5 | P2 - Wichtig |
| Buchungen | 5 | P1 - Essentiell |
| Standorte | 3 | P2 - Wichtig |
| Zahlungen | 5 | P1 - Essentiell |
| Kunden | 4 | P2 - Wichtig |
| Einstellungen | 5 | P2 - Wichtig |
| Widgets | 4 | P3 - Nice-to-have |
| Mitglieder | 4 | P3 - Nice-to-have |
| FAQ | 4 | P3 - Nice-to-have |
| **Gesamt** | **55** | |

---

## Navigation (docs.json)

```json
{
  "navigation": [
    {
      "title": "Erste Schritte",
      "slug": "getting-started",
      "items": [
        { "title": "Übersicht", "slug": "getting-started" },
        { "title": "Studio einrichten", "slug": "getting-started/studio-einrichten" },
        { "title": "Erster Kurs", "slug": "getting-started/erster-kurs" },
        { "title": "Erste Buchung", "slug": "getting-started/erste-buchung" }
      ]
    },
    {
      "title": "Kursverwaltung",
      "slug": "kurse",
      "items": [
        { "title": "Übersicht", "slug": "kurse" },
        { "title": "Kurs erstellen", "slug": "kurse/kurs-erstellen" },
        { "title": "Termine erstellen", "slug": "kurse/termine-erstellen" },
        { "title": "Kategorien", "slug": "kurse/kategorien" },
        { "title": "Warteliste", "slug": "kurse/warteliste" },
        { "title": "Stornierung", "slug": "kurse/stornierung" }
      ]
    },
    {
      "title": "Credit-System",
      "slug": "credits",
      "items": [
        { "title": "Übersicht", "slug": "credits" },
        { "title": "FIFO erklärt", "slug": "credits/fifo-erklaert" },
        { "title": "Pakete erstellen", "slug": "credits/pakete-erstellen" },
        { "title": "Aktivierungsmodi", "slug": "credits/aktivierungsmodi" },
        { "title": "Gültigkeit", "slug": "credits/gueltigkeit" },
        { "title": "Trainer-Credits", "slug": "credits/trainer-credits" }
      ]
    },
    {
      "title": "Trainer",
      "slug": "trainer",
      "items": [
        { "title": "Übersicht", "slug": "trainer" },
        { "title": "Trainer anlegen", "slug": "trainer/trainer-anlegen" },
        { "title": "Berechtigungen", "slug": "trainer/berechtigungen" },
        { "title": "Verdienste", "slug": "trainer/verdienste" },
        { "title": "Trainer-Dashboard", "slug": "trainer/trainer-dashboard" }
      ]
    },
    {
      "title": "Buchungen",
      "slug": "buchungen",
      "items": [
        { "title": "Übersicht", "slug": "buchungen" },
        { "title": "Bestätigung", "slug": "buchungen/buchung-bestaetigen" },
        { "title": "Teilnehmer", "slug": "buchungen/teilnehmer" },
        { "title": "Check-In", "slug": "buchungen/check-in" },
        { "title": "Stornieren", "slug": "buchungen/stornieren" }
      ]
    },
    {
      "title": "Standorte",
      "slug": "standorte",
      "items": [
        { "title": "Übersicht", "slug": "standorte" },
        { "title": "Standort anlegen", "slug": "standorte/standort-anlegen" },
        { "title": "Räume", "slug": "standorte/raeume" }
      ]
    },
    {
      "title": "Zahlungen",
      "slug": "zahlungen",
      "items": [
        { "title": "Übersicht", "slug": "zahlungen" },
        { "title": "Stripe einrichten", "slug": "zahlungen/stripe-einrichten" },
        { "title": "Direktzahlung", "slug": "zahlungen/direktzahlung" },
        { "title": "Rechnungen", "slug": "zahlungen/rechnungen" },
        { "title": "Revenue Sharing", "slug": "zahlungen/revenue-sharing" }
      ]
    },
    {
      "title": "Kunden",
      "slug": "kunden",
      "items": [
        { "title": "Übersicht", "slug": "kunden" },
        { "title": "Kunden anlegen", "slug": "kunden/kunden-anlegen" },
        { "title": "Credits verwalten", "slug": "kunden/credits-verwalten" },
        { "title": "Kommunikation", "slug": "kunden/kommunikation" }
      ]
    },
    {
      "title": "Einstellungen",
      "slug": "einstellungen",
      "items": [
        { "title": "Übersicht", "slug": "einstellungen" },
        { "title": "Buchungsregeln", "slug": "einstellungen/buchungsregeln" },
        { "title": "E-Mail-Templates", "slug": "einstellungen/email-templates" },
        { "title": "Branding", "slug": "einstellungen/branding" },
        { "title": "Benachrichtigungen", "slug": "einstellungen/benachrichtigungen" }
      ]
    },
    {
      "title": "Widgets",
      "slug": "widgets",
      "items": [
        { "title": "Übersicht", "slug": "widgets" },
        { "title": "Widget Builder", "slug": "widgets/widget-builder" },
        { "title": "Einbetten", "slug": "widgets/einbetten" },
        { "title": "Anpassen", "slug": "widgets/anpassen" }
      ]
    },
    {
      "title": "Für Mitglieder",
      "slug": "mitglieder",
      "items": [
        { "title": "Übersicht", "slug": "mitglieder" },
        { "title": "Kurse buchen", "slug": "mitglieder/kurse-buchen" },
        { "title": "Credits kaufen", "slug": "mitglieder/credits-kaufen" },
        { "title": "Profil", "slug": "mitglieder/profil" }
      ]
    },
    {
      "title": "FAQ",
      "slug": "faq",
      "items": [
        { "title": "Übersicht", "slug": "faq" },
        { "title": "Credits FAQ", "slug": "faq/credits-faq" },
        { "title": "Buchungen FAQ", "slug": "faq/buchungen-faq" },
        { "title": "Technisches FAQ", "slug": "faq/technisch-faq" }
      ]
    }
  ]
}
```

---

## MDX Frontmatter Template

```mdx
---
title: "Seitentitel"
description: "Kurze Beschreibung für SEO"
---

# Seitentitel

Inhalt hier...
```

---

## Verwendete Komponenten

Die Docs nutzen die gleichen Blog-Block-Komponenten:

- `<Callout type="info|warning|success|error">` - Hinweisboxen
- `<InfoBox title="...">` - Info-Kästen
- `<Accordion>` - Aufklappbare Bereiche
- `<CodeBlock>` - Code-Beispiele (falls nötig)
- `<Stats>` - Statistik-Anzeigen
- Standard Markdown: Tabellen, Listen, Links, Bilder

---

## Status

- [x] Getting Started (4 Seiten) ✅
- [x] Kurse (6 Seiten) ✅
- [x] Credits (6 Seiten) ✅
- [x] Trainer (5 Seiten) ✅
- [x] Buchungen (5 Seiten) ✅
- [x] Standorte (3 Seiten) ✅
- [ ] Zahlungen (5 Seiten)
- [ ] Kunden (4 Seiten)
- [ ] Einstellungen (5 Seiten)
- [ ] Widgets (4 Seiten)
- [ ] Mitglieder (4 Seiten)
- [ ] FAQ (4 Seiten)

**Gesamt: 29/55 Seiten erstellt**

---

## Erstellte Dateien

### Getting Started ✅
- `getting-started/index.mdx` - Willkommen & Übersicht
- `getting-started/studio-einrichten.mdx` - Studio-Konto erstellen
- `getting-started/erster-kurs.mdx` - Ersten Kurs anlegen
- `getting-started/erste-buchung.mdx` - Erste Buchung testen

### Kurse ✅
- `kurse/index.mdx` - Kursverwaltung Übersicht
- `kurse/kurs-erstellen.mdx` - Neuen Kurs anlegen
- `kurse/termine-erstellen.mdx` - Einzeltermine & Serien
- `kurse/kategorien.mdx` - Kategorien verwalten
- `kurse/warteliste.mdx` - Wartelisten-System
- `kurse/stornierung.mdx` - Stornierungsregeln

### Credits ✅
- `credits/index.mdx` - Credit-System Übersicht
- `credits/fifo-erklaert.mdx` - FIFO-Prinzip erklärt
- `credits/pakete-erstellen.mdx` - Credit-Pakete anlegen
- `credits/aktivierungsmodi.mdx` - Sofort, Erste Nutzung, Datum
- `credits/gueltigkeit.mdx` - Ablaufdaten & Verlängerung
- `credits/trainer-credits.mdx` - Trainer-gebundene Credits

### Trainer ✅
- `trainer/index.mdx` - Trainer-Verwaltung Übersicht
- `trainer/trainer-anlegen.mdx` - Neuen Trainer erstellen
- `trainer/berechtigungen.mdx` - Trainer-Berechtigungen
- `trainer/verdienste.mdx` - 3 Verdienstmodelle erklärt
- `trainer/trainer-dashboard.mdx` - Was Trainer sehen können

### Buchungen ✅
- `buchungen/index.mdx` - Buchungssystem Übersicht
- `buchungen/buchung-bestaetigen.mdx` - Manuelle Bestätigung
- `buchungen/teilnehmer.mdx` - Teilnehmer verwalten
- `buchungen/check-in.mdx` - QR-Code Check-In
- `buchungen/stornieren.mdx` - Buchungen stornieren

### Standorte ✅
- `standorte/index.mdx` - Standorte & Räume Übersicht
- `standorte/standort-anlegen.mdx` - Neuen Standort erstellen
- `standorte/raeume.mdx` - Räume konfigurieren

### Noch zu erstellen
- Zahlungen (5 Seiten)
- Kunden (4 Seiten)
- Einstellungen (5 Seiten)
- Widgets (4 Seiten)
- Mitglieder (4 Seiten)
- FAQ (4 Seiten)
