
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/types/badges';
import { Award, Star, Trophy, Zap } from 'lucide-react';

interface AchievementBadgesProps {
  playerName?: string;
  badges?: Badge[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ playerName = 'اللاعب', badges = [] }) => {
  // إذا لم يتم توفير شارات، نستخدم شارات افتراضية
  const defaultBadges: Badge[] = [
    { 
      name: 'تقنية متميزة', 
      description: 'أظهر مستوى عالٍ من المهارة التقنية', 
      level: 'gold' 
    },
    { 
      name: 'سرعة فائقة', 
      description: 'سجل قيم سرعة عالية خلال التحليل', 
      level: 'silver' 
    },
    { 
      name: 'تحليل أول', 
      description: 'أكمل التحليل الأول بنجاح', 
      level: 'bronze' 
    },
  ];
  
  const displayBadges = badges.length > 0 ? badges : defaultBadges;
  
  // تحديد أيقونة مناسبة لكل مستوى
  const getBadgeIcon = (level: 'bronze' | 'silver' | 'gold') => {
    switch (level) {
      case 'gold':
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 'silver':
        return <Award className="h-6 w-6 text-slate-400" />;
      case 'bronze':
        return <Star className="h-6 w-6 text-amber-600" />;
      default:
        return <Zap className="h-6 w-6 text-blue-500" />;
    }
  };
  
  // تحديد لون خلفية لكل مستوى
  const getBadgeBackground = (level: 'bronze' | 'silver' | 'gold') => {
    switch (level) {
      case 'gold':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30';
      case 'silver':
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800/30';
      case 'bronze':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">الجوائز والشارات</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          شارات تم الحصول عليها بناءً على نتائج تحليل أداء {playerName}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayBadges.map((badge, index) => (
            <div 
              key={index} 
              className={`border rounded-lg p-4 flex flex-col items-center text-center transition-all hover:shadow-md ${getBadgeBackground(badge.level)}`}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-white dark:bg-gray-800 shadow-sm">
                {getBadgeIcon(badge.level)}
              </div>
              <h3 className="font-semibold mb-1">{badge.name}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              <div className={`mt-2 text-xs px-2 py-1 rounded-full 
                ${badge.level === 'gold' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                badge.level === 'silver' ? 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300' : 
                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`
              }>
                {badge.level === 'gold' ? 'ذهبية' : badge.level === 'silver' ? 'فضية' : 'برونزية'}
              </div>
              {badge.earnedAt && (
                <p className="text-xs text-muted-foreground mt-2 rtl:direction-rtl">
                  تم الحصول عليها {new Date(badge.earnedAt).toLocaleDateString('ar-SA')}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <h4 className="font-medium mb-2 flex items-center">
            <Trophy className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
            كيف تحصل على شارات أكثر؟
          </h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>إجراء المزيد من تحليلات الأداء</li>
            <li>تحسين المهارات التقنية والبدنية</li>
            <li>متابعة خطة التدريب الموصى بها</li>
            <li>تحقيق أهداف الأداء المحددة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
