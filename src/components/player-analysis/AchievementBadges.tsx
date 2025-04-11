
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/types/badges';
import { Award, Star, Zap, Target, Brain, Activity, Eye, Shield } from 'lucide-react';

interface AchievementBadgesProps {
  playerName: string;
  badges: Badge[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  playerName,
  badges = [
    {
      id: 'technical-maestro',
      name: 'Technical Maestro',
      description: 'Exceptional technical ability across all skills',
      icon: 'zap',
      color: 'blue',
      type: 'technical',
      level: 'gold'
    },
    {
      id: 'physical-specimen',
      name: 'Physical Specimen',
      description: 'Outstanding physical attributes and athleticism',
      icon: 'activity',
      color: 'red',
      type: 'physical',
      level: 'gold'
    },
    {
      id: 'tactical-genius',
      name: 'Tactical Genius',
      description: 'Superior tactical awareness and decision making',
      icon: 'brain',
      color: 'purple',
      type: 'tactical',
      level: 'gold'
    }
  ]
}) => {
  // Render icon based on badge type
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'star': return <Star className="h-6 w-6" />;
      case 'zap': return <Zap className="h-6 w-6" />;
      case 'brain': return <Brain className="h-6 w-6" />;
      case 'activity': return <Activity className="h-6 w-6" />;
      case 'eye': return <Eye className="h-6 w-6" />;
      case 'shield': return <Shield className="h-6 w-6" />;
      case 'target': return <Target className="h-6 w-6" />;
      case 'award':
      default: return <Award className="h-6 w-6" />;
    }
  };

  // Style badge based on level
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'gold':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'diamond':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>الإنجازات والشارات</CardTitle>
        <CardDescription>الشارات التي حصل عليها {playerName} بناءً على الأداء</CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 border rounded-lg flex flex-col items-center text-center space-y-3 ${getBadgeStyle(badge.level)}`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm">
                  {renderIcon(badge.icon)}
                </div>
                <h3 className="font-medium">{badge.name}</h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
                <div className="text-xs px-2 py-1 rounded-full bg-white/60">
                  {badge.level === 'gold' ? 'ذهبي' : badge.level === 'silver' ? 'فضي' : badge.level === 'bronze' ? 'برونزي' : 'ماسي'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-medium text-muted-foreground">لا توجد شارات بعد</h3>
            <p className="text-sm text-muted-foreground mt-1">
              سيحصل اللاعب على شارات بناءً على أدائه في التحليلات المستقبلية
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
