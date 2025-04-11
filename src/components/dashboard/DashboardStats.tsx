
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, LineChart } from 'recharts';

interface UserProfile {
  name: string;
  level: string;
  position: string;
  performanceScore: number;
  improvementRate: number;
  analyses: { id: string; date: string; score: number }[];
}

interface DashboardStatsProps {
  userProfile: UserProfile;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userProfile }) => {
  // Process analysis data for charts
  const chartData = userProfile.analyses.map(analysis => ({
    date: new Date(analysis.date).toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' }),
    score: analysis.score
  })).reverse();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>تطور الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              width={500}
              height={250}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <AreaChart.Area
                type="monotone"
                dataKey="score"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorScore)"
              />
              <LineChart.Line
                type="monotone"
                dataKey="score"
                stroke="#6366F1"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <LineChart.CartesianGrid strokeDasharray="3 3" vertical={false} />
              <LineChart.XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
              />
              <LineChart.YAxis
                domain={[60, 100]}
                axisLine={false}
                tickLine={false}
              />
              <LineChart.Tooltip
                formatter={(value) => [`${value}`, 'التقييم']}
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>توزيع المهارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <BarChart
              data={[
                { name: 'التقنية', value: 82 },
                { name: 'البدنية', value: 75 },
                { name: 'التكتيكية', value: 79 },
                { name: 'الذهنية', value: 73 },
              ]}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              layout="vertical"
              width={200}
              height={250}
            >
              <BarChart.XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                hide
              />
              <BarChart.YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <BarChart.Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                fill="#6366F1"
                label={{ position: 'right', formatter: (value) => `${value}` }}
              />
              <BarChart.Tooltip
                formatter={(value) => [`${value}/100`, '']}
              />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
