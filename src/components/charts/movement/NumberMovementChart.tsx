
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { DataPoint } from "../DataTypes";

interface NumberMovementChartProps {
  title: string;
  data: DataPoint[];
  type: 'line' | 'bar' | 'area';
  colors?: {
    current: string;
    previous: string;
    alternative: string;
  };
  description?: string;
}

const DEFAULT_COLORS = {
  current: "#8B5CF6", // Vibrant Purple
  previous: "#FFFFFF", // White for better visibility
  alternative: "#F97316", // Bright Orange
};

const NumberMovementChart: React.FC<NumberMovementChartProps> = ({
  title,
  data,
  type = 'line',
  colors = DEFAULT_COLORS,
  description
}) => {
  
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis domain={[0, 100]} stroke="#FFFFFF" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', border: 'none', borderRadius: '4px', color: 'white' }}
              labelStyle={{ fontWeight: 'bold', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Legend wrapperStyle={{ color: 'white' }} />
            <Line 
              type="monotone" 
              dataKey="current" 
              name="الحالي" 
              stroke={colors.current} 
              strokeWidth={3} 
              dot={{ r: 5, fill: colors.current, strokeWidth: 2, stroke: 'white' }} 
              activeDot={{ r: 7 }} 
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              name="السابق" 
              stroke={colors.previous} 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={{ r: 4, fill: colors.previous, strokeWidth: 2, stroke: 'black' }} 
            />
            <Line 
              type="monotone" 
              dataKey="alternative" 
              name="المستهدف" 
              stroke={colors.alternative} 
              strokeWidth={2} 
              dot={{ r: 4, fill: colors.alternative, strokeWidth: 2, stroke: 'white' }} 
            />
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis domain={[0, 100]} stroke="#FFFFFF" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', border: 'none', borderRadius: '4px', color: 'white' }}
              labelStyle={{ fontWeight: 'bold', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Legend wrapperStyle={{ color: 'white' }} />
            <Bar dataKey="current" name="الحالي" fill={colors.current} radius={[4, 4, 0, 0]} />
            <Bar dataKey="previous" name="السابق" fill={colors.previous} radius={[4, 4, 0, 0]} />
            <Bar dataKey="alternative" name="المستهدف" fill={colors.alternative} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
        
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis domain={[0, 100]} stroke="#FFFFFF" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', border: 'none', borderRadius: '4px', color: 'white' }}
              labelStyle={{ fontWeight: 'bold', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Legend wrapperStyle={{ color: 'white' }} />
            <Area 
              type="monotone" 
              dataKey="current" 
              name="الحالي" 
              stroke={colors.current} 
              fill={`${colors.current}40`} 
              strokeWidth={3} 
            />
            <Area 
              type="monotone" 
              dataKey="previous" 
              name="السابق" 
              stroke={colors.previous} 
              fill={`${colors.previous}40`} 
              strokeWidth={2} 
              strokeDasharray="5 5" 
            />
            <Area 
              type="monotone" 
              dataKey="alternative" 
              name="المستهدف" 
              stroke={colors.alternative} 
              fill={`${colors.alternative}40`} 
              strokeWidth={2} 
            />
          </AreaChart>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NumberMovementChart;
