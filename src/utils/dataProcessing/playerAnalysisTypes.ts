
// Constants
export const KEYPOINT_NAMES = [
  'nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear',
  'left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow',
  'left_wrist', 'right_wrist', 'left_hip', 'right_hip',
  'left_knee', 'right_knee', 'left_ankle', 'right_ankle'
];

// Interfaces for player metrics and statistics
export interface PlayerMetrics {
  speed: number[];          // Speed over time (pixels/frame)
  acceleration: number[];   // Acceleration over time (change in speed)
  positionX: number[];      // X position over time
  positionY: number[];      // Y position over time
  jointAngles: {            // Key joint angles (degrees)
    knees: number[];
    elbows: number[];
    shoulders: number[];
    hips: number[];
  };
  balance: number[];        // Balance score based on pose stability
  timestamps: number[];     // Timestamps for each data point
}

export interface PlayerStats {
  avgSpeed: number;
  maxSpeed: number;
  avgAcceleration: number;
  distanceCovered: number;
  balanceScore: number;
  technicalScore: number;
  physicalScore: number;
  movementEfficiency: number;
}
