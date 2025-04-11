
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { Badge } from '@/types/badges';

export const determineEarnedBadges = (analysis: PlayerAnalysis): Badge[] => {
  const badges: Badge[] = [];
  
  // Check for technical badges
  if (analysis.performance?.technical && analysis.performance.technical > 85) {
    badges.push({
      id: 'technical-maestro',
      name: 'Technical Maestro',
      description: 'Exceptional technical ability across all skills',
      icon: 'zap',
      color: 'blue',
      type: 'technical'
    });
  }
  
  // Check for physical badges
  if (analysis.performance?.physical && analysis.performance.physical > 85) {
    badges.push({
      id: 'physical-specimen',
      name: 'Physical Specimen',
      description: 'Outstanding physical attributes and athleticism',
      icon: 'activity',
      color: 'red',
      type: 'physical'
    });
  }
  
  // Check for tactical badges
  if (analysis.performance?.tactical && analysis.performance.tactical > 85) {
    badges.push({
      id: 'tactical-genius',
      name: 'Tactical Genius',
      description: 'Superior tactical awareness and decision making',
      icon: 'brain',
      color: 'purple',
      type: 'tactical'
    });
  }
  
  // Check for mental badges
  if (analysis.performance?.mental && analysis.performance.mental > 85) {
    badges.push({
      id: 'mental-giant',
      name: 'Mental Giant',
      description: 'Exceptional mental fortitude and composure',
      icon: 'target',
      color: 'green',
      type: 'mental'
    });
  }
  
  // Check for performance badges based on overall performance score
  if (analysis.performanceScore && analysis.performanceScore > 85) {
    badges.push({
      id: 'elite-performer',
      name: 'Elite Performer',
      description: 'Among the top performers in all categories',
      icon: 'award',
      color: 'gold',
      type: 'performance'
    });
  }
  
  // Check for position-specific badges
  if (analysis.position === 'Forward' && analysis.stats?.shooting && analysis.stats.shooting > 85) {
    badges.push({
      id: 'clinical-finisher',
      name: 'Clinical Finisher',
      description: 'Exceptional ability to convert chances',
      icon: 'target',
      color: 'orange',
      type: 'technical'
    });
  }
  
  if (analysis.position === 'Midfielder' && analysis.stats?.passing && analysis.stats.passing > 85) {
    badges.push({
      id: 'playmaker',
      name: 'Playmaker',
      description: 'Superior passing ability and vision',
      icon: 'eye',
      color: 'cyan',
      type: 'technical'
    });
  }
  
  if (analysis.position === 'Defender' && analysis.stats?.defending && analysis.stats.defending > 85) {
    badges.push({
      id: 'defensive-wall',
      name: 'Defensive Wall',
      description: 'Exceptional defensive positioning and tackling',
      icon: 'shield',
      color: 'indigo',
      type: 'defensive'
    });
  }
  
  if (analysis.position === 'Goalkeeper' && analysis.stats?.reflexes && analysis.stats.reflexes > 85) {
    badges.push({
      id: 'shot-stopper',
      name: 'Shot Stopper',
      description: 'Remarkable goalkeeping abilities',
      icon: 'hand',
      color: 'yellow',
      type: 'goalkeeping'
    });
  }
  
  return badges;
};

export default determineEarnedBadges;
