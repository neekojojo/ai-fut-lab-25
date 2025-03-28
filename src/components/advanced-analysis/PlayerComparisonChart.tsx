
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { CHART_COLORS } from '@/components/charts/constants';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface PlayerComparisonChartProps {
  currentAnalysis: PlayerAnalysis;
  otherAnalyses: PlayerAnalysis[];
}

export const PlayerComparisonChart: React.FC<PlayerComparisonChartProps> = ({ 
  currentAnalysis, 
  otherAnalyses 
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
    otherAnalyses.length > 0 ? otherAnalyses[0].id : null
  );

  const selectedPlayer = otherAnalyses.find(p => p.id === selectedPlayerId);
  
  if (otherAnalyses.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>لا يوجد لاعبين للمقارنة</AlertTitle>
        <AlertDescription>
          قم بتحليل المزيد من اللاعبين لتمكين ميزة المقارنة.
        </AlertDescription>
      </Alert>
    );
  }

  // إنشاء بيانات المقارنة للمهارات الفنية
  const createTechnicalComparisonData = () => {
    if (!selectedPlayer) return [];
    
    return [
      { 
        skill: 'تمرير', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.passing || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.passing || 0 
      },
      { 
        skill: 'تسديد', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.shooting || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.shooting || 0 
      },
      { 
        skill: 'مراوغة', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.dribbling || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.dribbling || 0 
      },
      { 
        skill: 'دفاع', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.defending || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.defending || 0 
      },
      { 
        skill: 'بدنية', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.physical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.physical || 0 
      }
    ];
  };

  // إنشاء بيانات المقارنة للرادار
  const createRadarComparisonData = () => {
    if (!selectedPlayer) return [];
    
    return [
      { 
        attribute: 'تقنية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.technical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.technical || 0 
      },
      { 
        attribute: 'بدنية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.physical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.physical || 0 
      },
      { 
        attribute: 'تكتيكية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.tactical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.tactical || 0 
      },
      { 
        attribute: 'ذهنية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.mental || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.mental || 0 
      },
      { 
        attribute: 'سرعة', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.pace || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.pace || 0 
      },
      { 
        attribute: 'تحمل', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.stamina || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.stamina || 0 
      }
    ];
  };

  const technicalComparisonData = createTechnicalComparisonData();
  const radarComparisonData = createRadarComparisonData();

  // حساب متوسط الفرق بين اللاعبين
  const calculateAverageDifference = () => {
    if (!selectedPlayer) return 0;
    
    let totalDiff = 0;
    let count = 0;
    
    // حساب الفرق في المهارات الأساسية
    if (currentAnalysis.stats && selectedPlayer.stats) {
      const stats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
      
      stats.forEach(stat => {
        const current = currentAnalysis.stats[stat as keyof typeof currentAnalysis.stats] || 0;
        const other = selectedPlayer.stats[stat as keyof typeof selectedPlayer.stats] || 0;
        
        totalDiff += current - other;
        count++;
      });
    }
    
    // حساب الفرق في أداء المهارات
    if (currentAnalysis.performance && selectedPlayer.performance) {
      const performances = ['technical', 'physical', 'tactical', 'mental'];
      
      performances.forEach(perf => {
        const current = currentAnalysis.performance?.[perf as keyof typeof currentAnalysis.performance] || 0;
        const other = selectedPlayer.performance?.[perf as keyof typeof selectedPlayer.performance] || 0;
        
        totalDiff += current - other;
        count++;
      });
    }
    
    return count > 0 ? totalDiff / count : 0;
  };

  const averageDifference = calculateAverageDifference();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>اختر لاعب للمقارنة</CardTitle>
              <CardDescription>قارن بين مهارات اللاعبين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="player-select">اختر لاعب</Label>
                  <Select
                    value={selectedPlayerId || ""}
                    onValueChange={(value) => setSelectedPlayerId(value)}
                  >
                    <SelectTrigger id="player-select">
                      <SelectValue placeholder="اختر لاعب للمقارنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {otherAnalyses.map((player) => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.playerName} ({player.position})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedPlayer && (
                  <div className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">اللاعب الحالي</div>
                        <div className="font-medium">{currentAnalysis.playerName}</div>
                        <div className="text-sm">{currentAnalysis.position}</div>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">اللاعب المقارن</div>
                        <div className="font-medium">{selectedPlayer.playerName}</div>
                        <div className="text-sm">{selectedPlayer.position}</div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-sm font-medium mb-2">متوسط الفرق</div>
                      <div className={`text-2xl font-bold ${averageDifference > 0 ? 'text-green-500' : averageDifference < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                        {averageDifference > 0 ? '+' : ''}{averageDifference.toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {averageDifference > 0 
                          ? `${currentAnalysis.playerName} أفضل في المتوسط`
                          : averageDifference < 0 
                            ? `${selectedPlayer.playerName} أفضل في المتوسط`
                            : 'اللاعبان متكافئان تقريباً'
                        }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>مقارنة المهارات الفنية</CardTitle>
              <CardDescription>تحليل مقارن للمهارات الأساسية</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPlayer ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={technicalComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey={currentAnalysis.playerName} 
                      fill={CHART_COLORS.primary} 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey={selectedPlayer.playerName} 
                      fill={CHART_COLORS.blue} 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  يرجى اختيار لاعب للمقارنة
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedPlayer && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>مقارنة الملف الشامل</CardTitle>
            <CardDescription>تحليل رادارية لمقارنة القدرات الشاملة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart outerRadius={150} data={radarComparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="attribute" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name={currentAnalysis.playerName}
                  dataKey={currentAnalysis.playerName}
                  stroke={CHART_COLORS.primary}
                  fill={CHART_COLORS.primary}
                  fillOpacity={0.5}
                />
                <Radar
                  name={selectedPlayer.playerName}
                  dataKey={selectedPlayer.playerName}
                  stroke={CHART_COLORS.blue}
                  fill={CHART_COLORS.blue}
                  fillOpacity={0.5}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
