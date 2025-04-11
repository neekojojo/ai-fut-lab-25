
export interface TrajectoryPrediction {
  nextDirectionChange: {
    likelihood: number;  // 0-1 probability of changing direction
    timeframe: number;   // Estimated timeframe in milliseconds
  };
  potentialHotspots: Array<{
    x: number;
    y: number;
    intensity: number;   // 0-1 intensity
  }>;
  predictedPath: Array<{
    x: number;
    y: number;
    timestamp: number;
  }>;
}

export const predictPlayerTrajectory = (
  positions: Array<{x: number, y: number, timestamp: number}>,
  currentSpeed: number
): TrajectoryPrediction => {
  // This is a simple mock implementation
  // In a real scenario, this would use ML models to predict the trajectory
  
  // Generate next direction change prediction
  const likelihood = Math.random() * 0.6 + 0.2; // Between 0.2 and 0.8
  const timeframe = Math.floor(Math.random() * 2000) + 500; // Between 500-2500ms
  
  // Generate potential hotspots
  const hotspotCount = Math.floor(Math.random() * 3) + 2; // 2-4 hotspots
  const potentialHotspots = Array(hotspotCount).fill(0).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    intensity: Math.random() * 0.7 + 0.3
  }));
  
  // Generate predicted path
  const pathPointCount = Math.floor(Math.random() * 5) + 5; // 5-9 points
  const baseTimestamp = Date.now();
  const predictedPath = Array(pathPointCount).fill(0).map((_, i) => {
    // Very simple linear prediction, would be much more complex in reality
    const lastPos = positions.length > 0 ? positions[positions.length - 1] : { x: 50, y: 50 };
    return {
      x: lastPos.x + (Math.random() * 10 - 5) * i,
      y: lastPos.y + (Math.random() * 10 - 5) * i,
      timestamp: baseTimestamp + i * 500
    };
  });
  
  return {
    nextDirectionChange: {
      likelihood,
      timeframe
    },
    potentialHotspots,
    predictedPath
  };
};
