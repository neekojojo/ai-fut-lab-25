
import React from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({ progress, stage }) => {
  return (
    <LoadingAnimation progress={progress} stage={stage} />
  );
};

export default AnalysisProcessing;
