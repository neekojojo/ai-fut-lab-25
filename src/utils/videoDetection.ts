
// This file is a central export point for all video detection related functionality

// Re-export from the new module structure
// We'll be more selective about what we export from each module to avoid naming conflicts
export {
  detectPeopleInVideo,
  detectWithTensorflow,
  detectPlayersWithYOLO,
  analyzePlayerEyeMovement,
  analyzeEyeMovement
} from './videoDetection/index';

// Re-export types but avoid the conflicting PlayerMovementAnalysis
export type {
  DetectionResult,
  FrameResult,
  PlayerPosition,
  Keypoint,
  BoundingBox,
  YOLOModelSize
} from './videoDetection/types';

export type { EyeTrackingAnalysis, EyeTrackingData } from './videoDetection/eyeballTracking';

// Export from kaggle module but rename conflicting types if needed
export * from './videoDetection/kaggle';
