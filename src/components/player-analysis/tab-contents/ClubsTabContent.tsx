
import React from 'react';
import TeamCompatibilityPanel from '../TeamCompatibilityPanel';

interface ClubsTabContentProps {
  playerAnalysis: any;
}

const ClubsTabContent: React.FC<ClubsTabContentProps> = ({ playerAnalysis }) => {
  return <TeamCompatibilityPanel playerAnalysis={playerAnalysis} />;
};

export default ClubsTabContent;
