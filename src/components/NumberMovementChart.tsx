
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
  ResponsiveContainer,
  Cell,
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
  description?: string;
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
  description,
}) => {
  // Process data for charts if empty
  const ensureData = () => {
    if (!data || data.length === 0) {
      // Generate some placeholder data if none provided
      return [
        { name: "Metric 1", current: 75, previous: 65, alternative: 85 },
        { name: "Metric 2", current: 65, previous: 55, alternative: 75 },
        { name: "Metric 3", current: 80, previous: 70, alternative: 90 },
        { name: "Metric 4", current: 70, previous: 60, alternative: 80 },
        { name: "Metric 5", current: 85, previous: 75, alternative: 95 },
      ];
    }
    return data;
  };

  const chartData = ensureData();

  const config = {
    current: { color: colors.current, label: "Current" },
    previous: { color: colors.previous, label: "Previous" },
    alternative: { color: colors.alternative, label: "Alternative" },
  };

  // Function to create a custom tooltip that works with the recharts types
  const renderTooltipContent = (props: any) => {
    return <ChartTooltipContent {...props} />;
  };

  // Calculate the average improvement between current and previous
  const calculateImprovement = () => {
    if (!chartData.some(d => d.previous !== undefined)) return null;
    
    let totalChange = 0;
    let count = 0;
    
    chartData.forEach(d => {
      if (d.previous !== undefined) {
        totalChange += ((d.current - d.previous) / d.previous) * 100;
        count++;
      }
    });
    
    return count > 0 ? (totalChange / count).toFixed(1) : null;
  };

  const improvement = calculateImprovement();
  
  // Calculate maximum value for Y axis with 20% padding
  const getMaxYValue = () => {
    let maxValue = 0;
    
    chartData.forEach(d => {
      maxValue = Math.max(
        maxValue, 
        d.current, 
        d.previous || 0, 
        d.alternative || 0
      );
    });
    
    return Math.ceil(maxValue * 1.2); // 20% padding
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          {chartData.length > 0 && getMovementIcon(chartData[chartData.length - 1].current, chartData[0].current)}
        </div>
        {improvement && (
          <div className={`text-sm font-medium px-2 py-1 rounded-full ${parseFloat(improvement) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {parseFloat(improvement) >= 0 ? '+' : ''}{improvement}% vs previous
          </div>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={config}>
            {type === "line" && (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, getMaxYValue()]} 
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
                  stroke={colors.current}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                {chartData.some((d) => d.previous !== undefined) && (
                  <Line
                    type="monotone"
                    dataKey="previous"
                    name="Previous"
                    stroke={colors.previous}
                    strokeDasharray="5 5"
                  />
                )}
                {chartData.some((d) => d.alternative !== undefined) && (
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
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, getMaxYValue()]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend />
                <Bar dataKey="current" name="Current" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.current} />
                  ))}
                </Bar>
                {chartData.some((d) => d.previous !== undefined) && (
                  <Bar dataKey="previous" name="Previous" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors.previous} />
                    ))}
                  </Bar>
                )}
                {chartData.some((d) => d.alternative !== undefined) && (
                  <Bar dataKey="alternative" name="Alternative" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors.alternative} />
                    ))}
                  </Bar>
                )}
              </BarChart>
            )}

            {type === "area" && (
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, getMaxYValue()]} 
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
                  stroke={colors.current}
                  fill={`${colors.current}33`}
                />
                {chartData.some((d) => d.previous !== undefined) && (
                  <Area
                    type="monotone"
                    dataKey="previous"
                    name="Previous"
                    stroke={colors.previous}
                    fill={`${colors.previous}33`}
                  />
                )}
                {chartData.some((d) => d.alternative !== undefined) && (
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NumberMovementChart;
