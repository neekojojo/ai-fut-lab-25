
export interface PlayerAnalysis {
  playerName: string;
  position: string;
  marketValue: string;
  talentScore: number;
  strengths: string[];
  weaknesses: string[];
  detailedSkills?: any; // Position-specific skills
  performance: {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
  };
  recommendations: string[];
  compatibilityScore: number;
  proComparison?: {
    name: string;
    similarity: number;
    skills: any;
  };
}
