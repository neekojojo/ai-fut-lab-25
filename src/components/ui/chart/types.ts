
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

// إضافة ثوابت THEMES التي تحتاجها ChartStyle.tsx
export const THEMES = {
  light: {
    DEFAULT_COLOR: "#000",
    PREFIX: ".chart-light"
  },
  dark: {
    DEFAULT_COLOR: "#fff",
    PREFIX: ".chart-dark"
  }
};
