
import { detectPeopleInVideo as detectWithTensorflow } from './detectionService';
import { detectPlayersWithYOLO } from './yoloDetectionService';
import { analyzeEyeMovement, type EyeTrackingAnalysis } from './eyeballTracking';
import type { DetectionResult } from './types';
import { identifyPlayersInDetectionResult } from './playerIdentifier';
import { IdentifiedPlayer, IdentifiedTeam } from './playerIdentification';
import { analyzePlayerMovements, MovementAnalysisResult } from './movementAnalysis';
import { analyzeEnhancedPlayerMovements, EnhancedMovementAnalysis } from './movementAnalysisEnhanced';
import { predictPlayerTrajectory, TrajectoryPrediction } from './trajectoryPrediction';
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
  movementAnalysis: MovementAnalysisResult;
  enhancedMovement: EnhancedMovementAnalysis;
  trajectoryPrediction: TrajectoryPrediction;
  performanceMetrics: PerformanceMetrics;
  eyeTracking: EyeTrackingAnalysis;
}> => {
  // Update progress
  progressCallback?.(5);
  
  // 1. Detect players if results not provided
  const detection = detectionResult || await detectPeopleInVideo(
    videoFile,
    'yolo',
    'm',
    (progress) => progressCallback?.(5 + progress * 0.2)
  );
  
  progressCallback?.(25);
  
  // 2. Extract a high-resolution frame sequence for detailed analysis
  // Extract 10 seconds of video at 10fps starting at 5 seconds in
  const frameSequence = await extractFrameSequence(
    videoFile,
    5,    // start time (seconds)
    10,   // duration (seconds)
    10    // frames per second
  ).catch(() => []);
  
  progressCallback?.(40);
  
  // 3. Analyze basic player movements
  const movementAnalysis = await analyzePlayerMovements(detection.playerPositions);
  
  progressCallback?.(50);
  
  // 4. Perform enhanced movement analysis
  const enhancedMovement = await analyzeEnhancedPlayerMovements(detection.playerPositions);
  
  progressCallback?.(60);
  
  // 5. Predict player trajectory
  const trajectoryPrediction = predictPlayerTrajectory(detection.playerPositions);
  
  progressCallback?.(70);
  
  // 6. Analyze eye tracking
  const eyeTracking = await analyzeEyeMovement(videoFile, detection);
  
  progressCallback?.(85);
  
  // 7. Calculate performance metrics
  const performanceMetrics = PerformanceAnalyzer.analyzeTechnicalPerformance(
    enhancedMovement,
    detection.playerPositions
  );
  
  progressCallback?.(100);
  
  return {
    detection,
    movementAnalysis,
    enhancedMovement,
    trajectoryPrediction,
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
  analyzeEnhancedPlayerMovements,
  predictPlayerTrajectory,
  PerformanceAnalyzer
};

// Re-export types
export * from './types';
export type { EyeTrackingAnalysis, EyeTrackingData } from './eyeballTracking';
export type { MovementAnalysisResult } from './movementAnalysis';
export type { EnhancedMovementAnalysis } from './movementAnalysisEnhanced';
export type { TrajectoryPrediction } from './trajectoryPrediction';
export type { PerformanceMetrics } from '../performance/PerformanceAnalyzer';
