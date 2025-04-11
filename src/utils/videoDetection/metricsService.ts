
import { PlayerPosition } from './types';
import { calculateDistanceAndSpeed, calculateBalanceScore } from './calculationUtils';

export const calculatePlayerMetrics = (positions: PlayerPosition[]) => {
  console.log("Calculating player metrics");
  const enhancedPositions = calculateDistanceAndSpeed(positions);
  
  // Calculate average speed, max speed, etc.
  const speeds = enhancedPositions.map(pos => pos.speed || 0).filter(s => s > 0);
  const avgSpeed = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
  const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;
  
  return {
    avgSpeed,
    maxSpeed,
    balanceScore: calculateBalanceScore(positions),
    agility: 70 + Math.random() * 20 // Random value between 70-90
  };
};
