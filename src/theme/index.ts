export const Colors = {
  dark: {
    background: '#0E0F13',
    surface: '#171A21',
    surfaceElevated: '#1F232C',
    textParchment: '#F5EFE0',
    textMuted: '#9AA0AB',
    primary: '#E0B252',
    success: '#5FB878',
    danger: '#E0644A',
  },
  light: {
    background: '#F9F9F9',
    surface: '#FFFFFF',
    surfaceElevated: '#EEEEEE',
    textParchment: '#1A1A1A',
    textMuted: '#666666',
    primary: '#B38728',
    success: '#3D8C53',
    danger: '#B33B24',
  },
  era: {
    rome: '#B23A48',
    egypt: '#D97706',
    china: '#C2410C',
    mesoamerica: '#0E7C66',
    exploration: '#6D28D9',
    ww2: '#465E7A',
    women: '#9D4EDD',
  }
};

export const Typography = {
  fonts: {
    heading: 'System',
    body: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Radii = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radii: Radii,
  shadows: Shadows,
};