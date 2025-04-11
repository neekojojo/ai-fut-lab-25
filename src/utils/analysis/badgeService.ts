
import type { Badge } from '@/types/badges';
import type { PlayerAnalysis } from '@/types/playerAnalysis';

// Function to determine which badges a player has earned based on their analysis
const determineEarnedBadges = (analysis: Partial<PlayerAnalysis>): Badge[] => {
  const badges: Badge[] = [];
  
  // Technical maestro badge
  if (analysis.performance?.technical >= 85 || analysis.stats?.dribbling >= 85) {
    badges.push({
      id: 'technical-maestro',
      name: 'براعة فنية',
      description: 'مهارات فنية استثنائية في السيطرة والتمرير',
      icon: 'zap',
      color: 'blue',
      type: 'technical',
      level: 'gold',
      earnedAt: new Date()
    });
  } else if (analysis.performance?.technical >= 75 || analysis.stats?.dribbling >= 75) {
    badges.push({
      id: 'technical-skilled',
      name: 'مهارة فنية',
      description: 'مستوى جيد من المهارات الفنية',
      icon: 'zap',
      color: 'blue',
      type: 'technical',
      level: 'silver',
      earnedAt: new Date()
    });
  }
  
  // Physical specimen badge
  if (analysis.performance?.physical >= 85 || analysis.stats?.physical >= 85) {
    badges.push({
      id: 'physical-specimen',
      name: 'قوة بدنية',
      description: 'قدرات بدنية استثنائية وقوة جسدية',
      icon: 'activity',
      color: 'red',
      type: 'physical',
      level: 'gold',
      earnedAt: new Date()
    });
  } else if (analysis.performance?.physical >= 75 || analysis.stats?.physical >= 75) {
    badges.push({
      id: 'physical-strong',
      name: 'لياقة بدنية',
      description: 'مستوى جيد من اللياقة البدنية',
      icon: 'activity',
      color: 'red',
      type: 'physical',
      level: 'silver',
      earnedAt: new Date()
    });
  }
  
  // Tactical genius badge
  if (analysis.performance?.tactical >= 85 || analysis.stats?.vision >= 85) {
    badges.push({
      id: 'tactical-genius',
      name: 'عبقرية تكتيكية',
      description: 'فهم تكتيكي متميز وقدرة على قراءة اللعب',
      icon: 'brain',
      color: 'purple',
      type: 'tactical',
      level: 'gold',
      earnedAt: new Date()
    });
  } else if (analysis.performance?.tactical >= 75 || analysis.stats?.vision >= 75) {
    badges.push({
      id: 'tactical-aware',
      name: 'وعي تكتيكي',
      description: 'مستوى جيد من الوعي التكتيكي',
      icon: 'brain',
      color: 'purple',
      type: 'tactical',
      level: 'silver',
      earnedAt: new Date()
    });
  }
  
  // Mental strength badge
  if (analysis.performance?.mental >= 85 || analysis.stats?.composure >= 85) {
    badges.push({
      id: 'mental-titan',
      name: 'قوة ذهنية',
      description: 'ثبات انفعالي وتركيز استثنائي تحت الضغط',
      icon: 'shield',
      color: 'green',
      type: 'mental',
      level: 'gold',
      earnedAt: new Date()
    });
  } else if (analysis.performance?.mental >= 75 || analysis.stats?.composure >= 75) {
    badges.push({
      id: 'mental-focused',
      name: 'تركيز ذهني',
      description: 'مستوى جيد من التركيز والثبات الذهني',
      icon: 'shield',
      color: 'green',
      type: 'mental',
      level: 'silver',
      earnedAt: new Date()
    });
  }
  
  // Add bronze level badges if no gold or silver was earned
  if (!badges.find(b => b.type === 'technical')) {
    badges.push({
      id: 'technical-developing',
      name: 'تطوير فني',
      description: 'في طريق تطوير المهارات الفنية',
      icon: 'zap',
      color: 'blue',
      type: 'technical',
      level: 'bronze',
      earnedAt: new Date()
    });
  }
  
  if (!badges.find(b => b.type === 'physical')) {
    badges.push({
      id: 'physical-developing',
      name: 'تطوير بدني',
      description: 'في طريق تطوير القدرات البدنية',
      icon: 'activity',
      color: 'red',
      type: 'physical',
      level: 'bronze',
      earnedAt: new Date()
    });
  }
  
  return badges;
};

// Export the function as default
export default determineEarnedBadges;
