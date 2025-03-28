
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
import ChartContainer from '@/utils/ui/chartContainer';

interface PerformanceDistributionProps {
  playerStats: any;
  className?: string;
}

export const PerformanceDistribution: React.FC<PerformanceDistributionProps> = ({
  playerStats,
  className = ''
}) => {
  // Prepare data for the performance distribution pie chart
  const pieData = [
    { name: 'المهارات التقنية', value: playerStats.technicalScore || 75 },
    { name: 'المهارات البدنية', value: playerStats.physicalScore || 82 },
    { name: 'التوازن', value: playerStats.balanceScore || 68 },
    { name: 'الكفاءة', value: playerStats.movementEfficiency || 79 }
  ];

  // Custom colors with gradients
  const COLORS = ['#10b981', '#3b82f6', '#f97316', '#8b5cf6'];

  return (
    <Card className={`overflow-hidden border-none shadow-md bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-black/50 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-2">
        <CardTitle>توزيع الأداء</CardTitle>
        <CardDescription>
          التوازن بين مختلف مناطق المهارات
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
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
                      fill={COLORS[index % COLORS.length]}
                      filter={`drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))`}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'القيمة']} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
