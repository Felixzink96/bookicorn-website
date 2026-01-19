'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_COOKIE_NAME = 'bookicorn-theme';
const THEME_COOKIE_EXPIRY_DAYS = 365;

/**
 * Get the root domain for cross-subdomain cookies
 */
function getCookieDomain(): string {
  if (typeof window === 'undefined') return '';

  const hostname = window.location.hostname;

  // Localhost or IP - no domain attribute needed
  if (hostname === 'localhost' || hostname.match(/^(\d+\.){3}\d+$/)) {
    return '';
  }

  // Production: use root domain with leading dot for all subdomains
  if (hostname.includes('bookicorn.net')) {
    return '.bookicorn.net';
  }

  return '';
}

/**
 * Get theme from cookie
 */
function getThemeFromCookie(): ThemeMode | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=').map(c => c.trim());
    if (name === THEME_COOKIE_NAME) {
      const decoded = decodeURIComponent(value);
      if (decoded === 'light' || decoded === 'dark') {
        return decoded;
      }
    }
  }
  return null;
}

/**
 * Save theme to cookie (cross-subdomain)
 */
function saveThemeToCookie(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + THEME_COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  const cookieDomain = getCookieDomain();
  const domainAttr = cookieDomain ? `; domain=${cookieDomain}` : '';

  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isSecure ? '; Secure' : '';

  document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}; expires=${expires.toUTCString()}; path=/${domainAttr}; SameSite=Lax${secureFlag}`;
}

// Get system preference
function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme to DOM
function applyTheme(theme: ThemeMode) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    // First check cookie (cross-subdomain)
    const savedCookie = getThemeFromCookie();
    // Fallback to localStorage for migration
    const savedLocal = typeof localStorage !== 'undefined'
      ? localStorage.getItem('theme') as ThemeMode | null
      : null;

    const saved = savedCookie || savedLocal;
    // If nothing saved, use system preference
    const theme = saved || getSystemTheme();

    setModeState(theme);
    applyTheme(theme);

    // Migrate from localStorage to cookie if needed
    if (!savedCookie && savedLocal) {
      saveThemeToCookie(savedLocal);
    }
  }, []);

  // Listen for system theme changes (only when nothing is saved)
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't set a preference
      const saved = getThemeFromCookie();
      if (!saved) {
        const newTheme = e.matches ? 'dark' : 'light';
        setModeState(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  // Apply theme when mode changes
  useEffect(() => {
    if (mounted) {
      applyTheme(mode);
    }
  }, [mode, mounted]);

  const setMode = (newMode: ThemeMode) => {
    saveThemeToCookie(newMode);
    // Also save to localStorage for backwards compatibility
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newMode);
    }
    setModeState(newMode);
  };

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return safe defaults when used outside provider
    return {
      mode: 'light' as ThemeMode,
      toggleMode: () => {},
      setMode: () => {}
    };
  }
  return context;
}
