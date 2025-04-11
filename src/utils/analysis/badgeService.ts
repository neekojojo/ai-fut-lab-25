
import { PROFESSIONAL_PLAYERS } from './constants';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: string;
  category: 'technical' | 'tactical' | 'physical' | 'mental' | 'achievement';
  unlocked: boolean;
  progress: number;
  color: string;
}

export const generateBadges = (playerStats: any): Badge[] => {
  const badges: Badge[] = [
    {
      id: 'technical-master',
      name: 'سيد التقنية',
      description: 'إتقان مهارات التقنية الأساسية بنسبة تفوق 80%',
      icon: 'award',
      level: 'متقدم',
      category: 'technical',
      unlocked: playerStats.technicalAccuracy > 80,
      progress: playerStats.technicalAccuracy,
      color: 'text-blue-500'
    },
    {
      id: 'speed-demon',
      name: 'سرعة الريح',
      description: 'الوصول إلى معدلات سرعة استثنائية في المباراة',
      icon: 'zap',
      level: 'متقدم',
      category: 'physical',
      unlocked: playerStats.physicalPerformance > 85,
      progress: playerStats.physicalPerformance,
      color: 'text-yellow-500'
    },
    {
      id: 'tactical-genius',
      name: 'العبقرية التكتيكية',
      description: 'إظهار فهم تكتيكي متفوق واتخاذ قرارات ذكية',
      icon: 'brain',
      level: 'خبير',
      category: 'tactical',
      unlocked: playerStats.tacticalAwareness > 85,
      progress: playerStats.tacticalAwareness,
      color: 'text-purple-500'
    },
    {
      id: 'team-player',
      name: 'لاعب الفريق',
      description: 'العمل بشكل فعال مع زملاء الفريق والمساهمة في اللعب الجماعي',
      icon: 'users',
      level: 'متوسط',
      category: 'tactical',
      unlocked: playerStats.efficiency > 80,
      progress: playerStats.efficiency,
      color: 'text-green-500'
    },
    {
      id: 'dribble-master',
      name: 'ملك المراوغة',
      description: 'إظهار مهارات مراوغة استثنائية',
      icon: 'sparkles',
      level: 'متقدم',
      category: 'technical',
      unlocked: playerStats.technicalSkills?.dribbling > 80,
      progress: playerStats.technicalSkills?.dribbling || 0,
      color: 'text-orange-500'
    }
  ];
  
  return badges;
};

export default {
  generateBadges
};
