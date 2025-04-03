
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { AVAILABLE_BADGES } from "./constants";
import { Badge } from "@/types/badges";

// Cache to store badges by analysis ID
const badgeCache = new Map<string, Badge[]>();

// Function to determine earned badges based on analysis
export const determineEarnedBadges = (analysis: PlayerAnalysis): Badge[] => {
  // If we've already calculated badges for this analysis, return the cached version
  if (analysis.id && badgeCache.has(analysis.id)) {
    return badgeCache.get(analysis.id)!;
  }
  
  // Calculate badges
  const badges = AVAILABLE_BADGES
    .filter(badge => badge.unlockCondition(analysis))
    .map(({ name, description, level }) => ({ 
      name, 
      description, 
      level: level as "gold" | "silver" | "bronze" // Ensure the level is properly typed
    }));
    
  // Cache the result if we have an ID
  if (analysis.id) {
    badgeCache.set(analysis.id, badges);
  }
    
  return badges;
};
