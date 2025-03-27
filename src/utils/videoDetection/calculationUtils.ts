
// Utility functions for video detection calculations

// Calculate angle between three points in degrees
export const calculateAngle = (
  p1: [number, number],
  p2: [number, number],
  p3: [number, number]
): number => {
  // Vector 1 (p1 to p2)
  const v1x = p1[0] - p2[0];
  const v1y = p1[1] - p2[1];
  
  // Vector 2 (p3 to p2)
  const v2x = p3[0] - p2[0];
  const v2y = p3[1] - p2[1];
  
  // Dot product
  const dotProduct = v1x * v2x + v1y * v2y;
  
  // Magnitude of vectors
  const v1Mag = Math.sqrt(v1x * v1x + v1y * v1y);
  const v2Mag = Math.sqrt(v2x * v2x + v2y * v2y);
  
  // Angle calculation
  const cosAngle = dotProduct / (v1Mag * v2Mag);
  
  // Preventing domain errors and converting to degrees
  const radians = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
  return radians * (180 / Math.PI);
};

// Calculate distance between two points
export const calculateDistance = (
  p1: [number, number],
  p2: [number, number]
): number => {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  return Math.sqrt(dx * dx + dy * dy);
};

// Calculate balance score based on body keypoints
export const calculateBalanceScore = (positions: any[]): number => {
  if (positions.length === 0) return 50; // Default value
  
  let totalScore = 0;
  let validFrames = 0;
  
  positions.forEach(pos => {
    // Get relevant keypoints for balance calculation
    const leftShoulder = pos.keypoints.find((k: any) => k.part === 'left_shoulder');
    const rightShoulder = pos.keypoints.find((k: any) => k.part === 'right_shoulder');
    const leftHip = pos.keypoints.find((k: any) => k.part === 'left_hip');
    const rightHip = pos.keypoints.find((k: any) => k.part === 'right_hip');
    const leftAnkle = pos.keypoints.find((k: any) => k.part === 'left_ankle');
    const rightAnkle = pos.keypoints.find((k: any) => k.part === 'right_ankle');
    
    // Check if we have all required keypoints with sufficient confidence
    if (leftShoulder && rightShoulder && leftHip && rightHip && 
        leftAnkle && rightAnkle && 
        leftShoulder.confidence > 0.5 && rightShoulder.confidence > 0.5 &&
        leftHip.confidence > 0.5 && rightHip.confidence > 0.5 &&
        leftAnkle.confidence > 0.5 && rightAnkle.confidence > 0.5) {
      
      // Calculate center of shoulders and hips
      const shoulderCenterX = (leftShoulder.x + rightShoulder.x) / 2;
      const shoulderCenterY = (leftShoulder.y + rightShoulder.y) / 2;
      const hipCenterX = (leftHip.x + rightHip.x) / 2;
      const hipCenterY = (leftHip.y + rightHip.y) / 2;
      const ankleCenterX = (leftAnkle.x + rightAnkle.x) / 2;
      const ankleCenterY = (leftAnkle.y + rightAnkle.y) / 2;
      
      // Calculate vertical alignment (ideally should be close to 0 for good posture)
      const horizontalDeviation = Math.abs(shoulderCenterX - hipCenterX) + Math.abs(hipCenterX - ankleCenterX);
      
      // Calculate shoulder and hip tilt (should be close to 0 for balance)
      const shoulderTilt = Math.abs(leftShoulder.y - rightShoulder.y);
      const hipTilt = Math.abs(leftHip.y - rightHip.y);
      
      // Distance between feet (wider stance is generally more stable)
      const feetDistance = calculateDistance(
        [leftAnkle.x, leftAnkle.y],
        [rightAnkle.x, rightAnkle.y]
      );
      
      // Calculate a balance score (0-100)
      // Lower deviation and tilt = better balance, wider stance = better stability
      const maxDeviation = 100; // Pixel threshold for worst deviation
      const maxTilt = 50; // Pixel threshold for worst tilt
      const idealFeetDistance = 50; // Ideal feet distance for stability
      
      const deviationScore = Math.max(0, 100 - (horizontalDeviation / maxDeviation) * 100);
      const tiltScore = Math.max(0, 100 - ((shoulderTilt + hipTilt) / (maxTilt * 2)) * 100);
      const feetScore = Math.max(0, 100 - Math.abs(feetDistance - idealFeetDistance) / idealFeetDistance * 50);
      
      // Combined score with weights
      const frameScore = (deviationScore * 0.4) + (tiltScore * 0.4) + (feetScore * 0.2);
      totalScore += frameScore;
      validFrames++;
    }
  });
  
  // Return average score or default if no valid frames
  return validFrames > 0 ? Math.round(totalScore / validFrames) : 50;
};

// Calculate movement efficiency based on speed consistency and acceleration patterns
export const calculateMovementEfficiency = (speeds: number[], accelerations: number[]): number => {
  if (speeds.length === 0) return 50; // Default value
  
  // Calculate speed consistency (lower variation = more efficiency)
  let speedSum = 0;
  let speedSqSum = 0;
  
  speeds.forEach(speed => {
    speedSum += speed;
    speedSqSum += speed * speed;
  });
  
  const avgSpeed = speedSum / speeds.length;
  const speedVariance = (speedSqSum / speeds.length) - (avgSpeed * avgSpeed);
  const speedCV = Math.sqrt(speedVariance) / avgSpeed; // Coefficient of variation
  
  // Calculate acceleration efficiency (smooth acceleration/deceleration is better)
  let abruptChanges = 0;
  let prevAccel = accelerations[0] || 0;
  
  accelerations.forEach(accel => {
    // Count significant changes in acceleration direction
    if (Math.sign(accel) !== Math.sign(prevAccel) && Math.abs(accel) > 5) {
      abruptChanges++;
    }
    prevAccel = accel;
  });
  
  const accelerationScore = Math.max(0, 100 - (abruptChanges / accelerations.length) * 200);
  
  // Speed consistency score (lower CV = better consistency)
  const maxCV = 0.5; // Maximum acceptable coefficient of variation
  const consistencyScore = Math.max(0, 100 - (speedCV / maxCV) * 100);
  
  // Combine scores with weights
  const efficiencyScore = (consistencyScore * 0.6) + (accelerationScore * 0.4);
  
  return Math.round(efficiencyScore);
};

