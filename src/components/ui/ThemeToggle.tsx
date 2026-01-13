'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { mode, toggleMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getLabel = () => {
    return mode === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln';
  };

  return (
    <motion.button
      onClick={toggleMode}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex items-center justify-center h-8 w-8 rounded-full overflow-hidden bg-[var(--theme-surface)] transition-colors duration-200',
        className
      )}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {/* Hover Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[var(--theme-surfaceHover)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative overflow-hidden h-full w-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={mode}
            className="absolute flex items-center justify-center"
            initial={{
              y: 40,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1,
              rotate: isHovered ? 15 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            exit={{
              y: -40,
              opacity: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17
            }}
          >
            {mode === 'light' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
