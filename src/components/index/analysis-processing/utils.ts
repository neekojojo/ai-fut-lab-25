
// Format time in minutes and seconds
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Get description text based on progress percentage
export const getAnalysisStageDescription = (progress: number) => {
  if (progress < 20) {
    return "جاري تحليل معلومات الفيديو...";
  } else if (progress < 40) {
    return "تحليل حركة اللاعب والسرعة...";
  } else if (progress < 60) {
    return "تحليل المهارات الفنية والتكتيكية...";
  } else if (progress < 80) {
    return "مقارنة المعلومات مع قاعدة البيانات...";
  } else if (progress < 95) {
    return "التكامل مع الأنظمة الخارجية...";
  } else {
    return "اكتمل التحليل، جاري تحضير النتائج...";
  }
};

// Check if there might be a network issue based on elapsed time and progress
export const checkNetworkIssue = (elapsedTime: number, progress: number): boolean => {
  // If more than 30 seconds have passed and progress is still less than 20%
  if (elapsedTime > 30 && progress < 20) {
    return true;
  }
  
  // If more than 60 seconds have passed and progress is still less than 50%
  if (elapsedTime > 60 && progress < 50) {
    return true;
  }
  
  // If more than 120 seconds (2 minutes) have passed and progress is still less than 80%
  if (elapsedTime > 120 && progress < 80) {
    return true;
  }
  
  // No network issue detected
  return false;
};

// Calculate estimated time remaining based on current progress rate
export const calculateEstimatedTime = (progress: number, elapsedTime: number): number => {
  if (progress <= 0 || elapsedTime <= 0) return 300; // Default 5 minutes
  
  // Calculate rate of progress (percent per second)
  const progressRate = progress / elapsedTime;
  
  // Calculate remaining percent
  const remainingPercent = 100 - progress;
  
  // Calculate estimated remaining time
  const estimatedTimeRemaining = remainingPercent / progressRate;
  
  // Cap at reasonable maximum (5 minutes)
  return Math.min(300, Math.round(estimatedTimeRemaining));
};

// Auto-adjust progress to ensure it keeps moving
export const getAutoAdjustedProgress = (
  progress: number, 
  lastProgress: number,
  elapsedTime: number,
  lastProgressUpdateTime: number
): number => {
  // If progress is already complete or moving, return as is
  if (progress >= 100 || progress > lastProgress) {
    return progress;
  }
  
  const secondsSinceLastUpdate = (Date.now() - lastProgressUpdateTime) / 1000;
  
  // If stuck for more than 15 seconds, auto-increment
  if (secondsSinceLastUpdate > 15) {
    // Calculate increment based on how long we've been stuck
    // Larger increments the longer we're stuck
    const baseIncrement = Math.min(3, secondsSinceLastUpdate / 10);
    
    // More aggressive adjustments at common sticking points
    let adjustmentFactor = 1;
    if (progress > 45 && progress < 55) {
      adjustmentFactor = 1.5; // Boost around 50%
    } else if (progress > 85 && progress < 95) {
      adjustmentFactor = 2; // Stronger boost near the end
    }
    
    const increment = baseIncrement * adjustmentFactor;
    
    // Cap the maximum progress to 97% for auto-adjustment
    // (leaving the final steps for the actual completion)
    return Math.min(97, progress + increment);
  }
  
  return progress;
};

// Check if WebGL is available for acceleration
export const isWebGLAccelerationAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Get a more detailed analysis stage based on progress
export const getDetailedAnalysisStage = (progress: number): string => {
  if (progress < 15) {
    return "استخراج إطارات الفيديو";
  } else if (progress < 30) {
    return "تحليل حركة اللاعب";
  } else if (progress < 45) {
    return "تقييم المهارات الفنية";
  } else if (progress < 60) {
    return "حساب المؤشرات التكتيكية";
  } else if (progress < 75) {
    return "مقارنة مع بيانات اللاعبين المحترفين";
  } else if (progress < 85) {
    return "تحليل القيمة السوقية";
  } else if (progress < 95) {
    return "تكامل مع أنظمة FIFA وTransfermarkt";
  } else {
    return "إنهاء التحليل وتحضير التقرير";
  }
};
