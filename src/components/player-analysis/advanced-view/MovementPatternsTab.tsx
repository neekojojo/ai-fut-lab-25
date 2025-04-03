
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedMovementChart } from '@/components/player-movement/EnhancedMovementChart';
import PlayerHeatMapPanel from '../PlayerHeatMapPanel';
import { Separator } from '@/components/ui/separator';

interface MovementPatternsTabProps {
  analysis: any;
}

const MovementPatternsTab: React.FC<MovementPatternsTabProps> = ({ analysis }) => {
  // Mock enhanced movement data
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
      <Card>
        <CardHeader>
          <CardTitle>التحليل المتقدم لأنماط الحركة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            يوفر هذا التحليل نظرة معمقة لأنماط حركة اللاعب، بما في ذلك التوزيع الحراري والبيانات المفصلة للسرعة والتسارع.
          </p>
          
          <Separator className="my-4" />
          
          <PlayerHeatMapPanel 
            heatmapData={analysis.heatmap?.map(point => ({ 
              x: point.x, 
              y: point.y, 
              intensity: point.value || point.intensity || 0.5 
            }))} 
          />
          
          <Separator className="my-4" />
          
          <EnhancedMovementChart enhancedMovement={mockEnhancedMovement} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementPatternsTab;
