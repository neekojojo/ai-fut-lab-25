
import React from 'react';

interface LoadingAnimationProps {
  progress: number;
  stage: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ progress, stage }) => {
  // التأكد من أن قيمة progress صالحة
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));
  
  // Define more detailed substages for analysis
  const getSubstage = () => {
    if (stage.includes("movements") || stage.includes("حركة")) {
      return "Tracking player positioning and movement patterns";
    } else if (stage.includes("technical") || stage.includes("فنية") || stage.includes("مهارات")) {
      return "Analyzing dribbling, passing accuracy and shooting technique";
    } else if (stage.includes("tactical") || stage.includes("تكتيكية")) {
      return "Evaluating decision making and positional awareness";
    } else if (stage.includes("physical") || stage.includes("بدنية")) {
      return "Measuring speed, endurance and strength indicators";
    } else if (stage.includes("market") || stage.includes("مقارنة")) {
      return "Comparing with professional player database";
    } else if (stage.includes("report") || stage.includes("تقرير")) {
      return "Creating personalized improvement recommendations";
    } else if (stage.includes("integration") || stage.includes("تكامل") || stage.includes("خارجية")) {
      return "Connecting with external systems and APIs for enhanced data";
    } else if (stage.includes("performance") || stage.includes("أداء") || stage.includes("تحسين")) {
      return "Optimizing processing speed and applying caching";
    } else {
      return "Processing video frames using neural network analysis";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-fade-in">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <svg 
          className="absolute inset-0 transform -rotate-90" 
          viewBox="0 0 100 100"
        >
          <circle
            className="text-primary transition-all duration-700 ease-in-out"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="48"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: 300 - (safeProgress / 100) * 300
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-medium">{Math.round(safeProgress)}%</span>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">{stage || "بدء تحليل الفيديو"}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {getSubstage()}
        </p>
      </div>
      
      <div className="w-full max-w-md space-y-2">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${safeProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Video processing</span>
          <span>AI analysis</span>
          <span>Recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
