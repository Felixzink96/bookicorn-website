'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface MagneticCloseButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  delay?: number;
  accentColor?: string; // Optional accent color, defaults to gray
}

export default function MagneticCloseButton({
  onClick,
  className = '',
  delay = 0.3,
  accentColor = 'rgba(59, 130, 246, 1)' // Default blue accent
}: MagneticCloseButtonProps) {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [isMagneticActive, setIsMagneticActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);
  
  // Magnetische Animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mit magnetischem Effekt
  const magneticX = useSpring(useTransform(mouseX, [-30, 30], [-8, 8]), {
    stiffness: 350,
    damping: 25,
    mass: 0.5
  });
  
  const magneticY = useSpring(useTransform(mouseY, [-30, 30], [-8, 8]), {
    stiffness: 350,
    damping: 25,
    mass: 0.5
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Aktiviere magnetischen Zustand wenn in der Nähe (40px Radius)
      if (distance < 40) {
        setIsMagneticActive(true);
        mouseX.set(distanceX);
        mouseY.set(distanceY);
      } else {
        setIsMagneticActive(false);
        mouseX.set(0);
        mouseY.set(0);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsMagneticActive(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={setButtonRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isMagneticActive ? 1.15 : 1,
        opacity: 1,
        transition: {
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 20
          },
          opacity: {
            delay,
            duration: 0.3
          }
        }
      }}
      style={{
        x: magneticX,
        y: magneticY,
        cursor: 'pointer',
        boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.4), 0 2px 8px rgba(0,0,0,0.04)'
      }}
      whileTap={{
        scale: 0.9
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`p-2 rounded-full z-50 backdrop-blur-xl ${className} ${
        isMagneticActive
          ? `${isDarkMode ? 'bg-[#242424]/95' : 'bg-white/95'} border-[1.5px] border-[var(--theme-border)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]`
          : `${isDarkMode ? 'bg-[#242424]/90' : 'bg-white/90'} border border-[var(--theme-border)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]`
      }`}
    >

      {/* Subtle glow effect when magnetic */}
      {isMagneticActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
            filter: 'blur(16px)',
            zIndex: -1
          }}
        />
      )}
      
      <motion.div
        animate={{
          rotate: isMagneticActive ? 90 : 0,
          scale: isMagneticActive ? 1.1 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        style={{
          filter: isMagneticActive ? 'drop-shadow(0 0 2px rgba(0,0,0,0.1))' : 'none'
        }}
      >
        <X className="w-4 h-4 text-[var(--theme-text)]" style={{
          opacity: isMagneticActive ? 0.9 : 0.7
        }} />
      </motion.div>
    </motion.button>
  );
}