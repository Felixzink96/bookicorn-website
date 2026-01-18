/**
 * Cookie Consent Types
 * GDPR compliant cookie consent management
 * Shared format with app.bookicorn.com for cross-subdomain cookies
 */

// Cookie categories as defined by GDPR
export type CookieCategory = 'essential' | 'functional' | 'analytics' | 'marketing';

// Consent data stored in cookie - MUST match kursplattform format!
export interface ConsentData {
  version: number;        // Schema version for future migrations
  timestamp: string;      // ISO date when consent was given
  essential: true;        // Always true - required for site function
  functional: boolean;    // Theme, preferences
  analytics: boolean;     // Google Analytics, etc.
  marketing: boolean;     // Meta Pixel, marketing automation
}

// Default consent - only essential
export const DEFAULT_CONSENT: ConsentData = {
  version: 1,
  timestamp: new Date().toISOString(),
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
};

// All categories accepted
export const ALL_ACCEPTED_CONSENT: ConsentData = {
  version: 1,
  timestamp: new Date().toISOString(),
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
};

// Cookie configuration - MUST match kursplattform!
export const CONSENT_COOKIE_NAME = 'bookicorn-consent';
export const CONSENT_COOKIE_VERSION = 1;
export const CONSENT_COOKIE_EXPIRY_DAYS = 365;

// Consent context type
export interface ConsentContextType {
  consent: ConsentData | null;
  isLoading: boolean;
  hasConsent: boolean;
  showBanner: boolean;
  showSettings: boolean;

  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: Partial<ConsentData>) => void;
  openSettings: () => void;
  closeSettings: () => void;

  // Helper functions
  hasConsentFor: (category: CookieCategory) => boolean;
  revokeConsent: () => void;
}
