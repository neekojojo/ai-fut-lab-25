
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  data: any[];
  config: ChartConfigType;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, config }) => {
  // Function to create a custom tooltip that works with the recharts types
  const renderTooltipContent = (props: any) => {
    return <ChartTooltipContent {...props} />;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartConfigAdapter config={config}>
        <ChartContainer>
          <RechartsLineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="current"
              name="Current"
              stroke={config.current.color}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            {data.some((d) => d.previous !== undefined) && (
              <Line
                type="monotone"
                dataKey="previous"
                name="Previous"
                stroke={config.previous.color}
                strokeDasharray="5 5"
              />
            )}
            {data.some((d) => d.alternative !== undefined) && (
              <Line
                type="monotone"
                dataKey="alternative"
                name="Alternative"
                stroke={config.alternative.color}
                strokeDasharray="3 3"
              />
            )}
          </RechartsLineChart>
        </ChartContainer>
      </ChartConfigAdapter>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
