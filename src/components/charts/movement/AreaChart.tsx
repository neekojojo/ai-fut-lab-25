
import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { getMaxYValue } from "./utils";
import { ChartConfigType } from "./types";
import ChartConfigAdapter from "./ChartConfigAdapter";

interface AreaChartProps {
  data: any[];
  config: ChartConfigType;
}

const AreaChartComponent: React.FC<AreaChartProps> = ({ data, config }) => {
  // Function to create a custom tooltip that works with the recharts types
  const renderTooltipContent = (props: any) => {
    return <ChartTooltipContent {...props} />;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartConfigAdapter config={config}>
        <ChartContainer>
          <RechartsAreaChart data={data}>
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
            <Area
              type="monotone"
              dataKey="current"
              name="Current"
              stroke={config.current.color}
              fill={`${config.current.color}33`}
            />
            {data.some((d) => d.previous !== undefined) && (
              <Area
                type="monotone"
                dataKey="previous"
                name="Previous"
                stroke={config.previous.color}
                fill={`${config.previous.color}33`}
              />
            )}
            {data.some((d) => d.alternative !== undefined) && (
              <Area
                type="monotone"
                dataKey="alternative"
                name="Alternative"
                stroke={config.alternative.color}
                fill={`${config.alternative.color}33`}
              />
            )}
          </RechartsAreaChart>
        </ChartContainer>
      </ChartConfigAdapter>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
