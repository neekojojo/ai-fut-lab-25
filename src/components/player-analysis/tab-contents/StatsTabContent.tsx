
import React from 'react';
import StatsPanel from '../StatsPanel';

interface StatsTabContentProps {
  playerStats: any;
  analysis: any;
}

const StatsTabContent: React.FC<StatsTabContentProps> = ({ playerStats, analysis }) => {
  return <StatsPanel stats={playerStats} analysis={analysis} />;
};

export default StatsTabContent;
