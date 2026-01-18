// Theme Configuration - Ändere hier die Farben für die gesamte App!

// Typography Configuration - Globale Einstellungen für Überschriften
export const typography = {
  headings: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '500',
    letterSpacing: '-0.049375rem',
    color: 'rgb(23, 23, 23)',
    sizes: {
      h1: { fontSize: '2rem', lineHeight: '2.5rem' },
      h2: { fontSize: '1.5rem', lineHeight: '2rem' },
      h3: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      h4: { fontSize: '1.125rem', lineHeight: '1.5rem' },
      h5: { fontSize: '1rem', lineHeight: '1.25rem' },
      h6: { fontSize: '0.875rem', lineHeight: '1.125rem' },
    }
  }
}

// Globale System-Farben (ändern sich NICHT mit dem Theme)
export const systemColors = {
  error: '#DC2626',     // Rot für Fehler/Löschen (Tailwind red-600)
  errorHover: '#B91C1C', // Dunkleres Rot (Tailwind red-700)
  success: '#16A34A',   // Grün für Erfolg (Tailwind green-600)
  successHover: '#15803D', // Dunkleres Grün (Tailwind green-700)
  warning: '#EAB308',   // Gelb für Warnungen (Tailwind yellow-500)
  warningHover: '#CA8A04', // Dunkleres Gelb (Tailwind yellow-600)
  info: '#3B82F6',      // Blau für Info (Tailwind blue-500)
  infoHover: '#2563EB', // Dunkleres Blau (Tailwind blue-600)
}

export const theme = {
  // Diese Werte werden vom activeTheme überschrieben
  primary: '#10B981', // Nature Green
  primaryHover: '#059669', // Darker Green
  gradient: 'from-emerald-500 to-teal-600',
  gradientHover: 'from-emerald-600 to-teal-700',
  // Moderne SaaS Button-Farben
  buttonPrimary: '#111827',       // gray-900 - Modernes Dunkelgrau/Schwarz
  buttonPrimaryHover: '#1F2937',  // gray-800 - Etwas helleres Grau beim Hover
  buttonPrimaryBorder: '#1F2937', // gray-800 - Subtile Border
  buttonPrimaryFocus: 'rgba(107, 114, 128, 0.2)', // gray-500 mit 20% Opacity
}

