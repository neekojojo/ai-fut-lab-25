
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { DetectionResult } from '@/utils/videoDetection/types';

export const createEnhancedAnalysis = (
  baselineAnalysis: PlayerAnalysis,
  detectionResult: any,
  movementAnalysis: any = null,
  videoProperties: any = null,
  eyeTrackingResult: any = null
): PlayerAnalysis => {
  // Create a deep copy of the baseline analysis
  const enhancedAnalysis = JSON.parse(JSON.stringify(baselineAnalysis));
  
  // Enhance with movement analysis data
  if (movementAnalysis) {
    enhancedAnalysis.stats = {
      ...enhancedAnalysis.stats,
      pace: Math.min(99, Math.round(movementAnalysis.averageSpeed * 5)),
      acceleration: Math.min(99, Math.round(movementAnalysis.maxAcceleration * 12)),
      stamina: Math.min(99, Math.round(movementAnalysis.totalDistance / 10))
    };
  }
  
  // Enhance with eye tracking data
  if (eyeTrackingResult) {
    enhancedAnalysis.stats = {
      ...enhancedAnalysis.stats,
      vision: Math.min(99, Math.round(eyeTrackingResult.fieldAwarenessScore)),
      anticipation: Math.min(99, Math.round(eyeTrackingResult.anticipationScore)),
      decision: Math.min(99, Math.round(eyeTrackingResult.decisionSpeed))
    };
  }
  
  // Enhance performance metrics
  enhancedAnalysis.performance = {
    technical: enhancedAnalysis.performance?.technical || Math.round(60 + Math.random() * 30),
    physical: enhancedAnalysis.performance?.physical || Math.round(60 + Math.random() * 30),
    tactical: enhancedAnalysis.performance?.tactical || Math.round(60 + Math.random() * 30),
    mental: enhancedAnalysis.performance?.mental || Math.round(60 + Math.random() * 30)
  };
  
  // Return the enhanced analysis
  return enhancedAnalysis;
};
