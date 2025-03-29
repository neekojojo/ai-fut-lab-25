
export interface DataPoint {
  name: string;
  current: number;
  previous: number;
  alternative: number;
  [key: string]: any;
}

export interface ProgressDataPoint {
  date: string;
  value: number;
  [key: string]: any;
}

export interface PerformanceDataPoint {
  category: string;
  value: number;
  maxValue: number;
  [key: string]: any;
}

export interface DistributionDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ComparisonDataPoint {
  metric: string;
  player: number;
  professional: number;
  average: number;
  [key: string]: any;
}
