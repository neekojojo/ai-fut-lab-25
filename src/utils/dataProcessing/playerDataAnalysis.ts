
import { DataFrame, Series } from 'pandas-js';
import type { PoseTrackingResult } from '../computerVision/positionTracking';
import { KEYPOINT_NAMES } from './playerAnalysisTypes';
import { calculateAngle, calculateDistance, calculateStandardDeviation } from './mathUtils';
import { DataFrameConverter } from './dataFrameConverter';
import { MetricsCalculator } from './metricsCalculator';
import { StatsCalculator } from './statsCalculator';

// Re-export all types and constants
export { KEYPOINT_NAMES } from './playerAnalysisTypes';
export type { PlayerMetrics, PlayerStats } from './playerAnalysisTypes';

// PlayerDataAnalyzer class that combines all functionality
export class PlayerDataAnalyzer {
  // Convert pose tracking results to a DataFrame for analysis
  public static poseResultsToDataFrame(results: PoseTrackingResult[]): DataFrame {
    return DataFrameConverter.poseResultsToDataFrame(results);
  }
  
  // Calculate player metrics from pose data
  public static calculatePlayerMetrics(poseResults: PoseTrackingResult[]): import('./playerAnalysisTypes').PlayerMetrics {
    return MetricsCalculator.calculatePlayerMetrics(poseResults);
  }
  
  // Calculate overall player statistics
  public static calculatePlayerStats(metrics: import('./playerAnalysisTypes').PlayerMetrics): import('./playerAnalysisTypes').PlayerStats {
    return StatsCalculator.calculatePlayerStats(metrics);
  }
  
  // Re-export utility functions for convenience
  public static calculateAngle = calculateAngle;
  public static calculateDistance = calculateDistance;
  public static calculateStandardDeviation = calculateStandardDeviation;
}
