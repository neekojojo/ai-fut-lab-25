
import { DataFrame, Series } from 'pandas-js';
import type { PoseTrackingResult } from '../computerVision/positionTracking';

// Keypoint names for easier reference
export const KEYPOINT_NAMES = [
  'nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear',
  'left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow',
  'left_wrist', 'right_wrist', 'left_hip', 'right_hip',
  'left_knee', 'right_knee', 'left_ankle', 'right_ankle'
];

export interface PlayerMetrics {
  speed: number[];          // Speed over time (pixels/frame)
  acceleration: number[];   // Acceleration over time (change in speed)
  positionX: number[];      // X position over time
  positionY: number[];      // Y position over time
  jointAngles: {            // Key joint angles (degrees)
    knees: number[];
    elbows: number[];
    shoulders: number[];
    hips: number[];
  };
  balance: number[];        // Balance score based on pose stability
  timestamps: number[];     // Timestamps for each data point
}

export interface PlayerStats {
  avgSpeed: number;
  maxSpeed: number;
  avgAcceleration: number;
  distanceCovered: number;
  balanceScore: number;
  technicalScore: number;
  physicalScore: number;
  movementEfficiency: number;
}

export class PlayerDataAnalyzer {
  
  // Convert pose tracking results to a DataFrame for analysis
  public static poseResultsToDataFrame(results: PoseTrackingResult[]): DataFrame {
    // Prepare data arrays
    const data: any = {
      frameIndex: [],
      timestamp: [],
      playerCount: [],
      confidence: []
    };
    
    // Add keypoint columns for each keypoint
    KEYPOINT_NAMES.forEach(name => {
      data[`${name}_x`] = [];
      data[`${name}_y`] = [];
      data[`${name}_score`] = [];
    });
    
    // Fill data arrays with pose information
    results.forEach(result => {
      data.frameIndex.push(result.frameIndex);
      data.timestamp.push(result.timestamp);
      data.playerCount.push(result.playerCount);
      data.confidence.push(result.trackingConfidence);
      
      // If we have at least one pose, use the first one (main player)
      if (result.poses.length > 0) {
        const mainPose = result.poses[0];
        
        // Map keypoints to their respective columns
        mainPose.keypoints.forEach((keypoint, index) => {
          if (index < KEYPOINT_NAMES.length) {
            const name = KEYPOINT_NAMES[index];
            data[`${name}_x`].push(keypoint.x);
            data[`${name}_y`].push(keypoint.y);
            data[`${name}_score`].push(keypoint.score || 0);
          }
        });
      } else {
        // Fill with NaN if no pose is detected
        KEYPOINT_NAMES.forEach(name => {
          data[`${name}_x`].push(NaN);
          data[`${name}_y`].push(NaN);
          data[`${name}_score`].push(0);
        });
      }
    });
    
    return new DataFrame(data);
  }
  
  // Calculate angle between three points (in degrees)
  private static calculateAngle(
    p1: [number, number],
    p2: [number, number],
    p3: [number, number]
  ): number {
    const vec1 = {
      x: p1[0] - p2[0],
      y: p1[1] - p2[1]
    };
    
    const vec2 = {
      x: p3[0] - p2[0],
      y: p3[1] - p2[1]
    };
    
    // Calculate the dot product
    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
    
    // Calculate the magnitudes
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    // Calculate the angle in radians and convert to degrees
    const angleRad = Math.acos(dotProduct / (mag1 * mag2));
    const angleDeg = angleRad * (180 / Math.PI);
    
    return angleDeg;
  }
  
  // Calculate distance between two points
  private static calculateDistance(
    p1: [number, number],
    p2: [number, number]
  ): number {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Calculate player metrics from pose data
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
        const distance = this.calculateDistance([prevX, prevY], [centerX, centerY]);
        
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
      const leftElbowAngle = this.calculateAngle(leftShoulder, leftElbow, leftWrist);
      // Right elbow angle
      const rightElbowAngle = this.calculateAngle(rightShoulder, rightElbow, rightWrist);
      // Left knee angle
      const leftKneeAngle = this.calculateAngle(leftHip, leftKnee, leftAnkle);
      // Right knee angle
      const rightKneeAngle = this.calculateAngle(rightHip, rightKnee, rightAnkle);
      // Left shoulder angle
      const leftShoulderAngle = this.calculateAngle(leftElbow, leftShoulder, leftHip);
      // Right shoulder angle
      const rightShoulderAngle = this.calculateAngle(rightElbow, rightShoulder, rightHip);
      // Left hip angle
      const leftHipAngle = this.calculateAngle(leftShoulder, leftHip, leftKnee);
      // Right hip angle
      const rightHipAngle = this.calculateAngle(rightShoulder, rightHip, rightKnee);
      
      // Store average angles
      metrics.jointAngles.elbows.push((leftElbowAngle + rightElbowAngle) / 2);
      metrics.jointAngles.knees.push((leftKneeAngle + rightKneeAngle) / 2);
      metrics.jointAngles.shoulders.push((leftShoulderAngle + rightShoulderAngle) / 2);
      metrics.jointAngles.hips.push((leftHipAngle + rightHipAngle) / 2);
      
      // Calculate balance score (based on symmetry and stability)
      const shoulderWidth = this.calculateDistance(leftShoulder, rightShoulder);
      const hipWidth = this.calculateDistance(leftHip, rightHip);
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
  
  // Calculate overall player statistics
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
      distanceCovered += this.calculateDistance(
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
      const elbowAngleDeviation = this.calculateStandardDeviation(metrics.jointAngles.elbows);
      const kneeAngleDeviation = this.calculateStandardDeviation(metrics.jointAngles.knees);
      const shoulderAngleDeviation = this.calculateStandardDeviation(metrics.jointAngles.shoulders);
      const hipAngleDeviation = this.calculateStandardDeviation(metrics.jointAngles.hips);
      
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
  
  // Calculate standard deviation
  private static calculateStandardDeviation(values: number[]): number {
    if (values.length <= 1) return 0;
    
    // Calculate mean
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Calculate sum of squared differences
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((sum, val) => sum + val, 0);
    
    // Calculate variance and standard deviation
    const variance = sumSquaredDiffs / (values.length - 1);
    return Math.sqrt(variance);
  }
}
