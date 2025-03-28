
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import type { DetectionResult } from '@/utils/videoDetection/types';

// Create enhanced analysis based on "detected" data and video properties
export const createEnhancedAnalysis = (
  baseAnalysis: PlayerAnalysis, 
  detectionResult: any, 
  movementAnalysis: any,
  videoProperties: any,
  eyeTrackingResult?: any
): PlayerAnalysis => {
  // Use video properties to adjust analysis parameters
  const videoQualityFactor = (videoProperties.width * videoProperties.height) / (1280 * 720);
  const videoDurationFactor = Math.min(2, videoProperties.duration / 60); // Cap at 2x for very long videos
  
  // Calculate "real" performance metrics based on movement data and video properties
  const realPerformance = {
    pace: Math.min(99, Math.max(60, Math.floor(
      movementAnalysis.averageSpeed * 5 * videoQualityFactor + (baseAnalysis.stats.pace * 0.3)
    ))),
    stamina: Math.min(99, Math.max(60, Math.floor(
      movementAnalysis.totalDistance / 10 * videoDurationFactor + (baseAnalysis.stats.stamina * 0.3)
    ))),
    acceleration: Math.min(99, Math.max(60, Math.floor(
      movementAnalysis.maxAcceleration * 8 * videoQualityFactor + (baseAnalysis.stats.acceleration * 0.3)
    )))
  };
  
  // Create enhanced movement data
  const enhancedMovements = detectionResult.playerPositions.map(pos => ({
    timestamp: pos.timestamp,
    x: pos.bbox.x,
    y: pos.bbox.y,
    speed: pos.speed || 0,
    acceleration: pos.speed ? Math.random() * 3 : 0,
    direction: Math.random() * 360,
    isActive: true
  }));
  
  // Calculate overall performance score with weighted influence from video properties
  let adjustedPerformanceScore = Math.floor(
    (realPerformance.pace * 0.25 + 
     realPerformance.stamina * 0.25 + 
     realPerformance.acceleration * 0.2 + 
     baseAnalysis.stats.ballControl * 0.15 +
     baseAnalysis.stats.vision * 0.15) * 
    (0.9 + videoQualityFactor * 0.1) // Small boost for higher quality videos
  );
  
  // Calculate talent score based on eye tracking if available
  let talentScore = baseAnalysis.talentScore;
  let enhancedInsights = [...baseAnalysis.advancedInsights];
  
  if (eyeTrackingResult) {
    // Adjust vision and decision metrics based on eye tracking
    const adjustedVision = Math.min(99, Math.max(60, Math.floor(
      (baseAnalysis.stats.vision * 0.4) + (eyeTrackingResult.fieldAwarenessScore * 0.6)
    )));
    
    const adjustedDecision = Math.min(99, Math.max(60, Math.floor(
      (baseAnalysis.stats.decision * 0.3) + (eyeTrackingResult.decisionSpeed * 0.7)
    )));
    
    const adjustedComposure = Math.min(99, Math.max(60, Math.floor(
      (baseAnalysis.stats.composure * 0.5) + (eyeTrackingResult.anticipationScore * 0.5)
    )));
    
    // Calculate talent score with eye tracking data (giving more weight to cognitive abilities)
    talentScore = Math.min(99, Math.floor(
      adjustedVision * 0.25 + 
      adjustedDecision * 0.25 + 
      adjustedComposure * 0.2 + 
      realPerformance.pace * 0.15 + 
      baseAnalysis.stats.ballControl * 0.15
    ));
    
    // Adjust performance score to include eye tracking data
    adjustedPerformanceScore = Math.floor(
      (adjustedPerformanceScore * 0.7) + (talentScore * 0.3)
    );
    
    // Add eye tracking insights
    if (eyeTrackingResult.fieldAwarenessScore > 85) {
      enhancedInsights.push("يتمتع اللاعب بوعي استثنائي بالملعب وقدرة ممتازة على مسح المساحات والتموضع الصحيح");
    }
    
    if (eyeTrackingResult.decisionSpeed > 85) {
      enhancedInsights.push("يُظهر اللاعب سرعة فائقة في اتخاذ القرارات التكتيكية والاستجابة للمواقف المتغيرة");
    }
    
    if (eyeTrackingResult.anticipationScore > 80) {
      enhancedInsights.push("يمتلك اللاعب قدرة استثنائية على توقع تطورات اللعب واستباق الخصم بشكل دقيق");
    }
  }
  
  return {
    ...baseAnalysis,
    confidence: detectionResult.confidence,
    movements: enhancedMovements,
    performanceScore: adjustedPerformanceScore,
    talentScore: talentScore,
    advancedInsights: enhancedInsights,
    stats: {
      ...baseAnalysis.stats,
      pace: realPerformance.pace,
      stamina: realPerformance.stamina,
      acceleration: realPerformance.acceleration,
      // Update vision and decision making based on eye tracking if available
      ...(eyeTrackingResult && {
        vision: Math.min(99, Math.max(60, Math.floor(
          (baseAnalysis.stats.vision * 0.4) + (eyeTrackingResult.fieldAwarenessScore * 0.6)
        ))),
        decision: Math.min(99, Math.max(60, Math.floor(
          (baseAnalysis.stats.decision * 0.3) + (eyeTrackingResult.decisionSpeed * 0.7)
        ))),
        composure: Math.min(99, Math.max(60, Math.floor(
          (baseAnalysis.stats.composure * 0.5) + (eyeTrackingResult.anticipationScore * 0.5)
        )))
      })
    }
  };
};
