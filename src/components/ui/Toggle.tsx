'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  label?: string;
}

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
}: ToggleProps) {
  const sizes = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: checked ? 'translateX(16px)' : 'translateX(2px)',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: checked ? 'translateX(20px)' : 'translateX(2px)',
    },
  };

  const currentSize = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-200
        ${currentSize.track}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${checked
          ? 'bg-violet-600 dark:bg-violet-500'
          : 'bg-gray-300 dark:bg-gray-600'
        }
      `}
    >
      <motion.span
        className={`
          ${currentSize.thumb}
          rounded-full bg-white shadow-md
        `}
        initial={false}
        animate={{
          x: checked ? (size === 'sm' ? 16 : 20) : 2,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
