
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProComparison } from '@/components/charts/ProComparison';
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { professionalPlayers } from '@/types/training';

interface SimilarPlayersTabContentProps {
  playerComparison: ProfessionalPlayer[];
}

const SimilarPlayersTabContent: React.FC<SimilarPlayersTabContentProps> = ({ playerComparison }) => {
  const [positionFilter, setPositionFilter] = useState<string>('all');
  
  // استخدام البيانات المحلية إذا كانت البيانات المرسلة فارغة
  const allPlayers = playerComparison.length > 0 ? playerComparison : professionalPlayers;

  // تطبيق الفلتر حسب المركز
  const filteredPlayers = allPlayers.filter(player => {
    if (positionFilter === 'all') return true;
    return player.position === positionFilter;
  });

  const playerStats = {
    avgSpeed: 12.5,
    maxSpeed: 22.3,
    avgAcceleration: 3.2,
    distanceCovered: 1250,
    balanceScore: 68,
    technicalScore: 75,
    physicalScore: 82,
    movementEfficiency: 79
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">مقارنة مع لاعبين محترفين</h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="position-filter">تصفية حسب المركز</Label>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger id="position-filter" className="w-[180px]">
                <SelectValue placeholder="جميع المراكز" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المراكز</SelectItem>
                <SelectItem value="forward">الهجوم</SelectItem>
                <SelectItem value="midfielder">الوسط</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProComparison 
          playerComparison={{
            similarProfessionals: filteredPlayers.slice(0, 3),
            similarityMetrics: [
              { category: "Passing", score: 78, description: "Excellent range of passing with good accuracy." },
              { category: "Vision", score: 82, description: "Great awareness of teammates' positioning." },
              { category: "Technique", score: 75, description: "Good ball control and first touch." },
              { category: "Positioning", score: 70, description: "Solid understanding of spatial awareness." },
              { category: "Decision Making", score: 65, description: "Sometimes hesitates in the final third." }
            ]
          }}
          playerStats={playerStats}
          playerPosition={positionFilter !== 'all' ? positionFilter : "midfielder"}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تحليل التشابه مع اللاعبين المحترفين</CardTitle>
          <CardDescription>
            كيف تتشابه مهاراتك مع خصائص اللاعبين المحترفين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="font-medium">نقاط قوة تشبه اللاعبين المحترفين:</p>
            <ul className="list-disc list-inside space-y-2">
              {filteredPlayers.length > 0 && filteredPlayers[0]?.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
            
            <p className="font-medium mt-4">إمكانيات التطوير:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>زيادة استمرارية الأداء طوال المباراة</li>
              <li>تحسين سرعة اتخاذ القرار في الثلث الأخير</li>
              <li>تطوير الدقة في التمريرات الطويلة</li>
            </ul>
            
            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">إحصائيات اللاعبين المحترفين في نفس المركز:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">متوسط السرعة القصوى</p>
                  <p className="text-lg font-bold">32.4 كم/س</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">متوسط المسافة المقطوعة</p>
                  <p className="text-lg font-bold">11.2 كم</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">متوسط دقة التمريرات</p>
                  <p className="text-lg font-bold">87%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimilarPlayersTabContent;
