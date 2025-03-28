
export interface SimilarProfessional {
  name: string;
  team: string;
  position: string;
  similarity: number;
  strengths: string[];
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  category?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetAreas: string[];
  createdAt?: string;
  views?: number;
  favorites?: number;
  // Properties used in dashboard components
  skill?: string;
  rating?: number;
  coach?: {
    name: string;
    avatarUrl?: string;
    title?: string;
  };
}

export interface TrainingExercise {
  name: string;
  description: string;
  difficulty: string;
}

export interface TrainingRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedTimeInMinutes: number;
  targetAreas: string[];
  expectedImprovement: number;
  
  // Additional properties needed by components
  area?: string;
  intensity?: string;
  frequency?: number; 
  duration?: number;
  exercises?: TrainingExercise[];
}
