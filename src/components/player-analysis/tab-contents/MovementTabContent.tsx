
import React from 'react';
import { Card } from '@/components/ui/card';
import PlayerMovementVisualization from '@/components/PlayerMovementVisualization';
import EnhancedMovementChart from '@/components/player-movement/EnhancedMovementChart';
import PositionSpecificAnalysis from '@/components/player-movement/PositionSpecificAnalysis';
import { determineEarnedBadges } from '@/utils/analysis/badgeService';

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  // Memoize movement data to prevent regeneration on each render
  const enhancedMovement = React.useMemo(() => ({
    maxSpeed: analysis.physicalMetrics?.maxSpeed || 78,
    avgSpeed: analysis.physicalMetrics?.avgSpeed || 72,
    maxAcceleration: analysis.physicalMetrics?.maxAcceleration || 81,
    avgAcceleration: analysis.physicalMetrics?.avgAcceleration || 75,
    stamina: analysis.physicalMetrics?.stamina || 80,
    consistency: analysis.physicalMetrics?.consistency || 76,
    movementEfficiency: analysis.physicalMetrics?.efficiency || 82,
    tacticaAwareness: analysis.physicalMetrics?.awareness || 73,
    recoverySpeed: analysis.physicalMetrics?.recovery || 79
  }), [analysis.id]); // Only recalculate when analysis ID changes
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PlayerMovementVisualization data={analysis} />
      <EnhancedMovementChart enhancedMovement={enhancedMovement} />
      <PositionSpecificAnalysis position={analysis.position || 'وسط'} />
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default React.memo(MovementTabContent);
