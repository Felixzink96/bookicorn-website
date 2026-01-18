'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  ConsentData,
  ConsentContextType,
  CookieCategory,
  DEFAULT_CONSENT,
  ALL_ACCEPTED_CONSENT,
} from './consent-types';
import {
  getStoredConsent,
  saveConsent,
  deleteStoredConsent,
} from './consent-storage';

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

interface ConsentProviderProps {
  children: ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setConsent(storedConsent);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setIsLoading(false);
  }, []);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const newConsent: ConsentData = {
      ...ALL_ACCEPTED_CONSENT,
      timestamp: new Date().toISOString(),
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  // Reject all non-essential cookies
  const rejectAll = useCallback(() => {
    const newConsent: ConsentData = {
      ...DEFAULT_CONSENT,
      timestamp: new Date().toISOString(),
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  // Save custom preferences
  const savePreferences = useCallback((preferences: Partial<ConsentData>) => {
    const newConsent: ConsentData = {
      version: DEFAULT_CONSENT.version,
      timestamp: new Date().toISOString(),
      essential: true, // Always true
      functional: preferences.functional ?? false,
      analytics: preferences.analytics ?? false,
      marketing: preferences.marketing ?? false,
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  // Open settings modal
  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  // Close settings modal
  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  // Check if consent was given for a specific category
  const hasConsentFor = useCallback((category: CookieCategory): boolean => {
    if (!consent) return category === 'essential';
    return consent[category] === true;
  }, [consent]);

  // Revoke all consent (delete cookie, show banner again)
  const revokeConsent = useCallback(() => {
    deleteStoredConsent();
    setConsent(null);
    setShowBanner(true);
    setShowSettings(false);
  }, []);

  const value: ConsentContextType = {
    consent,
    isLoading,
    hasConsent: consent !== null,
    showBanner: showBanner && !isLoading,
    showSettings,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
    hasConsentFor,
    revokeConsent,
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextType {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    // Return safe defaults outside of provider
    return {
      consent: null,
      isLoading: true,
      hasConsent: false,
      showBanner: false,
      showSettings: false,
      acceptAll: () => {},
      rejectAll: () => {},
      savePreferences: () => {},
      openSettings: () => {},
      closeSettings: () => {},
      hasConsentFor: () => false,
      revokeConsent: () => {},
    };
  }
  return context;
}
