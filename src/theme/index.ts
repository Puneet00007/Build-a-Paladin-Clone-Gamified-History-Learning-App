export const theme = {
  colors: {
    background: '#0F1014', // Deep Black
    surface: '#1A1C23', // Dark Gray
    surfaceLight: '#262A34',
    primary: '#D4AF37', // Gold
    primaryDark: '#B49126',
    secondary: '#8E5A2A', // Amber/Bronze
    text: '#E5E7EB',
    textMuted: '#9CA3AF',
    success: '#10B981',
    error: '#EF4444',
    border: '#374151',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' as const },
    h2: { fontSize: 24, fontWeight: 'bold' as const },
    h3: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: 'normal' as const },
    bodySmall: { fontSize: 14, fontWeight: 'normal' as const },
    caption: { fontSize: 12, fontWeight: 'normal' as const },
  }
};
