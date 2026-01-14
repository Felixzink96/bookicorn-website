// Theme Configuration für Bookicorn Website

export const themes = {
  lime: {
    primary: '#84CC16',  // Lime-500
    primaryHover: '#65A30D',  // Lime-600
    gradient: 'from-lime-500 to-green-500',
    gradientHover: 'from-lime-600 to-green-600',
    buttonPrimary: '#84CC16',
    buttonPrimaryHover: '#65A30D',
    buttonPrimaryBorder: '#65A30D',
    buttonPrimaryFocus: 'rgba(132, 204, 22, 0.2)',
    primaryLight: 'rgba(132, 204, 22, 0.05)',
    text: '#84CC16',
    secondary: '#A3E635',
    accent: '#22D3EE',
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#F3F4F6',
      elevated: '#FFFFFF',
    }
  }
}

export const currentTheme = 'lime'
export const activeTheme = themes[currentTheme]
