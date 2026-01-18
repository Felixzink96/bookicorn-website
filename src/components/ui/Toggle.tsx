'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { activeTheme } from '@/config/theme';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  label?: string;
  hint?: string;
}

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  hint
}: ToggleProps) {
  const id = `toggle-${Math.random().toString(36).substr(2, 9)}`;

  const sizeStyles = {
    sm: {
      container: 'h-5 w-10 p-0.5',
      dot: 'w-4 h-4',
      translateX: 20,
      label: 'text-sm',
      gap: 'gap-2',
    },
    md: {
      container: 'h-6 w-12 p-0.5',
      dot: 'w-5 h-5',
      translateX: 24,
      label: 'text-sm',
      gap: 'gap-3',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <motion.label
      className={`flex items-center cursor-pointer group ${currentSize.gap} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
    >
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <motion.div
          className={`
            ${currentSize.container}
            rounded-full transition-all duration-150 ease-linear
            flex items-center flex-shrink-0
            ${checked ? '' : 'bg-[var(--theme-border)]'}
            ${!disabled && 'peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-[var(--theme-background)]'}
          `}
          style={{
            backgroundColor: checked ? activeTheme.primary : undefined,
            boxShadow: checked ? `0 0 0 2px ${activeTheme.primary}20` : undefined
          }}
          animate={{
            backgroundColor: checked ? activeTheme.primary : 'var(--theme-border)'
          }}
        >
          <motion.div
            className={`
              ${currentSize.dot}
              rounded-full bg-white shadow-md
            `}
            animate={{
              x: checked ? currentSize.translateX : 0
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </motion.div>
      </div>

      {(label || hint) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className={`${currentSize.label} font-medium text-[var(--theme-text)] select-none`}>
              {label}
            </span>
          )}
          {hint && (
            <span className="text-sm text-[var(--theme-textSecondary)]">
              {hint}
            </span>
          )}
        </div>
      )}
    </motion.label>
  );
}
