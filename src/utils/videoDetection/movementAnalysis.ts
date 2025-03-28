
import { PlayerPosition } from './types';

interface MovementAnalysisResult {
  averageSpeed: number;
  maxSpeed: number;
  totalDistance: number;
  maxAcceleration: number;
  directionChanges: number;
  positionalHeatmap: {x: number, y: number, value: number}[];
  topSpeed: {timestamp: number, speed: number};
}

export const analyzePlayerMovements = async (
  positions: PlayerPosition[]
): Promise<MovementAnalysisResult> => {
  // Sort positions by timestamp
  const sortedPositions = [...positions].sort((a, b) => a.timestamp - b.timestamp);
  
  // Skip analysis if there are not enough data points
  if (sortedPositions.length < 2) {
    return {
      averageSpeed: 0,
      maxSpeed: 0,
      totalDistance: 0,
      maxAcceleration: 0,
      directionChanges: 0,
      positionalHeatmap: [],
      topSpeed: {timestamp: 0, speed: 0}
    };
  }
  
  // Calculate speed and distance metrics
  let totalSpeed = 0;
  let maxSpeed = 0;
  let topSpeedEntry = {timestamp: 0, speed: 0};
  let totalDistance = 0;
  let maxAcceleration = 0;
  let directionChanges = 0;
  let prevDirection = 0;
  
  // Initialize heatmap grid
  const heatmapSize = 10; // 10x10 grid
  const heatmap = Array(heatmapSize).fill(0).map(() => 
    Array(heatmapSize).fill(0)
  );
  
  // Process positions to extract metrics
  for (let i = 1; i < sortedPositions.length; i++) {
    const prevPos = sortedPositions[i-1];
    const currentPos = sortedPositions[i];
    
    // Only consider positions with bounding box data
    if (!prevPos.bbox || !currentPos.bbox) continue;
    
    // Calculate center points
    const prevX = prevPos.bbox.x + prevPos.bbox.width / 2;
    const prevY = prevPos.bbox.y + prevPos.bbox.height / 2;
    const currentX = currentPos.bbox.x + currentPos.bbox.width / 2;
    const currentY = currentPos.bbox.y + currentPos.bbox.height / 2;
    
    // Calculate distance between points
    const dx = currentX - prevX;
    const dy = currentY - prevY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate time difference in seconds
    const timeDiff = (currentPos.timestamp - prevPos.timestamp) / 1000;
    if (timeDiff <= 0) continue; // Skip invalid time differences
    
    // Calculate speed (distance per second)
    const speed = distance / timeDiff;
    
    // Update metrics
    totalSpeed += speed;
    totalDistance += distance;
    
    if (speed > maxSpeed) {
      maxSpeed = speed;
      topSpeedEntry = {
        timestamp: currentPos.timestamp,
        speed
      };
    }
    
    // Calculate acceleration (change in speed over time)
    const prevSpeed = prevPos.speed || 0;
    const acceleration = Math.abs(speed - prevSpeed) / timeDiff;
    if (acceleration > maxAcceleration) {
      maxAcceleration = acceleration;
    }
    
    // Calculate direction and check for changes
    const direction = Math.atan2(dy, dx) * (180 / Math.PI);
    if (i > 1 && Math.abs(direction - prevDirection) > 45) {
      directionChanges++;
    }
    prevDirection = direction;
    
    // Update heatmap
    // Convert position to heatmap grid coordinates
    const gridX = Math.min(heatmapSize - 1, Math.max(0, Math.floor((currentX / 640) * heatmapSize)));
    const gridY = Math.min(heatmapSize - 1, Math.max(0, Math.floor((currentY / 480) * heatmapSize)));
    heatmap[gridY][gridX]++;
  }
  
  // Calculate average speed
  const averageSpeed = totalSpeed / (sortedPositions.length - 1);
  
  // Convert heatmap to format expected by visualization
  const positionalHeatmap = [];
  for (let y = 0; y < heatmapSize; y++) {
    for (let x = 0; x < heatmapSize; x++) {
      if (heatmap[y][x] > 0) {
        positionalHeatmap.push({
          x: (x / heatmapSize) * 100, // Convert to percentage (0-100)
          y: (y / heatmapSize) * 100, // Convert to percentage (0-100)
          value: heatmap[y][x] / Math.max(...heatmap.map(row => Math.max(...row))) // Normalize to 0-1
        });
      }
    }
  }
  
  return {
    averageSpeed,
    maxSpeed,
    totalDistance,
    maxAcceleration,
    directionChanges,
    positionalHeatmap,
    topSpeed: topSpeedEntry
  };
};
