
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
import ChartContainer from '@/utils/ui/chartContainer';

interface OverallStatsProps {
  playerStats: any;
  className?: string;
}

export const OverallStats: React.FC<OverallStatsProps> = ({
  playerStats,
  className = ''
}) => {
  const statsData = [
    { name: 'السرعة المتوسطة', value: playerStats.avgSpeed || 12.5 },
    { name: 'السرعة القصوى', value: playerStats.maxSpeed || 22.3 },
    { name: 'التسارع المتوسط', value: playerStats.avgAcceleration || 3.2 },
    { name: 'المسافة المقطوعة', value: (playerStats.distanceCovered || 1250) / 100 }, // Scale down for better visualization
  ];

  // Gradient colors for bars
  const colors = [
    { start: '#10b981', end: '#34d399' }, // green
    { start: '#3b82f6', end: '#60a5fa' }, // blue
    { start: '#f97316', end: '#fb923c' }, // orange
    { start: '#8b5cf6', end: '#a78bfa' }  // purple
  ];

  return (
    <Card className={`overflow-hidden border-none shadow-md bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-black/50 ${className} mt-10`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-2 text-left">
        <CardTitle className="text-left">الإحصائيات العامة</CardTitle>
        <CardDescription className="text-left">
          مقاييس الأداء الرئيسية
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-10">
        <ChartContainer>
          <div className="h-72 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <defs>
                  {colors.map((color, index) => (
                    <linearGradient key={`gradient-${index}`} id={`barGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color.start} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={color.end} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => {
                  if (props?.payload?.name === 'المسافة المقطوعة') {
                    return [`${Number(value) * 100} متر`, 'المسافة'];
                  }
                  return [typeof value === 'number' ? value.toFixed(1) : value, name];
                }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#barGradient${index})`}
                      filter={`drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1))`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
