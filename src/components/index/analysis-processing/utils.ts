
/**
 * Format time duration in seconds to minutes:seconds format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

/**
 * Get description of the current analysis stage based on progress percentage
 */
export const getAnalysisStageDescription = (progress: number): string => {
  if (progress < 15) {
    return 'جاري معالجة الفيديو واستخراج الإطارات الأساسية...';
  } else if (progress < 30) {
    return 'تحليل حركة اللاعب والمواقع على الملعب...';
  } else if (progress < 50) {
    return 'قياس السرعة والتسارع وتحليل الأنماط الحركية...';
  } else if (progress < 70) {
    return 'تقييم المهارات الفنية والتكتيكية للاعب...';
  } else if (progress < 85) {
    return 'تحليل الأداء البدني وقياس مؤشرات اللياقة...';
  } else if (progress < 95) {
    return 'مقارنة البيانات بالمعايير المرجعية وإعداد التقرير...';
  } else {
    return 'اكتمال التحليل، جاري إنهاء التقرير النهائي...';
  }
};

/**
 * Determine if the process might be experiencing a network issue
 */
export const checkNetworkIssue = (elapsedTime: number, progress: number): boolean => {
  // If we've been running more than 45 seconds with progress < 20%, might be network issue
  return elapsedTime > 45 && progress < 20;
};

/**
 * Calculate estimated remaining time based on progress and elapsed time
 */
export const calculateEstimatedRemainingTime = (progress: number, elapsedTime: number): number => {
  if (progress <= 0) return 180; // Default 3 minutes
  const timePerPercent = elapsedTime / progress;
  return Math.round(timePerPercent * (100 - progress));
};
