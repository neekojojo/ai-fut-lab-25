
import { PlayerPerformancePredictionRequest, PlayerPerformancePrediction } from "../types/googleAutoML";
import { calculateStandardDeviation } from "./mathUtils";

/**
 * Generate mock prediction data based on input player stats
 * This maintains the same deterministic logic as the original implementation
 */
export const generateMockPrediction = (
  data: PlayerPerformancePredictionRequest
): PlayerPerformancePrediction => {
  const { playerStats } = data;
  
  // Calculate potential score based on current stats
  const avgScore = (
    playerStats.balanceScore +
    playerStats.technicalScore +
    playerStats.physicalScore +
    playerStats.movementEfficiency
  ) / 4;
  
  // Calculate potential based on a curve where middle-range players have highest improvement potential
  let potentialScore = 0;
  if (avgScore < 40) {
    // Low skill players have moderate potential (40-60%)
    potentialScore = 40 + (avgScore / 40) * 20;
  } else if (avgScore < 70) {
    // Mid-range players have highest potential (60-80%)
    potentialScore = 60 + ((avgScore - 40) / 30) * 20;
  } else {
    // High skill players have diminishing potential (50-70%)
    potentialScore = 80 - ((avgScore - 70) / 30) * 30;
  }
  
  // Predicted improvement rate is inversely related to current skill level
  const predictedImprovementRate = Math.max(5, 30 - (avgScore / 100) * 25);
  
  // Determine recommended training areas based on lowest scores
  const statsList = [
    { name: "Balance and stability training", score: playerStats.balanceScore },
    { name: "Technical skills development", score: playerStats.technicalScore },
    { name: "Physical conditioning", score: playerStats.physicalScore },
    { name: "Movement efficiency coaching", score: playerStats.movementEfficiency },
    { name: "Speed and acceleration drills", score: (playerStats.maxSpeed + playerStats.avgAcceleration) / 2 }
  ];
  
  // Sort by score ascending and take the three lowest areas
  const recommendedTrainingAreas = statsList
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(item => item.name);
  
  // Determine improvement timeframe based on potential and current level
  let improvementTimeframe = "3-6 months";
  if (avgScore < 30) {
    improvementTimeframe = "1-3 months";
  } else if (avgScore > 70) {
    improvementTimeframe = "6-12 months";
  }
  
  // Confidence score is higher for players with more consistent metrics
  const stdDev = calculateStandardDeviation([
    playerStats.balanceScore,
    playerStats.technicalScore,
    playerStats.physicalScore,
    playerStats.movementEfficiency
  ]);
  
  const confidenceScore = Math.max(50, 100 - stdDev);
  
  return {
    predictedImprovementRate,
    potentialScore,
    recommendedTrainingAreas,
    improvementTimeframe,
    confidenceScore
  };
};
