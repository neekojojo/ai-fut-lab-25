
// Consistent color scheme for all charts
export const CHART_COLORS = {
  primary: '#8B5CF6',     // Vibrant Purple
  secondary: '#F97316',   // Bright Orange
  tertiary: '#0EA5E9',    // Ocean Blue
  quaternary: '#10B981',  // Vibrant Green
  negative: '#EF4444',    // Bright Red
  positive: '#22C55E',    // Bright Green
  neutral: '#FFFFFF',     // White for better visibility
  highlight: '#D946EF',   // Magenta Pink
  background: '#000000',  // Black background
  text: '#FFFFFF',        // White text
  
  // إضافة الألوان المفقودة
  blue: '#0EA5E9',        // نفس لون tertiary
  green: '#10B981',       // نفس لون quaternary
  orange: '#F97316',      // نفس لون secondary
  purple: '#8B5CF6',      // نفس لون primary المحدث
  red: '#EF4444',         // نفس لون negative
};

// Generic formatter for tooltip values to handle different types
export const formatTooltipValue = (value: any): string => {
  if (typeof value === 'number') {
    return value.toFixed(1);
  }
  return String(value);
};
