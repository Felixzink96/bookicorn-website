/**
 * Simple translation hook for the website
 * Supports only the 'cookies' namespace for now
 */

import { cookiesDE } from '@/lib/translations/cookies/de';

type Translations = {
  cookies: typeof cookiesDE;
};

const translations: Translations = {
  cookies: cookiesDE,
};

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return the path if not found
    }
  }

  return typeof current === 'string' ? current : path;
}

export function useTranslation(namespace: keyof Translations) {
  const t = (key: string): string => {
    const namespaceTranslations = translations[namespace];
    if (!namespaceTranslations) {
      return key;
    }
    return getNestedValue(namespaceTranslations as unknown as Record<string, unknown>, key);
  };

  return { t };
}
