
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";

/**
 * Determines which movement icon to display based on current and previous values
 */
export const getMovementIcon = (current: number, previous?: number) => {
  if (!previous || current === previous) return null;
  const percentChange = ((current - previous) / previous) * 100;
  
  if (percentChange > 10) return <TrendingUp className="text-green-500" />;
  if (percentChange > 0) return <ArrowUp className="text-green-500" />;
  if (percentChange < -10) return <TrendingDown className="text-red-500" />;
  if (percentChange < 0) return <ArrowDown className="text-red-500" />;
  return null;
};

/**
 * Calculates the improvement percentage between current and previous data
 */
export const calculateImprovement = (chartData: any[]) => {
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

/**
 * Calculates the maximum Y-axis value with padding
 */
export const getMaxYValue = (chartData: any[]) => {
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

/**
 * Ensures that valid data is always provided for charts
 */
export const ensureData = (data: any[]) => {
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
