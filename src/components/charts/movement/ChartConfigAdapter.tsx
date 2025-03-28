
import { ChartConfig } from '@/components/ui/chart/types';
import { Activity, Zap, AreaChart, BarChart2, LineChart } from 'lucide-react';

// Utility function to convert string theme to object format
const convertTheme = (theme: string) => {
  return {
    light: theme,
    dark: theme
  };
};

export const adaptChartConfig = (colors: Record<string, string>, chartType: 'line' | 'bar' | 'area'): ChartConfig => {
  const config: ChartConfig = {};
  
  Object.entries(colors).forEach(([key, color]) => {
    let icon;
    let curve = 'monotone';
    
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
