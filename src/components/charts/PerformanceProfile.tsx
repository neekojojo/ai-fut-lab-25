
import React from 'react';
import { 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  RadarChart, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from './constants';
import { PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';

interface PerformanceProfileProps {
  playerStats: PlayerStats;
  playerName?: string;
}

// Custom tooltip for the radar chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-xs">
        <p>{`${payload[0].payload.attribute}: ${typeof payload[0].value === 'number' ? payload[0].value.toFixed(1) : payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const PerformanceProfile: React.FC<PerformanceProfileProps> = ({
  playerStats,
  playerName = "Player",
}) => {
  // Prepare data for the radar chart
  const radarData = [
    { 
      attribute: "Speed", 
      value: Math.min(100, (playerStats.maxSpeed / 200) * 100),
      fullMark: 100 
    },
    { 
      attribute: "Acceleration", 
      value: Math.min(100, (playerStats.avgAcceleration / 50) * 100),
      fullMark: 100 
    },
    { 
      attribute: "Endurance", 
      value: Math.min(100, (playerStats.distanceCovered / 5000) * 100),
      fullMark: 100 
    },
    { 
      attribute: "Balance", 
      value: playerStats.balanceScore,
      fullMark: 100 
    },
    { 
      attribute: "Technical", 
      value: playerStats.technicalScore,
      fullMark: 100 
    },
    { 
      attribute: "Physical", 
      value: playerStats.physicalScore,
      fullMark: 100 
    },
    { 
      attribute: "Efficiency", 
      value: playerStats.movementEfficiency,
      fullMark: 100 
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Performance Profile</CardTitle>
        <CardDescription>
          Comprehensive analysis of player attributes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="attribute" tick={{ fill: CHART_COLORS.text, fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name={playerName}
                dataKey="value"
                stroke={CHART_COLORS.primary}
                fill={CHART_COLORS.primary}
                fillOpacity={0.5}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
