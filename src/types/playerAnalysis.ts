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
