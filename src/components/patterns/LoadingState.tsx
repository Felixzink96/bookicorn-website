'use client';

import React, { useState, useEffect } from 'react';

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

const LoadingState: React.FC<LoadingStateProps> = ({
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
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className={`modern-loader ${size === 'sm' ? 'scale-75' : ''} ${size === 'lg' ? 'scale-125' : ''}`} />
      {displayText && (
        <p className={`text-[var(--theme-textSecondary)] ${textSizes[size]}`}>
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
    <div className="flex items-center justify-center py-16">
      {content}
    </div>
  );
};

export { LoadingState };
export default LoadingState;
