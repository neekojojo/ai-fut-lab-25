
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

export type BadgeItem = Badge;

export interface InjuryRiskArea {
  name: string;
  risk: number;
  recommendation: string;
}

export interface InjuryRiskData {
  overall: number;
  areas: InjuryRiskArea[];
  recommendations: string[];
  history?: {
    type: string;
    date: string;
    duration: string;
  }[];
}
