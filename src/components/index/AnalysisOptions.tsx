
import React from 'react';
import ModelSelection from '@/components/analysis/ModelSelection';

interface AnalysisOptionsProps {
  videoFile: File;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
}

const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ 
  videoFile, 
  onSelectModel, 
  onAnalyzeWithAI 
}) => {
  return (
    <ModelSelection 
      videoFile={videoFile}
      onSelectModel={onSelectModel}
      onAnalyzeWithAI={onAnalyzeWithAI}
    />
  );
};

export default AnalysisOptions;
