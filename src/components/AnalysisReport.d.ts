
export interface PlayerMovement {
  x: number;
  y: number;
  timestamp: number;
  speed: number;
}

export interface PassAttempt {
  from: { x: number; y: number };
  to: { x: number; y: number };
  timestamp: number;
  successful: boolean;
  recipient?: string;
}

export interface PositionHeatmap {
  x: number;
  y: number;
  intensity: number;
}

export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  stamina: number;
  acceleration: number;
  agility: number;
  balance: number;
  ballControl: number;
  decision: number;
  anticipation: number;
  positioning: number;
  vision: number;
  composure: number;
}

export interface MarketData {
  currentValue: number;
  currency: string;
  valueTrend: 'up' | 'down' | 'stable';
  valueHistory: {
    date: string;
    value: number;
  }[];
  potentialValue: number;
}

export interface SimilarProfessional {
  name: string;
  team: string;
  position: string;
  similarity: number;
  strengths: string[];
}

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
}
