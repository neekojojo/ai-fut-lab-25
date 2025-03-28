
import { PlayerPosition } from './types';

interface MovementAnalysisResult {
  averageSpeed: number;
  maxSpeed: number;
  totalDistance: number;
  maxAcceleration: number;
  directionChanges: number;
  positionalHeatmap: {x: number, y: number, value: number}[];
  topSpeed: {timestamp: number, speed: number};
  // إضافة مقاييس جديدة
  sprintCount: number;
  speedZones: {
    walking: number;   // 0-6 km/h
    jogging: number;   // 6-14 km/h
    running: number;   // 14-21 km/h
    sprinting: number; // >21 km/h
  };
  movementEfficiency: number; // 0-100
  possessionImpact: number;   // 0-100
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
      topSpeed: {timestamp: 0, speed: 0},
      sprintCount: 0,
      speedZones: { walking: 0, jogging: 0, running: 0, sprinting: 0 },
      movementEfficiency: 0,
      possessionImpact: 0
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
  let sprintCount = 0;
  let sprintActive = false;
  
  // Counters for speed zones (in pixels/ms, later converted to approximate km/h)
  let walkingTime = 0;
  let joggingTime = 0;
  let runningTime = 0;
  let sprintingTime = 0;
  
  // Used for movement efficiency calculation
  let totalDistanceCovered = 0;
  let directDistance = 0;
  
  // A scale factor to convert pixel speed to approximate km/h for visualization
  // This is an approximation as real conversion would require field dimensions
  const SPEED_SCALE_FACTOR = 3.6; // Just a visualization factor
  
  // Initialize heatmap grid
  const heatmapSize = 20; // 20x20 grid for more detailed heatmap
  const heatmap = Array(heatmapSize).fill(0).map(() => 
    Array(heatmapSize).fill(0)
  );
  
  // Store first and last position for efficiency calculation
  const firstPos = sortedPositions[0];
  const lastPos = sortedPositions[sortedPositions.length - 1];
  
  // Calculate direct distance between first and last position
  if (firstPos.bbox && lastPos.bbox) {
    const firstX = firstPos.bbox.x + firstPos.bbox.width / 2;
    const firstY = firstPos.bbox.y + firstPos.bbox.height / 2;
    const lastX = lastPos.bbox.x + lastPos.bbox.width / 2;
    const lastY = lastPos.bbox.y + lastPos.bbox.height / 2;
    
    const dx = lastX - firstX;
    const dy = lastY - firstY;
    directDistance = Math.sqrt(dx * dx + dy * dy);
  }
  
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
    
    // Add to total distance
    totalDistance += distance;
    totalDistanceCovered += distance;
    
    // Calculate time difference in seconds
    const timeDiff = (currentPos.timestamp - prevPos.timestamp) / 1000;
    if (timeDiff <= 0) continue; // Skip invalid time differences
    
    // Calculate speed (distance per second)
    const speed = distance / timeDiff;
    
    // Update metrics
    totalSpeed += speed;
    
    if (speed > maxSpeed) {
      maxSpeed = speed;
      topSpeedEntry = {
        timestamp: currentPos.timestamp,
        speed
      };
    }
    
    // Classify speed into zones (approximate conversion to km/h for visualization)
    const speedKmh = speed * SPEED_SCALE_FACTOR;
    
    if (speedKmh < 6) {
      walkingTime += timeDiff;
    } else if (speedKmh < 14) {
      joggingTime += timeDiff;
    } else if (speedKmh < 21) {
      runningTime += timeDiff;
    } else {
      sprintingTime += timeDiff;
      
      // Count sprints (a sprint starts when speed exceeds 21 km/h)
      if (!sprintActive) {
        sprintCount++;
        sprintActive = true;
      }
    }
    
    // Reset sprint active flag if speed drops below sprint threshold
    if (sprintActive && speedKmh < 21) {
      sprintActive = false;
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
  
  // Calculate speed zone percentages
  const totalTime = walkingTime + joggingTime + runningTime + sprintingTime;
  const speedZones = {
    walking: totalTime > 0 ? walkingTime / totalTime : 0,
    jogging: totalTime > 0 ? joggingTime / totalTime : 0,
    running: totalTime > 0 ? runningTime / totalTime : 0,
    sprinting: totalTime > 0 ? sprintingTime / totalTime : 0
  };
  
  // Calculate movement efficiency (ratio of direct distance to total distance)
  // A higher value indicates more direct, efficient movement
  const movementEfficiency = totalDistanceCovered > 0 ? 
    Math.min(100, (directDistance / totalDistanceCovered) * 100) : 0;
  
  // Simulate possession impact based on movement patterns
  // In a real system, this would be calculated from actual ball possession data
  const possessionImpact = Math.min(100, 
    (speedZones.sprinting * 40) + 
    (directionChanges / 10 * 30) + 
    (movementEfficiency * 0.3)
  );
  
  return {
    averageSpeed,
    maxSpeed,
    totalDistance,
    maxAcceleration,
    directionChanges,
    positionalHeatmap,
    topSpeed: topSpeedEntry,
    sprintCount,
    speedZones,
    movementEfficiency,
    possessionImpact
  };
};
