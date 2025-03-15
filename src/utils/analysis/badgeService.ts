
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { AVAILABLE_BADGES } from "./constants";

// Function to determine earned badges based on analysis
export const determineEarnedBadges = (analysis: PlayerAnalysis) => {
  return AVAILABLE_BADGES
    .filter(badge => badge.unlockCondition(analysis))
    .map(({ name, description, level }) => ({ name, description, level }));
};
