
import React from 'react';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';

// Function to get the maximum Y value from the data
export const getMaxYValue = (data: any[]): number => {
  if (!data || data.length === 0) return 100;
  
  let maxVal = 0;
  
  data.forEach(item => {
    // Check current, previous, and alternative values
    if (item.current !== undefined && item.current > maxVal) maxVal = item.current;
    if (item.previous !== undefined && item.previous > maxVal) maxVal = item.previous;
    if (item.alternative !== undefined && item.alternative > maxVal) maxVal = item.alternative;
  });
  
  // Add 10% padding to the max value for better visualization
  return Math.ceil(maxVal * 1.1);
};

// Function to get appropriate movement icon based on start and end values
export const getMovementIcon = (endValue: number, startValue: number) => {
  if (!endValue || !startValue) return null;
  
  const difference = endValue - startValue;
  const threshold = 0.05 * startValue; // 5% threshold for significant change
  
  if (difference > threshold) {
    return <ArrowUp className="h-4 w-4 text-green-500 ml-2" />;
  } else if (difference < -threshold) {
    return <ArrowDown className="h-4 w-4 text-red-500 ml-2" />;
  } else {
    return <ArrowRight className="h-4 w-4 text-amber-500 ml-2" />;
  }
};

// Function to calculate improvement percentage
export const calculateImprovement = (data: any[]): number => {
  if (!data || data.length < 2 || !data.some(d => d.previous !== undefined)) {
    return 0;
  }
  
  // Calculate average value for current and previous datasets
  let currentSum = 0;
  let previousSum = 0;
  let count = 0;
  
  data.forEach(item => {
    if (item.current !== undefined && item.previous !== undefined) {
      currentSum += item.current;
      previousSum += item.previous;
      count++;
    }
  });
  
  if (count === 0 || previousSum === 0) return 0;
  
  const currentAvg = currentSum / count;
  const previousAvg = previousSum / count;
  
  // Calculate percentage improvement
  return ((currentAvg - previousAvg) / previousAvg) * 100;
};

// Function to ensure we have valid data for charts
export const ensureData = (data: any[]): any[] => {
  if (!data || data.length === 0) {
    // Return sample data if none provided
    return [
      { name: 'Sample 1', current: 30, previous: 25 },
      { name: 'Sample 2', current: 40, previous: 32 },
      { name: 'Sample 3', current: 35, previous: 30 },
      { name: 'Sample 4', current: 50, previous: 40 },
      { name: 'Sample 5', current: 45, previous: 38 }
    ];
  }
  
  return data;
};
