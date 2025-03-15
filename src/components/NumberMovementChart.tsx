
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface DataPoint {
  name: string;
  current: number;
  previous?: number;
  alternative?: number;
}

interface NumberMovementProps {
  title: string;
  data: DataPoint[];
  type?: "line" | "bar" | "area";
  colors?: {
    current: string;
    previous?: string;
    alternative?: string;
  };
}

const getMovementIcon = (current: number, previous?: number) => {
  if (!previous || current === previous) return null;
  const percentChange = ((current - previous) / previous) * 100;
  
  if (percentChange > 10) return <TrendingUp className="text-green-500" />;
  if (percentChange > 0) return <ArrowUp className="text-green-500" />;
  if (percentChange < -10) return <TrendingDown className="text-red-500" />;
  if (percentChange < 0) return <ArrowDown className="text-red-500" />;
  return null;
};

const NumberMovementChart: React.FC<NumberMovementProps> = ({
  title,
  data,
  type = "line",
  colors = {
    current: "#8B5CF6",
    previous: "#D1D5DB",
    alternative: "#F97316",
  },
}) => {
  const config = {
    current: { color: colors.current, label: "Current" },
    previous: { color: colors.previous, label: "Previous" },
    alternative: { color: colors.alternative, label: "Alternative" },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {data.length > 0 && getMovementIcon(data[data.length - 1].current, data[0].current)}
      </div>

      <div className="h-64 w-full">
        <ChartContainer config={config}>
          {type === "line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="current"
                name="Current"
                stroke={colors.current}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              {data.some((d) => d.previous !== undefined) && (
                <Line
                  type="monotone"
                  dataKey="previous"
                  name="Previous"
                  stroke={colors.previous}
                  strokeDasharray="5 5"
                />
              )}
              {data.some((d) => d.alternative !== undefined) && (
                <Line
                  type="monotone"
                  dataKey="alternative"
                  name="Alternative"
                  stroke={colors.alternative}
                  strokeDasharray="3 3"
                />
              )}
            </LineChart>
          )}

          {type === "bar" && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
              <Legend />
              <Bar dataKey="current" name="Current" fill={colors.current} />
              {data.some((d) => d.previous !== undefined) && (
                <Bar dataKey="previous" name="Previous" fill={colors.previous} />
              )}
              {data.some((d) => d.alternative !== undefined) && (
                <Bar dataKey="alternative" name="Alternative" fill={colors.alternative} />
              )}
            </BarChart>
          )}

          {type === "area" && (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="current"
                name="Current"
                stroke={colors.current}
                fill={`${colors.current}33`}
              />
              {data.some((d) => d.previous !== undefined) && (
                <Area
                  type="monotone"
                  dataKey="previous"
                  name="Previous"
                  stroke={colors.previous}
                  fill={`${colors.previous}33`}
                />
              )}
              {data.some((d) => d.alternative !== undefined) && (
                <Area
                  type="monotone"
                  dataKey="alternative"
                  name="Alternative"
                  stroke={colors.alternative}
                  fill={`${colors.alternative}33`}
                />
              )}
            </AreaChart>
          )}
        </ChartContainer>
      </div>
    </div>
  );
};

export default NumberMovementChart;
