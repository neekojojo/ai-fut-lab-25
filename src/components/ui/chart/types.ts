
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
  curve?: string;
  icon?: React.ComponentType<any>;
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

// Utility function to get payload config from a payload item
export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: {
    dataKey?: string;
    name?: string;
    color?: string;
    value?: string;
    type?: string;
  },
  dataKey: string
): PayloadConfig | undefined {
  // Try to find a config for the dataKey directly
  if (config[dataKey]) return config[dataKey];
  
  // If not found, try with the name
  const name = payload.name || payload.value || "";
  if (config[name]) return config[name];
  
  // If still not found, return a simple config with the color from the payload
  if (payload.color) {
    return {
      color: payload.color,
      label: name,
    };
  }
  
  return undefined;
}
