
import { ReactNode } from "react";

export interface ChartConfigValue {
  color: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  curve?: string;
  theme?: string | {
    light?: string;
    dark?: string;
  };
}

export interface ChartConfigType {
  current: ChartConfigValue;
  previous: ChartConfigValue;
  alternative: ChartConfigValue;
  [key: string]: ChartConfigValue;
}

export interface NumberMovementProps {
  title: string;
  data: DataPoint[];
  type?: "line" | "bar" | "area";
  colors?: {
    current: string;
    previous?: string;
    alternative?: string;
  };
  description?: string;
}

export interface DataPoint {
  name: string;
  current: number;
  previous?: number;
  alternative?: number;
  [key: string]: any;
}

export interface ChartInfoProps {
  title: string;
  improvement?: number | string;
  description?: string;
  children?: ReactNode;
}
