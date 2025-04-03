
import React from 'react';
import { Card } from '@/components/ui/card';
import { PlayerMovementVisualization } from '@/components/PlayerMovementVisualization';
import EnhancedMovementChart from '@/components/player-movement/EnhancedMovementChart';
import PositionSpecificAnalysis from '@/components/player-movement/PositionSpecificAnalysis';
import AchievementBadges from '@/components/player-analysis/AchievementBadges';
import { determineEarnedBadges } from '@/utils/analysis/badgeService';

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  // المتغيرات الخاصة بالحركة المحسنة
  const enhancedMovement = {
    maxSpeed: analysis.physicalMetrics?.maxSpeed || 78,
    avgSpeed: analysis.physicalMetrics?.avgSpeed || 72,
    maxAcceleration: analysis.physicalMetrics?.maxAcceleration || 81,
    avgAcceleration: analysis.physicalMetrics?.avgAcceleration || 75,
    stamina: analysis.physicalMetrics?.stamina || 80,
    consistency: analysis.physicalMetrics?.consistency || 76,
    movementEfficiency: analysis.physicalMetrics?.efficiency || 82,
    tacticaAwareness: analysis.physicalMetrics?.awareness || 73,
    recoverySpeed: analysis.physicalMetrics?.recovery || 79
  };
  
  // تحديد الشارات بناءً على التحليل
  const earnedBadges = determineEarnedBadges(analysis);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PlayerMovementVisualization data={analysis} />
      
      <EnhancedMovementChart enhancedMovement={enhancedMovement} />
      
      <PositionSpecificAnalysis position={analysis.position || 'وسط'} />
      
      {/* إضافة مكون الشارات والإنجازات */}
      <AchievementBadges 
        playerName={analysis.playerName} 
        badges={earnedBadges} 
      />
    </div>
  );
};

export default MovementTabContent;
