
import { professionalPlayers } from "@/types/professionalPlayers";

// Re-export professionalPlayers
export { professionalPlayers };

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  level: string;
  difficulty: number;
  category?: string;
  skill?: string;
  rating?: number;
  targetAreas: string[];
}

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: number;
  targetAreas: string[];
  sessions: TrainingSession[];
}

export interface TrainingSession {
  id: string;
  title: string;
  duration: string;
  exercises: TrainingExercise[];
}

export interface TrainingExercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  sets?: number;
  reps?: number;
  videoUrl?: string;
  imageUrl?: string;
}
