
import { detectPeopleInVideo as detectWithTensorflow } from './detectionService';
import { detectPlayersWithYOLO } from './yoloDetectionService';
import { analyzeEyeMovement, type EyeTrackingAnalysis } from './eyeballTracking';
import type { DetectionResult } from './types';
import { identifyPlayersInDetectionResult } from './playerIdentifier';
import { IdentifiedPlayer, IdentifiedTeam } from './playerIdentification';
import { analyzePlayerMovements } from './movementAnalysis';
import { extractFrameSequence } from './frameExtraction';
import { PerformanceAnalyzer, PerformanceMetrics } from '../performance/PerformanceAnalyzer';

// Export a combined detection function
export const detectPeopleInVideo = async (
  videoFile: File,
  method: 'tensorflow' | 'yolo' = 'tensorflow',
  yoloModelSize?: 'n' | 's' | 'm' | 'l' | 'x',
  progressCallback?: (progress: number) => void
): Promise<DetectionResult> => {
  if (method === 'yolo') {
    // Use YOLO detection
    return detectPlayersWithYOLO(videoFile, yoloModelSize || 'm', progressCallback);
  } else {
    // Use default TensorFlow detection
    return detectWithTensorflow(videoFile);
  }
};

// Function to analyze player eye movement
export const analyzePlayerEyeMovement = async (
  videoFile: File,
  detectionResult?: DetectionResult
): Promise<EyeTrackingAnalysis> => {
  return analyzeEyeMovement(videoFile, detectionResult);
};

// Function to identify players from detection results
export const identifyPlayersFromVideo = async (
  videoFile: File, 
  detectionResult?: DetectionResult,
  progressCallback?: (progress: number) => void
): Promise<{
  players: IdentifiedPlayer[],
  teams: IdentifiedTeam[]
}> => {
  // If detection result not provided, perform detection first
  const result = detectionResult || await detectPeopleInVideo(
    videoFile,
    'yolo', // Use YOLO for better accuracy in player detection
    'm',
    progressCallback
  );
  
  // Identify players from the detection result
  return identifyPlayersInDetectionResult(result, videoFile);
};

// New comprehensive function for advanced player performance analysis
export const analyzePlayerPerformance = async (
  videoFile: File,
  detectionResult?: DetectionResult,
  progressCallback?: (progress: number) => void
): Promise<{
  detection: DetectionResult;
  movementAnalysis: Awaited<ReturnType<typeof analyzePlayerMovements>>;
  performanceMetrics: PerformanceMetrics;
  eyeTracking: EyeTrackingAnalysis;
}> => {
  // Update progress
  progressCallback?.(10);
  
  // 1. Detect players if results not provided
  const detection = detectionResult || await detectPeopleInVideo(
    videoFile,
    'yolo',
    'm',
    (progress) => progressCallback?.(10 + progress * 0.3)
  );
  
  progressCallback?.(40);
  
  // 2. Extract a high-resolution frame sequence for detailed analysis
  // Extract 10 seconds of video at 10fps starting at 5 seconds in
  const frameSequence = await extractFrameSequence(
    videoFile,
    5,    // start time (seconds)
    10,   // duration (seconds)
    10    // frames per second
  ).catch(() => []);
  
  progressCallback?.(60);
  
  // 3. Analyze player movements
  const movementAnalysis = await analyzePlayerMovements(detection.playerPositions);
  
  progressCallback?.(75);
  
  // 4. Analyze eye tracking
  const eyeTracking = await analyzeEyeMovement(videoFile, detection);
  
  progressCallback?.(85);
  
  // 5. Calculate performance metrics
  const performanceMetrics = PerformanceAnalyzer.analyzeTechnicalPerformance(
    movementAnalysis,
    detection.playerPositions
  );
  
  progressCallback?.(100);
  
  return {
    detection,
    movementAnalysis,
    performanceMetrics,
    eyeTracking
  };
};

// Also export individual methods for direct access
export { 
  detectWithTensorflow, 
  detectPlayersWithYOLO, 
  analyzeEyeMovement,
  analyzePlayerMovements,
  PerformanceAnalyzer
};

// Re-export types
export * from './types';
export type { EyeTrackingAnalysis, EyeTrackingData } from './eyeballTracking';
export type { PerformanceMetrics } from '../performance/PerformanceAnalyzer';
