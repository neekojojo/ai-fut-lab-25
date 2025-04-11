
export interface ProfessionalPlayer {
  name: string;
  team: string;
  position: string;
  match: number;
  similarity: number;
  strengths: string[];
}

export interface PlayerAnalysis {
  id: string;
  date: string;
  score: number;
  
  // Add missing properties used in components
  playerName?: string;
  position?: string;
  timestamp?: string;
  duration?: number;
  confidence?: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  marketValue?: string;
  talentScore?: number;
  compatibilityScore?: number;
  performanceScore?: number;
  
  // Performance metrics
  performance?: {
    technical?: number;
    physical?: number;
    tactical?: number;
    mental?: number;
  };
  
  // Player statistics
  stats?: {
    pace?: number;
    shooting?: number;
    passing?: number;
    dribbling?: number;
    defending?: number;
    physical?: number;
    stamina?: number;
    acceleration?: number;
    agility?: number;
    balance?: number;
    ballControl?: number;
    decision?: number;
    anticipation?: number;
    positioning?: number;
    vision?: number;
    composure?: number;
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
  };
  
  // Player strengths and weaknesses
  strengths?: string[];
  weaknesses?: string[];
  
  // Recommendations and insights
  recommendations?: string[];
  advancedInsights?: string[];
  summary?: string;
  
  // Player movements and tracking
  movements?: {
    timestamp: number;
    x: number;
    y: number;
    speed: number;
    acceleration: number;
    direction: number;
    isActive: boolean;
  }[];
  
  passes?: {
    timestamp: number;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    successful: boolean;
    type: string;
  }[];
  
  heatmap?: {
    x: number;
    y: number;
    value: number;
  }[];
  
  // Professional comparison
  proComparison?: {
    name: string;
    similarity: number;
    skills: {[key: string]: number};
  };
  
  // Injury risk assessment
  injuryRisk?: {
    overall: number;
    areas: {
      name: string;
      risk: number;
    }[];
    recommendations: string[];
    history?: {
      type: string;
      date: string;
      duration: string;
    }[];
  };
  
  // Player badges and achievements
  badges?: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    type: string;
  }[];
  
  // Progress tracking
  progress?: {
    lastAnalysis: Date;
    improvement: number;
    areas: {
      skill: string;
      before: number;
      after: number;
    }[];
  };
  
  // Detailed skills by position
  detailedSkills?: {
    [key: string]: number;
  };
  
  // Personal information
  age?: number;
  country?: string;
  city?: string;
  height?: string;
  weight?: string;
  preferredFoot?: string;
}

export interface AnalysisReport {
  id: string;
  date: string;
  videoUrl: string;
  overallScore: number;
  technicalSkills: {
    passing: number;
    dribbling: number;
    shooting: number;
    firstTouch: number;
    ballControl: number;
    heading: number;
    tackling: number;
  };
  physicalAttributes: {
    speed: number;
    agility: number;
    stamina: number;
    strength: number;
    jump: number;
  };
  mentalSkills: {
    decisionMaking: number;
    focus: number;
    composure: number;
    aggression: number;
    leadership: number;
  };
  tacticalAwareness: {
    positioning: number;
    teamwork: number;
    vision: number;
    adaptability: number;
    discipline: number;
  };
  performanceMetrics: {
    technicalAccuracy: number;
    efficiency: number;
    tacticalAwareness: number;
    physicalPerformance: number;
    consistency: number;
    overall: number;
  };
  movementAnalysis: {
    averageSpeed: number;
    totalDistance: number;
    maxAcceleration: number;
    speedZones: {
      zone: string;
      percentage: number;
    }[];
    heatmap: number[][];
  };
  eyeTracking: {
    fieldAwarenessScore: number;
    decisionSpeed: number;
    anticipationScore: number;
    visualScanFrequency: number;
    fixationDuration: number;
  };
  injuries: {
    type: string;
    severity: string;
    recoveryTime: string;
  }[];
  progressTracking: {
    date: string;
    overallScore: number;
    technicalSkills: number;
    physicalAttributes: number;
    mentalSkills: number;
    tacticalAwareness: number;
  }[];
  badges: {
    name: string;
    description: string;
    icon: string;
    level: string;
    category: string;
    unlocked: boolean;
    progress: number;
  }[];
  professionalComparison: {
    name: string;
    team: string;
    position: string;
    match: number;
    similarity: number;
    strengths: string[];
  }[];
}
