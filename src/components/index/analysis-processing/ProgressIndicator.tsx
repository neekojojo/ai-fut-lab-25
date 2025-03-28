
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { getProgressColor, getEstimatedTimeRemaining } from './utils';

interface ProgressIndicatorProps {
  progress: number;
  stage: string;
  elapsedTime: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, stage, elapsedTime }) => {
  return (
    <div className="max-w-md mx-auto w-full space-y-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{stage || 'جاري التحليل...'}</span>
        <span className="font-medium">{progress}%</span>
      </div>
      
      <Progress 
        value={progress} 
        className={`h-2 transition-colors duration-500 ${getProgressColor(progress)}`}
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span>الوقت المتبقي: {getEstimatedTimeRemaining(progress, elapsedTime)}</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
