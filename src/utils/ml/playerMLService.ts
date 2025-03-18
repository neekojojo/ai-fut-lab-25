
import { toast } from "sonner";
import { PlayerStats } from "../dataProcessing/playerDataAnalysis";

// Interface for training recommendation
export interface TrainingRecommendation {
  area: string;
  intensity: "low" | "medium" | "high";
  frequency: number; // times per week
  duration: number; // minutes per session
  exercises: {
    name: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
  }[];
  expectedImprovement: number; // percentage
}

// Interface for player comparison
export interface PlayerComparison {
  similarProfessionals: {
    name: string;
    similarity: number; // percentage
    strengths: string[];
    team?: string;
    position?: string;
  }[];
  similarityMetrics: {
    category: string;
    score: number;
    description: string;
  }[];
}

// Player ML service for machine learning analysis
export class PlayerMLService {
  // Generate training recommendations using Random Forest algorithm
  // In a real implementation, this would use scikit-learn or similar
  public async generateTrainingRecommendations(
    playerStats: PlayerStats,
    position?: string
  ): Promise<TrainingRecommendation[]> {
    console.log('Generating training recommendations with Random Forest model');
    
    // Mock Random Forest implementation
    // In real-world, this would use an actual ML model
    
    // Identify weakest areas based on stats
    const statAreas = [
      { name: "speed", value: playerStats.maxSpeed / 200 }, // normalize to 0-1
      { name: "acceleration", value: playerStats.avgAcceleration / 50 },
      { name: "endurance", value: playerStats.distanceCovered / 5000 },
      { name: "balance", value: playerStats.balanceScore / 100 },
      { name: "technical", value: playerStats.technicalScore / 100 },
      { name: "physical", value: playerStats.physicalScore / 100 },
      { name: "efficiency", value: playerStats.movementEfficiency / 100 }
    ];
    
    // Sort by value ascending to find weakest areas
    const weakestAreas = [...statAreas].sort((a, b) => a.value - b.value);
    
    // Generate recommendations based on the 3 weakest areas
    const recommendations: TrainingRecommendation[] = [];
    
    // Define training exercises per area
    const trainingExercises = {
      speed: [
        { name: "Sprint intervals", description: "High-intensity short sprints with recovery periods", difficulty: "intermediate" },
        { name: "Resistance sprints", description: "Sprinting with resistance bands or parachutes", difficulty: "advanced" },
        { name: "Hill sprints", description: "Sprinting uphill to build explosiveness", difficulty: "intermediate" }
      ],
      acceleration: [
        { name: "Plyometric jumps", description: "Explosive jumping exercises to improve first-step quickness", difficulty: "intermediate" },
        { name: "Agility ladder drills", description: "Quick foot movement through agility ladder", difficulty: "beginner" },
        { name: "Resistance starts", description: "Explosive starts against resistance", difficulty: "advanced" }
      ],
      endurance: [
        { name: "Interval training", description: "Alternating high and low intensity running", difficulty: "intermediate" },
        { name: "Fartlek training", description: "Varied pace continuous running", difficulty: "intermediate" },
        { name: "Small-sided games", description: "Continuous play in small teams", difficulty: "beginner" }
      ],
      balance: [
        { name: "Single leg exercises", description: "Strength and stability work on one leg", difficulty: "intermediate" },
        { name: "Bosu ball training", description: "Exercises on unstable surface", difficulty: "advanced" },
        { name: "Yoga for athletes", description: "Yoga poses focusing on balance and stability", difficulty: "beginner" }
      ],
      technical: [
        { name: "Ball mastery drills", description: "Various ball control exercises", difficulty: "beginner" },
        { name: "Small space technique", description: "Technical skills in confined spaces", difficulty: "intermediate" },
        { name: "First touch drills", description: "Exercises focusing on receiving and controlling the ball", difficulty: "intermediate" }
      ],
      physical: [
        { name: "Strength training", description: "Football-specific resistance training", difficulty: "intermediate" },
        { name: "Core stability", description: "Exercises to strengthen core muscles", difficulty: "beginner" },
        { name: "Functional movement", description: "Movement patterns specific to football", difficulty: "intermediate" }
      ],
      efficiency: [
        { name: "Running technique", description: "Focus on efficient running mechanics", difficulty: "intermediate" },
        { name: "Energy conservation", description: "Tactical positioning to minimize unnecessary movement", difficulty: "advanced" },
        { name: "Recovery strategies", description: "Methods to optimize recovery between efforts", difficulty: "beginner" }
      ]
    };
    
    // Generate recommendations for top 3 weakest areas
    for (let i = 0; i < Math.min(3, weakestAreas.length); i++) {
      const area = weakestAreas[i];
      const intensity = area.value < 0.3 ? "high" : area.value < 0.6 ? "medium" : "low";
      const frequency = area.value < 0.3 ? 3 : area.value < 0.6 ? 2 : 1;
      const duration = area.value < 0.3 ? 45 : area.value < 0.6 ? 30 : 20;
      const expectedImprovement = Math.round(30 - area.value * 20); // lower current value = higher potential improvement
      
      // Get exercises for this area
      const exercises = trainingExercises[area.name as keyof typeof trainingExercises];
      
      recommendations.push({
        area: this.formatAreaName(area.name),
        intensity,
        frequency,
        duration,
        exercises: exercises.map(ex => ({
          name: ex.name,
          description: ex.description,
          difficulty: ex.difficulty as "beginner" | "intermediate" | "advanced"
        })),
        expectedImprovement
      });
    }
    
    // If position is provided, add position-specific recommendation
    if (position) {
      const positionSpecificRecommendation = this.getPositionSpecificRecommendation(position);
      if (positionSpecificRecommendation) {
        recommendations.push(positionSpecificRecommendation);
      }
    }
    
    return recommendations;
  }
  
