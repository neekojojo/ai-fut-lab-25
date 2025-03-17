
import { Keypoint, PlayerPosition } from './types';

// Calculate angle between three points (a-b-c)
export const calculateAngle = (a: [number, number], b: [number, number], c: [number, number]): number => {
  const ab = { x: b[0] - a[0], y: b[1] - a[1] };
  const cb = { x: b[0] - c[0], y: b[1] - c[1] };
  
  // Dot product
  const dot = ab.x * cb.x + ab.y * cb.y;
  
  // Magnitudes
  const abMag = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
  const cbMag = Math.sqrt(cb.x * cb.x + cb.y * cb.y);
  
  // Angle in radians
  const angle = Math.acos(dot / (abMag * cbMag));
  
  // Convert to degrees
  return angle * (180 / Math.PI);
};

// Calculate balance score based on shoulder-hip alignment and posture
export const calculateBalanceScore = (positions: PlayerPosition[]): number => {
  // Simple mock implementation
  // In a real app, we would analyze posture stability over time
  return Math.floor(70 + Math.random() * 15);
};

// Calculate movement efficiency based on speed consistency and energy conservation
export const calculateMovementEfficiency = (speeds: number[], accelerations: number[]): number => {
  // Simple mock implementation
  // In a real app, we would analyze energy expenditure and movement smoothness
  return Math.floor(65 + Math.random() * 20);
};
