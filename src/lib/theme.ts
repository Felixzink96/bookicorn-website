// Theme Configuration - Synchronisiert mit der Buchungsplattform

// System-Farben (ändern sich NICHT mit dem Theme)
export const systemColors = {
  error: '#DC2626',
  errorHover: '#B91C1C',
  success: '#16A34A',
  successHover: '#15803D',
  warning: '#EAB308',
  warningHover: '#CA8A04',
  info: '#3B82F6',
  infoHover: '#2563EB',
}

// Alle verfügbaren Themes
export const themes = {
  lime: {
    name: 'Lime',
    primary: '#84CC16',
    primaryHover: '#65A30D',
    gradient: 'from-lime-500 to-green-500',
    gradientHover: 'from-lime-600 to-green-600',
    buttonPrimary: '#84CC16',
    buttonPrimaryHover: '#65A30D',
    primaryLight: 'rgba(132, 204, 22, 0.05)',
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    },
    dark: {
      base: '#0F172A',
      raised: '#1E293B',
      overlay: '#334155',
      elevated: '#1E293B',
    }
  },
  trustBlue: {
    name: 'Trust Blue',
    primary: '#0061FF',
    primaryHover: '#0052DD',
    gradient: 'from-[#0061FF] to-[#60EFFF]',
    gradientHover: 'from-[#0052DD] to-[#4DDDED]',
    buttonPrimary: '#111827',
    buttonPrimaryHover: '#1F2937',
    primaryLight: 'rgba(0, 97, 255, 0.05)',
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    },
    dark: {
      base: '#0F172A',
      raised: '#1E293B',
      overlay: '#334155',
      elevated: '#1E293B',
    }
  },
  nature: {
    name: 'Nature',
    primary: '#10B981',
    primaryHover: '#059669',
    gradient: 'from-emerald-500 to-teal-600',
    gradientHover: 'from-emerald-600 to-teal-700',
    buttonPrimary: '#111827',
    buttonPrimaryHover: '#1F2937',
    primaryLight: 'rgba(16, 185, 129, 0.05)',
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    },
    dark: {
      base: '#0F172A',
      raised: '#1E293B',
      overlay: '#334155',
      elevated: '#1E293B',
    }
  },
  bookicorn: {
    name: 'Bookicorn',
    primary: '#EC4899',
    primaryHover: '#DB2777',
    gradient: 'from-purple-500 via-pink-500 to-cyan-400',
    gradientHover: 'from-purple-600 via-pink-600 to-cyan-500',
    buttonPrimary: '#EC4899',
    buttonPrimaryHover: '#DB2777',
    primaryLight: 'rgba(236, 72, 153, 0.05)',
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    },
    dark: {
      base: '#0F172A',
      raised: '#1E293B',
      overlay: '#334155',
      elevated: '#1E293B',
    }
  },
}

// Aktuelles Theme (synchronisiert mit Buchungsplattform)
export const currentTheme = 'lime' as keyof typeof themes
export const activeTheme = themes[currentTheme]

// CSS-Variablen für das Theme generieren
export function getThemeCSSVariables(themeName: keyof typeof themes, isDark: boolean = false) {
  const theme = themes[themeName]
  const surface = isDark ? theme.dark : theme.surface

  return {
    '--color-primary': theme.primary,
    '--color-primary-hover': theme.primaryHover,
    '--color-primary-light': theme.primaryLight,
    '--color-surface-base': surface.base,
    '--color-surface-raised': surface.raised,
    '--color-surface-overlay': surface.overlay,
    '--color-surface-elevated': surface.elevated,
  }
}
