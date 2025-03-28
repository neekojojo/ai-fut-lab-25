
export interface InjuryRiskArea {
  name: string;
  risk: number;
  recommendation: string;
}

export interface InjuryRiskData {
  overall: number;
  areas: InjuryRiskArea[];
}
