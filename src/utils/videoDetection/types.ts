
// Type definitions for video detection service

export interface DetectionResult {
  count: number;
  confidence: number;
  frameResults: FrameResult[];
  playerPositions?: PlayerPosition[];
}

export interface FrameResult {
  frameNumber: number;
  detections: number;
  timestamp: number;
}

export interface PlayerPosition {
  frameNumber: number;
  timestamp: number;
  keypoints: Keypoint[];
  bbox: BoundingBox;
}

export interface Keypoint {
  x: number;
  y: number;
  part: string;
  confidence: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PlayerMovementAnalysis {
  speeds: number[];
  avgSpeed: number;
  maxSpeed: number;
  accelerations: number[];
  avgAcceleration: number;
  totalDistance: number;
  jointAngles: {
    knee: number[];
    hip: number[];
  };
  balanceScore: number;
  movementEfficiency: number;
}
