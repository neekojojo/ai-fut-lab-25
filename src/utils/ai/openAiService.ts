
import OpenAI from "openai";
import { toast } from "sonner";

// Define interface for player analytics data
interface PlayerAnalyticsData {
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
  previousAnalysis?: any;
}

// Define interface for OpenAI analysis response
export interface OpenAIAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  technicalInsight: string;
  physicalInsight: string;
}

// Interface for DALL-E image generation request
export interface GenerateImageRequest {
  prompt: string;
  size?: "1024x1024" | "1792x1024" | "1024x1792";
  quality?: "standard" | "hd";
  style?: "natural" | "vivid";
  n?: number;
}

// Interface for DALL-E image generation response
export interface GeneratedImage {
  url: string;
  revisedPrompt?: string;
}

// Create OpenAI service to handle API interactions
export class OpenAIService {
  private apiKey: string | null = null;
  private openai: OpenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.setApiKey(apiKey);
    }
  }

  // Set API key
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  // Generate analysis of player performance
  public async generatePlayerAnalysis(
    data: PlayerAnalyticsData
  ): Promise<OpenAIAnalysis> {
    // If no API key is set, or we're in development mode, use mock response
    if (!this.apiKey || !this.openai || import.meta.env.DEV) {
      console.log('Using mock OpenAI response (no API key or in development mode)');
      return this.generateMockAnalysis(data);
    }

    try {
      // Create a prompt for the OpenAI API
      const prompt = this.createAnalysisPrompt(data);

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional football/soccer analyst with expertise in performance analytics. Your task is to analyze player performance data and provide insightful feedback."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1200,
        response_format: { type: "json_object" }
      });

      // Parse the response
      const content = response.choices[0]?.message.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      const parsedResponse = JSON.parse(content) as OpenAIAnalysis;
      return parsedResponse;
    } catch (error) {
      console.error('Error generating analysis with OpenAI:', error);
      toast.error("Failed to generate analysis. Using fallback data.");
      
      // Fallback to mock analysis in case of error
      return this.generateMockAnalysis(data);
    }
  }

  // Generate images using DALL-E 3
  public async generateImage(request: GenerateImageRequest): Promise<GeneratedImage[]> {
    // If no API key is set, or we're in development mode, use mock response
    if (!this.apiKey || !this.openai || import.meta.env.DEV) {
      console.log('Using mock DALL-E response (no API key or in development mode)');
      return this.generateMockImages(request);
    }

    try {
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: request.prompt,
        n: request.n || 1,
        size: request.size || "1024x1024",
        quality: request.quality || "standard",
        style: request.style || "vivid",
      });

      return response.data.map(image => ({
        url: image.url!,
        revisedPrompt: image.revised_prompt
      }));
    } catch (error) {
      console.error('Error generating image with DALL-E:', error);
      toast.error("Failed to generate image. Using fallback images.");
      
      // Fallback to mock images in case of error
      return this.generateMockImages(request);
    }
  }

  // Create a prompt for the OpenAI API based on player data
  private createAnalysisPrompt(data: PlayerAnalyticsData): string {
    const { playerStats, position, previousAnalysis } = data;
    
    let prompt = `Analyze this football/soccer player's performance data and generate insights.
    
Player Analytics:
- Average Speed: ${playerStats.avgSpeed.toFixed(2)} pixels/second
- Maximum Speed: ${playerStats.maxSpeed.toFixed(2)} pixels/second
- Average Acceleration: ${playerStats.avgAcceleration.toFixed(2)} pixels/second²
- Distance Covered: ${playerStats.distanceCovered.toFixed(2)} pixels
- Balance Score: ${playerStats.balanceScore.toFixed(2)}/100
- Technical Score: ${playerStats.technicalScore.toFixed(2)}/100
- Physical Score: ${playerStats.physicalScore.toFixed(2)}/100
- Movement Efficiency: ${playerStats.movementEfficiency.toFixed(2)}/100
`;

    if (position) {
      prompt += `\nPlayer Position: ${position}`;
    }

    if (previousAnalysis) {
      prompt += `\n\nPrevious Analysis Overview:
- Previous Technical Score: ${previousAnalysis.technicalScore || 'N/A'}
- Previous Physical Score: ${previousAnalysis.physicalScore || 'N/A'}
- Previous Balance Score: ${previousAnalysis.balanceScore || 'N/A'}
`;
    }

    prompt += `\nPlease provide a detailed analysis in JSON format with the following structure:
{
  "summary": "A comprehensive overview of the player's performance",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "recommendations": ["Specific training recommendation 1", "Recommendation 2", "Recommendation 3"],
  "technicalInsight": "Detailed insight about technical aspects of the performance",
  "physicalInsight": "Detailed insight about physical aspects of the performance"
}`;

    return prompt;
  }

  // Generate mock images for development without API key
  private generateMockImages(request: GenerateImageRequest): GeneratedImage[] {
    // Create placeholder image URLs based on the prompt
    const images: GeneratedImage[] = [];
    const count = request.n || 1;
    
    for (let i = 0; i < count; i++) {
      // Generate a random placeholder image related to sports
      const imageTypes = [
        "sports/football/training",
        "sports/football/player",
        "sports/football/action",
        "sports/football/technique",
        "sports/football/analysis"
      ];
      
      const type = imageTypes[Math.floor(Math.random() * imageTypes.length)];
      const width = request.size?.split('x')[0] || "1024";
      const height = request.size?.split('x')[1] || "1024";
      
      // Use placeholder.com for mock images
      const url = `https://placehold.co/${width}x${height}/png?text=${encodeURIComponent(request.prompt.substring(0, 20))}`;
      
      images.push({
        url,
        revisedPrompt: `Generated visualization for: ${request.prompt}`
      });
    }
    
    return images;
  }

  // Generate a mock analysis when OpenAI API is not available
  private generateMockAnalysis(data: PlayerAnalyticsData): OpenAIAnalysis {
    const { playerStats } = data;
    
    // Determine player level based on scores
    const averageScore = (playerStats.technicalScore + playerStats.physicalScore + playerStats.balanceScore) / 3;
    
    let level = "beginner";
    if (averageScore > 80) {
      level = "professional";
    } else if (averageScore > 60) {
      level = "advanced";
    } else if (averageScore > 40) {
      level = "intermediate";
    }
    
    // Generate strengths based on highest scores
    const strengths = [];
    if (playerStats.technicalScore > 70) strengths.push("Excellent technical skills and ball control");
    if (playerStats.balanceScore > 70) strengths.push("Great balance and stability during movement");
    if (playerStats.physicalScore > 70) strengths.push("Strong physical attributes and speed");
    if (playerStats.movementEfficiency > 70) strengths.push("Efficient movement patterns and energy conservation");
    if (playerStats.maxSpeed > 150) strengths.push("Impressive top speed and acceleration capability");
    
    // Generate weaknesses based on lowest scores
    const weaknesses = [];
    if (playerStats.technicalScore < 50) weaknesses.push("Needs improvement in technical execution and ball control");
    if (playerStats.balanceScore < 50) weaknesses.push("Struggles with balance and stability during quick movements");
    if (playerStats.physicalScore < 50) weaknesses.push("Physical attributes and speed need development");
    if (playerStats.movementEfficiency < 50) weaknesses.push("Movement patterns are inefficient, wasting energy");
    if (playerStats.maxSpeed < 100) weaknesses.push("Below-average top speed affecting ability to create space");
    
    // Fill in with generic items if needed
    if (strengths.length === 0) strengths.push("Balanced overall performance", "Consistent movement patterns");
    if (weaknesses.length === 0) weaknesses.push("No major weaknesses identified", "Could improve overall efficiency");
    
    // Generate recommendations
    const recommendations = [];
    if (playerStats.technicalScore < 70) recommendations.push("Focus on technical drills to improve ball control and execution");
    if (playerStats.balanceScore < 70) recommendations.push("Incorporate balance exercises into training routine");
    if (playerStats.physicalScore < 70) recommendations.push("Implement strength and conditioning program to improve physical attributes");
    if (playerStats.movementEfficiency < 70) recommendations.push("Work with a movement coach to optimize running technique");
    
    // Fill in with generic recommendations if needed
    if (recommendations.length < 3) {
      recommendations.push(
        "Maintain consistent training schedule to build on existing strengths",
        "Record and analyze performance regularly to track improvements",
        "Consider specialized coaching for position-specific skills development"
      );
    }
    
    return {
      summary: `This ${level}-level player demonstrates ${
        averageScore > 60 ? "good" : "developing"
      } overall performance with a technical score of ${playerStats.technicalScore.toFixed(1)}, physical score of ${playerStats.physicalScore.toFixed(1)}, and balance score of ${playerStats.balanceScore.toFixed(1)}. The player's movement efficiency is ${
        playerStats.movementEfficiency > 60 ? "above average" : "below average"
      } at ${playerStats.movementEfficiency.toFixed(1)}/100, indicating ${
        playerStats.movementEfficiency > 60 ? "effective" : "inefficient"
      } energy usage during play.`,
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 2),
      recommendations: recommendations.slice(0, 3),
      technicalInsight: `Technical analysis shows ${
        playerStats.technicalScore > 60 ? "good control and execution" : "areas for improvement in ball control and technique"
      }. The player's balance score of ${playerStats.balanceScore.toFixed(1)} indicates ${
        playerStats.balanceScore > 60 ? "stable posture" : "potential instability"
      } during complex movements. ${
        playerStats.technicalScore > 70 
          ? "The player demonstrates advanced technical ability that would benefit from specialized training to reach elite levels."
          : "Focused technical drills should be a priority for improvement."
      }`,
      physicalInsight: `Physical performance analysis reveals an average speed of ${playerStats.avgSpeed.toFixed(1)} pixels/second with peak speeds reaching ${playerStats.maxSpeed.toFixed(1)} pixels/second. ${
        playerStats.maxSpeed > 150 
          ? "This exceptional speed can be a significant advantage in match situations."
          : "Improving sprint training could help increase top speed capabilities."
      } The distance covered of ${playerStats.distanceCovered.toFixed(0)} pixels with an average acceleration of ${playerStats.avgAcceleration.toFixed(1)} pixels/second² indicates ${
        playerStats.physicalScore > 60 ? "good" : "developing"
      } physical capabilities. ${
        playerStats.physicalScore > 70
          ? "The player's physical attributes are a standout feature of their game."
          : "A structured conditioning program would help improve overall physical performance."
      }`
    };
  }
}

// Export a singleton instance
export const openAIService = new OpenAIService();
