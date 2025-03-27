
export interface DataPoint {
  name: string;
  current: number;
  previous?: number;
  alternative?: number;
  [key: string]: any;
}
