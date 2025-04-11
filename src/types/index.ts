
// Re-export all types for backward compatibility with AnalysisReport.d.ts
export * from './playerMovement';
export * from './playerStats';
export * from './playerAnalysis';
export * from './userProfile';
export * from './training';
// Export badges without causing naming conflicts
export { Badge, BadgeItem } from './badges';
// Export injury risk types with explicit names to avoid ambiguity
export { 
  InjuryRiskArea as InjuryRiskAreaType,
  InjuryRiskData as InjuryRiskDataType
} from './badges';
export * from './progress';
export * from './injuries';
export * from './files';
