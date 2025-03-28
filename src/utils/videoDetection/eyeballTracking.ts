
// Eye tracking analysis module for detecting and analyzing eye movements
// and gaze patterns in sports video analysis

import type { DetectionResult } from './types';

// Eye tracking data for a specific timestamp
export interface EyeTrackingData {
  timestamp: number;
  gazePosX: number; // x-position (0-1 normalized)
  gazePosY: number; // y-position (0-1 normalized)
  pupilDiameter: number; // in millimeters
  blinkDetected: boolean;
  confidenceScore: number; // 0-1
}

// Comprehensive eye tracking analysis result
export interface EyeTrackingAnalysis {
  // Player identification capabilities
  visualFocusScore: number; // 0-100, measure of how well the player maintains focus
  scanningEfficiency: number; // 0-100, measure of how efficiently player scans the field
  decisionTime: number; // average time in milliseconds to make decisions
  
  // Detailed metrics
  focusPoints: {x: number, y: number, duration: number}[]; // main areas of visual focus
  scanningPattern: 'systematic' | 'chaotic' | 'focused' | 'balanced'; // type of scanning behavior
  anticipationScore: number; // 0-100, measure of anticipation ability
  peripheralAwareness: number; // 0-100, measure of peripheral vision usage
  
  // Technical breakdown
  averagePupilDilation: number; // average pupil size during analysis
  blinkRate: number; // blinks per minute
  focusSwitchRate: number; // how often focus changes between areas
  eyeMovementSpeed: number; // speed of saccades in degrees/second
  
  // Raw data
  trackingData: EyeTrackingData[]; // raw eye tracking data points
  analysisConfidence: number; // 0-1, overall confidence in analysis
  analyzedFrameCount: number; // number of frames analyzed
  
  // Advanced insights
  talentPredictionScore?: number; // 0-100, AI prediction of player's potential
  decisionQualityScore?: number; // 0-100, quality of decisions based on gaze behavior
  cognitiveLoadEstimate?: number; // 0-100, estimate of cognitive load during play
}

/**
 * Analyze player eye movement from video footage
 * @param videoFile Video file to analyze
 * @param detectionResult Optional pre-computed detection result
 */
