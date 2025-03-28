
import { detectPeopleInVideo as detectWithTensorflow } from './detectionService';
import { detectPlayersWithYOLO } from './yoloDetectionService';
import { analyzeEyeMovement, type EyeTrackingAnalysis } from './eyeballTracking';
import type { DetectionResult } from './types';

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

// Also export individual methods for direct access
export { detectWithTensorflow, detectPlayersWithYOLO, analyzeEyeMovement };

// Re-export types
export * from './types';
export type { EyeTrackingAnalysis, EyeTrackingData } from './eyeballTracking';
