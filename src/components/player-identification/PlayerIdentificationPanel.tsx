
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Search, InfoIcon } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import type { IdentifiedPlayer, IdentifiedTeam } from '@/utils/videoDetection/playerIdentification';

interface PlayerIdentificationPanelProps {
  suggestedPlayers: IdentifiedPlayer[];
  suggestedTeams: IdentifiedTeam[];
  onPlayerSelect: (player: IdentifiedPlayer | null) => void;
  onTeamSelect: (team: IdentifiedTeam | null) => void;
  selectedPlayer: IdentifiedPlayer | null;
  selectedTeam: IdentifiedTeam | null;
}

const PlayerIdentificationPanel: React.FC<PlayerIdentificationPanelProps> = ({
  suggestedPlayers,
  suggestedTeams,
  onPlayerSelect,
  onTeamSelect,
  selectedPlayer,
  selectedTeam
}) => {
  const [manualMode, setManualMode] = useState(false);

  const handlePlayerSelect = (playerId: string) => {
    const player = suggestedPlayers.find(p => p.id === playerId) || null;
    onPlayerSelect(player);
  };

  const handleTeamSelect = (teamId: string) => {
    const team = suggestedTeams.find(t => t.id === teamId) || null;
    onTeamSelect(team);
  };
  
  // تحويل درجة الثقة إلى نص وصفي
  const getConfidenceText = (score: number): string => {
    if (score >= 0.8) return 'عالية';
    if (score >= 0.6) return 'متوسطة';
    return 'منخفضة';
  };
  
  // تحويل درجة الثقة إلى لون
  const getConfidenceColor = (score: number): string => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          تحديد هوية اللاعب والنادي
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setManualMode(!manualMode)}
            className="text-xs"
          >
            {manualMode ? 'استخدام الاقتراحات' : 'إدخال يدوي'} 
          </Button>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          حدد هوية اللاعب والنادي من الاقتراحات التالية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* قسم تحديد اللاعب */}
        <div>
          <h3 className="text-sm font-medium mb-2">تحديد اللاعب</h3>
          
          {manualMode ? (
            <div className="mb-4">
              <Select onValueChange={handlePlayerSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر لاعب..." />
                </SelectTrigger>
                <SelectContent>
                  {suggestedPlayers.map(player => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name} - {player.team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              {suggestedPlayers.map(player => (
                <div 
                  key={player.id} 
                  className={`p-3 border rounded-md cursor-pointer transition-colors flex items-center justify-between ${
                    selectedPlayer?.id === player.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => onPlayerSelect(player)}
                >
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{player.position}</span>
                      <span>•</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span>{player.team}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getConfidenceColor(player.confidenceScore)}>
                      درجة الثقة: {getConfidenceText(player.confidenceScore)}
                    </Badge>
                    {selectedPlayer?.id === player.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* قسم تحديد النادي */}
        <div>
          <h3 className="text-sm font-medium mb-2">تحديد النادي</h3>
          
          {manualMode ? (
            <div className="mb-4">
              <Select onValueChange={handleTeamSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر نادي..." />
                </SelectTrigger>
                <SelectContent>
                  {suggestedTeams.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name} - {team.league}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              {suggestedTeams.map(team => (
                <div 
                  key={team.id} 
                  className={`p-3 border rounded-md cursor-pointer transition-colors flex items-center justify-between ${
                    selectedTeam?.id === team.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => onTeamSelect(team)}
                >
                  <div>
                    <div className="font-medium">{team.name}</div>
                    <div className="text-sm text-muted-foreground">{team.league}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getConfidenceColor(team.confidenceScore)}>
                      درجة الثقة: {getConfidenceText(team.confidenceScore)}
                    </Badge>
                    {selectedTeam?.id === team.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* نصائح حول كيفية تحسين دقة التعرف */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">نصائح لتحسين دقة التعرف:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>تأكد من وضوح وجه اللاعب في الفيديو</li>
                <li>تأكد من ظهور شعار النادي بوضوح</li>
                <li>استخدم إضاءة جيدة للحصول على نتائج أفضل</li>
                <li>حاول تسجيل مقطع من مسافة متوسطة</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerIdentificationPanel;
