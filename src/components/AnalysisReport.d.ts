
export interface PlayerMovement {
  x: number;
  y: number;
  timestamp: number;
  speed: number;
  // For chart rendering
  name?: string;
  current?: number;
  previous?: number;
  alternative?: number;
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

export interface PerformanceMetrics {
  technical: number;
  physical: number;
  tactical: number;
  mental: number;
}

export interface DetailedSkills {
  [key: string]: number;
}

export interface ProComparison {
  name: string;
  similarity: number;
  skills: {
    [key: string]: number;
  };
}

export interface ProgressArea {
  skill: string;
  before: number;
  after: number;
}

export interface ProgressData {
  lastAnalysis: Date;
  improvement: number;
  areas: ProgressArea[];
}

export interface InjuryRiskArea {
  name: string;
  risk: number;
  recommendation: string;
}

export interface InjuryRiskData {
  overall: number;
  areas: InjuryRiskArea[];
}

export interface Badge {
  name: string;
  description: string;
  level: 'bronze' | 'silver' | 'gold';
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
}

// Additional interfaces for other components
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  teamId?: string;
  position?: string;
  subscription?: {
    plan: string;
    status: string;
    nextBillingDate?: string;
  };
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetAreas: string[];
  createdAt: string;
  views: number;
  favorites: number;
  coach?: {
    name: string;
    avatarUrl?: string;
    title?: string;
  };
}
