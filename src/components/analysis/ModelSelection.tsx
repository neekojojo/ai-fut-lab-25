
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
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Analysis Model</h2>
      <ModelSelectionCard 
        videoFile={videoFile}
        onSelectModel={onSelectModel}
        onAnalyzeWithAI={onAnalyzeWithAI}
      />
    </div>
  );
};

export default ModelSelection;
