
// Types related to player movement analysis
export interface PlayerMovement {
  x: number;
  y: number;
  timestamp: number;
  speed: number;
  acceleration?: number;  // Added acceleration property
  direction?: number;     // Added direction property
  isActive?: boolean;     // Added isActive property
  // For chart rendering
  name?: string;
  current?: number;
  previous?: number;
  alternative?: number;
}

export interface PassAttempt {
  from: { x: number; y: number };
  to: { x: number; y: number };
  timestamp: number;
  successful: boolean;
  recipient?: string;
}

export interface PositionHeatmap {
  x: number;
  y: number;
  intensity: number;
}
