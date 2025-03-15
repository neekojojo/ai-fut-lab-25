
import OpenAI from "openai";

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

// Create mock OpenAI service to avoid requiring API keys for the initial implementation
export class OpenAIService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  // Set API key
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  // Generate analysis of player performance
  public async generatePlayerAnalysis(
    data: PlayerAnalyticsData
  ): Promise<OpenAIAnalysis> {
    // If no API key is set, or we're in development mode, use mock response
    if (!this.apiKey || import.meta.env.DEV) {
      console.log('Using mock OpenAI response (no API key or in development mode)');
      return this.generateMockAnalysis(data);
    }

    try {
      const openai = new OpenAI({
        apiKey: this.apiKey,
      });

      // Create a prompt for the OpenAI API
      const prompt = this.createAnalysisPrompt(data);

      const response = await openai.chat.completions.create({
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
      // Fallback to mock analysis in case of error
      return this.generateMockAnalysis(data);
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
