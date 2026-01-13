// Zentrale Konfiguration für URLs und Site-Einstellungen
// Alle Links werden dynamisch basierend auf der Umgebung generiert

const isDevelopment = process.env.NODE_ENV === 'development'

// Base URLs
const PRODUCTION_DOMAIN = 'bookicorn.net'
const DEVELOPMENT_DOMAIN = 'localhost'

export const siteConfig = {
  name: 'Bookicorn',
  description: 'Die Kursplattform für Yoga & Fitness Studios',

  // Dynamische URLs basierend auf Umgebung
  get baseUrl() {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return isDevelopment
      ? `http://${DEVELOPMENT_DOMAIN}:3000`
      : `https://www.${PRODUCTION_DOMAIN}`
  },

  get appUrl() {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      if (host === 'localhost' || host === '127.0.0.1') {
        return 'http://localhost:3000' // Dev: gleicher Port oder anpassen
      }
      // Production: app.domain.com
      return `https://app.${host.replace('www.', '')}`
    }
    return isDevelopment
      ? 'http://localhost:3000'
      : `https://app.${PRODUCTION_DOMAIN}`
  },

  // App-spezifische Routen
  routes: {
    // Auth
    login: '/auth/login',
    register: '/auth/studio-register',

    // Dashboard
    dashboard: '/dashboard',
    admin: '/admin',
  },

  // Externe Links
  social: {
    twitter: 'https://twitter.com/bookicorn',
    instagram: 'https://instagram.com/bookicorn',
    linkedin: 'https://linkedin.com/company/bookicorn',
  },

  // Support
  support: {
    email: 'hello@bookicorn.net',
    phone: '+49 30 123 456 789',
  },
}

// Helper-Funktionen für URLs
export function getAppUrl(path: string = ''): string {
  return `${siteConfig.appUrl}${path}`
}

export function getLoginUrl(redirect?: string): string {
  const base = getAppUrl(siteConfig.routes.login)
  return redirect ? `${base}?redirect=${encodeURIComponent(redirect)}` : base
}

export function getRegisterUrl(plan?: string): string {
  const base = getAppUrl(siteConfig.routes.register)
  return plan ? `${base}?plan=${plan}` : base
}

export function getAbsoluteUrl(path: string): string {
  return `${siteConfig.baseUrl}${path}`
}
