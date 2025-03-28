
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
      
      {/* Linear progress indicator */}
      <div className="max-w-md mx-auto w-full space-y-2">
        <Progress value={safeProgress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>يرجى عدم إغلاق المتصفح أثناء المعالجة</p>
      </div>
    </div>
  );
};

export default AnalysisProcessing;
