
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const performanceData = [
  { date: 'Jan', score: 65 },
  { date: 'Feb', score: 69 },
  { date: 'Mar', score: 72 },
  { date: 'Apr', score: 78 },
  { date: 'May', score: 82 },
  { date: 'Jun', score: 80 },
];

const skillsData = [
  { name: 'تمرير', value: 85 },
  { name: 'تسديد', value: 75 },
  { name: 'مراوغة', value: 70 },
  { name: 'سرعة', value: 80 },
  { name: 'دفاع', value: 65 },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>التطور العام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366F1" 
                  fill="url(#scoreGradient)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366F1" 
                  strokeWidth={2} 
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#888', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={{ stroke: '#E2E8F0' }}
                />
                <YAxis 
                  tick={{ fill: '#888', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={{ stroke: '#E2E8F0' }}
                  domain={[50, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.8)', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>المهارات الفنية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData} layout="vertical">
                <XAxis 
                  type="number" 
                  tick={{ fill: '#888', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={{ stroke: '#E2E8F0' }}
                  domain={[0, 100]}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: '#888', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={{ stroke: '#E2E8F0' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#6366F1" 
                  radius={[0, 4, 4, 0]} 
                  barSize={30}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.8)', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'التقييم']}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