export const analyzeEyeMovement = async (
  videoFile: File,
  detectionResult?: DetectionResult
): Promise<EyeTrackingAnalysis> => {
  // Simulate eye tracking analysis for development purposes
  // In a real implementation, this would use computer vision to track eye movements
  
  console.log(`Analyzing eye movements in video: ${videoFile.name}`);
  
  // Generate simulated eye tracking data
  const frameCount = 100;
  const trackingData: EyeTrackingData[] = [];
  
  // Areas of interest - simulate player looking at these areas
  const areasOfInterest = [
    { x: 0.2, y: 0.5, weight: 0.3 }, // left side of field
    { x: 0.5, y: 0.5, weight: 0.4 }, // center of field
    { x: 0.8, y: 0.5, weight: 0.2 }, // right side of field
    { x: 0.5, y: 0.2, weight: 0.05 }, // top of field
    { x: 0.5, y: 0.8, weight: 0.05 }  // bottom of field
  ];
  
  // Generate simulated eye tracking data
  for (let i = 0; i < frameCount; i++) {
    // Choose an area of interest based on weights
    const rand = Math.random();
    let cumulativeWeight = 0;
    let chosenArea = areasOfInterest[0];
    
    for (const area of areasOfInterest) {
      cumulativeWeight += area.weight;
      if (rand <= cumulativeWeight) {
        chosenArea = area;
        break;
      }
    }
    
    // Add random variation around the chosen area
    const variation = 0.1; // how much random variation to add
    trackingData.push({
      timestamp: i * 33, // ~30fps
      gazePosX: Math.max(0, Math.min(1, chosenArea.x + (Math.random() - 0.5) * variation)),
      gazePosY: Math.max(0, Math.min(1, chosenArea.y + (Math.random() - 0.5) * variation)),
      pupilDiameter: 3 + Math.random() * 2, // 3-5mm range
      blinkDetected: Math.random() < 0.03, // ~3% chance of blink on any frame
      confidenceScore: 0.7 + Math.random() * 0.3 // 0.7-1.0 range
    });
  }
  
  // Calculate focus points (areas where the gaze lingered)
  const focusPoints: {x: number, y: number, duration: number}[] = [];
  const focusThreshold = 0.05; // how close points need to be to be considered the same focus
  let currentFocusPoint = { x: trackingData[0].gazePosX, y: trackingData[0].gazePosY, duration: 33 };
  
  for (let i = 1; i < trackingData.length; i++) {
    const data = trackingData[i];
    const distance = Math.sqrt(
      Math.pow(data.gazePosX - currentFocusPoint.x, 2) + 
      Math.pow(data.gazePosY - currentFocusPoint.y, 2)
    );
    
    if (distance < focusThreshold) {
      // Continue current focus point
      currentFocusPoint.duration += 33;
    } else {
      // Start new focus point
      focusPoints.push({ ...currentFocusPoint });
      currentFocusPoint = { x: data.gazePosX, y: data.gazePosY, duration: 33 };
    }
  }
  focusPoints.push({ ...currentFocusPoint });
  
  // Calculate scanning efficiency based on coverage and revisits
  // Good scanning covers the field well without excessive revisits
  const gridSize = 5;
  const coverageGrid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
  let revisits = 0;
  
  trackingData.forEach(data => {
    const gridX = Math.min(gridSize - 1, Math.floor(data.gazePosX * gridSize));
    const gridY = Math.min(gridSize - 1, Math.floor(data.gazePosY * gridSize));
    
    if (coverageGrid[gridY][gridX] > 0) {
      revisits++;
    }
    coverageGrid[gridY][gridX]++;
  });
  
  const coveredCells = coverageGrid.flat().filter(count => count > 0).length;
  const maxCoverage = gridSize * gridSize;
  const coverageScore = (coveredCells / maxCoverage) * 100;
  
  // Calculate revisit efficiency (some revisits are good, too many are not)
  const optimalRevisitRate = trackingData.length / maxCoverage * 2; // expected to revisit each cell ~2 times
  const revisitEfficiency = Math.max(0, 100 - Math.abs(revisits - optimalRevisitRate) / optimalRevisitRate * 50);
  
  // Calculate scanning pattern type
  const cellVariation = calculateVariation(coverageGrid.flat());
  let scanningPattern: 'systematic' | 'chaotic' | 'focused' | 'balanced';
  
  if (coveredCells < maxCoverage * 0.5) {
    scanningPattern = 'focused';
  } else if (cellVariation > 1.5) {
    scanningPattern = 'chaotic';
  } else if (cellVariation < 0.7) {
    scanningPattern = 'systematic';
  } else {
    scanningPattern = 'balanced';
  }
  
  // Calculate additional metrics
  const blinkCount = trackingData.filter(data => data.blinkDetected).length;
  const blinkRate = (blinkCount / (frameCount / 30)) * 60; // blinks per minute
  
  const scanningEfficiency = (coverageScore * 0.6 + revisitEfficiency * 0.4);
  
  // Calculate focus metrics
  const averageFocusDuration = focusPoints.reduce((sum, point) => sum + point.duration, 0) / focusPoints.length;
  const focusScore = Math.min(100, (averageFocusDuration / 300) * 100); // normalize against 300ms as ideal
  
  // Calculate decision time
  // (time between significant eye movement and change in player movement)
  const decisionTime = 300 + Math.random() * 200; // 300-500ms range (simulated)
  
  // Calculate anticipation score
  // (how well player looks at areas before action happens there)
  const anticipationScore = 70 + Math.random() * 20; // 70-90 range (simulated)
  
  return {
    visualFocusScore: Math.round(focusScore),
    scanningEfficiency: Math.round(scanningEfficiency),
    decisionTime,
    
    focusPoints: focusPoints.map(point => ({
      x: point.x * 100, // convert to percentage
      y: point.y * 100, // convert to percentage
      duration: point.duration
    })),
    scanningPattern,
    anticipationScore,
    peripheralAwareness: Math.round(65 + Math.random() * 25), // 65-90 range (simulated)
    
    averagePupilDilation: trackingData.reduce((sum, data) => sum + data.pupilDiameter, 0) / trackingData.length,
    blinkRate,
    focusSwitchRate: focusPoints.length / (frameCount / 30), // switches per second
    eyeMovementSpeed: 300 + Math.random() * 200, // 300-500 deg/sec (simulated)
    
    trackingData,
    analysisConfidence: 0.85 + Math.random() * 0.1, // 0.85-0.95 range
    analyzedFrameCount: frameCount,
    
    // AI talent prediction based on eye movement patterns
    talentPredictionScore: Math.round(75 + Math.random() * 20), // 75-95 range
    decisionQualityScore: Math.round(70 + Math.random() * 25), // 70-95 range
    cognitiveLoadEstimate: Math.round(40 + Math.random() * 30) // 40-70 range
  };
};

// Helper function to calculate statistical variation (standard deviation / mean)
function calculateVariation(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  if (mean === 0) return 0;
  
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance) / mean;
}
