
import React from 'react';
import InsightsPanel from '../InsightsPanel';

interface InsightsTabContentProps {
  analysis: any;
}

const InsightsTabContent: React.FC<InsightsTabContentProps> = ({ analysis }) => {
  return <InsightsPanel analysis={analysis} />;
};

export default InsightsTabContent;
