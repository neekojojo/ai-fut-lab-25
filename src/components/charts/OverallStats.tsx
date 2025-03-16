
import React from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from './constants';
import { PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';

interface OverallStatsProps {
  playerStats: PlayerStats;
}

export const OverallStats: React.FC<OverallStatsProps> = ({
  playerStats,
}) => {
  const statsData = [
    { name: 'Avg Speed', value: playerStats.avgSpeed },
    { name: 'Max Speed', value: playerStats.maxSpeed },
    { name: 'Avg Accel', value: playerStats.avgAcceleration },
    { name: 'Distance', value: playerStats.distanceCovered / 100 }, // Scale down for better visualization
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Overall Stats</CardTitle>
        <CardDescription>
          Key performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => {
                if (props?.payload?.name === 'Distance') {
                  return [`${Number(value) * 100} px`, 'Distance'];
                }
                return [typeof value === 'number' ? value.toFixed(1) : value, name];
              }} />
              <Bar dataKey="value">
                {[0, 1, 2, 3].map((index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0 ? CHART_COLORS.primary :
                      index === 1 ? CHART_COLORS.secondary :
                      index === 2 ? CHART_COLORS.tertiary :
                      CHART_COLORS.quaternary
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
