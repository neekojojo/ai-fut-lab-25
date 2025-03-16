
import type { PoseTrackingResult } from '../computerVision/positionTracking';
import { calculateAngle, calculateDistance } from './mathUtils';
import { PlayerMetrics } from './playerAnalysisTypes';

export class MetricsCalculator {
  /**
   * Calculate player metrics from pose data
   */
  public static calculatePlayerMetrics(poseResults: PoseTrackingResult[]): PlayerMetrics {
    // Initialize metrics object
    const metrics: PlayerMetrics = {
      speed: [],
      acceleration: [],
      positionX: [],
      positionY: [],
      jointAngles: {
        knees: [],
        elbows: [],
        shoulders: [],
        hips: []
      },
      balance: [],
      timestamps: []
    };
    
    // Process each pose result
    for (let i = 0; i < poseResults.length; i++) {
      const result = poseResults[i];
      
      if (result.poses.length === 0) {
        // Skip if no pose detected
        continue;
      }
      
      const pose = result.poses[0];
      const keypoints = pose.keypoints;
      
      // Get keypoint positions (using index since keypoint names might not match)
      const nose = [keypoints[0]?.x || 0, keypoints[0]?.y || 0] as [number, number];
      const leftShoulder = [keypoints[5]?.x || 0, keypoints[5]?.y || 0] as [number, number];
      const rightShoulder = [keypoints[6]?.x || 0, keypoints[6]?.y || 0] as [number, number];
      const leftElbow = [keypoints[7]?.x || 0, keypoints[7]?.y || 0] as [number, number];
      const rightElbow = [keypoints[8]?.x || 0, keypoints[8]?.y || 0] as [number, number];
      const leftWrist = [keypoints[9]?.x || 0, keypoints[9]?.y || 0] as [number, number];
      const rightWrist = [keypoints[10]?.x || 0, keypoints[10]?.y || 0] as [number, number];
      const leftHip = [keypoints[11]?.x || 0, keypoints[11]?.y || 0] as [number, number];
      const rightHip = [keypoints[12]?.x || 0, keypoints[12]?.y || 0] as [number, number];
      const leftKnee = [keypoints[13]?.x || 0, keypoints[13]?.y || 0] as [number, number];
      const rightKnee = [keypoints[14]?.x || 0, keypoints[14]?.y || 0] as [number, number];
      const leftAnkle = [keypoints[15]?.x || 0, keypoints[15]?.y || 0] as [number, number];
      const rightAnkle = [keypoints[16]?.x || 0, keypoints[16]?.y || 0] as [number, number];
      
      // Calculate body center (average of shoulders and hips)
      const centerX = (leftShoulder[0] + rightShoulder[0] + leftHip[0] + rightHip[0]) / 4;
      const centerY = (leftShoulder[1] + rightShoulder[1] + leftHip[1] + rightHip[1]) / 4;
      
      // Store position
      metrics.positionX.push(centerX);
      metrics.positionY.push(centerY);
      metrics.timestamps.push(result.timestamp);
      
      // Calculate speed (if we have at least 2 frames)
      if (i > 0 && metrics.positionX.length > 1 && metrics.positionY.length > 1) {
        const prevX = metrics.positionX[metrics.positionX.length - 2];
        const prevY = metrics.positionY[metrics.positionY.length - 2];
        const timeDiff = (result.timestamp - poseResults[i-1].timestamp) / 1000; // in seconds
        
        // Calculate distance
        const distance = calculateDistance([prevX, prevY], [centerX, centerY]);
        
        // Calculate speed (pixels per second)
        const speed = timeDiff > 0 ? distance / timeDiff : 0;
        metrics.speed.push(speed);
        
        // Calculate acceleration (if we have at least 3 frames)
        if (metrics.speed.length > 1) {
          const prevSpeed = metrics.speed[metrics.speed.length - 2];
          const acceleration = (speed - prevSpeed) / timeDiff;
          metrics.acceleration.push(acceleration);
        } else {
          metrics.acceleration.push(0);
        }
      } else {
        // First frame, can't calculate speed or acceleration
        metrics.speed.push(0);
        metrics.acceleration.push(0);
      }
      
      // Calculate joint angles
      // Left elbow angle
      const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      // Right elbow angle
      const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
      // Left knee angle
      const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
      // Right knee angle
      const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
      // Left shoulder angle
      const leftShoulderAngle = calculateAngle(leftElbow, leftShoulder, leftHip);
      // Right shoulder angle
      const rightShoulderAngle = calculateAngle(rightElbow, rightShoulder, rightHip);
      // Left hip angle
      const leftHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
      // Right hip angle
      const rightHipAngle = calculateAngle(rightShoulder, rightHip, rightKnee);
      
      // Store average angles
      metrics.jointAngles.elbows.push((leftElbowAngle + rightElbowAngle) / 2);
      metrics.jointAngles.knees.push((leftKneeAngle + rightKneeAngle) / 2);
      metrics.jointAngles.shoulders.push((leftShoulderAngle + rightShoulderAngle) / 2);
      metrics.jointAngles.hips.push((leftHipAngle + rightHipAngle) / 2);
      
      // Calculate balance score (based on symmetry and stability)
      const shoulderWidth = calculateDistance(leftShoulder, rightShoulder);
      const hipWidth = calculateDistance(leftHip, rightHip);
      const shoulderHipRatio = shoulderWidth / (hipWidth || 1); // Avoid division by zero
      
      // Calculate vertical alignment (how vertically aligned shoulders are with hips)
      const shoulderMidX = (leftShoulder[0] + rightShoulder[0]) / 2;
      const hipMidX = (leftHip[0] + rightHip[0]) / 2;
      const verticalAlignment = Math.abs(shoulderMidX - hipMidX) / shoulderWidth;
      
      // Balance score (0-100): Higher is better
      const balanceScore = 100 - (Math.abs(shoulderHipRatio - 1.1) * 20 + verticalAlignment * 50);
      metrics.balance.push(Math.max(0, Math.min(100, balanceScore)));
    }
    
    return metrics;
  }
}
