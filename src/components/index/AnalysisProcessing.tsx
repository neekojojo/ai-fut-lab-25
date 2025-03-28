
import React, { useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Progress } from '@/components/ui/progress';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
  isMobile?: boolean;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({ progress, stage, isMobile }) => {
  // Make sure progress is a valid number (not NaN)
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));
  
  // Log values for debugging
  useEffect(() => {
    console.log(`AnalysisProcessing - Progress: ${safeProgress}%, Stage: ${stage || 'N/A'}`);
  }, [safeProgress, stage]);
  
  // Map progress value to a color based on percentage
  const getProgressColor = (value: number) => {
    if (value < 30) return 'bg-blue-500';
    if (value < 60) return 'bg-indigo-500';
    if (value < 90) return 'bg-purple-500';
    return 'bg-green-500';
  };

  // Calculate time remaining estimation (simulated)
  const getEstimatedTimeRemaining = (value: number) => {
    if (value >= 100) return 'مكتمل';
    if (value > 95) return 'ثوان معدودة';
    const baseTime = Math.ceil((100 - value) / 10); // rough estimate
    return `${baseTime} دقائق تقريبًا`;
  };
  
  return (
    <div className={`animate-fade-in space-y-8 ${isMobile ? 'scale-95 transform-origin-top' : ''}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">تحليل الفيديو</h2>
        <p className="text-muted-foreground">
          يرجى الانتظار أثناء تحليل أداء اللاعب. قد تستغرق هذه العملية بضع دقائق.
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <LoadingAnimation progress={safeProgress} stage={stage} />
      </div>
      
      {/* Enhanced progress indicator with variable color and time remaining */}
      <div className="max-w-md mx-auto w-full space-y-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">{stage || 'جاري التحليل...'}</span>
          <span className="font-medium">{safeProgress}%</span>
        </div>
        
        <Progress 
          value={safeProgress} 
          className={`h-2 transition-colors duration-500 ${getProgressColor(safeProgress)}`}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>الوقت المتبقي: {getEstimatedTimeRemaining(safeProgress)}</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="text-center text-sm">
        {safeProgress < 25 && (
          <p className="text-muted-foreground animate-pulse">جاري تحليل معلومات الفيديو...</p>
        )}
        {safeProgress >= 25 && safeProgress < 50 && (
          <p className="text-muted-foreground animate-pulse">تحليل حركة اللاعب والسرعة...</p>
        )}
        {safeProgress >= 50 && safeProgress < 75 && (
          <p className="text-muted-foreground animate-pulse">تحليل المهارات الفنية والتكتيكية...</p>
        )}
        {safeProgress >= 75 && safeProgress < 95 && (
          <p className="text-muted-foreground animate-pulse">إنشاء تقرير التحليل النهائي...</p>
        )}
        {safeProgress >= 95 && (
          <p className="text-muted-foreground animate-pulse">اكتمل التحليل، جاري تحضير النتائج...</p>
        )}
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>يرجى عدم إغلاق المتصفح أثناء المعالجة</p>
      </div>
    </div>
  );
};

export default AnalysisProcessing;
