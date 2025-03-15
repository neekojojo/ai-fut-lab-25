
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

// Initialize TensorFlow.js
export const initializeTF = async (): Promise<void> => {
  await tf.ready();
  console.log('TensorFlow.js initialized');
};

// Interface for pose tracking results
export interface PoseTrackingResult {
  poses: poseDetection.Pose[];
  playerCount: number;
  trackingConfidence: number;
  frameIndex: number;
  timestamp: number;
}

// Class to handle player position tracking
export class PlayerTracker {
  private detector: poseDetection.PoseDetector | null = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  // Initialize the pose detector
  private async initialize(): Promise<void> {
    try {
      await initializeTF();
      
      // Create a pose detector using MoveNet model
      this.detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          enableSmoothing: true,
        }
      );
      
      this.isInitialized = true;
      console.log('PlayerTracker initialized successfully');
    } catch (error) {
      console.error('Failed to initialize PlayerTracker:', error);
    }
  }

  // Process a video frame to detect poses
  public async processFrame(
    frame: HTMLCanvasElement | HTMLImageElement | ImageData | HTMLVideoElement,
    frameIndex: number,
    timestamp: number
  ): Promise<PoseTrackingResult | null> {
    if (!this.isInitialized || !this.detector) {
      console.warn('PlayerTracker not initialized yet');
      return null;
    }

    try {
      // Detect poses in the frame
      const poses = await this.detector.estimatePoses(frame);
      
      // Calculate confidence as average of all pose keypoint scores
      let totalConfidence = 0;
      let keypoints = 0;
      
      poses.forEach(pose => {
        pose.keypoints.forEach(keypoint => {
          if (keypoint.score) {
            totalConfidence += keypoint.score;
            keypoints++;
          }
        });
      });
      
      const avgConfidence = keypoints > 0 ? totalConfidence / keypoints : 0;
      
      return {
        poses,
        playerCount: poses.length,
        trackingConfidence: avgConfidence,
        frameIndex,
        timestamp
      };
    } catch (error) {
      console.error('Error processing frame:', error);
      return null;
    }
  }

  // Extract video frames at regular intervals
  public static async extractFrames(
    videoElement: HTMLVideoElement,
    framesPerSecond: number = 5
  ): Promise<{
    frames: HTMLCanvasElement[];
    timestamps: number[];
  }> {
    const frames: HTMLCanvasElement[] = [];
    const timestamps: number[] = [];
    const frameInterval = 1000 / framesPerSecond;
    
    // Create canvas for frame extraction
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not create canvas context');
    }

    // Manually extract frames at specified interval
    for (let time = 0; time < videoElement.duration * 1000; time += frameInterval) {
      // Set video current time
      videoElement.currentTime = time / 1000;
      
      // Wait for the video to update to the new time
      await new Promise(resolve => {
        const onSeeked = () => {
          videoElement.removeEventListener('seeked', onSeeked);
          resolve(null);
        };
        videoElement.addEventListener('seeked', onSeeked);
      });
      
      // Draw current frame to canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Clone the canvas to store the frame
      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = canvas.width;
      frameCanvas.height = canvas.height;
      frameCanvas.getContext('2d')?.drawImage(canvas, 0, 0);
      
      frames.push(frameCanvas);
      timestamps.push(time);
    }
    
    return { frames, timestamps };
  }
}
