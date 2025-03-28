
import React from "react";
import type { LucideIcon } from "lucide-react";

export type ThemeValues = {
  light: string;
  dark: string;
};

export type ChartLine = {
  theme?: ThemeValues;
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter" | "natural" | "basis";
  icon?: LucideIcon;
  color?: string;
  label?: string;
};

export type ChartConfig = {
  [key: string]: ChartLine;
};

export const THEMES = {
  blue: {
    light: "#0ea5e9",
    dark: "#38bdf8",
  },
  green: {
    light: "#10b981",
    dark: "#34d399",
  },
  violet: {
    light: "#8b5cf6",
    dark: "#a78bfa",
  },
  orange: {
    light: "#f97316",
    dark: "#fb923c",
  },
  pink: {
    light: "#ec4899",
    dark: "#f472b6",
  },
  red: {
    light: "#ef4444",
    dark: "#f87171",
  },
  gray: {
    light: "#6b7280",
    dark: "#9ca3af",
  },
};

// Helper function to get configuration for a payload item
export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
): ChartLine | undefined {
  // Try to get config from the key
  const itemConfig = config[key];
  if (itemConfig) {
    return itemConfig;
  }

  // If no direct match, try to find a match from dataKey
  // This is useful when payload.dataKey is formatted like "data[0].value"
  for (const configKey in config) {
    if (key.includes(configKey)) {
      return config[configKey];
    }
  }

  // Return undefined if no match found
  return undefined;
}
