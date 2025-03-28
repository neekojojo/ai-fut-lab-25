
import { DataPoint } from '../DataTypes';

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

// Modified to include an index signature to make it compatible with ChartConfig
export interface ChartConfigType {
  current: { color: string; label: string };
  previous: { color: string; label: string };
  alternative: { color: string; label: string };
  [key: string]: { color: string; label: string; icon?: React.ElementType; curve?: string; theme?: Record<string, string> };
}
