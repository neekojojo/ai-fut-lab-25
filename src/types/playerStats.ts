
// Types related to player statistics and metrics
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
  
  // Additional properties used in the application
  finishing?: number;
  shotPower?: number;
  longShots?: number;
  volleys?: number;
  penalties?: number;
  crossing?: number;
  freeKick?: number;
  shortPassing?: number;
  longPassing?: number;
  curve?: number;
  reactions?: number;
  strength?: number;
  jumping?: number;
  heading?: number;
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
