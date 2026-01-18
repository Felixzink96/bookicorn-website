'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useConsent } from '@/lib/cookie-consent/consent-context';

export default function CookieBanner() {
  const { showBanner, showSettings, acceptAll, rejectAll, openSettings } = useConsent();

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
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{
                  boxShadow: '0 -10px 40px -10px rgba(0, 0, 0, 0.15)',
                }}
              >
                <div className="p-6">
                  {/* Title */}
                  <h2
                    id="cookie-banner-title"
                    className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Wir verwenden Cookies
                  </h2>

                  {/* Description */}
                  <p
                    id="cookie-banner-description"
                    className="text-sm text-gray-500 dark:text-gray-400 mb-6"
                  >
                    Wir nutzen Cookies und aehnliche Technologien, um unsere Website zu verbessern und dir ein besseres Nutzungserlebnis zu bieten. Du kannst selbst entscheiden, welche Kategorien du zulassen moechtest.
                  </p>

                  {/* Actions - GDPR compliant: buttons same size/weight */}
                  <div className="flex flex-col gap-3">
                    {/* Primary actions - EQUAL styling for GDPR compliance */}
                    <div className="flex gap-3">
                      {/* Reject All - SAME styling as Accept */}
                      <Button
                        variant="secondary"
                        onClick={rejectAll}
                        className="flex-1"
                      >
                        Alle ablehnen
                      </Button>

                      {/* Accept All - SAME styling as Reject */}
                      <Button
                        variant="secondary"
                        onClick={acceptAll}
                        className="flex-1"
                      >
                        Alle akzeptieren
                      </Button>
                    </div>

                    {/* Settings link - always below on mobile */}
                    <button
                      type="button"
                      onClick={openSettings}
                      className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors py-2"
                      aria-label="Cookie-Einstellungen anpassen"
                    >
                      <Settings className="w-4 h-4" aria-hidden="true" />
                      Einstellungen anpassen
                    </button>
                  </div>

                  {/* Privacy link */}
                  <div className="mt-4 text-center">
                    <Link
                      href="/datenschutz"
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline transition-colors"
                    >
                      Mehr in unserer Datenschutzerklaerung
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
