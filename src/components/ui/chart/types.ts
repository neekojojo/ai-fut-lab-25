
import * as React from "react";
import { CurveType } from "recharts/types/shape/Curve";

export type IconType = React.ElementType;

export type ChartConfig = Record<
  string,
  {
    color?: string;
    label?: string;
    icon?: IconType;
    curve?: CurveType;
    theme?: Record<string, string>;
  }
>;

export interface ChartContextProps {
  config: ChartConfig;
}

// Helper function to get payload config from payload
export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  return (
    config[key] ||
    config[payload.dataKey || ""] ||
    config[payload.name || ""] ||
    config[payload.type || ""] ||
    config.default
  );
}

export const THEMES = {
  light: "",
  dark: ".dark",
};
