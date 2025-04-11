
import { BADGE_THRESHOLDS, BADGE_TYPES } from './constants';

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
}

// Determine which badges a player has earned based on their analysis
export const determineEarnedBadges = (analysis: any): Badge[] => {
  const earnedBadges: Badge[] = [];
  
  // Get needed metrics from analysis or default to empty objects if undefined
  const technicalMetrics = analysis?.technicalMetrics || {};
  const physicalMetrics = analysis?.physicalMetrics || {};
  const mentalMetrics = analysis?.mentalMetrics || {};
  const tacticalMetrics = analysis?.tacticalMetrics || {};
  
  // Technical badges
  if (technicalMetrics.passing && technicalMetrics.passing >= BADGE_THRESHOLDS.PASSING) {
    earnedBadges.push({
      id: 'master-passer',
      name: 'ملك التمرير',
      description: 'يمتلك قدرة استثنائية في التمرير الدقيق',
      type: BADGE_TYPES.TECHNICAL,
      icon: 'target',
      color: 'blue'
    });
  }
  
  if (technicalMetrics.dribbling && technicalMetrics.dribbling >= BADGE_THRESHOLDS.DRIBBLING) {
    earnedBadges.push({
      id: 'dribble-master',
      name: 'أستاذ المراوغة',
      description: 'يتمتع بمهارة فائقة في مراوغة المدافعين',
      type: BADGE_TYPES.TECHNICAL,
      icon: 'zap',
      color: 'purple'
    });
  }
  
  if (technicalMetrics.shooting && technicalMetrics.shooting >= BADGE_THRESHOLDS.SHOOTING) {
    earnedBadges.push({
      id: 'sharpshooter',
      name: 'القناص',
      description: 'يمتلك قدرة تسديد استثنائية ودقيقة',
      type: BADGE_TYPES.TECHNICAL,
      icon: 'target',
      color: 'red'
    });
  }
  
  // Physical badges
  if (physicalMetrics.speed && physicalMetrics.speed >= BADGE_THRESHOLDS.SPEED) {
    earnedBadges.push({
      id: 'speedster',
      name: 'السريع',
      description: 'سريع بشكل استثنائي ويتفوق في المساحات المفتوحة',
      type: BADGE_TYPES.PHYSICAL,
      icon: 'zap',
      color: 'yellow'
    });
  }
  
  if (physicalMetrics.stamina && physicalMetrics.stamina >= BADGE_THRESHOLDS.STAMINA) {
    earnedBadges.push({
      id: 'marathon-man',
      name: 'رجل الماراثون',
      description: 'يتمتع بلياقة بدنية استثنائية ويمكنه اللعب بكامل قوته طوال المباراة',
      type: BADGE_TYPES.PHYSICAL,
      icon: 'activity',
      color: 'green'
    });
  }
  
  // Mental badges
  if (mentalMetrics.vision && mentalMetrics.vision >= BADGE_THRESHOLDS.VISION) {
    earnedBadges.push({
      id: 'visionary',
      name: 'صاحب الرؤية',
      description: 'رؤية ميدانية ممتازة وقدرة على توقع تحركات اللاعبين',
      type: BADGE_TYPES.MENTAL,
      icon: 'eye',
      color: 'indigo'
    });
  }
  
  if (mentalMetrics.decision && mentalMetrics.decision >= BADGE_THRESHOLDS.DECISION_MAKING) {
    earnedBadges.push({
      id: 'strategist',
      name: 'الاستراتيجي',
      description: 'يتميز باتخاذ القرارات الصحيحة تحت الضغط',
      type: BADGE_TYPES.MENTAL,
      icon: 'brain',
      color: 'cyan'
    });
  }
  
  // Tactical badges
  if (tacticalMetrics.positioning && tacticalMetrics.positioning >= BADGE_THRESHOLDS.POSITIONING) {
    earnedBadges.push({
      id: 'tactician',
      name: 'التكتيكي',
      description: 'تموضع تكتيكي ممتاز وقراءة ذكية للعب',
      type: BADGE_TYPES.TACTICAL,
      icon: 'map',
      color: 'orange'
    });
  }
  
  // If analysis has a specific team role, add a special badge
  if (analysis?.specialRole) {
    earnedBadges.push({
      id: 'special-role',
      name: 'متخصص',
      description: `متخصص في دور ${analysis.specialRole}`,
      type: BADGE_TYPES.SPECIAL,
      icon: 'award',
      color: 'gold'
    });
  }
  
  return earnedBadges;
};
