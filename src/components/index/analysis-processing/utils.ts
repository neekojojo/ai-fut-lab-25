
/**
 * Utility functions for the analysis processing component
 */

/**
 * Maps progress value to a color based on percentage
 */
export const getProgressColor = (value: number): string => {
  if (value < 30) return 'bg-blue-500';
  if (value < 60) return 'bg-indigo-500';
  if (value < 90) return 'bg-purple-500';
  return 'bg-green-500';
};

/**
 * Calculate time remaining estimation
 */
export const getEstimatedTimeRemaining = (value: number, elapsedTime: number): string => {
  if (value >= 100) return 'مكتمل';
  if (value > 95) return 'ثوان معدودة';
  
  // Better estimation based on actual progress rate
  if (elapsedTime > 0 && value > 0) {
    const estimatedTotalTime = (elapsedTime / value) * 100;
    const remainingTime = Math.max(0, estimatedTotalTime - elapsedTime);
    const remainingMinutes = Math.ceil(remainingTime / 60);
    
    if (remainingMinutes < 1) return 'أقل من دقيقة';
    return `${remainingMinutes} دقائق تقريبًا`;
  }
  
  // Fallback estimation
  const baseTime = Math.ceil((100 - value) / 10); // rough estimate
  return `${baseTime} دقائق تقريبًا`;
};

/**
 * Format time in minutes and seconds
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

/**
 * Get analysis stage description based on progress
 */
export const getAnalysisStageDescription = (progress: number): string => {
  if (progress < 25) {
    return 'جاري تحليل معلومات الفيديو...';
  } else if (progress < 50) {
    return 'تحليل حركة اللاعب والسرعة...';
  } else if (progress < 75) {
    return 'تحليل المهارات الفنية والتكتيكية...';
  } else if (progress < 95) {
    return 'إنشاء تقرير التحليل النهائي...';
  } else {
    return 'اكتمل التحليل، جاري تحضير النتائج...';
  }
};
