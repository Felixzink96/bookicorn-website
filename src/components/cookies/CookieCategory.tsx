'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, BarChart3, Target, ChevronDown, ChevronUp } from 'lucide-react';
import Toggle from '@/components/ui/Toggle';
import { CookieCategory as CookieCategoryType } from '@/lib/cookie-consent/consent-types';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { activeTheme } from '@/config/theme';

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

export default function CookieCategory({
  category,
  enabled,
  onToggle,
  disabled = false,
}: CookieCategoryProps) {
  const { t } = useTranslation('cookies');
  const [expanded, setExpanded] = useState(false);
  const Icon = categoryIcons[category];

  const title = t(`categories.${category}.title`);
  const description = t(`categories.${category}.description`);

  // Theme-basierte Farben für enabled state
  const enabledBgColor = `${activeTheme.primary}15`; // 15% opacity
  const enabledIconColor = activeTheme.primary;

  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: disabled
              ? 'var(--theme-surfaceHover)'
              : enabled
              ? enabledBgColor
              : 'var(--theme-surfaceHover)',
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{
              color: disabled
                ? 'var(--theme-textSecondary)'
                : enabled
                ? enabledIconColor
                : 'var(--theme-textSecondary)',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium text-[var(--theme-text)]">{title}</h3>

            {/* Toggle or Always Active Badge */}
            {disabled ? (
              <span
                className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                style={{
                  color: activeTheme.primary,
                  backgroundColor: `${activeTheme.primary}15`,
                }}
              >
                {t('settings.alwaysActive')}
              </span>
            ) : (
              <Toggle
                checked={enabled}
                onChange={onToggle}
                size="sm"
              />
            )}
          </div>

          {/* Description - truncated with expand option */}
          <p className="mt-1 text-sm text-[var(--theme-textSecondary)] line-clamp-2">
            {description}
          </p>

          {/* Expand/Collapse button */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs font-medium text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                {t('categories.expandLess')}
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                {t('categories.expandMore')}
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
            <div className="px-4 pb-4 pt-0 border-t border-[var(--theme-border)]">
              <div className="mt-3 space-y-2">
                <p className="text-sm text-[var(--theme-textSecondary)]">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
