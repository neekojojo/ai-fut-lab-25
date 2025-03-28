
import { DataPoint } from '../DataTypes';
import { ChartConfig as UIChartConfig } from "@/components/ui/chart/types";
import { ElementType } from 'react';

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

// Define CurveType locally since it's not exported from UI library
export type CurveType = "linear" | "monotone" | "natural" | "step" | "basis";

// Interface for our chart config that will be adapted to UI library's format
export interface ChartConfigType {
  current: { 
    color: string; 
    label: string; 
    icon?: ElementType; 
    curve?: CurveType; 
    theme?: Record<string, string>;
  };
  previous: { 
    color: string; 
    label: string; 
    icon?: ElementType; 
    curve?: CurveType; 
    theme?: Record<string, string>;
  };
  alternative: { 
    color: string; 
    label: string; 
    icon?: ElementType; 
    curve?: CurveType; 
    theme?: Record<string, string>;
  };
  [key: string]: { 
    color: string; 
    label: string; 
    icon?: ElementType; 
    curve?: CurveType; 
    theme?: Record<string, string>;
  };
}
