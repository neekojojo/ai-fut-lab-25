
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { DataPoint } from "../DataTypes";
import { CHART_COLORS, CHART_ELEMENT_STYLES } from "../constants";

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

const NumberMovementChart: React.FC<NumberMovementChartProps> = ({
  title,
  data,
  type = 'line',
  colors = {
    current: CHART_COLORS.primary, 
    previous: CHART_COLORS.text, 
    alternative: CHART_COLORS.tertiary
  },
  description
}) => {
  
  // Custom Tooltip component with enhanced visibility
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-black p-3 border border-primary/50 rounded-md shadow-lg" 
             style={{ boxShadow: `${CHART_ELEMENT_STYLES.tooltip.border} ${CHART_COLORS.primary}` }}>
          <p className="label font-bold text-white border-b border-white/20 pb-1 mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-item-${index}`} className="flex items-center text-sm my-1" 
               style={{ color: entry.color }}>
              <span className="w-3 h-3 mr-2 inline-block rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="font-medium">{entry.name}:</span>
              <span className="ml-2 bg-white/10 px-1.5 py-0.5 rounded">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // إنشاء أسلوب الخلفية المتدرجة للمخططات
  const gradientId = `chart-gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.current} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={colors.current} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#FFFFFF" 
              tick={{ fill: '#FFFFFF' }}
              tickLine={{ stroke: '#FFFFFF' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF' }}
              tickLine={{ stroke: '#FFFFFF' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'white', paddingTop: '8px' }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              name="الحالي" 
              stroke={colors.current} 
              strokeWidth={CHART_ELEMENT_STYLES.line.strokeWidth} 
              dot={{ r: CHART_ELEMENT_STYLES.dot.radius, fill: colors.current, strokeWidth: CHART_ELEMENT_STYLES.dot.strokeWidth, stroke: 'white' }} 
              activeDot={{ r: CHART_ELEMENT_STYLES.line.activeDotSize, stroke: '#FFFFFF', strokeWidth: 2 }} 
              fill={`url(#${gradientId})`}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              name="السابق" 
              stroke={colors.previous} 
              strokeWidth={CHART_ELEMENT_STYLES.line.strokeWidth - 1} 
              strokeDasharray="5 5" 
              dot={{ r: CHART_ELEMENT_STYLES.dot.radius - 1, fill: colors.previous, strokeWidth: CHART_ELEMENT_STYLES.dot.strokeWidth, stroke: 'black' }} 
            />
            <Line 
              type="monotone" 
              dataKey="alternative" 
              name="المستهدف" 
              stroke={colors.alternative} 
              strokeWidth={CHART_ELEMENT_STYLES.line.strokeWidth - 1} 
              dot={{ r: CHART_ELEMENT_STYLES.dot.radius - 1, fill: colors.alternative, strokeWidth: CHART_ELEMENT_STYLES.dot.strokeWidth, stroke: 'white' }} 
            />
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart data={data}>
            <defs>
              <linearGradient id={`${gradientId}-current`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.current} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.current} stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id={`${gradientId}-previous`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.previous} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.previous} stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id={`${gradientId}-alternative`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.alternative} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.alternative} stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF' }}
              tickLine={{ stroke: '#FFFFFF' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF' }}
              tickLine={{ stroke: '#FFFFFF' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'white', paddingTop: '8px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="current" 
              name="الحالي" 
              fill={`url(#${gradientId}-current)`} 
              radius={[4, 4, 0, 0]} 
              stroke={colors.current}
              strokeWidth={1}
            />
            <Bar 
              dataKey="previous" 
              name="السابق" 
              fill={`url(#${gradientId}-previous)`} 
              radius={[4, 4, 0, 0]} 
              stroke={colors.previous}
              strokeWidth={1}
            />
            <Bar 
              dataKey="alternative" 
              name="المستهدف" 
              fill={`url(#${gradientId}-alternative)`} 
              radius={[4, 4, 0, 0]} 
              stroke={colors.alternative}
              strokeWidth={1}
            />
          </BarChart>
        );
        
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`${gradientId}-current`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.current} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={colors.current} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id={`${gradientId}-previous`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.previous} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={colors.previous} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id={`${gradientId}-alternative`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.alternative} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={colors.alternative} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF' }}
              tickLine={{ stroke: '#FFFFFF' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF' }}
              tickLine={{ stroke: '#FFFFFF' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'white', paddingTop: '8px' }}
              iconType="circle"
            />
            <Area 
              type="monotone" 
              dataKey="current" 
              name="الحالي" 
              stroke={colors.current} 
              fill={`url(#${gradientId}-current)`} 
              strokeWidth={CHART_ELEMENT_STYLES.line.strokeWidth} 
            />
            <Area 
              type="monotone" 
              dataKey="previous" 
              name="السابق" 
              stroke={colors.previous} 
              fill={`url(#${gradientId}-previous)`} 
              strokeWidth={CHART_ELEMENT_STYLES.line.strokeWidth - 1} 
              strokeDasharray="5 5" 
            />
            <Area 
              type="monotone" 
              dataKey="alternative" 
              name="المستهدف" 
              stroke={colors.alternative} 
              fill={`url(#${gradientId}-alternative)`} 
              strokeWidth={CHART_ELEMENT_STYLES.line.strokeWidth - 1} 
            />
          </AreaChart>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="bg-gradient-to-br from-black to-gray-900 border border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="border-b border-primary/10 bg-black/40">
        <CardTitle className="text-white">{title}</CardTitle>
        {description && <CardDescription className="text-gray-300">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-5">
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
