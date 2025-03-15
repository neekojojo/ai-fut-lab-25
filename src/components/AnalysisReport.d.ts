
export interface PlayerAnalysis {
  playerName: string;
  position: string;
  marketValue: string;
  talentScore: number;
  strengths: string[];
  weaknesses: string[];
  detailedSkills?: any; // Position-specific skills
  performance: {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
  };
  recommendations: string[];
  compatibilityScore: number;
  proComparison?: {
    name: string;
    similarity: number;
    skills: any;
  };
  injuryRisk?: {
    overall: number; // 0-100
    areas: {
      name: string;
      risk: number;
      recommendation: string;
    }[];
  };
  badges?: {
    name: string;
    description: string;
    level: 'bronze' | 'silver' | 'gold';
  }[];
  progress?: {
    lastAnalysis?: Date;
    improvement?: number; // Percentage improvement since last analysis
    areas: {
      skill: string;
      before: number;
      after: number;
    }[];
  };
  movements?: {
    name: string;
    current: number;
    previous?: number;
    alternative?: number;
  }[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  analyses: PlayerAnalysis[];
  badges: {
    name: string;
    description: string;
    level: 'bronze' | 'silver' | 'gold';
    earnedAt: Date;
  }[];
  trainingProgress: {
    videosWatched: number;
    skillsImproved: string[];
    nextRecommendation: string;
  };
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: number; // in minutes
  skill: string; // passing, shooting, etc.
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number; // 1-5
  views: number;
}
