
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, Award, Zap } from 'lucide-react';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface PlayerDigitalIdentityProps {
  analysis: PlayerAnalysis;
}

const PlayerDigitalIdentity: React.FC<PlayerDigitalIdentityProps> = ({ analysis }) => {
  // Generate a unique player ID
  const playerId = `FUT-${Math.floor(Math.random() * 1000)}-${analysis.playerName.substring(0, 3).toUpperCase()}`;

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-card/90 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{analysis.playerName}</CardTitle>
            <CardDescription className="flex items-center text-xs mt-1">
              <CalendarIcon className="h-3 w-3 mr-1" /> تم إنشاؤه {new Date().toLocaleDateString('ar-SA')}
            </CardDescription>
          </div>
          <Badge className="bg-primary/80" variant="default">
            {playerId}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">المركز:</span>
            <Badge variant="outline" className="font-bold">
              {analysis.position}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">التقييم التقني:</span>
              <span className="font-bold">{analysis.performance?.technical || 75}%</span>
            </div>
            <Progress value={analysis.performance?.technical || 75} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">اللياقة البدنية:</span>
              <span className="font-bold">{analysis.performance?.physical || 70}%</span>
            </div>
            <Progress value={analysis.performance?.physical || 70} className="h-2" />
          </div>
          
          <div className="mt-4 flex items-center rounded-md bg-primary/10 p-2">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <p className="text-xs">
              <span className="font-bold">معدل التحسين المتوقع:</span> تتبع معدل تحسين المهارات مع التدريب
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDigitalIdentity;
