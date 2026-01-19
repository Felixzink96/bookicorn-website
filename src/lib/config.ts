// Zentrale Konfiguration für URLs und Site-Einstellungen
// Alle Links werden dynamisch basierend auf der Umgebung generiert

const isDevelopment = process.env.NODE_ENV === 'development'

// Base URLs from environment or defaults
const WWW_URL = process.env.NEXT_PUBLIC_WWW_URL || 'https://www.bookicorn.net'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.bookicorn.net'
const MANAGER_URL = process.env.NEXT_PUBLIC_MANAGER_URL || 'https://manager.bookicorn.net'

export const siteConfig = {
  name: 'Bookicorn',
  description: 'Die Kursplattform für Yoga & Fitness Studios',

  // URLs for different domains
  urls: {
    www: WWW_URL,        // www.bookicorn.net - Customer marketplace (SEO)
    app: APP_URL,        // app.bookicorn.net - System/App (Login required)
    manager: MANAGER_URL, // manager.bookicorn.net - B2B marketing (this site)
  },

  // Dynamische baseUrl für diese Website (manager.bookicorn.net)
  get baseUrl() {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return isDevelopment ? 'http://localhost:3000' : MANAGER_URL
  },

  // App URL für System-Links
  get appUrl() {
    return APP_URL
  },

  // WWW URL für Kunden-Links
  get wwwUrl() {
    return WWW_URL
  },

  // App-spezifische Routen (für Links zu app.bookicorn.net)
  routes: {
    // Auth - auf app.bookicorn.net
    login: '/anmelden',
    register: '/auth/studio-register',

    // Dashboard - auf app.bookicorn.net
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

// Get URL to app.bookicorn.net
export function getAppUrl(path: string = ''): string {
  return `${APP_URL}${path}`
}

// Get URL to www.bookicorn.net
export function getWwwUrl(path: string = ''): string {
  return `${WWW_URL}${path}`
}

// Get login URL (redirects to app.bookicorn.net/anmelden)
export function getLoginUrl(redirect?: string): string {
  const base = getAppUrl(siteConfig.routes.login)
  return redirect ? `${base}?redirect=${encodeURIComponent(redirect)}` : base
}

// Get studio registration URL (on app.bookicorn.net)
export function getRegisterUrl(plan?: string): string {
  const base = getAppUrl(siteConfig.routes.register)
  return plan ? `${base}?plan=${plan}` : base
}

// Get absolute URL for this site (manager.bookicorn.net)
export function getAbsoluteUrl(path: string): string {
  return `${siteConfig.baseUrl}${path}`
}

// Get studio URL (on www.bookicorn.net)
export function getStudioUrl(slug: string): string {
  return `${WWW_URL}/s/${slug}`
}

// Get discover URL (on www.bookicorn.net)
export function getDiscoverUrl(): string {
  return `${WWW_URL}/discover`
}
