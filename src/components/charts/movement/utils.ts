
import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { DataPoint } from '../DataTypes';

// Function to get an appropriate movement icon based on values
export const getMovementIcon = (current: number, previous: number) => {
  const diff = current - previous;
  const threshold = 5;

  if (diff > threshold) {
    return React.createElement(TrendingUp, { className: "ml-2 h-4 w-4 text-green-500" });
  } else if (diff < -threshold) {
    return React.createElement(TrendingDown, { className: "ml-2 h-4 w-4 text-red-500" });
  } else {
    return React.createElement(Minus, { className: "ml-2 h-4 w-4 text-amber-500" });
  }
};

// Calculate the improvement percentage between current and previous values
export const calculateImprovement = (data: DataPoint[]): number => {
  // If data is empty, return 0
  if (!data || data.length === 0) return 0;

  // Calculate the total current and previous values
  let totalCurrent = 0;
  let totalPrevious = 0;
  let count = 0;

  data.forEach((item) => {
    if (item.current !== undefined && item.previous !== undefined) {
      totalCurrent += item.current;
      totalPrevious += item.previous;
      count++;
    }
  });

  // Calculate the percentage improvement
  if (count === 0 || totalPrevious === 0) return 0;

  return Math.round(((totalCurrent - totalPrevious) / totalPrevious) * 100);
};

// Function to calculate the maximum Y value for the charts
export const getMaxYValue = (data: any[]): number => {
  if (!data || data.length === 0) return 100;

  const allValues = data.flatMap((item) => [
    item.current || 0,
    item.previous || 0,
    item.alternative || 0,
  ]);

  const maxValue = Math.max(...allValues);
  // Add a buffer of 10% for better visualization
  return Math.ceil(maxValue * 1.1);
};

// Ensure that the data is properly formatted for the charts
export const ensureData = (data: DataPoint[]): DataPoint[] => {
  if (!data || data.length === 0) {
    // Return default data if none is provided
    return [
      { name: "No Data", current: 0, previous: 0, alternative: 0 },
    ];
  }

  return data;
};
