
// Format time in minutes and seconds
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Get description text based on progress percentage
export const getAnalysisStageDescription = (progress: number) => {
  if (progress < 25) {
    return "جاري تحليل معلومات الفيديو...";
  } else if (progress < 50) {
    return "تحليل حركة اللاعب والسرعة...";
  } else if (progress < 75) {
    return "تحليل المهارات الفنية والتكتيكية...";
  } else if (progress < 95) {
    return "إنشاء تقرير التحليل النهائي...";
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
