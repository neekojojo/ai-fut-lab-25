
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { analyzeTeamCompatibility } from '@/services/teamTactics';

const TeamCompatibilityPanel = ({ playerAnalysis }) => {
  // Convert player analysis data to the format needed for compatibility analysis
  const playerStats = {
    avgSpeed: playerAnalysis.movementMetrics?.averageSpeed || 70,
    maxSpeed: playerAnalysis.movementMetrics?.topSpeed || 85,
    avgAcceleration: playerAnalysis.movementMetrics?.acceleration || 65,
    distanceCovered: playerAnalysis.movementMetrics?.distanceCovered || 8500,
    balanceScore: playerAnalysis.technicalMetrics?.balance || 75,
    technicalScore: playerAnalysis.technicalMetrics?.overall || 70,
    physicalScore: playerAnalysis.physicalMetrics?.overall || 68,
    movementEfficiency: playerAnalysis.movementMetrics?.efficiency || 72,
    passing: playerAnalysis.technicalMetrics?.passing || 65,
    ballControl: playerAnalysis.technicalMetrics?.ballControl || 68,
    vision: playerAnalysis.technicalMetrics?.vision || 62,
    pace: playerAnalysis.physicalMetrics?.pace || 75,
    stamina: playerAnalysis.physicalMetrics?.stamina || 70
  };
  
  const playerPosition = playerAnalysis.position || "Midfielder";
  const playerStrengths = playerAnalysis.strengths || [
    "تحكم بالكرة", 
    "السرعة",
    "الرؤية الميدانية"
  ];

  // Get compatibility results with Saudi League teams
  const teamResults = analyzeTeamCompatibility(playerStats, playerPosition, playerStrengths);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>توافق اللاعب مع الأندية</CardTitle>
          <CardDescription>تحليل مدى توافق أداء اللاعب مع أندية الدوري السعودي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {teamResults.slice(0, 3).map((result, index) => (
              <div key={result.team.id} className="border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img 
                        src={result.team.logo} 
                        alt={result.team.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{result.team.name}</h3>
                      <p className="text-sm text-muted-foreground">{result.team.formation} • {result.team.playingStyle}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold">{result.compatibilityScore}%</span>
                    <p className="text-xs text-muted-foreground">توافق</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>التوافق مع المركز</span>
                    <span className="font-medium">{result.positionFit}%</span>
                  </div>
                  <Progress value={result.positionFit} className="h-2" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>التوافق التكتيكي</span>
                    <span className="font-medium">{result.tacticalFit.toFixed(0)}%</span>
                  </div>
                  <Progress value={result.tacticalFit} className="h-2" />
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">دور اللاعب المتوقع</h4>
                  <p className="text-sm leading-relaxed">{result.roleDescription}</p>
                </div>
                
                {result.strengthsMatch.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">نقاط القوة المتوافقة</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.strengthsMatch.map((strength, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-400">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamCompatibilityPanel;
