
import { Badge } from './badges';

export interface UserAnalysis {
  id: string;
  date: string;
  score: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: string;
  position: string;
  performanceScore: number;
  improvementRate: number;
  avatarUrl?: string;
  bio?: string;
  age?: number;
  country?: string;
  city?: string;
  height?: number;
  weight?: number;
  preferredFoot?: string;
  badges: Badge[];
  trainingProgress: number;
  analyses: UserAnalysis[];
}
