
import { IdentifiedPlayer, IdentifiedTeam } from '../playerIdentification';
import { DetectionResult } from '../types';

// Kaggle player data structure
export interface KagglePlayerData {
  player_id: string;
  name: string;
  team: string;
  position: string;
  nationality: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  overall_rating: number;
  potential: number;
  value_eur: number;
  wage_eur: number;
  preferred_foot: string;
  weak_foot: number;
  skill_moves: number;
  international_reputation: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physic: number;
}

// Sports video analysis data structure
export interface SportsVideoAnalysisData {
  analysis_id: string;
  match_id: string;
  player_id: string;
  player_name: string;
  team_name: string;
  event_type: string;
  timestamp: number;
  field_position_x: number;
  field_position_y: number;
  movement_speed: number;
  success_rate: number;
  confidence_score: number;
}

// Team data from Kaggle
export interface KaggleTeamData {
  team_id: string;
  name: string;
  league: string;
  country: string;
  attack: number;
  midfield: number;
  defense: number;
  overall: number;
  team_logo: string;
}

// Exported player movement analysis result
export interface PlayerMovementAnalysis {
  avgSpeed: number;
  successRate: number;
  confidenceScore: number;
  events: { type: string; count: number }[];
}
