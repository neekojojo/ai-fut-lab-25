
// Re-export all types for backward compatibility with AnalysisReport.d.ts
export * from './playerMovement';
export * from './playerStats';
export * from './playerAnalysis';
export * from './userProfile';
export * from './training';
// Export badges without causing naming conflicts
export type { Badge, BadgeItem } from './badges';
// Export injury risk types with explicit named exports for proper TypeScript isolatedModules mode
export type { 
  InjuryRiskArea as InjuryRiskAreaType,
  InjuryRiskData as InjuryRiskDataType
} from './badges';
export * from './progress';
export * from './injuries';
export * from './files';
