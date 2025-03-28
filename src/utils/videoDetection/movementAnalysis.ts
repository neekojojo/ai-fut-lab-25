
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
  // Add new fields for phase 4
  topSpeed: number;
  accelerationProfile: {
    explosive: number;
    sustained: number;
    deceleration: number;
  };
  positionSpecificMetrics: {
    defenderMetrics?: {
      tacklesAttempted: number;
      interceptionsAttempted: number;
      clearancesAttempted: number;
      defensePositioning: number;
    };
    midfielderMetrics?: {
      passesAttempted: number;
      passAccuracy: number;
      ballControl: number;
      visionScore: number;
    };
    attackerMetrics?: {
      shotsAttempted: number;
      shotsOnTarget: number;
      dribbleAttempts: number;
      dribbleSuccess: number;
    };
    goalkeeperMetrics?: {
      savesAttempted: number;
      saveSuccess: number;
      distribution: number;
      commandOfArea: number;
    };
  };
  // New metrics for phase 5
  eyeTrackingMetrics?: {
    focusScore: number;
    scanningEfficiency: number;
    decisionTimeMs: number;
    awarenessRating: number;
    anticipationScore: number;
    focusPoints: {x: number, y: number, duration: number}[];
  };
  pressureResistance?: number;
  technicalConsistency?: number;
  zoneTransitions?: {
    defensiveToOffensive: number;
    offensiveToDefensive: number;
    effectiveness: number;
  };
}

/**
 * Analyzes player movements from position data
 * @param playerPositions Array of player positions over time
 * @param playerRole Optional role of the player (defender, midfielder, attacker, goalkeeper)
 * @param includeEyeTracking Optional flag to include eye tracking metrics
 */
