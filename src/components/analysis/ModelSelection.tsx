
import React from 'react';
import ModelSelectionCard from '@/components/ModelSelectionCard';

interface ModelSelectionProps {
  videoFile: File;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  videoFile,
  onSelectModel,
  onAnalyzeWithAI
}) => {
  return (
    <ModelSelectionCard 
      videoFile={videoFile}
      onSelectModel={onSelectModel}
      onAnalyzeWithAI={onAnalyzeWithAI}
    />
  );
};

export default ModelSelection;
