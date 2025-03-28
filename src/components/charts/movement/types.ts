
import { DataPoint } from '../DataTypes';
import { IconType } from 'react-icons';
import { CurveType } from '@/components/ui/chart/types';

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

// Modified to match the ChartConfig type from the UI library
export interface ChartConfigType {
  current: { color: string; label: string };
  previous: { color: string; label: string };
  alternative: { color: string; label: string };
  [key: string]: { 
    color: string; 
    label: string; 
    icon?: IconType; 
    curve?: CurveType; 
    theme?: Record<string, string> 
  };
}
