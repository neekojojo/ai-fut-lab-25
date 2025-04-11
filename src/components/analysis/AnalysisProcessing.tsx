
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart, BrainCircuit, Clock, FileVideo, LineChart, UserRound } from 'lucide-react';
import { ANALYSIS_STAGES } from '@/utils/analysis/constants';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
  onReset: () => void;
  onAnalysisComplete?: () => void;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({
  progress,
  stage,
  onReset,
  onAnalysisComplete
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  useEffect(() => {
    // Map progress to steps
    const stepIndex = Math.min(
      Math.floor(progress / (100 / ANALYSIS_STAGES.length)),
      ANALYSIS_STAGES.length - 1
    );
    
    setCurrentStep(stepIndex);
    
    // Add completed steps
    if (stepIndex > 0 && !completedSteps.includes(stepIndex - 1)) {
      setCompletedSteps(prev => [...prev, stepIndex - 1]);
    }
    
    // Check if analysis is complete
    if (progress >= 100 && onAnalysisComplete) {
      const timer = setTimeout(() => {
        onAnalysisComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, completedSteps, onAnalysisComplete]);
  
  // Map stage names to icons
  const getStageIcon = (stageIndex: number) => {
    switch (stageIndex) {
      case 0: return <FileVideo className="h-5 w-5" />;
      case 1: return <UserRound className="h-5 w-5" />;
      case 2: return <LineChart className="h-5 w-5" />;
      case 3: return <BrainCircuit className="h-5 w-5" />;
      case 4: return <BarChart className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">تحليل الفيديو</CardTitle>
            <CardDescription>جاري تحليل فيديو كرة القدم باستخدام الذكاء الاصطناعي</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={onReset}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>التقدم الكلي</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">المرحلة الحالية: {stage}</h3>
          
          <div className="space-y-3">
            {ANALYSIS_STAGES.map((stageName, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                  currentStep === index 
                    ? 'bg-primary/10 border border-primary/20' 
                    : completedSteps.includes(index)
                    ? 'bg-muted/30'
                    : ''
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  completedSteps.includes(index) 
                    ? 'bg-green-500 text-white'
                    : currentStep === index
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {getStageIcon(index)}
                </div>
                <div>
                  <p className="font-medium">{stageName}</p>
                  <p className="text-xs text-muted-foreground">
                    {completedSteps.includes(index) 
                      ? 'مكتمل'
                      : currentStep === index
                      ? 'جاري التنفيذ...'
                      : 'في الانتظار'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisProcessing;
