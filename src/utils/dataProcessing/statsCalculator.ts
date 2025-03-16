
import { calculateDistance, calculateStandardDeviation } from './mathUtils';
import { PlayerMetrics, PlayerStats } from './playerAnalysisTypes';

export class StatsCalculator {
  /**
   * Calculate overall player statistics
   */
  public static calculatePlayerStats(metrics: PlayerMetrics): PlayerStats {
    // Calculate average speed
    const avgSpeed = metrics.speed.reduce((sum, val) => sum + val, 0) / (metrics.speed.length || 1);
    
    // Calculate max speed
    const maxSpeed = Math.max(...metrics.speed);
    
    // Calculate average acceleration
    const avgAcceleration = metrics.acceleration.reduce((sum, val) => sum + val, 0) / (metrics.acceleration.length || 1);
    
    // Calculate total distance covered
    let distanceCovered = 0;
    for (let i = 1; i < metrics.positionX.length; i++) {
      distanceCovered += calculateDistance(
        [metrics.positionX[i-1], metrics.positionY[i-1]],
        [metrics.positionX[i], metrics.positionY[i]]
      );
    }
    
    // Calculate average balance score
    const balanceScore = metrics.balance.reduce((sum, val) => sum + val, 0) / (metrics.balance.length || 1);
    
    // Calculate technical score (based on joint angles consistency)
    let technicalScore = 0;
    if (metrics.jointAngles.elbows.length > 0) {
      // Calculate consistency of joint angles (lower standard deviation is better)
      const elbowAngleDeviation = calculateStandardDeviation(metrics.jointAngles.elbows);
      const kneeAngleDeviation = calculateStandardDeviation(metrics.jointAngles.knees);
      const shoulderAngleDeviation = calculateStandardDeviation(metrics.jointAngles.shoulders);
      const hipAngleDeviation = calculateStandardDeviation(metrics.jointAngles.hips);
      
      // Technical score (0-100): Lower deviation scores higher
      const maxDeviation = 30; // Maximum expected standard deviation
      technicalScore = 100 - (
        (elbowAngleDeviation + kneeAngleDeviation + shoulderAngleDeviation + hipAngleDeviation) / 
        (4 * maxDeviation)
      ) * 100;
      technicalScore = Math.max(0, Math.min(100, technicalScore));
    }
    
    // Calculate physical score (based on speed, acceleration, and distance)
    const normalizedMaxSpeed = Math.min(maxSpeed / 200, 1); // Assuming 200 pixels/sec is max
    const normalizedAvgAcceleration = Math.min(Math.abs(avgAcceleration) / 50, 1); // Assuming 50 pixels/sec² is max
    const normalizedDistance = Math.min(distanceCovered / 5000, 1); // Assuming 5000 pixels is max
    
    const physicalScore = (normalizedMaxSpeed * 0.4 + normalizedAvgAcceleration * 0.3 + normalizedDistance * 0.3) * 100;
    
    // Calculate movement efficiency (ratio of distance to energy expended)
    // Higher values mean more efficient movement
    const accelerationSum = metrics.acceleration.reduce((sum, acc) => sum + Math.abs(acc), 0);
    const movementEfficiency = distanceCovered / (accelerationSum + 1); // Avoid division by zero
    
    // Normalize movement efficiency to 0-100 scale
    const normalizedEfficiency = Math.min(movementEfficiency / 10, 1) * 100;
    
    return {
      avgSpeed,
      maxSpeed,
      avgAcceleration,
      distanceCovered,
      balanceScore,
      technicalScore,
      physicalScore,
      movementEfficiency: normalizedEfficiency
    };
  }
}
