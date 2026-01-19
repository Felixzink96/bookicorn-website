'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  text?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
  delay?: number;
}

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  text,
  message,
  size = 'md',
  fullScreen = false,
  className = '',
  delay = 300,
}) => {
  const [showLoader, setShowLoader] = useState(delay === 0);
  const displayText = message || text || 'Wird geladen...';

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!showLoader) {
    return null;
  }

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center gap-4',
      className
    )}>
      <div className={cn(
        'modern-loader',
        size === 'sm' && 'scale-75',
        size === 'lg' && 'scale-125'
      )} />
      {displayText && (
        <p className={cn(
          'text-[var(--theme-textSecondary)]',
          textSizes[size]
        )}>
          {displayText}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[var(--theme-background)] z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      {content}
    </div>
  );
};

export default LoadingState;
