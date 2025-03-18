
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface MarketValuePoint {
  name: string;
  value: number;
  formattedValue: string;
}

interface MarketValueProjectionProps {
  data?: MarketValuePoint[];
  currency?: string;
}

const MarketValueProjection: React.FC<MarketValueProjectionProps> = ({ 
  data,
  currency = '€' 
}) => {
  const defaultData: MarketValuePoint[] = [
    { name: 'Current', value: 250000, formattedValue: `${currency}250K` },
    { name: '6 Months', value: 375000, formattedValue: `${currency}375K` },
    { name: '1 Year', value: 520000, formattedValue: `${currency}520K` },
    { name: '2 Years', value: 780000, formattedValue: `${currency}780K` },
  ];

  const chartData = data || defaultData;
  const maxValue = Math.max(...chartData.map(item => item.value)) * 1.2;
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Market Value Projection</CardTitle>
        <p className="text-muted-foreground">Estimated value growth over time</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                tickFormatter={(value) => `${currency}${value/1000}K`}
                domain={[0, maxValue]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#3b82f6" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketValueProjection;
