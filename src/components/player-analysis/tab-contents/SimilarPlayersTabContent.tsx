
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProComparison } from '@/components/charts/ProComparison';
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';

interface SimilarPlayersTabContentProps {
  playerComparison: ProfessionalPlayer[];
}

const SimilarPlayersTabContent: React.FC<SimilarPlayersTabContentProps> = ({ playerComparison }) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProComparison 
          playerComparison={{
            similarProfessionals: playerComparison,
            similarityMetrics: [
              { category: "Passing", score: 78, description: "Excellent range of passing with good accuracy." },
              { category: "Vision", score: 82, description: "Great awareness of teammates' positioning." },
              { category: "Technique", score: 75, description: "Good ball control and first touch." },
              { category: "Positioning", score: 70, description: "Solid understanding of spatial awareness." },
              { category: "Decision Making", score: 65, description: "Sometimes hesitates in the final third." }
            ]
          }}
          playerStats={playerStats}
          playerPosition="midfielder"
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
              {playerComparison[0]?.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
            
            <p className="font-medium mt-4">إمكانيات التطوير:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>زيادة استمرارية الأداء طوال المباراة</li>
              <li>تحسين سرعة اتخاذ القرار في الثلث الأخير</li>
              <li>تطوير الدقة في التمريرات الطويلة</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimilarPlayersTabContent;
