
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Common colors for our theme
export const COLORS = {
  // Primary colors
  primary: {
    DEFAULT: "#9b87f5",
    foreground: "#ffffff",
  },
  
  // Background colors
  background: {
    DEFAULT: "#121212",
    dark: "#0a0a0a",
    light: "#1a1a1a",
  },
  
  // Text colors
  text: {
    DEFAULT: "#ffffff",
    muted: "#a0a0a0",
  },
  
  // Chart colors
  chart: {
    green: "#10B981",
    blue: "#6366F1",
    purple: "#8B5CF6",
    pink: "#EC4899",
    amber: "#F59E0B",
    red: "#EF4444",
  }
};

// Chart colors for consistency across components
export const CHART_COLORS = {
  primary: "#9b87f5",
  secondary: "#7E69AB",
  positive: "#10B981",
  negative: "#EF4444",
  amber: "#F59E0B",
  blue: "#6366F1",
  purple: "#8B5CF6",
  pink: "#EC4899",
};
