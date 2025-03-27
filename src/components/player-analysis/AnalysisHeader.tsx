
import React from 'react';

interface AnalysisHeaderProps {
  onResetAnalysis: () => void;
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ onResetAnalysis }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Advanced Player Analysis</h2>
      <button
        onClick={onResetAnalysis}
        className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        Back to Summary
      </button>
    </div>
  );
};

export default AnalysisHeader;
