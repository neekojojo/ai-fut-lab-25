
import React, { useEffect, useState, useCallback } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { formatTime, getAnalysisStageDescription } from './utils';

export interface AnalysisProcessingProps {
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
  
  // Map progress value to a color based on percentage
  const getProgressColor = (value: number) => {
    if (value < 30) return 'bg-blue-500';
    if (value < 60) return 'bg-indigo-500';
    if (value < 90) return 'bg-purple-500';
    return 'bg-green-500';
  };

  // Calculate time remaining estimation
  const getEstimatedTimeRemaining = (value: number) => {
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
  
  // Detect if analysis seems stuck
  const checkIfStuck = useCallback(() => {
    const now = Date.now();
    
    // Consider stuck if no progress for more than 15 seconds
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
  
  // Set interval to check if analysis is stuck and update elapsed time
  useEffect(() => {
    const interval = setInterval(checkIfStuck, 1000);
    return () => clearInterval(interval);
  }, [checkIfStuck]);
  
  // If stuck for too long, show notification
  useEffect(() => {
    if (isStuck && stuckTime === 20) {
      toast({
        title: "تنبيه: عملية التحليل تستغرق وقتًا أطول من المعتاد",
        description: "يرجى الانتظار أو إعادة المحاولة إذا استمر ذلك.",
        variant: "default",
        duration: 10000,
      });
    }
  }, [isStuck, stuckTime, toast]);

  // Simulate progress for demo purposes
  useEffect(() => {
    const simulateProgress = () => {
      setLastProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 2;
      });
    };
    
    const interval = setInterval(simulateProgress, 1000);
    return () => clearInterval(interval);
  }, []);
  
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
        <p className="text-muted-foreground animate-pulse">
          {getAnalysisStageDescription(safeProgress)}
        </p>
      </div>
      
      {/* Display warning and reset button if analysis appears stuck */}
      {isStuck && (
        <Alert variant="default" className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-500">
            يبدو أن عملية التحليل تستغرق وقتًا أطول من المتوقع
          </AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
            يمكنك الانتظار أو إعادة تشغيل التحليل إذا استمرت المشكلة
          </AlertDescription>
          
          <div className="mt-3 flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-800 flex items-center gap-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة التحليل</span>
            </Button>
          </div>
        </Alert>
      )}
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>يرجى عدم إغلاق المتصفح أثناء المعالجة</p>
      </div>
    </div>
  );
};

export default AnalysisProcessing;
