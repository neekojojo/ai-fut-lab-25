
import { PlayerPosition } from './types';

// Explicitly export this interface that was referenced in PerformanceAnalyzer.ts
export interface MovementAnalysisResult {
  totalDistance: number;
  maxSpeed: number;
  maxAcceleration: number;
  averageSpeed: number;
  directionChanges: number;
  speedZones: {
    walking: number;
    jogging: number;
    running: number;
    sprinting: number;
  };
  movementEfficiency: number;
  positionalHeatmap: {x: number, y: number, value: number}[];
}

/**
 * Analyzes player movements from position data
 * @param playerPositions Array of player positions over time
 */
export const analyzePlayerMovements = async (
  playerPositions: PlayerPosition[]
): Promise<MovementAnalysisResult> => {
  // Sort positions by timestamp
  const positions = [...playerPositions].sort((a, b) => a.timestamp - b.timestamp);
  
  // If insufficient data, return default values
  if (positions.length < 2) {
    return {
      totalDistance: 0,
      maxSpeed: 0,
      maxAcceleration: 0,
      averageSpeed: 0,
      directionChanges: 0,
      speedZones: { walking: 0, jogging: 0, running: 0, sprinting: 0 },
      movementEfficiency: 0,
      positionalHeatmap: []
    };
  }
  
  // Extract positions with bounding boxes
  const positionsWithBBox = positions.filter(pos => pos.bbox);
  
  // Calculate speeds between consecutive positions
  let totalDistance = 0;
  let speeds: number[] = [];
  let accelerations: number[] = [];
  let directions: {angle: number, timestamp: number}[] = [];
  let directionChanges = 0;
  
  for (let i = 1; i < positionsWithBBox.length; i++) {
    const prev = positionsWithBBox[i-1];
    const curr = positionsWithBBox[i];
    
    if (!prev.bbox || !curr.bbox) continue;
    
    // Calculate center points
    const prevCenter = {
      x: prev.bbox.x + prev.bbox.width / 2,
      y: prev.bbox.y + prev.bbox.height / 2
    };
    
    const currCenter = {
      x: curr.bbox.x + curr.bbox.width / 2,
      y: curr.bbox.y + curr.bbox.height / 2
    };
    
    // Calculate distance
    const dx = currCenter.x - prevCenter.x;
    const dy = currCenter.y - prevCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    totalDistance += distance;
    
    // Calculate time difference in seconds
    const dt = (curr.timestamp - prev.timestamp) / 1000;
    if (dt <= 0) continue; // Skip invalid time differences
    
    // Calculate speed (pixels per second)
    const speed = distance / dt;
    speeds.push(speed);
    
    // Calculate acceleration
    if (speeds.length >= 2) {
      const prevSpeed = speeds[speeds.length - 2];
      const acceleration = (speed - prevSpeed) / dt;
      accelerations.push(acceleration);
    }
    
    // Calculate direction
    const angle = Math.atan2(dy, dx);
    directions.push({ angle, timestamp: curr.timestamp });
    
    // Check for direction changes (more than 45 degrees)
    if (directions.length >= 2) {
      const prevAngle = directions[directions.length - 2].angle;
      const angleDiff = Math.abs(angle - prevAngle);
      const normalizedDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
      
      if (normalizedDiff > Math.PI / 4) { // 45 degrees in radians
        directionChanges++;
      }
    }
  }
  
  // Calculate max and average speeds
  const maxSpeed = Math.max(...speeds, 0);
  const averageSpeed = speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length || 0;
  
  // Calculate max acceleration
  const maxAcceleration = Math.max(...accelerations.map(a => Math.abs(a)), 0);
  
  // Categorize speeds into zones (based on percentages of max speed)
  const walkingThreshold = maxSpeed * 0.3;
  const joggingThreshold = maxSpeed * 0.5;
  const runningThreshold = maxSpeed * 0.7;
  
  const speedZones = {
    walking: 0,
    jogging: 0,
    running: 0,
    sprinting: 0
  };
  
  speeds.forEach(speed => {
    if (speed < walkingThreshold) {
      speedZones.walking++;
    } else if (speed < joggingThreshold) {
      speedZones.jogging++;
    } else if (speed < runningThreshold) {
      speedZones.running++;
    } else {
      speedZones.sprinting++;
    }
  });
  
  // Normalize speed zones as proportions
  const totalSpeeds = speeds.length;
  speedZones.walking /= totalSpeeds;
  speedZones.jogging /= totalSpeeds;
  speedZones.running /= totalSpeeds;
  speedZones.sprinting /= totalSpeeds;
  
  // Calculate movement efficiency
  // (ratio of direct distance to actual distance traveled)
  let efficiency = 0;
  
  if (positionsWithBBox.length >= 2) {
    const firstPos = positionsWithBBox[0];
    const lastPos = positionsWithBBox[positionsWithBBox.length - 1];
    
    if (firstPos.bbox && lastPos.bbox) {
      const firstCenter = {
        x: firstPos.bbox.x + firstPos.bbox.width / 2,
        y: firstPos.bbox.y + firstPos.bbox.height / 2
      };
      
      const lastCenter = {
        x: lastPos.bbox.x + lastPos.bbox.width / 2,
        y: lastPos.bbox.y + lastPos.bbox.height / 2
      };
      
      const directDistance = Math.sqrt(
        Math.pow(lastCenter.x - firstCenter.x, 2) +
        Math.pow(lastCenter.y - firstCenter.y, 2)
      );
      
      // If player returns close to starting point, efficiency will be naturally low
      // So we use a different calculation in that case
      if (directDistance < totalDistance * 0.1) {
        // For circular movements, estimate efficiency based on consistency of speed
        const speedVariation = speeds.reduce((sum, speed) => sum + Math.abs(speed - averageSpeed), 0) / speeds.length;
        const normalizedVariation = Math.min(speedVariation / averageSpeed, 1);
        efficiency = (1 - normalizedVariation) * 100;
      } else {
        efficiency = Math.min((directDistance / totalDistance) * 100, 100);
      }
    }
  }
  
  // Create positional heatmap
  const heatmapGrid = new Map<string, number>();
  const gridSize = 20; // Grid size for heatmap
  
  positionsWithBBox.forEach(pos => {
    if (!pos.bbox) return;
    
    const center = {
      x: pos.bbox.x + pos.bbox.width / 2,
      y: pos.bbox.y + pos.bbox.height / 2
    };
    
    // Normalize position to 0-1 range for general application
    // Assuming 640x480 video dimensions
    const normX = Math.floor((center.x / 640) * gridSize);
    const normY = Math.floor((center.y / 480) * gridSize);
    
    const key = `${normX},${normY}`;
    heatmapGrid.set(key, (heatmapGrid.get(key) || 0) + 1);
  });
  
  // Convert heatmap to array format
  const positionalHeatmap = Array.from(heatmapGrid.entries())
    .map(([key, count]) => {
      const [x, y] = key.split(',').map(Number);
      return {
        x: (x + 0.5) * (100 / gridSize), // Convert to percentage (0-100%)
        y: (y + 0.5) * (100 / gridSize), // Convert to percentage (0-100%)
        value: count / positionsWithBBox.length // Normalize between 0-1
      };
    });
  
  return {
    totalDistance,
    maxSpeed,
    maxAcceleration,
    averageSpeed,
    directionChanges,
    speedZones,
    movementEfficiency: efficiency,
    positionalHeatmap
  };
};
