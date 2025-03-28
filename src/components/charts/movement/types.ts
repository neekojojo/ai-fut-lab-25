
import { DataPoint } from '../DataTypes';
import { ChartConfig as UIChartConfig } from "@/components/ui/chart/types";

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

// Modified to match the ChartConfig type from the UI library
export interface ChartConfigType {
  current: { color: string; label: string };
  previous: { color: string; label: string };
  alternative: { color: string; label: string };
  [key: string]: { 
    color: string; 
    label: string; 
    icon?: React.ElementType; 
    curve?: CurveType; 
    theme?: Record<string, string> 
  };
}
