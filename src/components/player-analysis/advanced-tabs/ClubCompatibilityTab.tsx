
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ClubCompatibilityTabProps {
  analysis: any;
}

const ClubCompatibilityTab: React.FC<ClubCompatibilityTabProps> = ({ analysis }) => {
  // Sample club compatibility data (in a real app, this would come from the analysis)
  const clubs = [
    {
      id: 1,
      name: "الهلال",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Al_Hilal_FC_logo.svg",
      formation: "4-3-3",
      playingStyle: "استحواذ هجومي",
      compatibilityScore: 87,
      positionFit: 92,
      tacticalFit: 85,
      roleDescription: "لاعب وسط إبداعي يركز على التمريرات المفتاحية وبناء الهجمات",
      strengthsMatch: ["الرؤية الميدانية", "التمرير الدقيق", "التحكم بالكرة"]
    },
    {
      id: 2,
      name: "النصر",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Al-Nassr.png",
      formation: "4-2-3-1",
      playingStyle: "هجوم سريع",
      compatibilityScore: 79,
      positionFit: 84,
      tacticalFit: 75,
      roleDescription: "صانع ألعاب يركز على التمريرات الحاسمة والهجمات المرتدة",
      strengthsMatch: ["السرعة", "المراوغة", "اتخاذ القرار"]
    },
    {
      id: 3,
      name: "الاتحاد",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Ittihad_FC.png",
      formation: "3-5-2",
      playingStyle: "ضغط عالٍ",
      compatibilityScore: 73,
      positionFit: 78,
      tacticalFit: 70,
      roleDescription: "لاعب وسط ديناميكي مسؤول عن الربط بين الدفاع والهجوم",
      strengthsMatch: ["التحكم بالكرة", "الرؤية الميدانية"]
    }
  ];
  
  const playerPosition = analysis?.position || "وسط";
  const playerStrengths = analysis?.strengths || ["تحكم بالكرة", "السرعة", "الرؤية الميدانية"];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>توافق اللاعب مع الأندية</CardTitle>
          <CardDescription>تحليل مدى توافق أداء اللاعب مع أندية الدوري السعودي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {clubs.map((club) => (
              <div key={club.id} className="border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img 
                        src={club.logo} 
                        alt={club.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{club.name}</h3>
                      <p className="text-sm text-muted-foreground">{club.formation} • {club.playingStyle}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold">{club.compatibilityScore}%</span>
                    <p className="text-xs text-muted-foreground">توافق</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>التوافق مع المركز</span>
                    <span className="font-medium">{club.positionFit}%</span>
                  </div>
                  <Progress value={club.positionFit} className="h-2" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>التوافق التكتيكي</span>
                    <span className="font-medium">{club.tacticalFit}%</span>
                  </div>
                  <Progress value={club.tacticalFit} className="h-2" />
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">دور اللاعب المتوقع</h4>
                  <p className="text-sm leading-relaxed">{club.roleDescription}</p>
                </div>
                
                {club.strengthsMatch.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">نقاط القوة المتوافقة</h4>
                    <div className="flex flex-wrap gap-2">
                      {club.strengthsMatch.map((strength, idx) => (
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

export default ClubCompatibilityTab;
