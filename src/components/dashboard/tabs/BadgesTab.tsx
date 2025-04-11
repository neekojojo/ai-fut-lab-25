
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Zap, Target, Brain, Map, Trophy } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  level: string;
  earnedAt?: Date;
}

interface BadgesTabProps {
  badges: BadgeItem[];
}

const BadgesTab: React.FC<BadgesTabProps> = ({ badges }) => {
  // Function to render appropriate icon based on badge type
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'star': return <Star className="h-4 w-4" />;
      case 'zap': return <Zap className="h-4 w-4" />;
      case 'target': return <Target className="h-4 w-4" />;
      case 'brain': return <Brain className="h-4 w-4" />;
      case 'map': return <Map className="h-4 w-4" />;
      case 'trophy': return <Trophy className="h-4 w-4" />;
      case 'award':
      default: return <Award className="h-4 w-4" />;
    }
  };
  
  const getBadgeColorClass = (level: string) => {
    switch(level) {
      case 'gold': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'bronze': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <TabsContent value="badges" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الشارات والإنجازات</CardTitle>
          <CardDescription>عرض جميع الشارات والإنجازات التي حققتها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-gradient-to-b from-muted/50 to-muted/30">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getBadgeColorClass(badge.level)}`}>
                  {renderIcon(badge.icon)}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-base">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
                <Badge variant={badge.level === 'gold' ? 'default' : 'outline'} className="text-xs">
                  {badge.level === 'gold' ? 'ذهبية' : badge.level === 'silver' ? 'فضية' : 'برونزية'}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {badge.earnedAt ? `تم الحصول عليها في ${badge.earnedAt.toLocaleDateString('ar-SA')}` : 'تم الحصول عليها مؤخرًا'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BadgesTab;
