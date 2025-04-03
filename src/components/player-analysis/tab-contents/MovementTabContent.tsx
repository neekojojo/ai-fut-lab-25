
import React from 'react';
import PositionSpecificAnalysis from '@/components/player-movement/PositionSpecificAnalysis';
import EnhancedMovementChart from '@/components/player-movement/EnhancedMovementChart';
import { Button } from '@/components/ui/button';
import { Grid2X2 } from 'lucide-react';
import PlayerHeatMapPanel from '../PlayerHeatMapPanel';

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  // Mock data for testing
  const mockEnhancedMovement = {
    maxSpeed: 82,
    avgSpeed: 65,
    maxAcceleration: 76,
    avgAcceleration: 62,
    stamina: 78,
    consistency: 72,
    movementEfficiency: 75,
    tacticaAwareness: 82, 
    recoverySpeed: 70,
    accelerationProfile: {
      explosive: 0.45,
      sustained: 0.35,
      deceleration: 0.2
    },
    directionalData: {
      forward: 0.6,
      backward: 0.1,
      sideways: 0.3
    },
    positionalHeatmap: [
      {x: 20, y: 30, value: 0.8},
      {x: 30, y: 40, value: 0.7},
      {x: 40, y: 50, value: 0.9},
      {x: 60, y: 20, value: 0.5},
      {x: 70, y: 60, value: 0.3},
      {x: 80, y: 40, value: 0.6},
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PositionSpecificAnalysis position={analysis.position || 'Forward'} />
        <PlayerHeatMapPanel 
          heatmapData={analysis.heatmap?.map(point => ({ 
            x: point.x, 
            y: point.y, 
            intensity: point.value || point.intensity || 0.5 
          }))}
        />
      </div>
      
      <EnhancedMovementChart enhancedMovement={mockEnhancedMovement} />
      
      <div className="flex justify-center mt-4">
        <Button onClick={onViewAdvanced} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Grid2X2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          عرض التحليل المتقدم للحركة
        </Button>
      </div>
    </div>
  );
};

export default MovementTabContent;
