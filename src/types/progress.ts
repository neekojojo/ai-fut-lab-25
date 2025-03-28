
export interface ProgressArea {
  skill: string;
  before: number;
  after: number;
}

export interface ProgressData {
  lastAnalysis: Date;
  improvement: number;
  areas: ProgressArea[];
}
