
// Import required types
import { PlayerMovement, PassAttempt, PositionHeatmap } from './playerMovement';
import { PlayerStats, PerformanceMetrics, DetailedSkills, MarketData } from './playerStats';
import { Badge } from './badges';
import { ProgressData } from './progress';
import { InjuryRiskData } from './injuries';
import { SimilarProfessional } from './training';

// Core player analysis type
export interface PlayerAnalysis {
  id: string;
  playerId?: string;
  playerName: string;
  position: string;
  timestamp: string;
  duration: number;
  confidence: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  stats: PlayerStats;
  movements: PlayerMovement[];
  passes: PassAttempt[];
  heatmap: PositionHeatmap[];
  strengths: string[];
  weaknesses: string[];
  summary: string;
  advancedInsights: string[];
  recommendations: string[];
  performanceScore: number;
  similarPlayers?: SimilarProfessional[];
  marketData?: MarketData;
  
  // Additional fields needed by components
  talentScore?: number;
  marketValue?: string;
  compatibilityScore?: number;
  performance?: PerformanceMetrics;
  detailedSkills?: DetailedSkills;
  proComparison?: ProComparison;
  progress?: ProgressData;
  injuryRisk?: InjuryRiskData;
  badges?: Badge[];
  
  // New player profile fields
  age?: number;
  country?: string;
  city?: string;
  height?: string;
  weight?: string;
  preferredFoot?: 'Left' | 'Right' | 'Both';
}

export interface ProComparison {
  name: string;
  similarity: number;
  skills: {
    [key: string]: number;
  };
}
