
// Import required types
import { PlayerAnalysis } from './playerAnalysis';
import { UserBadge } from './badges';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string;
  analyses: PlayerAnalysis[];
  badges: UserBadge[];
  trainingProgress: {
    videosWatched: number;
    skillsImproved: string[];
    nextRecommendation: string;
  };
  
  // New user profile fields
  age?: number;
  country?: string;
  city?: string;
  height?: string;
  weight?: string;
  preferredFoot?: 'Left' | 'Right' | 'Both';
  position?: string;
}
