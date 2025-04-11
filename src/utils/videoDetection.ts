// Import required functions and types
import { extractFrames } from './videoDetection/frameExtraction';
import { analyzeMovementPatterns } from './videoDetection/movementAnalysis';
import { identifyPlayer } from './videoDetection/playerIdentification';
import { calculatePlayerMetrics } from './videoDetection/calculationUtils';
import { processKaggleData } from './videoDetection/kaggleDataImport';
import { detectPeopleUsingYolo } from './videoDetection/yoloDetectionService';

/**
 * Detects people in video using YOLO model
 * This was missing from the file
 */
export const detectPeopleInVideo = async (videoFile: File) => {
  console.log("Detecting people in video using YOLO...");
  return await detectPeopleUsingYolo(videoFile);
};
