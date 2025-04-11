
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { professionalPlayers } from '@/types/training';

const ProfessionalComparisonPanel: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState("Kevin De Bruyne");
  const [positionFilter, setPositionFilter] = useState<string>('all');
  
  // Get professional player data from our extensive list
  const filteredPlayers = professionalPlayers.filter(player => {
    if (positionFilter === 'all') return player.position === 'forward' || player.position === 'midfielder';
    return player.position === positionFilter;
  });

  // Get currently selected pro player
  const selectedProData = filteredPlayers.find(p => p.name === selectedPlayer) || filteredPlayers[0];
  
  // Default player data for comparison
  const playerSkills = [
    { name: 'التكنيك', you: 55, pro: selectedProData ? 90 : 93 },
    { name: 'التمركز', you: 56, pro: selectedProData ? 85 : 94 },
    { name: 'المراوغة', you: 54, pro: selectedProData ? 88 : 91 },
    { name: 'التمرير', you: 52, pro: selectedProData ? 89 : 87 },
    { name: 'التحكم', you: 55, pro: selectedProData ? 86 : 92 }
  ];

  // Development tips based on the selected player's strengths
  const developmentPath = selectedProData?.strengths.map(strength => 
    `تحسين قدراتك في ${strength} من خلال تدريبات متخصصة`
  ) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>المقارنة مع لاعب محترف</CardTitle>
        <CardDescription>قارن أسلوب لعبك مع أفضل اللاعبين في العالم</CardDescription>
        
        <div className="mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="position-filter">تصفية حسب المركز</Label>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger id="position-filter">
                <SelectValue placeholder="جميع المراكز" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المراكز</SelectItem>
                <SelectItem value="forward">الهجوم</SelectItem>
                <SelectItem value="midfielder">الوسط</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 grid w-full items-center gap-1.5">
            <Label htmlFor="player-select">اختر لاعباً للمقارنة</Label>
            <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
              <SelectTrigger id="player-select">
                <SelectValue placeholder="اختر لاعباً محترفاً" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {filteredPlayers.map((player) => (
                  <SelectItem key={player.name} value={player.name}>
                    {player.name} ({player.position === 'forward' ? 'مهاجم' : 'وسط'}) - {player.team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="none" />
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="#ef4444" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">تشابه الأسلوب</h3>
                <p className="text-muted-foreground">مدى التشابه في أسلوب اللعب</p>
              </div>
              <div className="text-4xl font-bold">{selectedProData?.similarity || 41}%</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">مقارنة المهارات</h3>
            <div className="space-y-5">
              {playerSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <div>
                      <span className="mr-2 rtl:ml-2 rtl:mr-0">أنت: {skill.you}</span>
                      <span className="text-primary">{selectedProData?.name || ""}: {skill.pro}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-black dark:bg-white h-4 rounded-l-full rtl:rounded-r-full rtl:rounded-l-none" style={{ width: `${skill.you}%` }}></div>
                    </div>
                    <div className="absolute top-1.5 w-1 h-1 bg-gray-800 dark:bg-gray-200 rounded-full" style={{ left: `${skill.pro}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">مسار التطوير</h3>
            <p className="mb-4">للوصول إلى مستوى مشابه لـ {selectedProData?.name}، ركز على هذه المجالات الرئيسية:</p>
            <div className="space-y-3">
              {developmentPath.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-2 rtl:ml-2 rtl:mr-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground">
              {selectedProData ? (
                <>
                  {selectedProData.name} لاعب {selectedProData.nationality || "محترف"} {selectedProData.age ? `(${selectedProData.age} سنة)` : ""} يلعب في {selectedProData.team}. {selectedProData.playingStyle ? `أسلوب لعبه متميز في ${selectedProData.playingStyle}.` : ""}
                </>
              ) : (
                'اختر لاعباً للحصول على معلومات إضافية'
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalComparisonPanel;
