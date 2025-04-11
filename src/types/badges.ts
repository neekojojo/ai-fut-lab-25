
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  level: string;
  earnedAt?: Date;
}

// Add BadgeItem type that was missing
export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: string;
}

// Add the missing InjuryRiskArea and InjuryRiskData types
export interface InjuryRiskArea {
  name: string;
  risk: number;
  recommendation: string;
}

export interface InjuryRiskData {
  overall: number;
  areas: InjuryRiskArea[];
  recommendations: string[];
}
