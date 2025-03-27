
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, TrendingUp, Award, Zap } from 'lucide-react';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface PlayerDigitalIdentityProps {
  analysis: PlayerAnalysis;
}

const PlayerDigitalIdentity: React.FC<PlayerDigitalIdentityProps> = ({ analysis }) => {
  // Calculate future value (20-30% increase based on talent score)
  const currentValue = analysis.marketValue || "$500,000";
  const currentValueNum = parseInt(currentValue.replace(/\$|,/g, ''));
  const growthPercentage = 20 + (analysis.talentScore || 70) / 10;
  const futureValueNum = Math.round(currentValueNum * (1 + growthPercentage / 100));
  const futureValue = `$${futureValueNum.toLocaleString()}`;

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
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border bg-card p-3 text-center">
              <div className="flex items-center justify-center text-muted-foreground mb-1">
                <Award className="h-4 w-4 mr-1" />
                <span className="text-xs">القيمة الحالية</span>
              </div>
              <p className="font-bold text-primary">{currentValue}</p>
            </div>
            
            <div className="rounded-lg border bg-card p-3 text-center">
              <div className="flex items-center justify-center text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-xs">القيمة المستقبلية</span>
              </div>
              <p className="font-bold text-primary">{futureValue}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center rounded-md bg-primary/10 p-2">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <p className="text-xs">
              معدل النمو المتوقع: <span className="font-bold">{growthPercentage.toFixed(1)}%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDigitalIdentity;
