
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { AVAILABLE_BADGES } from "./constants";
import { Badge } from "@/types/badges";

// Function to determine earned badges based on analysis
export const determineEarnedBadges = (analysis: PlayerAnalysis): Badge[] => {
  return AVAILABLE_BADGES
    .filter(badge => badge.unlockCondition(analysis))
    .map(({ name, description, level }) => ({ 
      name, 
      description, 
      level: level as "gold" | "silver" | "bronze" // Ensure the level is properly typed
    }));
};
