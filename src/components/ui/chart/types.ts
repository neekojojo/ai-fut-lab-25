
import * as React from 'react';

export interface ChartConfigItem {
  color?: string;
  label?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  curve?: string;
  theme?: {
    light?: string;
    dark?: string;
  } | string;
}

export interface ChartConfig {
  [key: string]: ChartConfigItem;
}

// Define ChartContextProps for use in ChartContext.tsx
export interface ChartContextProps {
  config: ChartConfig;
}

// Define the getPayloadConfigFromPayload function for Legend and Tooltip components
export const getPayloadConfigFromPayload = (
  config: ChartConfig,
  payload: any,
  key: string
): ChartConfigItem | undefined => {
  // Look for a direct match in the config
  if (config[key]) {
    return config[key];
  }

  // Try to match with the payload name or dataKey
  if (payload.dataKey && config[payload.dataKey]) {
    return config[payload.dataKey];
  }

  if (payload.name && config[payload.name]) {
    return config[payload.name];
  }

  // Try to match with the payload value
  if (payload.value && config[payload.value]) {
    return config[payload.value];
  }

  // If no match is found, return the payload itself as a basic config item
  return {
    label: payload.name || payload.dataKey || key,
    color: payload.color || payload.fill
  };
};

// Add the THEMES constant needed by ChartStyle.tsx
export const THEMES = {
  light: {
    DEFAULT_COLOR: "#000",
    PREFIX: ".light"
  },
  dark: {
    DEFAULT_COLOR: "#fff",
    PREFIX: ".dark"
  }
};
