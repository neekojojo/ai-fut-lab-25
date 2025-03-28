
import React from 'react';
import SimilarPlayersPanel from '../SimilarPlayersPanel';
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';

interface SimilarPlayersTabContentProps {
  playerComparison: ProfessionalPlayer[];
}

const SimilarPlayersTabContent: React.FC<SimilarPlayersTabContentProps> = ({ 
  playerComparison 
}) => {
  return <SimilarPlayersPanel playerComparison={playerComparison} />;
};

export default SimilarPlayersTabContent;
