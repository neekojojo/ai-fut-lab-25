
import { LucideIcon } from "lucide-react";

export interface ChartItem {
  theme?: { light: string; dark: string };
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter" | "natural" | "basis";
  icon?: LucideIcon;
  color?: string;
  label?: string;
}

export interface ChartConfig {
  [key: string]: ChartItem;
}

export interface ChartContextProps {
  config: ChartConfig;
}

export const THEMES = {
  blue: {
    light: "#0091ff",
    dark: "#0091ff",
  },
  green: {
    light: "#17c964",
    dark: "#17c964",
  },
  purple: {
    light: "#9750dd",
    dark: "#9750dd",
  },
  red: {
    light: "#f31260",
    dark: "#f31260",
  },
  yellow: {
    light: "#ffc107",
    dark: "#ffc107",
  },
  cyan: {
    light: "#06b6d4",
    dark: "#06b6d4",
  },
  pink: {
    light: "#ff4ecd",
    dark: "#ff4ecd",
  },
  gray: {
    light: "#71717a",
    dark: "#a1a1aa",
  },
};

// Utility function to extract config from payload
export const getPayloadConfigFromPayload = (
  config: ChartConfig,
  payload: any,
  dataKey: string
): ChartItem | undefined => {
  if (!config || !dataKey) {
    return undefined;
  }

  // Try to match by dataKey first
  if (config[dataKey]) {
    return config[dataKey];
  }

  // Fall back to value if dataKey is not found
  if (payload.value && config[payload.value]) {
    return config[payload.value];
  }

  return undefined;
};
