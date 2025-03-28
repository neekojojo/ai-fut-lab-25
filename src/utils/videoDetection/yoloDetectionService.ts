
import { DetectionResult, PlayerPosition, FrameResult } from './types';
import { calculateDistance } from './calculationUtils';

// Dynamically import ultralytics to ensure it only loads on client-side
// This prevents SSR issues with the package

// Mock implementation for calculateDistanceAndSpeed since it doesn't exist
const calculateDistanceAndSpeed = (positions: PlayerPosition[]): PlayerPosition[] => {
  // Simple mock implementation - in a real app, you would calculate actual speeds
  return positions;
};

// Lazy loading of YOLO
const loadYOLO = async () => {
  try {
    // Dynamic import for ultralytics
    const ultralytics = await import('ultralytics');
    return ultralytics.YOLO;
  } catch (error) {
    console.error('Error loading YOLO:', error);
    throw new Error('Failed to load YOLO model');
  }
};

export const detectPlayersWithYOLO = async (
  videoFile: File,
  modelSize: 'n' | 's' | 'm' | 'l' | 'x' = 'm',
  progressCallback?: (progress: number) => void
): Promise<DetectionResult> => {
  try {
    // Load YOLO dynamically
    const YOLO = await loadYOLO();
    
    // Set up the model
    const model = await YOLO(`yolov8${modelSize}.pt`);
    
    // Convert video file to a format YOLO can process
    const videoURL = URL.createObjectURL(videoFile);
    
    // Track progress
    let lastReportedProgress = 0;
    
    // Process the video
    const results = await model.predict(videoURL, {
      verbose: false,
      classes: [0], // 0 is the class for 'person'
      iou: 0.45,    // Intersection over union threshold
      conf: 0.25,   // Confidence threshold
      progress_callback: (progress: number) => {
        const roundedProgress = Math.round(progress * 100);
        if (progressCallback && roundedProgress > lastReportedProgress) {
          progressCallback(roundedProgress);
          lastReportedProgress = roundedProgress;
        }
      }
    });
    
    // Clean up
    URL.revokeObjectURL(videoURL);
    
    // Process results
    const frameResults: FrameResult[] = [];
    const playerPositions: PlayerPosition[] = [];
    
    let totalPeople = 0;
    let frameCount = 0;
    
    results.forEach((result: any, index: number) => {
      const timestamp = result.time || index * 33; // Assuming 30fps if time not provided
      const boxes = result.boxes || [];
      const people = boxes.length;
      
      totalPeople += people;
      frameCount++;
      
      // Create frame result
      frameResults.push({
        frameNumber: index,
        timestamp,
        detections: people
      });
      
      // Process player positions if people were detected
      if (people > 0) {
        boxes.forEach((box: any, playerIndex: number) => {
          const [x1, y1, x2, y2] = box.xyxy[0];
          const confidence = box.conf[0];
          
          // Calculate center points
          const centerX = (x1 + x2) / 2;
          const centerY = (y1 + y2) / 2;
          
          // Create mock keypoints based on bounding box
          const keypoints = [
            { x: centerX, y: y1 + (y2 - y1) * 0.1, part: "nose", confidence },
            { x: centerX - 10, y: y1 + (y2 - y1) * 0.1, part: "left_eye", confidence },
            { x: centerX + 10, y: y1 + (y2 - y1) * 0.1, part: "right_eye", confidence },
            { x: centerX - 15, y: y1 + (y2 - y1) * 0.12, part: "left_ear", confidence },
            { x: centerX + 15, y: y1 + (y2 - y1) * 0.12, part: "right_ear", confidence },
            { x: centerX - 20, y: y1 + (y2 - y1) * 0.3, part: "left_shoulder", confidence },
            { x: centerX + 20, y: y1 + (y2 - y1) * 0.3, part: "right_shoulder", confidence },
            { x: centerX - 25, y: y1 + (y2 - y1) * 0.5, part: "left_elbow", confidence },
            { x: centerX + 25, y: y1 + (y2 - y1) * 0.5, part: "right_elbow", confidence },
            { x: centerX - 30, y: y1 + (y2 - y1) * 0.65, part: "left_wrist", confidence },
            { x: centerX + 30, y: y1 + (y2 - y1) * 0.65, part: "right_wrist", confidence },
            { x: centerX - 15, y: y1 + (y2 - y1) * 0.6, part: "left_hip", confidence },
            { x: centerX + 15, y: y1 + (y2 - y1) * 0.6, part: "right_hip", confidence },
            { x: centerX - 20, y: y1 + (y2 - y1) * 0.8, part: "left_knee", confidence },
            { x: centerX + 20, y: y1 + (y2 - y1) * 0.8, part: "right_knee", confidence },
            { x: centerX - 20, y: y2 - 10, part: "left_ankle", confidence },
            { x: centerX + 20, y: y2 - 10, part: "right_ankle", confidence },
          ];
          
          playerPositions.push({
            frameNumber: index,
            timestamp,
            bbox: { x: x1, y: y1, width: x2 - x1, height: y2 - y1 },
            keypoints,
            confidence
          });
        });
      }
    });
    
    // Calculate average people count
    const avgPeopleCount = totalPeople / (frameCount || 1);
    
    // Add speed and distance data to player positions
    const enhancedPlayerPositions = calculateDistanceAndSpeed(playerPositions);
    
    return {
      count: Math.round(avgPeopleCount),
      confidence: 0.85, // Using a fixed confidence for YOLO
      frameResults,
      playerPositions: enhancedPlayerPositions
    };
  } catch (error) {
    console.error('Error in YOLO detection:', error);
    throw new Error(`YOLO detection failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};
