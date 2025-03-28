
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamCompatibilityResult } from '@/services/teamTactics/types';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { Loader2 } from "lucide-react";
import { analyzeTeamCompatibility } from '@/services/teamTactics';

interface TeamCompatibilityPanelProps {
  playerAnalysis: PlayerAnalysis;
}

const TeamCompatibilityPanel: React.FC<TeamCompatibilityPanelProps> = ({ playerAnalysis }) => {
  const [compatibilityResults, setCompatibilityResults] = useState<TeamCompatibilityResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCompatibility = async () => {
      try {
        const adaptedStats = {
          avgSpeed: playerAnalysis.stats.pace || 70,
          maxSpeed: playerAnalysis.stats.acceleration || 75,
          avgAcceleration: playerAnalysis.stats.acceleration || 70,
          distanceCovered: 1000,
          balanceScore: playerAnalysis.stats.balance || 70,
          technicalScore: playerAnalysis.stats.ballControl || 75,
          physicalScore: playerAnalysis.stats.physical || 75,
          movementEfficiency: playerAnalysis.stats.agility || 70,
          passing: playerAnalysis.stats.passing || 70,
          ballControl: playerAnalysis.stats.ballControl || 70,
          vision: playerAnalysis.stats.vision || 70,
          pace: playerAnalysis.stats.pace || 70,
          stamina: playerAnalysis.stats.stamina || 70,
          physical: playerAnalysis.stats.physical || 70,
          positioning: playerAnalysis.stats.positioning || 70,
          anticipation: playerAnalysis.stats.anticipation || 70,
          decision: playerAnalysis.stats.decision || 70
        };
        
        const results = await analyzeTeamCompatibility(
          adaptedStats,
          playerAnalysis.position,
          playerAnalysis.strengths
        );
        
        setCompatibilityResults(results);
      } catch (error) {
        console.error('Error analyzing team compatibility:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompatibility();
  }, [playerAnalysis]);
  
  const toggleExpand = (teamId: string) => {
    if (expanded === teamId) {
      setExpanded(null);
    } else {
      setExpanded(teamId);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>تحليل التوافق مع الأندية</CardTitle>
          <CardDescription>جاري تحليل توافق اللاعب مع أندية الدوري السعودي...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>تحليل التوافق مع الأندية</CardTitle>
        <CardDescription>مدى توافق اللاعب مع تكتيكات وأسلوب لعب أندية الدوري السعودي</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {compatibilityResults.map((result) => (
            <Card key={result.team.id} className={`overflow-hidden border ${
              result.compatibilityScore > 80 ? 'border-green-200 bg-green-50 dark:bg-green-900/10' : 
              result.compatibilityScore > 60 ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/10' : 
              'border-gray-200 dark:border-gray-700'
            }`}>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={result.team.logo} 
                        alt={result.team.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{result.team.name}</h3>
                      <p className="text-sm text-muted-foreground">{result.team.formation} • {result.team.playingStyle}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{result.compatibilityScore}%</div>
                    <div className="text-xs text-muted-foreground">نسبة التوافق</div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">التوافق مع المركز</p>
                    <Progress value={result.positionFit} className="h-2" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">التوافق التكتيكي</p>
                    <Progress value={result.tacticalFit} className="h-2" />
                  </div>
                </div>
                
                {expanded === result.team.id && (
                  <div className="mt-4 space-y-3 animate-in fade-in">
                    <div>
                      <h4 className="text-sm font-medium mb-2">دورك في الفريق:</h4>
                      <p className="text-sm bg-background p-2 rounded-md">
                        {result.roleDescription}
                      </p>
                    </div>
                    
                    {result.strengthsMatch.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">كيف يمكنك تعزيز الفريق:</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.strengthsMatch.map((match, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 dark:bg-green-900/10">
                              {match}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">نقاط قوة النادي:</h4>
                        <ul className="text-sm space-y-1">
                          {result.team.strengths.map((strength, index) => (
                            <li key={index} className="flex items-center">
                              <span className="size-2 rounded-full bg-green-500 mr-2"></span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">تحديات النادي:</h4>
                        <ul className="text-sm space-y-1">
                          {result.team.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-center">
                              <span className="size-2 rounded-full bg-red-500 mr-2"></span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleExpand(result.team.id)}
                  >
                    {expanded === result.team.id ? 'عرض أقل' : 'عرض المزيد'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCompatibilityPanel;
