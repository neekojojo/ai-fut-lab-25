
import React, { ReactNode } from "react";
import { ChartConfig } from '@/components/ui/chart/types';
import { Activity, Zap, AreaChart, BarChart2, LineChart } from 'lucide-react';
import { ChartConfigType } from './types';

// Utility function to convert string theme to object format
const convertTheme = (theme: string) => {
  return {
    light: theme,
    dark: theme
  };
};

// Define type for valid curve values
type CurveType = "linear" | "monotone" | "step" | "stepBefore" | "stepAfter" | "natural" | "basis";

export const adaptChartConfig = (colors: Record<string, string>, chartType: 'line' | 'bar' | 'area'): ChartConfig => {
  const config: ChartConfig = {};
  
  Object.entries(colors).forEach(([key, color]) => {
    let icon;
    let curve: CurveType = 'monotone';
    
    // Assign icons based on chart type
    if (chartType === 'line') {
      icon = LineChart;
    } else if (chartType === 'bar') {
      icon = BarChart2;
      curve = 'linear';
    } else if (chartType === 'area') {
      icon = AreaChart;
    }
    
    config[key] = {
      theme: convertTheme(color),
      curve,
      icon,
      color,
      label: key.charAt(0).toUpperCase() + key.slice(1)
    };
  });
  
  return config;
};

// Create a ChartConfigAdapter component for use in chart components
interface ChartConfigAdapterProps {
  config: ChartConfigType;
  children: ReactNode;
}

export const ChartConfigAdapter: React.FC<ChartConfigAdapterProps> = ({ config, children }) => {
  // Extract colors from the config
  const colors: Record<string, string> = {};
  Object.entries(config).forEach(([key, value]) => {
    colors[key] = value.color;
  });
  
  // For now, we're just passing through children
  // In a more complex implementation, this could provide context
  return <>{children}</>;
};

// Default export for the component
export default ChartConfigAdapter;
