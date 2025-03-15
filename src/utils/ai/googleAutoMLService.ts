
import { toast } from "sonner";

// Interface for player performance prediction request
export interface PlayerPerformancePredictionRequest {
  playerStats: {
    avgSpeed: number;
    maxSpeed: number;
    avgAcceleration: number;
    distanceCovered: number;
    balanceScore: number;
    technicalScore: number;
    physicalScore: number;
    movementEfficiency: number;
  };
  position?: string;
  age?: number;
  experience?: number;
}

// Interface for player performance prediction response
export interface PlayerPerformancePrediction {
  predictedImprovementRate: number;
  potentialScore: number;
  recommendedTrainingAreas: string[];
  improvementTimeframe: string;
  confidenceScore: number;
}

// Mock Google AutoML service for development
export class GoogleAutoMLService {
  private apiKey: string | null = null;
  private projectId: string | null = null;

  constructor(apiKey?: string, projectId?: string) {
    this.apiKey = apiKey || null;
    this.projectId = projectId || null;
  }

  // Set API key
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  // Set project ID
  public setProjectId(projectId: string): void {
    this.projectId = projectId;
  }

  // Predict player performance improvement potential
  public async predictPlayerPotential(
    data: PlayerPerformancePredictionRequest
  ): Promise<PlayerPerformancePrediction> {
    // If no API key or project ID is set, or we're in development mode, use mock response
    if (!this.apiKey || !this.projectId || import.meta.env.DEV) {
      console.log('Using mock Google AutoML response (no API key or in development mode)');
      return this.generateMockPrediction(data);
    }

    try {
      // In a real implementation, this would call Google AutoML APIs
      // For example, using Vertex AI for predictions
      // This is a placeholder for the actual implementation
      const endpoint = `https://automl.googleapis.com/v1/projects/${this.projectId}/models/model-id:predict`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: {
            row: {
              values: [
                data.playerStats.avgSpeed,
                data.playerStats.maxSpeed,
                data.playerStats.avgAcceleration,
                data.playerStats.distanceCovered,
                data.playerStats.balanceScore,
                data.playerStats.technicalScore,
                data.playerStats.physicalScore,
                data.playerStats.movementEfficiency,
                data.position || 'unknown',
                data.age || 25,
                data.experience || 5
              ]
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Google AutoML API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Process the AutoML response (this would need to be adjusted based on actual API response format)
      return {
        predictedImprovementRate: parseFloat(result.payload[0].classification.score) * 100,
        potentialScore: parseFloat(result.payload[1].classification.score) * 100,
        recommendedTrainingAreas: [
          result.payload[2].classification.displayName,
          result.payload[3].classification.displayName,
          result.payload[4].classification.displayName
        ],
        improvementTimeframe: result.payload[5].classification.displayName,
        confidenceScore: parseFloat(result.payload[6].classification.score) * 100
      };
    } catch (error) {
      console.error('Error generating prediction with Google AutoML:', error);
      toast.error("Failed to generate prediction. Using fallback data.");
      
      // Fallback to mock prediction in case of error
      return this.generateMockPrediction(data);
    }
  }

  // Generate mock prediction data based on input player stats
  private generateMockPrediction(data: PlayerPerformancePredictionRequest): PlayerPerformancePrediction {
    const { playerStats } = data;
    
    // Calculate potential score based on current stats
    const avgScore = (
      playerStats.balanceScore +
      playerStats.technicalScore +
      playerStats.physicalScore +
      playerStats.movementEfficiency
    ) / 4;
    
    // Calculate potential based on a curve where middle-range players have highest improvement potential
    let potentialScore = 0;
    if (avgScore < 40) {
      // Low skill players have moderate potential (40-60%)
      potentialScore = 40 + (avgScore / 40) * 20;
    } else if (avgScore < 70) {
      // Mid-range players have highest potential (60-80%)
      potentialScore = 60 + ((avgScore - 40) / 30) * 20;
    } else {
      // High skill players have diminishing potential (50-70%)
      potentialScore = 80 - ((avgScore - 70) / 30) * 30;
    }
    
    // Predicted improvement rate is inversely related to current skill level
    const predictedImprovementRate = Math.max(5, 30 - (avgScore / 100) * 25);
    
    // Determine recommended training areas based on lowest scores
    const statsList = [
      { name: "Balance and stability training", score: playerStats.balanceScore },
      { name: "Technical skills development", score: playerStats.technicalScore },
      { name: "Physical conditioning", score: playerStats.physicalScore },
      { name: "Movement efficiency coaching", score: playerStats.movementEfficiency },
      { name: "Speed and acceleration drills", score: (playerStats.maxSpeed + playerStats.avgAcceleration) / 2 }
    ];
    
    // Sort by score ascending and take the three lowest areas
    const recommendedTrainingAreas = statsList
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map(item => item.name);
    
    // Determine improvement timeframe based on potential and current level
    let improvementTimeframe = "3-6 months";
    if (avgScore < 30) {
      improvementTimeframe = "1-3 months";
    } else if (avgScore > 70) {
      improvementTimeframe = "6-12 months";
    }
    
    // Confidence score is higher for players with more consistent metrics
    const stdDev = this.calculateStandardDeviation([
      playerStats.balanceScore,
      playerStats.technicalScore,
      playerStats.physicalScore,
      playerStats.movementEfficiency
    ]);
    
    const confidenceScore = Math.max(50, 100 - stdDev);
    
    return {
      predictedImprovementRate,
      potentialScore,
      recommendedTrainingAreas,
      improvementTimeframe,
      confidenceScore
    };
  }
  
  // Helper function to calculate standard deviation
  private calculateStandardDeviation(values: number[]): number {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquareDiff);
  }
}

// Export a singleton instance
export const googleAutoMLService = new GoogleAutoMLService();
