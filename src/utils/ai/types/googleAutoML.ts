
// Types for Google AutoML service

// Interface for player performance prediction request
export interface PlayerPerformancePredictionRequest {
  playerStats: {
    avgSpeed: number;
    maxSpeed: number;
    avgAcceleration: number;
    distanceCovered: number;
    balanceScore: number;
    technicalScore: number;
    physicalScore: number;
    movementEfficiency: number;
  };
  position?: string;
  age?: number;
  experience?: number;
}

// Interface for player performance prediction response
export interface PlayerPerformancePrediction {
  predictedImprovementRate: number;
  potentialScore: number;
  recommendedTrainingAreas: string[];
  improvementTimeframe: string;
  confidenceScore: number;
}
