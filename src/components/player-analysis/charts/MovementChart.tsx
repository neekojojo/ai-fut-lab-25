
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MovementChartData {
  timestamp: number;
  speed: number;
  acceleration: number;
}

interface MovementChartProps {
  data: MovementChartData[];
}

const MovementChart: React.FC<MovementChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" label={{ value: 'الوقت (ثانية)', position: 'insideBottomRight', offset: -5 }} />
        <YAxis yAxisId="left" label={{ value: 'السرعة (كم/س)', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'التسارع (م/ث²)', angle: 90, position: 'insideRight' }} />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'speed') return [`${value} كم/س`, 'السرعة'];
            if (name === 'acceleration') return [`${value} م/ث²`, 'التسارع'];
            return [value, name];
          }}
        />
        <Legend formatter={(value) => {
          if (value === 'speed') return 'السرعة';
          if (value === 'acceleration') return 'التسارع';
          return value;
        }} />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="speed" 
          stroke="#6366F1" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="acceleration" 
          stroke="#10B981" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MovementChart;
