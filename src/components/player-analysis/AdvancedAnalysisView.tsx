
import React from 'react';
import AdvancedView from './advanced-view';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

// This component serves as a direct pass-through to the actual implementation
const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = (props) => {
  console.log("AdvancedAnalysisView wrapper called with props:", props);
  return <AdvancedView {...props} />;
};

export default AdvancedAnalysisView;
