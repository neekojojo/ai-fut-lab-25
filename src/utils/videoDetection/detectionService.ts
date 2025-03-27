
import { DetectionResult } from './types';

// Create a deterministic hash function for video files
// This ensures the same video always produces the same analysis result
const hashVideoFile = async (file: File): Promise<string> => {
  // In a real implementation, we would compute an actual hash of the video content
  // For this mock implementation, we'll use the file name and size as a pseudo-hash
  return `${file.name}-${file.size}-${file.lastModified}`;
};

// Set a fixed seed for random number generation based on the video hash
// This ensures deterministic "random" values for the same video
const getSeededRandom = (seed: number): () => number => {
  // Simple LCG (Linear Congruential Generator) implementation
  // for deterministic pseudo-random numbers
  let m = 2**31 - 1;
  let a = 1103515245;
  let c = 12345;
  let state = seed;

  return function() {
    state = (a * state + c) % m;
    return state / m;
  };
};

// Cache for storing previous detection results
const detectionCache = new Map<string, DetectionResult>();

export const detectPeopleInVideo = async (
  videoFile: File
): Promise<DetectionResult> => {
  // Calculate hash for the video file
  const videoHash = await hashVideoFile(videoFile);
  
  // Check if we've already analyzed this exact video file
  if (detectionCache.has(videoHash)) {
    console.log("Using cached result for video analysis");
    return detectionCache.get(videoHash)!;
  }
  
  // In a real implementation, we would:
  // 1. Extract frames from the video using createImageBitmap or video element
  // 2. Use OpenCV/OpenPose to detect people and pose keypoints in each frame
  // 3. Count people and aggregate results
  
  // Generate a deterministic seed based on the video hash
  const hashSum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const seededRandom = getSeededRandom(hashSum);
  
  // Generate deterministic frame results
  const frameCount = Math.floor(seededRandom() * 10) + 20; // Between 20-30 frames
  const frameResults = [];
  const playerPositions = [];
  
  let totalDetections = 0;
  for (let i = 0; i < frameCount; i++) {
    // Create deterministic number of detections for each frame
    const frameDetections = Math.floor(seededRandom() * 7) + 1; // 1-7 people per frame
    totalDetections += frameDetections;
    
    frameResults.push({
      frameNumber: i,
      detections: frameDetections,
      timestamp: i * (1000 / 30) // Assuming 30fps
    });
    
    // Generate mock player positions using OpenPose keypoint format
    // For simplicity we'll focus on the main player (first detection)
    const timestamp = i * (1000 / 30);
    
    // Create a deterministic but varying position for the player over time
    // Using trigonometric functions with seeded offsets
    const seedOffset1 = seededRandom() * 10;
    const seedOffset2 = seededRandom() * 10;
    const centerX = 300 + Math.sin((i + seedOffset1) / 5) * 50;
    const centerY = 200 + Math.cos((i + seedOffset2) / 3) * 30;
    
    // Generate keypoints for the player (17 keypoints from COCO model)
    const keypoints = [
      // Face
      { x: centerX, y: centerY - 50, part: "nose", confidence: 0.9 },
      { x: centerX - 15, y: centerY - 55, part: "left_eye", confidence: 0.85 },
      { x: centerX + 15, y: centerY - 55, part: "right_eye", confidence: 0.85 },
      { x: centerX - 25, y: centerY - 50, part: "left_ear", confidence: 0.7 },
      { x: centerX + 25, y: centerY - 50, part: "right_ear", confidence: 0.7 },
      
      // Upper body
      { x: centerX - 40, y: centerY - 20, part: "left_shoulder", confidence: 0.9 },
      { x: centerX + 40, y: centerY - 20, part: "right_shoulder", confidence: 0.9 },
      { x: centerX - 60 + Math.sin((i + seedOffset1) / 2) * 10, y: centerY, part: "left_elbow", confidence: 0.85 },
      { x: centerX + 60 + Math.sin((i + seedOffset2) / 2) * 10, y: centerY, part: "right_elbow", confidence: 0.85 },
      { x: centerX - 70 + Math.sin((i + seedOffset1) / 1.5) * 15, y: centerY + 20, part: "left_wrist", confidence: 0.8 },
      { x: centerX + 70 + Math.sin((i + seedOffset2) / 1.5) * 15, y: centerY + 20, part: "right_wrist", confidence: 0.8 },
      
      // Lower body
      { x: centerX - 20, y: centerY + 40, part: "left_hip", confidence: 0.9 },
      { x: centerX + 20, y: centerY + 40, part: "right_hip", confidence: 0.9 },
      { x: centerX - 25 + Math.sin((i + seedOffset1) / 3) * 5, y: centerY + 80, part: "left_knee", confidence: 0.85 },
      { x: centerX + 25 + Math.sin((i + seedOffset2) / 3) * 5, y: centerY + 80, part: "right_knee", confidence: 0.85 },
      { x: centerX - 30 + Math.sin((i + seedOffset1) / 4) * 10, y: centerY + 120, part: "left_ankle", confidence: 0.8 },
      { x: centerX + 30 + Math.sin((i + seedOffset2) / 4) * 10, y: centerY + 120, part: "right_ankle", confidence: 0.8 },
    ];
    
    // Add player position data
    playerPositions.push({
      frameNumber: i,
      timestamp,
      keypoints,
      bbox: {
        x: centerX - 80,
        y: centerY - 70,
        width: 160,
        height: 220
      }
    });
  }
  
  // Calculate average count and confidence (deterministically)
  const avgCount = Math.round(totalDetections / frameCount);
  // Ensure confidence is deterministic but realistic (between 0.7 and 0.95)
  const confidence = 0.7 + ((hashSum % 25) / 100);
  
  const result: DetectionResult = {
    count: avgCount,
    confidence: parseFloat(confidence.toFixed(2)),
    frameResults,
    playerPositions
  };
  
  // Cache the result for future use
  detectionCache.set(videoHash, result);
  
  return result;
};
