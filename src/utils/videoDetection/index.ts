
import { detectPeopleInVideo as detectWithTensorflow } from './detectionService';
import { detectPlayersWithYOLO } from './yoloDetectionService';
import { analyzeEyeMovement, type EyeTrackingAnalysis } from './eyeballTracking';
import type { DetectionResult } from './types';
import { identifyPlayersInDetectionResult } from './playerIdentifier';
import { IdentifiedPlayer, IdentifiedTeam } from './playerIdentification';

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

// New function to identify players from detection results
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

// Also export individual methods for direct access
export { detectWithTensorflow, detectPlayersWithYOLO, analyzeEyeMovement };

// Re-export types
export * from './types';
export type { EyeTrackingAnalysis, EyeTrackingData } from './eyeballTracking';