export const analyzePlayerMovements = async (
  playerPositions: PlayerPosition[],
  playerRole?: 'defender' | 'midfielder' | 'attacker' | 'goalkeeper',
  includeEyeTracking: boolean = false
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
      positionalHeatmap: [],
      topSpeed: 0,
      accelerationProfile: {
        explosive: 0,
        sustained: 0,
        deceleration: 0
      },
      positionSpecificMetrics: {},
      // Phase 5 defaults
      eyeTrackingMetrics: includeEyeTracking ? {
        focusScore: 0,
        scanningEfficiency: 0,
        decisionTimeMs: 0,
        awarenessRating: 0,
        anticipationScore: 0,
        focusPoints: []
      } : undefined,
      pressureResistance: 0,
      technicalConsistency: 0,
      zoneTransitions: {
        defensiveToOffensive: 0,
        offensiveToDefensive: 0,
        effectiveness: 0
      }
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
  
  // Zone transition tracking
  let inDefensiveZone = false;
  let inOffensiveZone = false;
  let defensiveToOffensive = 0;
  let offensiveToDefensive = 0;
  let successfulTransitions = 0;
  let totalTransitions = 0;
  
  // Technical consistency tracking
  let movementVariations: number[] = [];
  let pressureMoments = 0;
  let pressureHandledWell = 0;
  
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
    
    // Track technical consistency
    // Higher speed variations indicate less technical consistency
    if (i > 1 && speeds.length >= 2) {
      const speedVariation = Math.abs(speeds[speeds.length - 1] - speeds[speeds.length - 2]) / speeds[speeds.length - 2];
      movementVariations.push(speedVariation);
      
      // Detect pressure moments (sudden acceleration or deceleration)
      if (Math.abs(accelerations[accelerations.length - 1]) > 5) {
        pressureMoments++;
        
        // Handled well if maintained direction despite acceleration change
        if (directions.length >= 2) {
          const recentAngleDiff = Math.abs(directions[directions.length - 1].angle - directions[directions.length - 2].angle);
          if (recentAngleDiff < Math.PI / 6) { // Less than 30 degrees change
            pressureHandledWell++;
          }
        }
      }
    }
    
    // Track zone transitions (simplified field zones)
    // Assuming y < 240 is defensive zone, y > 240 is offensive zone (for 480 height)
    const wasInDefensiveZone = inDefensiveZone;
    const wasInOffensiveZone = inOffensiveZone;
    
    // Update zone status
    inDefensiveZone = currCenter.y < 240;
    inOffensiveZone = currCenter.y >= 240;
    
    // Count transitions
    if (wasInDefensiveZone && inOffensiveZone) {
      defensiveToOffensive++;
      totalTransitions++;
      
      // Consider successful if speed maintained during transition
      if (speeds.length >= 2 && speeds[speeds.length - 1] >= speeds[speeds.length - 2] * 0.9) {
        successfulTransitions++;
      }
    } else if (wasInOffensiveZone && inDefensiveZone) {
      offensiveToDefensive++;
      totalTransitions++;
      
      // Consider successful if direction maintained during transition
      if (directions.length >= 2) {
        const recentAngleDiff = Math.abs(directions[directions.length - 1].angle - directions[directions.length - 2].angle);
        if (recentAngleDiff < Math.PI / 6) { // Less than 30 degrees change
          successfulTransitions++;
        }
      }
    }
  }
  
  // Calculate max and average speeds
  const maxSpeed = Math.max(...speeds, 0);
  const averageSpeed = speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length || 0;
  
  // Top speed - highest speed maintained for at least 1 second
  // For simulation, we'll use the 95th percentile of all speed values
  const sortedSpeeds = [...speeds].sort((a, b) => b - a);
  const topSpeedIndex = Math.floor(sortedSpeeds.length * 0.05); // Top 5%
  const topSpeed = sortedSpeeds[Math.min(topSpeedIndex, sortedSpeeds.length - 1)] || maxSpeed;
  
  // Calculate max acceleration
  const maxAcceleration = Math.max(...accelerations.map(a => Math.abs(a)), 0);
  
  // Acceleration profile analysis
  const positiveAccelerations = accelerations.filter(a => a > 0);
  const negativeAccelerations = accelerations.filter(a => a < 0);
  
  const accelerationProfile = {
    explosive: positiveAccelerations.length > 0 
      ? Math.max(...positiveAccelerations) / maxAcceleration
      : 0,
    sustained: positiveAccelerations.length > 0
      ? positiveAccelerations.reduce((sum, a) => sum + a, 0) / positiveAccelerations.length / maxAcceleration
      : 0,
    deceleration: negativeAccelerations.length > 0
      ? Math.abs(Math.min(...negativeAccelerations)) / maxAcceleration
      : 0
  };
  
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
  
  // Phase 5: Technical consistency calculation (0-100)
  const avgVariation = movementVariations.length > 0 
    ? movementVariations.reduce((sum, v) => sum + v, 0) / movementVariations.length
    : 0;
  const technicalConsistency = Math.max(0, Math.min(100, 100 - (avgVariation * 100)));
  
  // Phase 5: Pressure resistance calculation (0-100)
  const pressureResistance = pressureMoments > 0
    ? Math.min(100, (pressureHandledWell / pressureMoments) * 100)
    : 50; // Default to 50 if no pressure moments detected
  
  // Phase 5: Zone transitions
  const zoneTransitions = {
    defensiveToOffensive,
    offensiveToDefensive,
    effectiveness: totalTransitions > 0 
      ? (successfulTransitions / totalTransitions) * 100
      : 0
  };
  
  // Phase 5: Generate simulated eye tracking metrics if requested
  const eyeTrackingMetrics = includeEyeTracking ? {
    focusScore: Math.random() * 40 + 60, // 60-100 range
    scanningEfficiency: Math.random() * 50 + 50, // 50-100 range
    decisionTimeMs: Math.random() * 400 + 200, // 200-600ms range
    awarenessRating: Math.random() * 30 + 70, // 70-100 range
    anticipationScore: Math.random() * 40 + 60, // 60-100 range
    focusPoints: Array(10).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 500 + 100 // 100-600ms
    }))
  } : undefined;
  
  // Generate position-specific metrics based on player role
  const positionSpecificMetrics: MovementAnalysisResult['positionSpecificMetrics'] = {};
  
  if (playerRole) {
    // Use position data and movement patterns to estimate position-specific metrics
    if (playerRole === 'defender') {
      positionSpecificMetrics.defenderMetrics = {
        tacklesAttempted: Math.round(directionChanges * 0.3),
        interceptionsAttempted: Math.round(directionChanges * 0.5),
        clearancesAttempted: Math.round(directionChanges * 0.2),
        defensePositioning: Math.round(efficiency)
      };
    } else if (playerRole === 'midfielder') {
      positionSpecificMetrics.midfielderMetrics = {
        passesAttempted: Math.round(directionChanges * 0.7),
        passAccuracy: Math.round(efficiency * 0.8),
        ballControl: Math.round((1 - (speedZones.sprinting + speedZones.running) / 2) * 100),
        visionScore: Math.round(efficiency * 0.9)
      };
    } else if (playerRole === 'attacker') {
      positionSpecificMetrics.attackerMetrics = {
        shotsAttempted: Math.round(speedZones.sprinting * 10),
        shotsOnTarget: Math.round(speedZones.sprinting * 10 * (efficiency / 100)),
        dribbleAttempts: Math.round(directionChanges * 0.8),
        dribbleSuccess: Math.round(directionChanges * 0.8 * (efficiency / 100))
      };
    } else if (playerRole === 'goalkeeper') {
      positionSpecificMetrics.goalkeeperMetrics = {
        savesAttempted: Math.round(directionChanges * 0.4),
        saveSuccess: Math.round(directionChanges * 0.4 * (efficiency / 100)),
        distribution: Math.round(efficiency * 0.7),
        commandOfArea: Math.round((speedZones.walking + speedZones.jogging) * 100)
      };
    }
  }
  
  return {
    totalDistance,
    maxSpeed,
    maxAcceleration,
    averageSpeed,
    directionChanges,
    speedZones,
    movementEfficiency: efficiency,
    positionalHeatmap,
    topSpeed,
    accelerationProfile,
    positionSpecificMetrics,
    // Phase 5 additions
    eyeTrackingMetrics,
    pressureResistance,
    technicalConsistency,
    zoneTransitions
  };
};
