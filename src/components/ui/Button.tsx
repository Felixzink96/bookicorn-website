'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Spring transition for smooth animations
const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25
};

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  iconClassName = '',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {

  const baseStyles = `
    inline-flex items-center justify-center font-medium cursor-pointer
    focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantStyles = {
    primary: `btn-rainbow-gradient text-[var(--theme-text)]`,
    secondary: `
      bg-[var(--theme-background)]
      text-[var(--theme-text)]
      border border-[var(--theme-border)]
      hover:bg-[var(--theme-surface)]
      rounded-full
    `,
    ghost: `
      bg-transparent
      text-[var(--theme-textSecondary)]
      hover:bg-[var(--theme-surface)]
      rounded-full
    `,
    danger: `
      bg-[var(--theme-error)]
      text-white
      hover:opacity-90
      rounded-full
    `,
    success: `
      bg-[var(--theme-success)]
      text-white
      hover:opacity-90
      rounded-full
    `,
    link: `
      bg-transparent
      text-[var(--theme-text)]
      underline underline-offset-4
      hover:opacity-80
    `,
  };

  const sizeStyles = {
    sm: variant === 'primary' ? 'text-sm' : 'px-3 py-1.5 text-sm gap-2',
    md: variant === 'primary' ? 'text-base' : 'px-5 py-2.5 text-base gap-2',
    lg: variant === 'primary' ? 'text-lg' : 'px-6 py-3 text-lg gap-3',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const isDisabled = disabled || loading;

  // Primary variant uses special wrapper structure
  if (variant === 'primary') {
    return (
      <motion.button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={springTransition}
        {...props}
      >
        <span className="btn-content-wrapper">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {!loading && Icon && iconPosition === 'left' && (
            <Icon className={cn(iconSizeClasses[size], 'flex-shrink-0', iconClassName)} />
          )}

          <span className="whitespace-nowrap">{children}</span>

          {!loading && Icon && iconPosition === 'right' && (
            <Icon className={cn(iconSizeClasses[size], 'flex-shrink-0', iconClassName)} />
          )}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      transition={springTransition}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={cn(iconSizeClasses[size], 'flex-shrink-0', iconClassName)} />
      )}

      <span className="whitespace-nowrap">{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={cn(iconSizeClasses[size], 'flex-shrink-0', iconClassName)} />
      )}
    </motion.button>
  );
};

export default Button;
