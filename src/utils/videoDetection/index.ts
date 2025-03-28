
import { detectPeopleInVideo as detectWithTensorflow } from './detectionService';
import { detectPlayersWithYOLO } from './yoloDetectionService';
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
    // Fix: Pass the progressCallback to the TensorFlow detector
    return detectWithTensorflow(videoFile, progressCallback);
  }
};

// Also export individual methods for direct access
export { detectWithTensorflow, detectPlayersWithYOLO };

// Re-export types
export * from './types';
