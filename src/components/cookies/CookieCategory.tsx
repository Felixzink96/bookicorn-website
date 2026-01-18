'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, BarChart3, Target, ChevronDown, ChevronUp } from 'lucide-react';
import Toggle from '@/components/ui/Toggle';
import { CookieCategory as CookieCategoryType } from '@/lib/cookie-consent/consent-types';

interface CookieCategoryProps {
  category: CookieCategoryType;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

const categoryIcons: Record<CookieCategoryType, React.ElementType> = {
  essential: Shield,
  functional: Sparkles,
  analytics: BarChart3,
  marketing: Target,
};

const categoryInfo: Record<CookieCategoryType, { title: string; description: string }> = {
  essential: {
    title: 'Essenzielle Cookies',
    description: 'Diese Cookies sind fuer die Grundfunktionen der Website erforderlich. Sie ermoeglichen grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche. Ohne diese Cookies kann die Website nicht ordnungsgemaess funktionieren.',
  },
  functional: {
    title: 'Funktionale Cookies',
    description: 'Diese Cookies ermoeglichen erweiterte Funktionen und Personalisierung, wie z.B. das Speichern deiner bevorzugten Einstellungen und Theme-Auswahl.',
  },
  analytics: {
    title: 'Analyse-Cookies',
    description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln. Sie helfen uns, unsere Website kontinuierlich zu verbessern.',
  },
  marketing: {
    title: 'Marketing-Cookies',
    description: 'Diese Cookies werden verwendet, um Werbung relevanter fuer dich zu gestalten und verhindern, dass dieselbe Werbung staendig wieder erscheint.',
  },
};

export default function CookieCategory({
  category,
  enabled,
  onToggle,
  disabled = false,
}: CookieCategoryProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = categoryIcons[category];
  const info = categoryInfo[category];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            enabled
              ? 'bg-violet-100 dark:bg-violet-900/30'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              enabled
                ? 'text-violet-600 dark:text-violet-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium text-gray-900 dark:text-white">{info.title}</h3>

            {/* Toggle or Always Active Badge */}
            {disabled ? (
              <span className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                Immer aktiv
              </span>
            ) : (
              <Toggle checked={enabled} onChange={onToggle} size="sm" />
            )}
          </div>

          {/* Description - truncated with expand option */}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {info.description}
          </p>

          {/* Expand/Collapse button */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Weniger anzeigen
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Mehr anzeigen
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded cookie list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-gray-200 dark:border-gray-700">
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {info.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
