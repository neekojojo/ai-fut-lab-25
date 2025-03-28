
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
