
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IdentifiedTeam } from '@/utils/videoDetection/playerIdentification';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface TeamIdentificationCardProps {
  team: IdentifiedTeam;
  isSelected: boolean;
  onSelect: () => void;
}

const TeamIdentificationCard: React.FC<TeamIdentificationCardProps> = ({
  team,
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
  
  // إنشاء تمثيل بصري لألوان الفريق
  const renderTeamColors = (colors: string[]) => {
    return (
      <div className="flex space-x-1 space-x-reverse mt-2">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="h-4 w-4 rounded-full border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
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
          <div className="h-12 w-12 overflow-hidden rounded-md border flex items-center justify-center">
            {team.logo ? (
              <img src={team.logo} alt={team.name} className="h-full w-full object-contain" />
            ) : (
              <div className="h-full w-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {team.name.substring(0, 2)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{team.name}</h3>
                <div className="text-sm text-muted-foreground mt-0.5 flex flex-wrap gap-1">
                  <span>{team.league}</span>
                  <span>•</span>
                  <span>{team.country}</span>
                </div>
                {team.colors && renderTeamColors(team.colors)}
              </div>
              
              {isSelected && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
            
            <div className="mt-2">
              <Badge variant="outline" className={getConfidenceColor(team.confidenceScore)}>
                تطابق: {getConfidenceText(team.confidenceScore)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamIdentificationCard;
