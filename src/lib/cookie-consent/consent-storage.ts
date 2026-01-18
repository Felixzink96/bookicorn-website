/**
 * Cookie Consent Storage Utilities
 * Handles reading/writing consent to cookies (not localStorage)
 * Uses cross-subdomain cookies for .bookicorn.com
 */

import {
  ConsentData,
  CONSENT_COOKIE_NAME,
  CONSENT_COOKIE_VERSION,
  CONSENT_COOKIE_EXPIRY_DAYS,
} from './consent-types';

/**
 * Parse cookie string and get specific cookie value
 */
function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

/**
 * Get the root domain for cross-subdomain cookies
 * Returns .bookicorn.com for production, or current hostname for localhost
 */
function getCookieDomain(): string {
  if (typeof window === 'undefined') return '';

  const hostname = window.location.hostname;

  // Localhost or IP - no domain attribute needed
  if (hostname === 'localhost' || hostname.match(/^(\d+\.){3}\d+$/)) {
    return '';
  }

  // Production: use root domain with leading dot for all subdomains
  // .bookicorn.com covers: bookicorn.com, www.bookicorn.com, app.bookicorn.com, etc.
  if (hostname.includes('bookicorn.com')) {
    return '.bookicorn.com';
  }

  // Vercel preview URLs or other domains - use current hostname
  return '';
}

/**
 * Set cookie with proper attributes
 * Uses cross-subdomain cookie for .bookicorn.com
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const cookieDomain = getCookieDomain();
  const domainAttr = cookieDomain ? `; domain=${cookieDomain}` : '';

  // Always use Secure on HTTPS, SameSite=Lax for cross-subdomain navigation
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isSecure ? '; Secure' : '';

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/${domainAttr}; SameSite=Lax${secureFlag}`;
}

/**
 * Delete cookie by setting expiry to past
 * Deletes on both current domain and root domain for cross-subdomain support
 */
function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;

  const cookieDomain = getCookieDomain();
  const domainAttr = cookieDomain ? `; domain=${cookieDomain}` : '';

  // Delete on root domain (cross-subdomain)
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}`;

  // Also delete on current domain (in case old cookies exist)
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/**
 * Read consent from cookie
 * Returns null if no consent has been given yet
 */
export function getStoredConsent(): ConsentData | null {
  try {
    const cookieValue = getCookieValue(CONSENT_COOKIE_NAME);
    if (!cookieValue) return null;

    const parsed = JSON.parse(cookieValue) as ConsentData;

    // Validate version - if outdated, user needs to consent again
    if (parsed.version !== CONSENT_COOKIE_VERSION) {
      console.info('[Cookie Consent] Stored consent version outdated, clearing');
      deleteStoredConsent();
      return null;
    }

    // Ensure essential is always true
    parsed.essential = true;

    return parsed;
  } catch (error) {
    console.error('[Cookie Consent] Error reading consent cookie:', error);
    return null;
  }
}

/**
 * Save consent to cookie
 */
export function saveConsent(consent: ConsentData): void {
  try {
    // Always ensure essential is true and timestamp is updated
    const consentToSave: ConsentData = {
      ...consent,
      essential: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_COOKIE_VERSION,
    };

    setCookie(
      CONSENT_COOKIE_NAME,
      JSON.stringify(consentToSave),
      CONSENT_COOKIE_EXPIRY_DAYS
    );
  } catch (error) {
    console.error('[Cookie Consent] Error saving consent cookie:', error);
  }
}

/**
 * Delete stored consent
 */
export function deleteStoredConsent(): void {
  deleteCookie(CONSENT_COOKIE_NAME);
}

/**
 * Check if consent has been given (regardless of choices)
 */
export function hasStoredConsent(): boolean {
  return getStoredConsent() !== null;
}
