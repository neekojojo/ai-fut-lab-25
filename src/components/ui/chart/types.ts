
export interface ThemeColor {
  light: string;
  dark: string;
}

export interface PayloadConfig {
  key?: string;
  label?: string;
  color?: string;
  theme?: {
    light: string;
    dark: string;
  };
}

export interface ChartConfig {
  [key: string]: PayloadConfig;
}

// Define available themes
export const THEMES = {
  blue: {
    light: '#3b82f6',
    dark: '#3b82f6',
  },
  green: {
    light: '#10b981',
    dark: '#10b981',
  },
  red: {
    light: '#ef4444',
    dark: '#ef4444',
  },
  yellow: {
    light: '#f59e0b',
    dark: '#f59e0b',
  },
  purple: {
    light: '#8b5cf6',
    dark: '#8b5cf6',
  },
  gray: {
    light: '#6b7280',
    dark: '#9ca3af',
  },
};
