
import React, { useEffect, useState, useCallback } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useToast } from "@/hooks/use-toast";
import { formatTime, getAnalysisStageDescription } from './utils';
import ProgressIndicator from './ProgressIndicator';
import StuckWarning from './StuckWarning';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
  isMobile?: boolean;
  onReset?: () => void;
  analysisStartTime?: number;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({ 
  progress, 
  stage, 
  isMobile, 
  onReset,
  analysisStartTime = Date.now()
}) => {
  // Make sure progress is a valid number (not NaN)
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));
  
  // State to track if analysis is stuck
  const [isStuck, setIsStuck] = useState(false);
  const [stuckTime, setStuckTime] = useState(0);
  const [lastProgress, setLastProgress] = useState(0);
  const [lastProgressTime, setLastProgressTime] = useState(Date.now());
  
  // Calculate duration since analysis started
  const [elapsedTime, setElapsedTime] = useState(0);
  const { toast } = useToast();
  
  // Detect if analysis seems stuck
  const checkIfStuck = useCallback(() => {
    const now = Date.now();
    
    // Consider stuck if no progress for more than 15 seconds (reduced from 30s)
    if (safeProgress === lastProgress && safeProgress < 95) {
      const stuckDuration = Math.floor((now - lastProgressTime) / 1000);
      setStuckTime(stuckDuration);
      
      if (stuckDuration > 15) {
        setIsStuck(true);
      }
    } else {
      setLastProgress(safeProgress);
      setLastProgressTime(now);
      setStuckTime(0);
      setIsStuck(false);
    }
    
    // Calculate elapsed time
    setElapsedTime(Math.floor((now - analysisStartTime) / 1000));
  }, [safeProgress, lastProgress, lastProgressTime, analysisStartTime]);

  // Log values for debugging
  useEffect(() => {
    console.log(`AnalysisProcessing - Progress: ${safeProgress}%, Stage: ${stage || 'N/A'}, Elapsed: ${elapsedTime}s`);
  }, [safeProgress, stage, elapsedTime]);
  
  // Set interval to check if analysis is stuck and update elapsed time
  useEffect(() => {
    const interval = setInterval(checkIfStuck, 1000);
    return () => clearInterval(interval);
  }, [checkIfStuck]);
  
  // If stuck for too long, show notification
  useEffect(() => {
    if (isStuck && stuckTime === 20) { // Reduced from 45s to 20s
      toast({
        title: "تنبيه: عملية التحليل تستغرق وقتًا أطول من المعتاد",
        description: "يرجى الانتظار أو إعادة المحاولة إذا استمر ذلك.",
        variant: "default",
        duration: 10000,
      });
    }
  }, [isStuck, stuckTime, toast]);

  // Handle reset button click
  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };
  
  return (
    <div className={`animate-fade-in space-y-8 ${isMobile ? 'scale-95 transform-origin-top' : ''}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">تحليل الفيديو</h2>
        <p className="text-muted-foreground">
          يرجى الانتظار أثناء تحليل أداء اللاعب. قد تستغرق هذه العملية بضع دقائق.
        </p>
        {elapsedTime > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            الوقت المنقضي: {formatTime(elapsedTime)}
          </p>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <LoadingAnimation progress={safeProgress} stage={stage} />
      </div>
      
      <ProgressIndicator 
        progress={safeProgress} 
        stage={stage} 
        elapsedTime={elapsedTime} 
      />
      
      <div className="text-center text-sm">
        <p className="text-muted-foreground animate-pulse">
          {getAnalysisStageDescription(safeProgress)}
        </p>
      </div>
      
      {isStuck && <StuckWarning onReset={handleReset} />}
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>يرجى عدم إغلاق المتصفح أثناء المعالجة</p>
      </div>
    </div>
  );
};

export default AnalysisProcessing;