// Vorgefertigte Themes zum schnellen Wechseln
export const themes = {
  orange: {
    primary: '#FF6B35',
    gradient: 'from-orange-500 to-red-500',
    gradientHover: 'from-orange-600 to-red-600',
    buttonPrimary: '#111827',
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(107, 114, 128, 0.2)',
  },
  blue: {
    primary: '#2563EB',  // Vertrauenswürdiges Blau (blue-600)
    gradient: 'from-blue-600 to-blue-700',  // Subtiler Gradient
    gradientHover: 'from-blue-700 to-blue-800',
    buttonPrimary: '#111827',  // Gleiche moderne Button-Farben
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(107, 114, 128, 0.2)',
  },
  purple: {
    primary: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-600',
    gradientHover: 'from-purple-600 to-pink-700',
  },
  green: {
    primary: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    gradientHover: 'from-green-600 to-emerald-700',
  },
  dark: {
    primary: '#374151',
    gradient: 'from-gray-700 to-gray-900',
    gradientHover: 'from-gray-800 to-black',
  },
  energyCoral: {
    primary: '#FF6B6B',  // Energetic Coral - perfekte Balance zwischen Energie und Professionalität
    primaryHover: '#FF5252',  // Intensiveres Coral beim Hover
    gradient: 'from-red-400 via-orange-400 to-pink-400',  // Dynamischer Energie-Gradient
    gradientHover: 'from-red-500 via-orange-500 to-pink-500',
    buttonPrimary: '#FF6B6B',  // Coral als Primary Action
    buttonPrimaryHover: '#FF5252',  // Dunkleres Coral
    buttonPrimaryBorder: '#FF5252',
    buttonPrimaryFocus: 'rgba(255, 107, 107, 0.2)',  // Coral mit 20% Opacity
    // Sekundärfarben für Balance
    secondary: '#4ECDC4',  // Türkis - komplementär, beruhigend (gut für Yoga/Wellness)
    accent: '#FFE66D',  // Warmes Gelb - Optimismus, Energie
  },
  stableSlate: {
    primary: '#334155',  // Deep Slate - "Dieses System ist felsenfest"
    primaryHover: '#1E293B',  // Noch tiefer - bestätigt die Solidität
    gradient: 'from-slate-700 to-slate-800',  // Subtil, professionell
    gradientHover: 'from-slate-800 to-slate-900',
    buttonPrimary: '#334155',  
    buttonPrimaryHover: '#1E293B',
    buttonPrimaryBorder: '#475569',
    buttonPrimaryFocus: 'rgba(71, 85, 105, 0.15)',
    // Akzentfarbe für Erfolg/Positives
    success: '#10B981',  // Grün = "Alles läuft gut"
    accent: '#3B82F6',   // Blau = "Vertrauen"
  },
  ocean: {
    primary: '#0EA5E9',
    gradient: 'from-cyan-500 to-teal-600',
    gradientHover: 'from-cyan-600 to-teal-700',
  },
  aqua: {
    primary: '#06B6D4',
    // Harmonischerer Gradient: Cyan zu einem tieferen Cyan/Teal
    gradient: 'from-cyan-500 to-cyan-700',
    gradientHover: 'from-cyan-600 to-cyan-800',
  },
  aquaVibrant: {
    primary: '#06B6D4',
    // Lebendiger: Cyan zu Teal
    gradient: 'from-cyan-500 to-teal-600',
    gradientHover: 'from-cyan-600 to-teal-700',
  },
  aquaSubtle: {
    primary: '#06B6D4',
    // Subtiler: Cyan zu leichtem Blau
    gradient: 'from-cyan-500 to-sky-600',
    gradientHover: 'from-cyan-600 to-sky-700',
  },
  aquaWarm: {
    primary: '#06B6D4',
    // Wärmer: Cyan zu Türkis/Grün
    gradient: 'from-cyan-500 to-emerald-600',
    gradientHover: 'from-cyan-600 to-emerald-700',
  },
  premium: {
    primary: '#8B5CF6',
    // Premium Purple Gradient für Wellness & Transformation
    gradient: 'from-violet-500 to-purple-600',
    gradientHover: 'from-violet-600 to-purple-700',
  },
  premiumVibrant: {
    primary: '#8B5CF6',
    // Lebendiger: Purple zu Pink
    gradient: 'from-purple-500 to-pink-600',
    gradientHover: 'from-purple-600 to-pink-700',
  },
  premiumDeep: {
    primary: '#8B5CF6',
    // Tiefer: Purple zu Indigo
    gradient: 'from-purple-600 to-indigo-700',
    gradientHover: 'from-purple-700 to-indigo-800',
  },
  nature: {
    primary: '#10B981',
    // Nature Green: Emerald zu Teal
    gradient: 'from-emerald-500 to-teal-600',
    gradientHover: 'from-emerald-600 to-teal-700',
    buttonPrimary: '#111827',
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(107, 114, 128, 0.2)',
  },
  natureLight: {
    primary: '#10B981',
    // Sehr hell: Emerald zu hellem Cyan
    gradient: 'from-emerald-400 to-cyan-400',
    gradientHover: 'from-emerald-500 to-cyan-500',
  },
  natureFresh: {
    primary: '#10B981',
    // Frisch: Emerald zu Mint Green
    gradient: 'from-emerald-500 to-green-400',
    gradientHover: 'from-emerald-600 to-green-500',
  },
  natureAqua: {
    primary: '#10B981',
    // Aqua Touch: Emerald zu Sky Blue
    gradient: 'from-emerald-500 to-sky-500',
    gradientHover: 'from-emerald-600 to-sky-600',
  },
  natureLime: {
    primary: '#10B981',
    // Lime Fresh: Emerald zu Lime
    gradient: 'from-emerald-500 to-lime-400',
    gradientHover: 'from-emerald-600 to-lime-500',
  },
  natureVibrant: {
    primary: '#10B981',
    // Lebendiger: Grün zu Cyan
    gradient: 'from-green-500 to-cyan-600',
    gradientHover: 'from-green-600 to-cyan-700',
  },
  natureEarth: {
    primary: '#10B981',
    // Erdiger: Emerald zu Forest Green
    gradient: 'from-emerald-600 to-green-800',
    gradientHover: 'from-emerald-700 to-green-900',
  },
  trustBlue: {
    primary: '#0061FF',  // Kräftiges Blau
    primaryHover: '#0052DD',  // Dunkleres Blau beim Hover
    // Gradient von Blau zu Cyan (ursprünglicher trustBlue Gradient)
    gradient: 'from-[#0061FF] to-[#60EFFF]',
    gradientHover: 'from-[#0052DD] to-[#4DDDED]',
    buttonPrimary: '#111827',  // Moderne dunkle Buttons
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(0, 97, 255, 0.2)',
    primaryLight: 'rgba(0, 97, 255, 0.05)',  // Sehr heller Hintergrund für Filter

    // Surface Layering - Helligkeit um ~7-10% pro Ebene erhöht
    surface: {
      base: '#FFFFFF',        // Basis-Hintergrund
      raised: '#F9FAFB',      // Leicht erhöht (Cards) - gray-50
      overlay: '#F3F4F6',     // Overlays (Modals, Dropdowns) - gray-100
      elevated: '#FFFFFF',    // Höchste Ebene (floating elements)
    }
  },
  trustBlueLight: {
    primary: '#2563EB',
    // Heller: Blau zu Sky
    gradient: 'from-blue-500 to-sky-600',
    gradientHover: 'from-blue-600 to-sky-700',
  },
  trustBlueDeep: {
    primary: '#2563EB',
    // Tiefer: Navy zu Indigo
    gradient: 'from-blue-800 to-indigo-900',
    gradientHover: 'from-blue-900 to-indigo-950',
  },
  vitalityPurple: {
    primary: '#7C3AED',  // Violet-600 - Balance zwischen Energie und Ruhe
    primaryHover: '#6D28D9',  // Violet-700
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',  // Dynamischer Flow
    gradientHover: 'from-violet-700 via-purple-700 to-fuchsia-700',
    buttonPrimary: '#111827',  // Moderne dunkle Buttons für Kontrast
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(124, 58, 237, 0.15)',
    // Psychologie: Violett = Transformation, Kreativität, Premium
    // Perfekt für: Persönliche Entwicklung durch Fitness
    text: '#7C3AED',
    secondary: '#EC4899',  // Pink für Energie-Akzente
    accent: '#06B6D4',  // Cyan für Balance und Frische
  },
  balanceTeal: {
    primary: '#0D9488',  // Teal-600 - Die perfekte Mitte
    primaryHover: '#0F766E',  // Teal-700
    gradient: 'from-teal-600 via-cyan-600 to-emerald-600',  // Harmonischer Übergang
    gradientHover: 'from-teal-700 via-cyan-700 to-emerald-700',
    buttonPrimary: '#111827',
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(13, 148, 136, 0.15)',
    // Psychologie: Teal = Balance zwischen Blau (Vertrauen) und Grün (Gesundheit)
    // Perfekt für: Ganzheitliche Fitness & Wellness
    text: '#0D9488',
    secondary: '#F97316',  // Orange für Energie-CTAs
    accent: '#8B5CF6',  // Violett für Premium-Gefühl
  },
  sunriseCoral: {
    primary: '#F97316',  // Orange-500 - Energiegeladen aber nicht aggressiv
    primaryHover: '#EA580C',  // Orange-600
    gradient: 'from-orange-500 via-rose-500 to-pink-500 bg-[size:200%_200%] animate-gradient',  // Animierter Sonnenaufgang
    gradientHover: 'from-orange-600 via-rose-600 to-pink-600 bg-[size:200%_200%] animate-gradient-fast',
    buttonPrimary: '#111827',
    buttonPrimaryHover: '#1F2937',
    buttonPrimaryBorder: '#1F2937',
    buttonPrimaryFocus: 'rgba(249, 115, 22, 0.15)',
    // Psychologie: Orange = Optimismus, Energie, Gemeinschaft
    // Perfekt für: Gruppentraining, Social Fitness
    text: '#F97316',
    secondary: '#06B6D4',  // Cyan als kühlender Kontrast
    accent: '#10B981',  // Grün für Erfolg/Fortschritt
  },
  // NEU: Minimalistisches Theme für bunten Gradient-Hintergrund
  minimalDark: {
    primary: '#1F2937',  // Dunkles Grau - neutral und elegant (wie buttonPrimary)
    primaryHover: '#111827',  // Fast schwarz beim Hover
    gradient: 'from-gray-700 to-gray-800',  // Sehr subtiler Gradient
    gradientHover: 'from-gray-800 to-gray-900',
    gradientBorder: 'from-purple-500 via-pink-500 to-cyan-500',  // Bookicorn Logo Gradient für Borders
    // Komplexer Radial-Gradient für Hintergründe
    radialGradient: 'radial-gradient(at 40% 20%, rgba(214, 133, 255, 0.8) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(117, 234, 255, 0.64) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(255, 178, 185, 0.48) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(153, 153, 255, 0.56) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 194, 158, 0.4) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(132, 128, 255, 0.48) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(255, 153, 182, 0.56) 0px, transparent 50%)',
    buttonPrimary: '#1F2937',  // Dunkle, dezente Buttons
    buttonPrimaryHover: '#111827',
    buttonPrimaryBorder: '#374151',
    buttonPrimaryFocus: 'rgba(55, 65, 81, 0.15)',
    primaryLight: 'rgba(31, 41, 55, 0.05)',
    text: '#1F2937',
    secondary: '#E2E8F0',  // Slate-200 für Sekundäres
    accent: '#9CA3AF',  // Helleres Grau für Akzente

    // Surface Layering - Helligkeit um ~7-10% pro Ebene erhöht
    surface: {
      base: '#FFFFFF',        // Basis-Hintergrund
      raised: '#F9FAFB',      // Leicht erhöht (Cards) - gray-50
      overlay: '#F3F4F6',     // Overlays (Modals, Dropdowns) - gray-100
      elevated: '#FFFFFF',    // Höchste Ebene (floating elements)
    }
  },
  // Bookicorn Theme - Mit dem Pink/Magenta aus dem Logo
  bookicorn: {
    primary: '#EC4899',  // Pink-500 - Das Bookicorn Pink
    primaryHover: '#DB2777',  // Pink-600 - Dunkleres Pink beim Hover
    gradient: 'from-purple-500 via-pink-500 to-cyan-400',  // Bookicorn Logo Gradient
    gradientHover: 'from-purple-600 via-pink-600 to-cyan-500',
    buttonPrimary: '#EC4899',  // Pink Buttons
    buttonPrimaryHover: '#DB2777',
    buttonPrimaryBorder: '#DB2777',
    buttonPrimaryFocus: 'rgba(236, 72, 153, 0.2)',  // Pink mit 20% Opacity
    primaryLight: 'rgba(236, 72, 153, 0.05)',  // Sehr heller Pink Hintergrund
    text: '#EC4899',
    secondary: '#A78BFA',  // Purple-400 für Secondary
    accent: '#60EFFF',  // Cyan für Akzente

    // Surface Layering
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    }
  },
  // Lime Theme - Fresh & Modern like Sales Cockpit
  lime: {
    primary: '#84CC16',  // Lime-500
    primaryHover: '#65A30D',  // Lime-600
    gradient: 'from-lime-500 to-green-500',
    gradientHover: 'from-lime-600 to-green-600',
    buttonPrimary: '#84CC16',  // Lime Buttons
    buttonPrimaryHover: '#65A30D',
    buttonPrimaryBorder: '#65A30D',
    buttonPrimaryFocus: 'rgba(132, 204, 22, 0.2)',  // Lime mit 20% Opacity
    primaryLight: 'rgba(132, 204, 22, 0.05)',  // Sehr heller Lime Hintergrund
    text: '#84CC16',
    secondary: '#A3E635',  // Lime-400 für Secondary
    accent: '#22D3EE',  // Cyan für Akzente

    // Surface Layering
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    }
  }
}

// Helper function to get surface color based on theme
export const getSurfaceColor = (layer: 'base' | 'raised' | 'overlay' | 'elevated' = 'base') => {
  const currentThemeConfig = themes[currentTheme]
  return currentThemeConfig.surface?.[layer] || currentThemeConfig.surface?.base || '#FFFFFF'
}

// Aktuelles Theme - ändere hier um das Theme zu wechseln!
// 'lime' - Fresh & Modern like Sales Cockpit
export const currentTheme = 'lime'  // Lime Green Theme

// Export der aktuellen Theme-Werte
export const activeTheme = themes[currentTheme]