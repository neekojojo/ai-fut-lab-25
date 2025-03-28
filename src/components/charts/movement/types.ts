
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

export interface ChartConfigType {
  current: { color: string; label: string };
  previous: { color: string; label: string };
  alternative: { color: string; label: string };
}
