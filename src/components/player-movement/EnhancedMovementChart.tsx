
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedMovementAnalysis {
  maxSpeed: number;
  avgSpeed: number;
  maxAcceleration: number;
  avgAcceleration: number;
  stamina: number;
  consistency: number;
  movementEfficiency: number;
  tacticaAwareness: number;
  recoverySpeed: number;
  totalDistance?: number;
  averageSpeed?: number;
  directionChanges?: number;
  technicalConsistency?: number;
  speedZones?: {
    walking: number;
    jogging: number;
    running: number;
    sprinting: number;
  };
  zoneTransitions?: any;
}

interface EnhancedMovementChartProps {
  enhancedMovement: Partial<EnhancedMovementAnalysis>;
}

const EnhancedMovementChart: React.FC<EnhancedMovementChartProps> = ({ enhancedMovement }) => {
  const radarData = [
    { subject: 'أقصى سرعة', A: enhancedMovement.maxSpeed || 0, fullMark: 100 },
    { subject: 'متوسط السرعة', A: enhancedMovement.avgSpeed || 0, fullMark: 100 },
    { subject: 'أقصى تسارع', A: enhancedMovement.maxAcceleration || 0, fullMark: 100 },
    { subject: 'متوسط التسارع', A: enhancedMovement.avgAcceleration || 0, fullMark: 100 },
    { subject: 'التحمل', A: enhancedMovement.stamina || 0, fullMark: 100 },
    { subject: 'الثبات', A: enhancedMovement.consistency || 0, fullMark: 100 },
    { subject: 'كفاءة الحركة', A: enhancedMovement.movementEfficiency || 0, fullMark: 100 },
    { subject: 'الوعي التكتيكي', A: enhancedMovement.tacticaAwareness || 0, fullMark: 100 },
    { subject: 'سرعة التعافي', A: enhancedMovement.recoverySpeed || 0, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحليل الحركة المتقدم</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="القيمة"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMovementChart;
