
import { ReactNode } from 'react';

export interface ThemeColors {
  light: string;
  dark: string;
}

export interface PayloadConfig {
  label?: string;
  color?: string;
  icon?: any;
  theme?: ThemeColors;
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter" | "natural" | "basis";
}

export interface ChartConfig {
  [key: string]: PayloadConfig | undefined;
}

export const THEMES = {
  blue: { light: "#0EA5E9", dark: "#0284C7" },
  green: { light: "#10B981", dark: "#059669" },
  red: { light: "#EF4444", dark: "#DC2626" },
  yellow: { light: "#F59E0B", dark: "#D97706" },
  purple: { light: "#8B5CF6", dark: "#7C3AED" },
  pink: { light: "#EC4899", dark: "#DB2777" },
  gray: { light: "#9CA3AF", dark: "#4B5563" },
  primary: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" },
};

export const getPayloadConfigFromPayload = (
  config: ChartConfig,
  payload: any,
  key: string
): PayloadConfig | undefined => {
  return config[key] || config.default;
};
