
import { toast } from "sonner";
import { 
  PlayerPerformancePredictionRequest, 
  PlayerPerformancePrediction 
} from "../types/googleAutoML";
import { generateMockPrediction } from "../utils/mockDataGenerator";

/**
 * Google AutoML service class for player performance prediction
 */
export class GoogleAutoMLService {
  private apiKey: string | null = null;
  private projectId: string | null = null;
  private endpoint: string | null = null;
  private useRealAPI: boolean = false;

  constructor(apiKey?: string, projectId?: string) {
    this.apiKey = apiKey || null;
    this.projectId = projectId || null;
    
    // Check for environment variables for API key and project ID
    const envApiKey = import.meta.env.VITE_GOOGLE_AUTOML_API_KEY;
    const envProjectId = import.meta.env.VITE_GOOGLE_AUTOML_PROJECT_ID;
    
    if (envApiKey && envProjectId) {
      this.setApiKey(envApiKey.toString());
      this.setProjectId(envProjectId.toString());
      this.useRealAPI = true;
      console.log("Initialized Google AutoML service successfully using environment variables");
    }
  }

  // Set API key
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.updateEndpoint();
  }

  // Set project ID
  public setProjectId(projectId: string): void {
    this.projectId = projectId;
    this.updateEndpoint();
  }
  
  // Update endpoint for API calls
  private updateEndpoint(): void {
    if (this.projectId) {
      // Update this to use the correct version of Vertex AI API
      this.endpoint = `https://automl.googleapis.com/v1/projects/${this.projectId}/models/MODEL_ID:predict`;
      this.useRealAPI = !!(this.apiKey && this.projectId);
    }
  }

  // Predict player performance improvement potential
  public async predictPlayerPotential(
    data: PlayerPerformancePredictionRequest
  ): Promise<PlayerPerformancePrediction> {
    // If no API key or project ID is set, or we're in development mode, use mock response
    if (!this.useRealAPI || !this.apiKey || !this.projectId || !this.endpoint || import.meta.env.DEV) {
      console.log('Using mock Google AutoML response (no API key or in development mode)');
      return generateMockPrediction(data);
    }

    try {
      // In a real implementation, this would call Google AutoML APIs
      // For example, using Vertex AI for predictions
      // This is a placeholder for the actual implementation
      const response = await fetch(this.endpoint, {
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
      return generateMockPrediction(data);
    }
  }
}
