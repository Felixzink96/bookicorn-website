/**
 * Cookie Consent Translations (German)
 * GDPR 2026 compliant wording
 */
export const cookiesDE = {
  banner: {
    title: 'Wir verwenden Cookies',
    description: 'Wir nutzen Cookies und ähnliche Technologien, um unsere Website zu verbessern und dir ein besseres Nutzungserlebnis zu bieten. Du kannst selbst entscheiden, welche Kategorien du zulassen möchtest.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    settings: 'Einstellungen anpassen',
    privacyLink: 'Mehr in unserer Datenschutzerklärung',
  },

  settings: {
    title: 'Cookie-Einstellungen',
    description: 'Hier kannst du deine Cookie-Präferenzen verwalten. Du kannst jederzeit deine Einstellungen ändern.',
    save: 'Auswahl speichern',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Nur essenzielle',
    privacyLink: 'Mehr in unserer Datenschutzerklärung',
    alwaysActive: 'Immer aktiv',
  },

  categories: {
    expandMore: 'Mehr anzeigen',
    expandLess: 'Weniger anzeigen',
    essential: {
      title: 'Essenzielle Cookies',
      description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich. Sie ermöglichen grundlegende Funktionen wie Seitennavigation, Zugriff auf sichere Bereiche und die Speicherung deiner Anmeldung. Ohne diese Cookies kann die Website nicht ordnungsgemäß funktionieren.',
      cookies: [
        {
          name: 'bookicorn-consent',
          purpose: 'Speichert deine Cookie-Einstellungen',
          expiry: '1 Jahr',
        },
        {
          name: 'supabase-auth-token',
          purpose: 'Authentifizierung und Anmeldung',
          expiry: 'Sitzung',
        },
      ],
    },

    functional: {
      title: 'Funktionale Cookies',
      description: 'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, wie z.B. das Speichern deiner bevorzugten Einstellungen, Theme-Auswahl und Ansichtsoptionen. Wenn du diese Cookies nicht zulässt, funktionieren einige oder alle dieser Dienste möglicherweise nicht einwandfrei.',
      cookies: [
        {
          name: 'theme',
          purpose: 'Speichert deine Theme-Einstellung (Hell/Dunkel)',
          expiry: '1 Jahr',
        },
        {
          name: 'admin-view-*',
          purpose: 'Speichert Admin-Ansichtseinstellungen',
          expiry: '30 Tage',
        },
      ],
    },

    analytics: {
      title: 'Analyse-Cookies',
      description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden. Sie helfen uns, unsere Website kontinuierlich zu verbessern.',
      cookies: [
        {
          name: '_ga, _gid',
          purpose: 'Google Analytics - Websiteanalyse',
          expiry: '2 Jahre',
        },
      ],
    },

    marketing: {
      title: 'Marketing-Cookies',
      description: 'Diese Cookies werden verwendet, um Werbung relevanter für dich zu gestalten. Sie verhindern auch, dass dieselbe Werbung ständig wieder erscheint, und stellen sicher, dass Anzeigen ordnungsgemäß angezeigt werden.',
      cookies: [
        {
          name: '_fbp',
          purpose: 'Meta/Facebook Pixel - Personalisierte Werbung',
          expiry: '90 Tage',
        },
      ],
    },
  },

  footer: {
    cookieSettings: 'Cookie-Einstellungen',
  },

  // Legal pages
  legal: {
    privacy: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert',
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      lastUpdated: 'Zuletzt aktualisiert',
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert',
    },
    imprint: {
      title: 'Impressum',
    },
  },
};
