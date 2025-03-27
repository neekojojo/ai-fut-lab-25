
import React from 'react';
import ModelSelection from '@/components/analysis/ModelSelection';

interface AnalysisOptionsProps {
  videoFile: File;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
  isMobile?: boolean;
}

const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ 
  videoFile, 
  onSelectModel, 
  onAnalyzeWithAI,
  isMobile
}) => {
  return (
    <div className={isMobile ? 'px-1' : ''}>
      <ModelSelection 
        videoFile={videoFile}
        onSelectModel={onSelectModel}
        onAnalyzeWithAI={onAnalyzeWithAI}
      />
    </div>
  );
};

export default AnalysisOptions;
