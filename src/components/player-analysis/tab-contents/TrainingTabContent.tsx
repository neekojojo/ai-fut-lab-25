
import React from 'react';
import TrainingRecommendationsPanel from '../TrainingRecommendationsPanel';

interface TrainingTabContentProps {
  recommendations: any;
}

const TrainingTabContent: React.FC<TrainingTabContentProps> = ({ recommendations }) => {
  return <TrainingRecommendationsPanel recommendations={recommendations} />;
};

export default TrainingTabContent;
