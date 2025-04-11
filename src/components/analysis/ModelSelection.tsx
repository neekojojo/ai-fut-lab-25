
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AIConfigModal from './AIConfigModal';
import { Database, Cloud } from 'lucide-react';
import { toast } from 'sonner';
import { AnalysisModel, getModelInformation } from '@/utils/analysis/modelSelectionService';

interface ModelSelectionProps {
  videoFile: File;
  onSelectModel: (model: AnalysisModel) => void;
  onAnalyzeWithAI: () => void;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  videoFile,
  onSelectModel,
  onAnalyzeWithAI
}) => {
  const [selectedModel, setSelectedModel] = React.useState<AnalysisModel | null>(null);
  
  const handleSelectModel = (model: AnalysisModel) => {
    console.log("Selected model:", model);
    setSelectedModel(model);
    onSelectModel(model);
    
    toast.success(`تم اختيار نموذج ${model === 'google-automl' ? 'Google AutoML' : 'Kaggle Datasets'}`);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">اختر نموذج التحليل</h2>
        <AIConfigModal />
      </div>
      
      <div className="bg-card border rounded-lg shadow-sm p-6">
        <p className="text-muted-foreground mb-4">
          اختر نموذج الذكاء الاصطناعي لتحليل فيديو كرة القدم الخاص بك:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleSelectModel('google-automl')}
            className={`flex flex-col items-center p-4 border rounded-md transition-colors ${
              selectedModel === 'google-automl' 
                ? 'bg-primary/10 border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            <Cloud className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-medium">Google AutoML Vision</div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              متخصص في تحليل المهارات التقنية وتحديد مواقع اللاعبين
            </p>
          </button>
          
          <button
            onClick={() => handleSelectModel('kaggle-datasets')}
            className={`flex flex-col items-center p-4 border rounded-md transition-colors ${
              selectedModel === 'kaggle-datasets' 
                ? 'bg-primary/10 border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            <Database className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-medium">Kaggle Datasets Model</div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              تم تدريبه على إحصائيات كرة القدم الشاملة ومقاييس الأداء
            </p>
          </button>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button
            onClick={onAnalyzeWithAI}
            disabled={!selectedModel}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            تحليل باستخدام الذكاء الاصطناعي
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelection;
