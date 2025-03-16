
/**
 * Calculate angle between three points (in degrees)
 */
export function calculateAngle(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number]
): number {
  const vec1 = {
    x: p1[0] - p2[0],
    y: p1[1] - p2[1]
  };
  
  const vec2 = {
    x: p3[0] - p2[0],
    y: p3[1] - p2[1]
  };
  
  // Calculate the dot product
  const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
  
  // Calculate the magnitudes
  const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
  const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
  
  // Calculate the angle in radians and convert to degrees
  const angleRad = Math.acos(dotProduct / (mag1 * mag2));
  const angleDeg = angleRad * (180 / Math.PI);
  
  return angleDeg;
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(
  p1: [number, number],
  p2: [number, number]
): number {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate standard deviation of an array of values
 */
export function calculateStandardDeviation(values: number[]): number {
  if (values.length <= 1) return 0;
  
  // Calculate mean
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
  // Calculate sum of squared differences
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((sum, val) => sum + val, 0);
  
  // Calculate variance and standard deviation
  const variance = sumSquaredDiffs / (values.length - 1);
  return Math.sqrt(variance);
}
