
import React from 'react';
import AdvancedView from './advanced-view';

// This component serves as a direct pass-through to the actual implementation
const AdvancedAnalysisView = (props) => {
  console.log("AdvancedAnalysisView wrapper called with props:", props);
  return <AdvancedView {...props} />;
};

export default AdvancedAnalysisView;
