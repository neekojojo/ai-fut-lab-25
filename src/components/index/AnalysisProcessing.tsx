
import React from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
  isMobile?: boolean;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({ progress, stage, isMobile }) => {
  return (
    <div className={isMobile ? 'scale-90 transform-origin-top' : ''}>
      <LoadingAnimation progress={progress} stage={stage} />
    </div>
  );
};

export default AnalysisProcessing;
