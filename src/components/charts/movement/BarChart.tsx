
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { getMaxYValue } from "./utils";
import { ChartConfigType } from "./types";
import ChartConfigAdapter from "./ChartConfigAdapter";

interface BarChartProps {
  data: any[];
  config: ChartConfigType;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, config }) => {
  // Function to create a custom tooltip that works with the recharts types
  const renderTooltipContent = (props: any) => {
    return <ChartTooltipContent {...props} />;
  };

  return (
    <ChartConfigAdapter config={config}>
      <ChartContainer>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <YAxis 
            domain={[0, getMaxYValue(data)]} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar
            dataKey="current"
            name="Current"
            fill={config.current.color}
            radius={[4, 4, 0, 0]}
          />
          {data.some((d) => d.previous !== undefined) && (
            <Bar
              dataKey="previous"
              name="Previous"
              fill={config.previous.color}
              radius={[4, 4, 0, 0]}
            />
          )}
          {data.some((d) => d.alternative !== undefined) && (
            <Bar
              dataKey="alternative"
              name="Alternative"
              fill={config.alternative.color}
              radius={[4, 4, 0, 0]}
            />
          )}
        </RechartsBarChart>
      </ChartContainer>
    </ChartConfigAdapter>
  );
};

export default BarChartComponent;
