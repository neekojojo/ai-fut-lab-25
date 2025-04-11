
import React from 'react';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import InsightsPanel from './InsightsPanel';
import AchievementBadges from './AchievementBadges';
import determineEarnedBadges from '@/utils/analysis/badgeService';

interface AdvancedPlayerReportPanelProps {
  analysis: PlayerAnalysis;
}

const AdvancedPlayerReportPanel: React.FC<AdvancedPlayerReportPanelProps> = ({ analysis }) => {
  // تحديد الشارات المكتسبة بناءً على التحليل
  const earnedBadges = determineEarnedBadges(analysis);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="md:col-span-1">
        <InsightsPanel analysis={analysis} />
      </div>
      
      <div className="md:col-span-1">
        <AchievementBadges playerName={analysis.playerName} badges={earnedBadges} />
      </div>
    </div>
  );
};

export default AdvancedPlayerReportPanel;
