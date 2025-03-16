
import React from 'react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from './constants';

export const ProgressCharts: React.FC = () => {
  // Prepare mock progress data (for demonstration)
  const progressData = [
    { name: 'Week 1', value: 30 },
    { name: 'Week 2', value: 35 },
    { name: 'Week 3', value: 38 },
    { name: 'Week 4', value: 42 },
    { name: 'Week 5', value: 48 },
    { name: 'Week 6', value: 50 },
    { name: 'Week 7', value: 55 },
    { name: 'Week 8', value: 60 }
  ];

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Performance Progress</CardTitle>
          <CardDescription>
            Track your improvement over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={progressData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={CHART_COLORS.primary} 
                  fillOpacity={1} 
                  fill="url(#colorProgress)" 
                  strokeWidth={2}
                  name="Overall Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Skill Development</CardTitle>
          <CardDescription>
            Progress in specific skill areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Technical" 
                  stroke={CHART_COLORS.primary} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Physical" 
                  stroke={CHART_COLORS.secondary} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  // Add offset to create different values for demonstration
                  data={progressData.map(entry => ({ 
                    ...entry, 
                    value: Math.max(0, Math.min(100, entry.value - 10 + Math.random() * 5))
                  }))}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Tactical" 
                  stroke={CHART_COLORS.tertiary} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  // Add offset to create different values for demonstration
                  data={progressData.map(entry => ({ 
                    ...entry, 
                    value: Math.max(0, Math.min(100, entry.value - 5 - Math.random() * 10))
                  }))}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
