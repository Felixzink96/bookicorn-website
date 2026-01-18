'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import MagneticCloseButton from '@/components/ui/MagneticCloseButton';
import CookieCategory from './CookieCategory';
import { useConsent } from '@/lib/cookie-consent/consent-context';
import { useTranslation } from '@/lib/hooks/useTranslation';
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
  const { t } = useTranslation('cookies');

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

  // Only render on client side
  if (typeof window === 'undefined') return null;
  if (!showSettings) return null;

  return createPortal(
    <AnimatePresence>
      {showSettings && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[9998]"
            aria-hidden="true"
          />

          {/* Settings Panel - Bottom position like banner */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          >
            <div className="max-w-4xl mx-auto">
              <div
                className="bg-[var(--theme-background)] rounded-2xl shadow-2xl border border-[var(--theme-border)] overflow-hidden max-h-[80vh] flex flex-col"
                style={{
                  boxShadow: '0 -10px 40px -10px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Header */}
                <div className="p-6 pb-4 border-b border-[var(--theme-border)] relative">
                  <h2
                    id="cookie-settings-title"
                    className="text-lg font-semibold text-[var(--theme-text)] pr-10"
                  >
                    {t('settings.title')}
                  </h2>
                  <p className="text-sm text-[var(--theme-textSecondary)] mt-1 pr-10">
                    {t('settings.description')}
                  </p>
                  <MagneticCloseButton
                    onClick={closeSettings}
                    className="absolute top-4 right-4"
                  />
                </div>

                {/* Content - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
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
                    <div className="pt-2 text-center">
                      <Link
                        href="/datenschutz"
                        className="text-sm text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] underline transition-colors"
                        onClick={closeSettings}
                      >
                        {t('settings.privacyLink')}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 border-t border-[var(--theme-border)] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleRejectAll}>
                      {t('settings.rejectAll')}
                    </Button>
                    <Button variant="secondary" onClick={handleAcceptAll}>
                      {t('settings.acceptAll')}
                    </Button>
                  </div>
                  <Button variant="primary" onClick={handleSave}>
                    {t('settings.save')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
