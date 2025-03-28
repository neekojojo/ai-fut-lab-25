
export interface ChartItem {
  color: string;
  label: string;
}

export interface ChartConfigType {
  [key: string]: ChartItem;
  current: ChartItem;
  previous: ChartItem;
  alternative: ChartItem;
  default: ChartItem;
}

export interface NumberMovementProps {
  title: string;
  data: Array<{ name: string; current: number; previous?: number; alternative?: number }>;
  type?: "line" | "bar" | "area";
  colors?: {
    current: string;
    previous?: string;
    alternative?: string;
  };
  description?: string;
}
