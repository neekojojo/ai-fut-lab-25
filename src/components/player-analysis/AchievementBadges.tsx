
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Eye, Zap, Target, Activity, Brain, Map } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeProps {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
}

interface AchievementBadgesProps {
  playerName: string;
  badges: BadgeProps[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ playerName, badges }) => {
  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="h-5 w-5" />;
      case 'target': return <Target className="h-5 w-5" />;
      case 'eye': return <Eye className="h-5 w-5" />;
      case 'activity': return <Activity className="h-5 w-5" />;
      case 'brain': return <Brain className="h-5 w-5" />;
      case 'map': return <Map className="h-5 w-5" />;
      case 'award':
      default: return <Award className="h-5 w-5" />;
    }
  };
  
  // Function to get badge color class
  const getBadgeColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'indigo': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'cyan': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'gold': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>الشارات والإنجازات</CardTitle>
        <CardDescription>الشارات التي حققها {playerName || "اللاعب"} بناء على أدائه</CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            <TooltipProvider>
              {badges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getBadgeColorClass(badge.color)}`}>
                        {renderIcon(badge.icon)}
                      </div>
                      <span className="text-xs mt-1 font-medium text-center">{badge.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>لم يحقق اللاعب أي شارات حتى الآن</p>
            <p className="text-sm mt-2">اللاعبون الذين يحققون مستويات متميزة في مهارات محددة يكسبون شارات خاصة</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
