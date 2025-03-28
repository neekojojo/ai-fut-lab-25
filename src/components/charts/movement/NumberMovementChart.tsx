
import React from "react";
import { getMovementIcon, calculateImprovement, ensureData } from "./utils";
import LineChartComponent from "./LineChart";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";
import ChartInfo, { ChartDescription, ChartImprovementBadge } from "./ChartInfo";
import { NumberMovementProps, ChartConfigType } from "./types";

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
  const chartData = ensureData(data);

  // Create a config object that includes our chart configuration
  const config: ChartConfigType = {
    current: { color: colors.current, label: "Current" },
    previous: { color: colors.previous || "#D1D5DB", label: "Previous" },
    alternative: { color: colors.alternative || "#F97316", label: "Alternative" },
    // Adding default property for the index signature requirement
    default: { color: "#D1D5DB", label: "Default" }
  };

  // Calculate the average improvement between current and previous
  const improvement = calculateImprovement(chartData);

  // Render the appropriate chart component based on the type
  const renderChart = () => {
    switch (type) {
      case "bar":
        return <BarChartComponent data={chartData} config={config} />;
      case "area":
        return <AreaChartComponent data={chartData} config={config} />;
      case "line":
      default:
        return <LineChartComponent data={chartData} config={config} />;
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          {chartData.length > 0 && getMovementIcon(chartData[chartData.length - 1].current, chartData[0].current)}
        </div>
        <ChartImprovementBadge improvement={improvement} />
      </div>

      <ChartDescription description={description} />

      <div className="h-64 w-full">
        {renderChart()}
      </div>
    </div>
  );
};

export default NumberMovementChart;
