
import { PlayerPosition, PlayerMovementAnalysis } from './types';
import { calculateAngle, calculateBalanceScore, calculateMovementEfficiency } from './calculationUtils';

// Extract player movements from position data for analysis
export const analyzePlayerMovements = (playerPositions: PlayerPosition[]): PlayerMovementAnalysis | null => {
  if (!playerPositions || playerPositions.length === 0) {
    return null;
  }
  
  // Calculate speed between frames based on hip positions
  const speeds: number[] = [];
  const accelerations: number[] = [];
  let totalDistance = 0;
  
  for (let i = 1; i < playerPositions.length; i++) {
    const prevPos = playerPositions[i - 1];
    const currPos = playerPositions[i];
    
    // Get hip positions as the center of the player
    const prevLeftHip = prevPos.keypoints.find(k => k.part === "left_hip");
    const prevRightHip = prevPos.keypoints.find(k => k.part === "right_hip");
    const currLeftHip = currPos.keypoints.find(k => k.part === "left_hip");
    const currRightHip = currPos.keypoints.find(k => k.part === "right_hip");
    
    if (prevLeftHip && prevRightHip && currLeftHip && currRightHip) {
      // Calculate center of hips
      const prevCenterX = (prevLeftHip.x + prevRightHip.x) / 2;
      const prevCenterY = (prevLeftHip.y + prevRightHip.y) / 2;
      const currCenterX = (currLeftHip.x + currRightHip.x) / 2;
      const currCenterY = (currLeftHip.y + currRightHip.y) / 2;
      
      // Calculate distance moved
      const dx = currCenterX - prevCenterX;
      const dy = currCenterY - prevCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      totalDistance += distance;
      
      // Calculate time difference in seconds
      const timeDiff = (currPos.timestamp - prevPos.timestamp) / 1000;
      
      // Calculate speed in pixels per second
      const speed = distance / timeDiff;
      speeds.push(speed);
      
      // Calculate acceleration
      if (speeds.length > 1) {
        const prevSpeed = speeds[speeds.length - 2];
        const acceleration = (speed - prevSpeed) / timeDiff;
        accelerations.push(acceleration);
      }
    }
  }
  
  // Calculate joint angles for selected frames
  const kneeAngles: number[] = [];
  const hipAngles: number[] = [];
  
  playerPositions.forEach(pos => {
    const leftHip = pos.keypoints.find(k => k.part === "left_hip");
    const leftKnee = pos.keypoints.find(k => k.part === "left_knee");
    const leftAnkle = pos.keypoints.find(k => k.part === "left_ankle");
    
    if (leftHip && leftKnee && leftAnkle) {
      // Calculate knee angle
      const angle = calculateAngle(
        [leftHip.x, leftHip.y],
        [leftKnee.x, leftKnee.y],
        [leftAnkle.x, leftAnkle.y]
      );
      kneeAngles.push(angle);
    }
    
    const leftShoulder = pos.keypoints.find(k => k.part === "left_shoulder");
    if (leftShoulder && leftHip && leftKnee) {
      // Calculate hip angle
      const angle = calculateAngle(
        [leftShoulder.x, leftShoulder.y],
        [leftHip.x, leftHip.y],
        [leftKnee.x, leftKnee.y]
      );
      hipAngles.push(angle);
    }
  });
  
  return {
    speeds,
    avgSpeed: speeds.length ? speeds.reduce((sum, s) => sum + s, 0) / speeds.length : 0,
    maxSpeed: speeds.length ? Math.max(...speeds) : 0,
    accelerations,
    avgAcceleration: accelerations.length ? 
      accelerations.reduce((sum, a) => sum + a, 0) / accelerations.length : 0,
    totalDistance,
    jointAngles: {
      knee: kneeAngles,
      hip: hipAngles
    },
    balanceScore: calculateBalanceScore(playerPositions),
    movementEfficiency: calculateMovementEfficiency(speeds, accelerations)
  };
};
