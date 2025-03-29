
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

// Global cache for storing previous detection results
// This ensures the exact same results for the same video
const detectionCache = new Map<string, DetectionResult>();

// Optimized version for faster performance and consistent results
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
  
  // Generate a deterministic seed based on the video hash
  const hashSum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const seededRandom = getSeededRandom(hashSum);
  
  // Generate deterministic frame results
  const frameCount = 12; // Fixed frame count for consistency
  const frameResults = [];
  const playerPositions = [];
  
  let totalDetections = 0;
  for (let i = 0; i < frameCount; i++) {
    // Create deterministic number of detections for each frame
    const frameDetections = Math.floor(seededRandom() * 5) + 3; // 3-7 people per frame
    totalDetections += frameDetections;
    
    frameResults.push({
      frameNumber: i,
      detections: frameDetections,
      timestamp: i * (1000 / 30) // Assuming 30fps
    });
    
    // Generate deterministic player positions - only for key frames
    if (i % 3 === 0) { // Only every 3rd frame
      const timestamp = i * (1000 / 30);
      
      // Create a deterministic but varying position for the player over time
      const seedOffset1 = hashSum % 10;
      const seedOffset2 = (hashSum / 10) % 10;
      const centerX = 300 + Math.sin((i + seedOffset1) / 5) * 50;
      const centerY = 200 + Math.cos((i + seedOffset2) / 3) * 30;
      
      // Generate deterministic keypoints
      const keypoints = [
        // Face
        { x: centerX, y: centerY - 50, part: "nose", confidence: 0.9 },
        { x: centerX - 15, y: centerY - 55, part: "left_eye", confidence: 0.85 },
        { x: centerX + 15, y: centerY - 55, part: "right_eye", confidence: 0.85 },
        
        // Upper body
        { x: centerX - 40, y: centerY - 20, part: "left_shoulder", confidence: 0.9 },
        { x: centerX + 40, y: centerY - 20, part: "right_shoulder", confidence: 0.9 },
        { x: centerX - 60, y: centerY, part: "left_elbow", confidence: 0.85 },
        { x: centerX + 60, y: centerY, part: "right_elbow", confidence: 0.85 },
        
        // Lower body
        { x: centerX - 20, y: centerY + 40, part: "left_hip", confidence: 0.9 },
        { x: centerX + 20, y: centerY + 40, part: "right_hip", confidence: 0.9 },
        { x: centerX - 25, y: centerY + 80, part: "left_knee", confidence: 0.85 },
        { x: centerX + 25, y: centerY + 80, part: "right_knee", confidence: 0.85 },
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
  }
  
  // Calculate fully deterministic count and confidence
  const avgCount = Math.round(totalDetections / frameCount);
  // Ensure confidence is completely deterministic
  const confidence = 0.7 + ((hashSum % 20) / 100);
  
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
