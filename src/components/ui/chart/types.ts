
export interface ChartConfigItem {
  color: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  curve?: string;
  theme?: {
    light?: string;
    dark?: string;
  };
}

export interface ChartConfig {
  [key: string]: ChartConfigItem;
}

export interface ChartContextProps {
  config: ChartConfig;
}

// Define theme prefixes for CSS selectors
export const THEMES = {
  light: "",
  dark: ".dark",
} as const;

export function getPayloadConfigFromPayload(
  config: ChartConfig,
  item: any,
  fallbackKey = ""
) {
  const key = item?.name || item?.dataKey || fallbackKey;
  return config[key] as ChartConfigItem;
}
