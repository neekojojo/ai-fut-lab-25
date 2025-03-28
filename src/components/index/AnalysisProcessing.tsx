
import React from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';

interface AnalysisProcessingProps {
  progress: number;
  stage: string;
  isMobile?: boolean;
}

const AnalysisProcessing: React.FC<AnalysisProcessingProps> = ({ progress, stage, isMobile }) => {
  // تأكد من أن progress هو رقم صحيح (ليس NaN)
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));
  
  // سجل قيم التقدم للتصحيح
  React.useEffect(() => {
    console.log(`AnalysisProcessing - Progress: ${safeProgress}%, Stage: ${stage || 'N/A'}`);
  }, [safeProgress, stage]);
  
  return (
    <div className={isMobile ? 'scale-90 transform-origin-top' : ''}>
      <LoadingAnimation progress={safeProgress} stage={stage} />
    </div>
  );
};

export default AnalysisProcessing;
