
import React from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
  isMobile?: boolean;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({ progress, stage, isMobile }) => {
  // تأكد من أن progress هو رقم صحيح (ليس NaN)
  const safeProgress = isNaN(progress) ? 0 : progress;
  
  return (
    <div className={isMobile ? 'scale-90 transform-origin-top' : ''}>
      <LoadingAnimation progress={safeProgress} stage={stage} />
    </div>
  );
};

export default AnalysisProcessing;
