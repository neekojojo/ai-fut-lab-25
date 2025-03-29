
// Consistent color scheme for all charts
export const CHART_COLORS = {
  primary: '#8B5CF6',     // Vibrant Purple
  secondary: '#F97316',   // Bright Orange
  tertiary: '#22D3EE',    // Bright Cyan
  quaternary: '#10B981',  // Vibrant Green
  negative: '#EF4444',    // Bright Red
  positive: '#22C55E',    // Bright Green
  neutral: '#FFFFFF',     // White for better visibility
  highlight: '#F471B5',   // Magenta Pink
  background: '#000000',  // Black background
  text: '#FFFFFF',        // White text
  
  // إضافة الألوان المفقودة
  blue: '#22D3EE',        // تحديث لون tertiary لازرق ساطع
  green: '#10B981',       // نفس لون quaternary
  orange: '#F97316',      // نفس لون secondary
  purple: '#8B5CF6',      // نفس لون primary المحدث
  red: '#EF4444',         // نفس لون negative
};

// توهجات الظلال للمخططات
export const SHADOW_EFFECTS = {
  glow: '0 0 12px',       // ظل أساسي
  strongGlow: '0 0 20px', // ظل قوي
  textGlow: '0 0 5px',    // ظل للنصوص
};

// Generic formatter for tooltip values to handle different types
export const formatTooltipValue = (value: any): string => {
  if (typeof value === 'number') {
    return value.toFixed(1);
  }
  return String(value);
};

// أسلوب العناصر للمخططات
export const CHART_ELEMENT_STYLES = {
  dot: {
    radius: 6,
    strokeWidth: 2,
    fill: CHART_COLORS.primary,
    stroke: CHART_COLORS.text,
  },
  line: {
    strokeWidth: 3,
    activeDotSize: 8,
  },
  text: {
    fontSize: 12,
    fill: CHART_COLORS.text,
  },
  tooltip: {
    background: 'rgba(0, 0, 0, 0.9)',
    border: '1px solid rgba(139, 92, 246, 0.5)',
    textColor: 'white',
  }
};
