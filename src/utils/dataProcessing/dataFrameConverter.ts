
import { DataFrame } from 'pandas-js';
import type { PoseTrackingResult } from '../computerVision/positionTracking';
import { KEYPOINT_NAMES } from './playerAnalysisTypes';

export class DataFrameConverter {
  /**
   * Convert pose tracking results to a DataFrame for analysis
   */
  public static poseResultsToDataFrame(results: PoseTrackingResult[]): DataFrame {
    // Prepare data arrays
    const data: any = {
      frameIndex: [],
      timestamp: [],
      playerCount: [],
      confidence: []
    };
    
    // Add keypoint columns for each keypoint
    KEYPOINT_NAMES.forEach(name => {
      data[`${name}_x`] = [];
      data[`${name}_y`] = [];
      data[`${name}_score`] = [];
    });
    
    // Fill data arrays with pose information
    results.forEach(result => {
      data.frameIndex.push(result.frameIndex);
      data.timestamp.push(result.timestamp);
      data.playerCount.push(result.playerCount);
      data.confidence.push(result.trackingConfidence);
      
      // If we have at least one pose, use the first one (main player)
      if (result.poses.length > 0) {
        const mainPose = result.poses[0];
        
        // Map keypoints to their respective columns
        mainPose.keypoints.forEach((keypoint, index) => {
          if (index < KEYPOINT_NAMES.length) {
            const name = KEYPOINT_NAMES[index];
            data[`${name}_x`].push(keypoint.x);
            data[`${name}_y`].push(keypoint.y);
            data[`${name}_score`].push(keypoint.score || 0);
          }
        });
      } else {
        // Fill with NaN if no pose is detected
        KEYPOINT_NAMES.forEach(name => {
          data[`${name}_x`].push(NaN);
          data[`${name}_y`].push(NaN);
          data[`${name}_score`].push(0);
        });
      }
    });
    
    return new DataFrame(data);
  }
}
