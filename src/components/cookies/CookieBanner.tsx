'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useConsent } from '@/lib/cookie-consent/consent-context';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function CookieBanner() {
  const { showBanner, showSettings, acceptAll, rejectAll, openSettings } = useConsent();
  const { t } = useTranslation('cookies');

  // Only render on client side
  if (typeof window === 'undefined') return null;
  // Hide banner when settings modal is open
  if (!showBanner || showSettings) return null;

  return createPortal(
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[9998]"
            aria-hidden="true"
          />

          {/* Banner */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
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
                className="bg-[var(--theme-background)] rounded-2xl shadow-2xl border border-[var(--theme-border)] overflow-hidden"
                style={{
                  boxShadow: '0 -10px 40px -10px rgba(0, 0, 0, 0.15)',
                }}
              >
                <div className="p-6">
                  {/* Title */}
                  <h2
                    id="cookie-banner-title"
                    className="text-lg font-semibold text-[var(--theme-text)] mb-2"
                  >
                    {t('banner.title')}
                  </h2>

                  {/* Description */}
                  <p
                    id="cookie-banner-description"
                    className="text-sm text-[var(--theme-textSecondary)] mb-6"
                  >
                    {t('banner.description')}
                  </p>

                  {/* Actions - GDPR compliant: buttons same size/weight */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Primary actions - EQUAL styling for GDPR compliance */}
                    <div className="flex gap-3">
                      {/* Accept All - links */}
                      <Button
                        variant="secondary"
                        onClick={acceptAll}
                        aria-label={t('banner.acceptAll')}
                      >
                        {t('banner.acceptAll')}
                      </Button>

                      {/* Reject All - rechts */}
                      <Button
                        variant="secondary"
                        onClick={rejectAll}
                        aria-label={t('banner.rejectAll')}
                      >
                        {t('banner.rejectAll')}
                      </Button>
                    </div>

                    {/* Settings link */}
                    <button
                      type="button"
                      onClick={openSettings}
                      className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] transition-colors py-2"
                      aria-label={t('banner.settings')}
                    >
                      <Settings className="w-4 h-4" aria-hidden="true" />
                      {t('banner.settings')}
                    </button>
                  </div>

                  {/* Privacy link */}
                  <div className="mt-4 text-center">
                    <Link
                      href="/datenschutz"
                      className="text-xs text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] underline transition-colors"
                    >
                      {t('banner.privacyLink')}
                    </Link>
                  </div>
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
