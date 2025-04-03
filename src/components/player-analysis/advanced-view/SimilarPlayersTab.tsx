
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { professionalPlayers } from '@/types/training';

interface ProfessionalPlayer {
  name: string;
  team: string;
  position: string;
  match: number;
  strengths: string[];
}

interface SimilarPlayersTabProps {
  playerName?: string;
  professionalPlayers: ProfessionalPlayer[];
  playerPosition?: string;
}

const SimilarPlayersTab: React.FC<SimilarPlayersTabProps> = ({ 
  playerName = "اللاعب",
  professionalPlayers: propPlayers,
  playerPosition
}) => {
  const [positionFilter, setPositionFilter] = useState<string>(playerPosition || 'all');
  
  // استخدام بيانات اللاعبين المحترفين من props أو من البيانات المحلية
  const allPlayers = propPlayers && propPlayers.length > 0 ? 
    propPlayers : 
    professionalPlayers.map(p => ({ 
      name: p.name, 
      team: p.team, 
      position: p.position, 
      match: p.similarity, 
      strengths: p.strengths 
    }));
  
  // تطبيق الفلتر حسب المركز
  const filteredPlayers = allPlayers.filter(player => {
    if (positionFilter === 'all') return true;
    return player.position === positionFilter;
  });
  
  // اختيار اللاعبين الأكثر تشابهاً
  const topPlayers = filteredPlayers.slice(0, 5);
  
  // Create comparison data for bar chart
  const comparisonData = [
    { 
      name: 'تمرير', 
      player: 75, 
      professional: 90,
      average: 70
    },
    { 
      name: 'رؤية', 
      player: 82, 
      professional: 92,
      average: 68 
    },
    { 
      name: 'تكتيك', 
      player: 70, 
      professional: 85,
      average: 65 
    },
    { 
      name: 'تمركز', 
      player: 65, 
      professional: 88,
      average: 62 
    },
    { 
      name: 'صناعة', 
      player: 78, 
      professional: 94,
      average: 64 
    },
  ];
  
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
      
      <Card className="border-2 border-primary/10 shadow-md">
        <CardHeader>
          <CardTitle>مقارنة مع لاعبين محترفين</CardTitle>
          <CardDescription>كيف تقارن مهاراتك مع لاعبين محترفين مشابهين لأسلوبك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topPlayers.map((player, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card transition-all hover:bg-muted/50">
                <div className="flex flex-col items-center mb-4 sm:mb-0">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback className="text-2xl font-semibold">{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.team}</p>
                  <p className="text-sm text-muted-foreground">{player.position === 'forward' ? 'مهاجم' : 'وسط'}</p>
                  <div className="mt-2 text-2xl font-bold flex items-baseline">
                    <span>{player.match}%</span>
                    <span className="text-sm text-muted-foreground mr-1">تطابق</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium mb-2">نقاط القوة:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {player.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            {topPlayers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">لا يوجد لاعبين مطابقين للفلتر المحدد</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>مقارنة المهارات</CardTitle>
          <CardDescription>مقارنة بين مهاراتك ومهارات {topPlayers[0]?.name || "المحترفين"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="player" name={playerName} fill="#8B5CF6" />
                <Bar dataKey="professional" name={topPlayers[0]?.name || "المحترف"} fill="#3B82F6" />
                <Bar dataKey="average" name="متوسط اللاعبين" fill="#9CA3AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              بناءً على تحليل أسلوب لعبك ومهاراتك، أنت تشبه {topPlayers[0]?.name || "لاعبين محترفين"} في المركز.
              أكبر فرص التطوير لديك هي في مجالات التمركز والتكتيك، حيث يوجد أكبر فرق بينك وبين النموذج المحترف.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimilarPlayersTab;
