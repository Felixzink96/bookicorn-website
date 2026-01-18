'use client';

import React from 'react';
import { ConsentProvider } from '@/lib/cookie-consent/consent-context';
import CookieBanner from './CookieBanner';
import CookieSettingsModal from './CookieSettingsModal';

interface CookieConsentWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that provides cookie consent functionality
 * Includes the ConsentProvider, Banner, and Settings Modal
 */
export default function CookieConsentWrapper({ children }: CookieConsentWrapperProps) {
  return (
    <ConsentProvider>
      {children}
      <CookieBanner />
      <CookieSettingsModal />
    </ConsentProvider>
  );
}
