
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { externalApiUtils } from '@/utils/externalApiUtils';

/**
 * Position-based market value multipliers
 */
const POSITION_MULTIPLIERS: Record<string, number> = {
  'Forward': 1.3,
  'Striker': 1.3,
  'Midfielder': 1.2,
  'Defender': 1.0,
  'Goalkeeper': 0.9,
  'default': 1.1
};

/**
 * Age-based market value multipliers
 */
const getAgeMultiplier = (age: number): number => {
  if (age < 21) return 1.5; // Young talents have high potential
  if (age < 25) return 1.3; // Prime development years
  if (age < 28) return 1.1; // Peak performance years
  if (age < 31) return 0.9; // Early decline
  if (age < 34) return 0.7; // Mid decline
  return 0.5; // Late career
};

/**
 * Calculate baseline market value based on player stats
 */
const calculateBaseMarketValue = (stats: any): number => {
  if (!stats) return 500000; // Default baseline value
  
  // Calculate weighted score based on key attributes
  const weightedScore = (
    (stats.pace || 70) * 0.15 +
    (stats.shooting || 70) * 0.2 +
    (stats.passing || 70) * 0.15 +
    (stats.dribbling || 70) * 0.15 +
    (stats.defending || 70) * 0.1 +
    (stats.physical || 70) * 0.1 +
    (stats.vision || 70) * 0.05 +
    (stats.composure || 70) * 0.05 +
    (stats.ballControl || 70) * 0.05
  );
  
  // Base value calculation (exponential to reflect how top talent commands premium prices)
  return 200000 * Math.pow(1.05, weightedScore - 70);
};

/**
 * Generate forecasted market values for next 24 months
 */
export const generateMarketValueForecast = (playerAnalysis: PlayerAnalysis): {
  currentValue: number;
  forecastData: Array<{ month: string; value: number }>;
  growthPercentage: number;
} => {
  // Extract necessary data from player analysis
  const position = playerAnalysis.position || 'Midfielder';
  const age = playerAnalysis.age || 25;
  const talentScore = playerAnalysis.talentScore || 75;
  
  // Calculate current market value
  const baseValue = calculateBaseMarketValue(playerAnalysis.stats);
  const positionMultiplier = POSITION_MULTIPLIERS[position] || POSITION_MULTIPLIERS.default;
  const ageMultiplier = getAgeMultiplier(age);
  const talentMultiplier = 0.5 + (talentScore / 100);
  
  const currentValue = baseValue * positionMultiplier * ageMultiplier * talentMultiplier;
  
  // Generate forecast data
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  
  const forecastData = [];
  let forecastValue = currentValue;
  
  // Growth factors
  const ageFactor = age < 23 ? 1.5 : age < 27 ? 1.2 : age < 30 ? 1.0 : 0.8;
  const potentialFactor = talentScore / 100 + 0.5;
  const positionFactor = position.includes('Forward') ? 1.3 : 
                        position.includes('Midfielder') ? 1.2 : 
                        position.includes('Goalkeeper') ? 0.9 : 1.0;
  
  // Monthly growth rate
  const monthlyGrowthRate = 0.01 * ageFactor * potentialFactor * positionFactor;
  
  // Generate monthly forecast for 24 months
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  for (let i = 0; i < 24; i++) {
    // Add random fluctuations for realism
    const randomFactor = 0.97 + Math.random() * 0.06; // -3% to +3% fluctuation
    forecastValue = forecastValue * (1 + monthlyGrowthRate) * randomFactor;
    
    forecastData.push({
      month: `${months[currentMonth]} ${currentYear}`,
      value: Math.round(forecastValue / 1000) * 1000 // Round to nearest 1000
    });
    
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  
  // Calculate total growth percentage
  const growthPercentage = ((forecastData[forecastData.length - 1].value - currentValue) / currentValue) * 100;
  
  return {
    currentValue,
    forecastData,
    growthPercentage
  };
};

/**
 * Format currency value for display
 */
export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

/**
 * Get factors affecting market value
 */
export const getMarketValueFactors = (playerAnalysis: PlayerAnalysis): Array<{
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}> => {
  const factors = [];
  const age = playerAnalysis.age || 25;
  const position = playerAnalysis.position || 'Midfielder';
  const stats = playerAnalysis.stats || {};
  
  // Age factor
  if (age < 23) {
    factors.push({
      factor: 'العمر',
      impact: 'positive',
      description: 'عمر صغير مع إمكانية تطور كبيرة'
    });
  } else if (age > 30) {
    factors.push({
      factor: 'العمر',
      impact: 'negative',
      description: 'تجاوز سن الذروة مما يقلل من القيمة السوقية'
    });
  } else {
    factors.push({
      factor: 'العمر',
      impact: 'neutral',
      description: 'في سن مثالي للأداء'
    });
  }
  
  // Position factor
  if (position.includes('Forward') || position === 'Striker') {
    factors.push({
      factor: 'المركز',
      impact: 'positive',
      description: 'المهاجمون عادة لهم قيمة سوقية أعلى'
    });
  } else if (position === 'Goalkeeper') {
    factors.push({
      factor: 'المركز',
      impact: 'negative',
      description: 'حراس المرمى عادة لهم قيمة سوقية أقل'
    });
  }
  
  // Key stats factors
  if ((stats.pace || 0) > 85) {
    factors.push({
      factor: 'السرعة',
      impact: 'positive',
      description: 'سرعة استثنائية تزيد من القيمة السوقية'
    });
  }
  
  if ((stats.vision || 0) > 85) {
    factors.push({
      factor: 'الرؤية',
      impact: 'positive',
      description: 'رؤية ممتازة للملعب تعزز القيمة'
    });
  }
  
  if ((stats.shooting || 0) < 70 && position.includes('Forward')) {
    factors.push({
      factor: 'التسديد',
      impact: 'negative',
      description: 'مستوى تسديد منخفض للمهاجم يؤثر سلباً'
    });
  }
  
  return factors;
};
