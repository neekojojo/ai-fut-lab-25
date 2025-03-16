
import React from 'react';
import { 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS, formatTooltipValue } from './constants';
import { PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';

interface PerformanceDistributionProps {
  playerStats: PlayerStats;
}

export const PerformanceDistribution: React.FC<PerformanceDistributionProps> = ({
  playerStats,
}) => {
  // Prepare data for the performance distribution pie chart
  const pieData = [
    { name: 'Technical', value: playerStats.technicalScore },
    { name: 'Physical', value: playerStats.physicalScore },
    { name: 'Balance', value: playerStats.balanceScore },
    { name: 'Efficiency', value: playerStats.movementEfficiency }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Performance Distribution</CardTitle>
        <CardDescription>
          Balance between different skill areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
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
              </Pie>
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
