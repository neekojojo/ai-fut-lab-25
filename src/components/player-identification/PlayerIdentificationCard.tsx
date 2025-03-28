
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IdentifiedPlayer, IdentifiedTeam } from '@/utils/videoDetection/playerIdentification';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

interface PlayerIdentificationCardProps {
  player: IdentifiedPlayer;
  isSelected: boolean;
  onSelect: () => void;
}

const PlayerIdentificationCard: React.FC<PlayerIdentificationCardProps> = ({
  player,
  isSelected,
  onSelect
}) => {
  // تحويل درجة الثقة إلى نص وصفي
  const getConfidenceText = (score: number): string => {
    if (score >= 0.8) return 'عالية جدًا';
    if (score >= 0.7) return 'عالية';
    if (score >= 0.5) return 'متوسطة';
    return 'منخفضة';
  };
  
  // تحويل درجة الثقة إلى لون
  const getConfidenceColor = (score: number): string => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };
  
  // إنشاء احتمالية تقديرية بناءً على التقييم
  const getRatingStars = (rating: number) => {
    const maxStars = 5;
    const filledStars = Math.round((rating / 100) * maxStars);
    
    return (
      <div className="flex items-center mt-1">
        {Array.from({ length: maxStars }).map((_, index) => (
          <Star 
            key={index}
            className={`h-3.5 w-3.5 ${index < filledStars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating}/100</span>
      </div>
    );
  };
  
  // إنشاء الأحرف الأولى للاسم للاستخدام في Avatar Fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
          : 'hover:border-primary/50 hover:bg-accent'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-4 space-x-reverse">
          <Avatar className="h-14 w-14 border">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} alt={player.name} />
            <AvatarFallback>{getInitials(player.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{player.name}</h3>
                <div className="text-sm text-muted-foreground flex flex-wrap gap-1 mt-0.5">
                  <span>{player.position}</span>
                  <span>•</span>
                  <span>{player.nationality}</span>
                </div>
                <div className="text-sm font-medium mt-1">{player.team}</div>
                {getRatingStars(player.rating)}
              </div>
              
              {isSelected && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline" className={getConfidenceColor(player.confidenceScore)}>
                تطابق: {getConfidenceText(player.confidenceScore)}
              </Badge>
              
              {player.physicalAttributes && (
                <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {player.physicalAttributes.height ? `${player.physicalAttributes.height} سم` : "غير محدد"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerIdentificationCard;
