
// Consistent color scheme for all charts
export const CHART_COLORS = {
  primary: '#8B5CF6',     // Purple
  secondary: '#F97316',   // Orange
  tertiary: '#0EA5E9',    // Blue
  quaternary: '#10B981',  // Green
  negative: '#EF4444',    // Red
  positive: '#22C55E',    // Green
  neutral: '#8E9196',     // Gray
  highlight: '#D946EF',   // Pink
  background: '#F1F0FB',  // Light purple/gray
  text: '#1A1F2C',        // Dark purple/blue
};

// Generic formatter for tooltip values to handle different types
export const formatTooltipValue = (value: any): string => {
  if (typeof value === 'number') {
    return value.toFixed(1);
  }
  return String(value);
};
