
import * as React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ChartConfigItem {
  theme?: {
    light: string;
    dark: string;
  };
  label?: string;
  color?: string;
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter" | "natural" | "basis";
  icon?: LucideIcon;
}

export interface ChartConfig {
  [key: string]: ChartConfigItem;
}

export interface ChartContextProps {
  config: ChartConfig;
}

// Helper function to get config from payload
export const getPayloadConfigFromPayload = (
  config: ChartConfig,
  item: any,
  key: string
): ChartConfigItem | undefined => {
  return (
    config[key] ||
    config[item?.name || ""] ||
    config[item?.dataKey || ""] ||
    undefined
  );
};

// Theme constants
export const THEMES = {
  blue: {
    light: "#0085FF",
    dark: "#0085FF",
  },
  green: {
    light: "#22C55E",
    dark: "#22C55E",
  },
  red: {
    light: "#EF4444",
    dark: "#EF4444",
  },
  yellow: {
    light: "#F59E0B",
    dark: "#F59E0B",
  },
  purple: {
    light: "#8B5CF6",
    dark: "#8B5CF6",
  },
};
