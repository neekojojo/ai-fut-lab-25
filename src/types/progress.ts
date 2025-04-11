
export interface ProgressData {
  lastAnalysis: Date;
  improvement: number;
  areas: {
    skill: string;
    before: number;
    after: number;
  }[];
}
