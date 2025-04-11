
import { analyzeEyeMovement } from './eyeballTracking';

/**
 * Analyze player eye movement from video
 */
export const analyzePlayerEyeMovement = async (videoFile: File) => {
  // Mock implementation that delegates to the analyzeEyeMovement function
  return await analyzeEyeMovement(videoFile);
};