  // Format area name for display
  private formatAreaName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1) + " development";
  }
  
  // Get position-specific training recommendation
  private getPositionSpecificRecommendation(position: string): TrainingRecommendation | null {
    const positionMap: Record<string, TrainingRecommendation> = {
      "forward": {
        area: "Finishing skills",
        intensity: "high",
        frequency: 2,
        duration: 30,
        exercises: [
          { name: "1v1 finishing", description: "Practice finishing against a goalkeeper", difficulty: "intermediate" },
          { name: "Shooting under pressure", description: "Shooting drills with defensive pressure", difficulty: "advanced" },
          { name: "Movement in the box", description: "Practice creating space in the penalty area", difficulty: "intermediate" }
        ],
        expectedImprovement: 25
      },
      "midfielder": {
        area: "Passing range",
        intensity: "medium",
        frequency: 3,
        duration: 40,
        exercises: [
          { name: "Long range passing", description: "Practice accurate long balls", difficulty: "advanced" },
          { name: "Through balls", description: "Threading passes between defenders", difficulty: "intermediate" },
          { name: "Quick combination play", description: "One and two touch passing sequences", difficulty: "intermediate" }
        ],
        expectedImprovement: 22
      },
      "defender": {
        area: "Defensive positioning",
        intensity: "medium",
        frequency: 2,
        duration: 35,
        exercises: [
          { name: "1v1 defending", description: "Practice defending against attackers", difficulty: "intermediate" },
          { name: "Defensive shape", description: "Maintaining proper defensive positioning", difficulty: "beginner" },
          { name: "Aerial duels", description: "Practice winning headers from various angles", difficulty: "advanced" }
        ],
        expectedImprovement: 20
      },
      "goalkeeper": {
        area: "Reflexes and reactions",
        intensity: "high",
        frequency: 3,
        duration: 30,
        exercises: [
          { name: "Close range saves", description: "Quick reaction saves from short distance", difficulty: "advanced" },
          { name: "Distribution practice", description: "Accurate throwing and kicking", difficulty: "intermediate" },
          { name: "Cross handling", description: "Dealing with crosses under pressure", difficulty: "advanced" }
        ],
        expectedImprovement: 18
      }
    };
    
    // Match position to one of our categories
    const normalizedPosition = position.toLowerCase();
    const positionKey = Object.keys(positionMap).find(key => 
      normalizedPosition.includes(key)
    );
    
    return positionKey ? positionMap[positionKey] : null;
  }
  
  // Find similar professional players using CNN features
  // In a real implementation, this would use feature extraction via CNN
  public async findSimilarPlayers(
    playerStats: PlayerStats,
    position?: string
  ): Promise<PlayerComparison> {
    console.log('Finding similar players using CNN feature extraction');
    
    // Mock CNN player comparison
    // In real-world, this would use an actual CNN model for feature extraction
    
    // Mock database of professional players with stats
    const professionalPlayers = [
      {
        name: "Lionel Messi",
        speed: 0.88,
        acceleration: 0.94,
        endurance: 0.82,
        balance: 0.95,
        technical: 0.98,
        physical: 0.75,
        efficiency: 0.90,
        position: "forward",
        team: "Inter Miami CF",
        strengths: ["Dribbling", "Vision", "Finishing"]
      },
      {
        name: "Cristiano Ronaldo",
        speed: 0.91,
        acceleration: 0.89,
        endurance: 0.88,
        balance: 0.85,
        technical: 0.88,
        physical: 0.90,
        efficiency: 0.87,
        position: "forward",
        team: "Al Nassr",
        strengths: ["Finishing", "Aerial ability", "Power"]
      },
      {
        name: "Kevin De Bruyne",
        speed: 0.82,
        acceleration: 0.80,
        endurance: 0.87,
        balance: 0.83,
        technical: 0.95,
        physical: 0.82,
        efficiency: 0.92,
        position: "midfielder",
        team: "Manchester City",
        strengths: ["Passing", "Vision", "Shooting"]
      },
      {
        name: "N'Golo Kanté",
        speed: 0.85,
        acceleration: 0.88,
        endurance: 0.96,
        balance: 0.90,
        technical: 0.84,
        physical: 0.80,
        efficiency: 0.96,
        position: "midfielder",
        team: "Al-Ittihad",
        strengths: ["Interceptions", "Stamina", "Tackling"]
      },
      {
        name: "Virgil van Dijk",
        speed: 0.83,
        acceleration: 0.80,
        endurance: 0.85,
        balance: 0.87,
        technical: 0.85,
        physical: 0.95,
        efficiency: 0.88,
        position: "defender",
        team: "Liverpool",
        strengths: ["Aerial ability", "Composure", "Leadership"]
      },
      {
        name: "Manuel Neuer",
        speed: 0.75,
        acceleration: 0.72,
        endurance: 0.80,
        balance: 0.85,
        technical: 0.90,
        physical: 0.88,
        efficiency: 0.89,
        position: "goalkeeper",
        team: "Bayern Munich",
        strengths: ["Shot-stopping", "Distribution", "Sweeping"]
      }
    ];
    
    // Normalize player stats to 0-1 range for comparison
    const normalizedStats = {
      speed: playerStats.maxSpeed / 200,
      acceleration: playerStats.avgAcceleration / 50,
      endurance: playerStats.distanceCovered / 5000,
      balance: playerStats.balanceScore / 100,
      technical: playerStats.technicalScore / 100,
      physical: playerStats.physicalScore / 100,
      efficiency: playerStats.movementEfficiency / 100
    };
    
    // Filter players by position if provided
    let filteredPlayers = professionalPlayers;
    if (position) {
      const normalizedPosition = position.toLowerCase();
      filteredPlayers = professionalPlayers.filter(player => 
        normalizedPosition.includes(player.position) || 
        player.position.includes(normalizedPosition)
      );
      
      // If no players match, use all players
      if (filteredPlayers.length === 0) {
        filteredPlayers = professionalPlayers;
      }
    }
    
    // Calculate similarity score for each player
    const playersWithSimilarity = filteredPlayers.map(player => {
      const speedDiff = Math.abs(player.speed - normalizedStats.speed);
      const accelDiff = Math.abs(player.acceleration - normalizedStats.acceleration);
      const enduranceDiff = Math.abs(player.endurance - normalizedStats.endurance);
      const balanceDiff = Math.abs(player.balance - normalizedStats.balance);
      const technicalDiff = Math.abs(player.technical - normalizedStats.technical);
      const physicalDiff = Math.abs(player.physical - normalizedStats.physical);
      const efficiencyDiff = Math.abs(player.efficiency - normalizedStats.efficiency);
      
      // Calculate overall difference (lower = more similar)
      const totalDiff = (
        speedDiff + accelDiff + enduranceDiff + balanceDiff + 
        technicalDiff + physicalDiff + efficiencyDiff
      ) / 7;
      
      // Convert difference to similarity percentage
      const similarity = Math.round((1 - totalDiff) * 100);
      
      return {
        ...player,
        similarity
      };
    });
    
    // Sort by similarity (descending) and take top 3
    const topSimilarPlayers = playersWithSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);
    
    // Create similarity metrics
    const categoryComparisons = [
      {
        category: "Speed & Acceleration",
        score: Math.round(((1 - (Math.abs(topSimilarPlayers[0].speed - normalizedStats.speed) + 
                                Math.abs(topSimilarPlayers[0].acceleration - normalizedStats.acceleration)) / 2) * 100)),
        description: `Your explosive speed is ${
          normalizedStats.speed > topSimilarPlayers[0].speed ? "higher than" : "similar to"
        } ${topSimilarPlayers[0].name}'s.`
      },
      {
        category: "Technical Ability",
        score: Math.round((1 - Math.abs(topSimilarPlayers[0].technical - normalizedStats.technical)) * 100),
        description: `Your technical skills are ${
          Math.abs(normalizedStats.technical - topSimilarPlayers[0].technical) < 0.1 ? "remarkably similar to" : 
          normalizedStats.technical > topSimilarPlayers[0].technical ? "developing toward" : "not yet at the level of"
        } ${topSimilarPlayers[0].name}'s technique.`
      },
      {
        category: "Physical Attributes",
        score: Math.round((1 - Math.abs(topSimilarPlayers[0].physical - normalizedStats.physical)) * 100),
        description: `Physically, you're ${
          Math.abs(normalizedStats.physical - topSimilarPlayers[0].physical) < 0.15 ? "comparable to" :
          normalizedStats.physical > topSimilarPlayers[0].physical ? "stronger than" : "not as developed as"
        } ${topSimilarPlayers[0].name}.`
      },
      {
        category: "Movement Efficiency",
        score: Math.round((1 - Math.abs(topSimilarPlayers[0].efficiency - normalizedStats.efficiency)) * 100),
        description: `Your movement efficiency ${
          Math.abs(normalizedStats.efficiency - topSimilarPlayers[0].efficiency) < 0.1 ? "matches" :
          normalizedStats.efficiency > topSimilarPlayers[0].efficiency ? "exceeds" : "is approaching"
        } ${topSimilarPlayers[0].name}'s style.`
      }
    ];
    
    return {
      similarProfessionals: topSimilarPlayers.map(player => ({
        name: player.name,
        similarity: player.similarity,
        strengths: player.strengths,
        team: player.team,
        position: player.position
      })),
      similarityMetrics: categoryComparisons
    };
  }
}

// Export a singleton instance
export const playerMLService = new PlayerMLService();
