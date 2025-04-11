export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: string;
  position: string;
  performanceScore: number;
  improvementRate: number;
  badges: string[];
  trainingProgress: number;
  analyses: Analysis[];
}

export interface Analysis {
  id: string;
  date: string;
  score: number;
}
