
import { PlayerPosition } from './types';
import { calculateDistanceAndSpeed, calculateBalanceScore, calculateMovementEfficiency } from './calculationUtils';

export interface MovementAnalysisResult {
  positions: PlayerPosition[];
  balanceScore: number;
  movementEfficiency: number;
  maxSpeed: number;
  avgSpeed: number;
  totalDistance: number;
  directionChanges: number;
  // Add missing properties that are needed in PerformanceAnalyzer.ts
  maxAcceleration: number;
  speedZones: {
    walking: number;
    jogging: number;
    running: number;
    sprinting: number;
  };
}

export const analyzeMovementPatterns = async (positions: PlayerPosition[]) => {
  console.log("Analyzing movement patterns");
  const enhancedPositions = calculateDistanceAndSpeed(positions);
  
  // Extract speeds and accelerations for efficiency calculation
  const speeds = enhancedPositions.map(pos => pos.speed || 0);
  const accelerations = speeds.map((speed, i, arr) => {
    if (i === 0) return 0;
    const prevSpeed = arr[i-1];
    const timeDiff = (enhancedPositions[i].timestamp - enhancedPositions[i-1].timestamp) / 1000;
    return timeDiff > 0 ? (speed - prevSpeed) / timeDiff : 0;
  });
  
  // Calculate average and max speed
  const validSpeeds = speeds.filter(s => s > 0);
  const avgSpeed = validSpeeds.length > 0 ? validSpeeds.reduce((a, b) => a + b, 0) / validSpeeds.length : 0;
  const maxSpeed = validSpeeds.length > 0 ? Math.max(...validSpeeds) : 0;
  
  // Calculate max acceleration
  const maxAcceleration = accelerations.length > 0 ? Math.max(...accelerations) : 0;
  
  // Calculate total distance
  const totalDistance = enhancedPositions.reduce((total, pos) => total + (pos.distance || 0), 0);
  
  // Count direction changes
  let directionChanges = 0;
  let prevDirection = { x: 0, y: 0 };
  
  for (let i = 1; i < enhancedPositions.length; i++) {
    const current = enhancedPositions[i];
    const prev = enhancedPositions[i-1];
    
    if (!current.bbox || !prev.bbox) continue;
    
    const direction = {
      x: (current.bbox.x + current.bbox.width/2) - (prev.bbox.x + prev.bbox.width/2),
      y: (current.bbox.y + current.bbox.height/2) - (prev.bbox.y + prev.bbox.height/2)
    };
    
    // If this is not the first direction and it changed significantly
    if (i > 1 && Math.sign(direction.x) !== Math.sign(prevDirection.x) && Math.abs(direction.x) > 5) {
      directionChanges++;
    }
    
    prevDirection = direction;
  }
  
  // Calculate speed zones
  const maxPossibleSpeed = Math.max(maxSpeed, 25); // Set a reasonable max speed to normalize
  const speedZones = {
    walking: 0,
    jogging: 0,
    running: 0,
    sprinting: 0
  };
  
  validSpeeds.forEach(speed => {
    const normalizedSpeed = speed / maxPossibleSpeed;
    if (normalizedSpeed < 0.3) {
      speedZones.walking += 1;
    } else if (normalizedSpeed < 0.6) {
      speedZones.jogging += 1;
    } else if (normalizedSpeed < 0.8) {
      speedZones.running += 1;
    } else {
      speedZones.sprinting += 1;
    }
  });
  
  // Convert counts to percentages
  const totalCount = validSpeeds.length;
  if (totalCount > 0) {
    speedZones.walking /= totalCount;
    speedZones.jogging /= totalCount;
    speedZones.running /= totalCount;
    speedZones.sprinting /= totalCount;
  }
  
  return {
    positions: enhancedPositions,
    balanceScore: calculateBalanceScore(positions),
    movementEfficiency: calculateMovementEfficiency(speeds, accelerations),
    maxSpeed,
    avgSpeed,
    totalDistance,
    directionChanges,
    maxAcceleration,
    speedZones
  };
};

// Function to analyze player movements for other utilities
export const analyzePlayerMovements = async (positions: PlayerPosition[]): Promise<MovementAnalysisResult> => {
  return await analyzeMovementPatterns(positions);
};
