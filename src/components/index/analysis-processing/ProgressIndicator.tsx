
import React, { useMemo } from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { checkNetworkIssue } from './utils';

interface ProgressIndicatorProps {
  progress: number;
  stage: string;
  elapsedTime: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  progress, 
  stage, 
  elapsedTime 
}) => {
  // Determine if there might be a network issue
  const potentialNetworkIssue = useMemo(
    () => checkNetworkIssue(elapsedTime, progress),
    [elapsedTime, progress]
  );
  
  // Determine status indicators
  const isFrameExtractionComplete = progress >= 25;
  const isPlayerDetectionComplete = progress >= 50;
  const isAnalysisComplete = progress >= 85;
  
  return (
    <div className="max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-4 text-center text-xs">
        <div className={`p-2 rounded-md ${isFrameExtractionComplete ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-50 text-gray-500 dark:bg-gray-900/20'}`}>
          <div className="flex justify-center mb-1">
            {isFrameExtractionComplete ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4 animate-pulse" />
            )}
          </div>
          <span>استخراج الإطارات</span>
        </div>
        
        <div className={`p-2 rounded-md ${isPlayerDetectionComplete ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : isFrameExtractionComplete ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 animate-pulse' : 'bg-gray-50 text-gray-500 dark:bg-gray-900/20'}`}>
          <div className="flex justify-center mb-1">
            {isPlayerDetectionComplete ? (
              <CheckCircle className="h-4 w-4" />
            ) : isFrameExtractionComplete ? (
              <Clock className="h-4 w-4 animate-pulse" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
          </div>
          <span>تحليل اللاعب</span>
        </div>
        
        <div className={`p-2 rounded-md ${isAnalysisComplete ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : isPlayerDetectionComplete ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 animate-pulse' : 'bg-gray-50 text-gray-500 dark:bg-gray-900/20'}`}>
          <div className="flex justify-center mb-1">
            {isAnalysisComplete ? (
              <CheckCircle className="h-4 w-4" />
            ) : isPlayerDetectionComplete ? (
              <Clock className="h-4 w-4 animate-pulse" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
          </div>
          <span>إعداد التقرير</span>
        </div>
      </div>
      
      {potentialNetworkIssue && (
        <div className="mt-2 text-center text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md flex items-center justify-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          <span>قد تكون هناك مشكلة في سرعة الاتصال. يرجى التحقق من اتصال الإنترنت.</span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
