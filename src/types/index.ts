
// Re-export all types for backward compatibility with AnalysisReport.d.ts
export * from './playerMovement';
export * from './playerStats';
export * from './playerAnalysis';
export * from './userProfile';
export * from './training';
// Export badges without causing naming conflicts
export type { Badge, BadgeItem, InjuryRiskArea, InjuryRiskData } from './badges';
export * from './progress';
export * from './injuries';
export * from './files';
