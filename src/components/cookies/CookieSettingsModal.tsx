'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import CookieCategory from './CookieCategory';
import { useConsent } from '@/lib/cookie-consent/consent-context';
import { CookieCategory as CookieCategoryType } from '@/lib/cookie-consent/consent-types';

export default function CookieSettingsModal() {
  const {
    showSettings,
    closeSettings,
    savePreferences,
    acceptAll,
    rejectAll,
    consent,
  } = useConsent();

  // Local state for preferences
  const [preferences, setPreferences] = useState({
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Sync with current consent when modal opens
  useEffect(() => {
    if (showSettings && consent) {
      setPreferences({
        functional: consent.functional,
        analytics: consent.analytics,
        marketing: consent.marketing,
      });
    }
  }, [showSettings, consent]);

  const handleToggle = (category: Exclude<CookieCategoryType, 'essential'>, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSave = () => {
    savePreferences(preferences);
  };

  const handleAcceptAll = () => {
    acceptAll();
  };

  const handleRejectAll = () => {
    rejectAll();
  };

  return (
    <Modal
      isOpen={showSettings}
      onClose={closeSettings}
      title="Cookie-Einstellungen"
      description="Hier kannst du deine Cookie-Praeferenzen verwalten. Du kannst jederzeit deine Einstellungen aendern."
      size="lg"
      footer={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleRejectAll} className="flex-1 sm:flex-none">
              Nur essenzielle
            </Button>
            <Button variant="secondary" onClick={handleAcceptAll} className="flex-1 sm:flex-none">
              Alle akzeptieren
            </Button>
          </div>
          <Button variant="primary" onClick={handleSave} className="w-full sm:w-auto">
            Auswahl speichern
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Essential - always enabled */}
        <CookieCategory
          category="essential"
          enabled={true}
          onToggle={() => {}}
          disabled={true}
        />

        {/* Functional */}
        <CookieCategory
          category="functional"
          enabled={preferences.functional}
          onToggle={(value) => handleToggle('functional', value)}
        />

        {/* Analytics */}
        <CookieCategory
          category="analytics"
          enabled={preferences.analytics}
          onToggle={(value) => handleToggle('analytics', value)}
        />

        {/* Marketing */}
        <CookieCategory
          category="marketing"
          enabled={preferences.marketing}
          onToggle={(value) => handleToggle('marketing', value)}
        />

        {/* Privacy link */}
        <div className="pt-4 text-center">
          <Link
            href="/datenschutz"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline transition-colors"
            onClick={closeSettings}
          >
            Mehr in unserer Datenschutzerklaerung
          </Link>
        </div>
      </div>
    </Modal>
  );
}
