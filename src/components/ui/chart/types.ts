
import { ReactNode } from 'react';

export interface PayloadConfig {
  label?: string;
  color?: string;
  icon?: any;
}

export interface ChartConfig {
  [key: string]: PayloadConfig | undefined;
}

export const getPayloadConfigFromPayload = (
  config: ChartConfig,
  payload: any,
  key: string
): PayloadConfig | undefined => {
  return config[key] || config.default;
};
