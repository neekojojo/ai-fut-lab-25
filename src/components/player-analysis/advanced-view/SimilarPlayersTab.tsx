
import React from 'react';
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
  professionalPlayers,
  playerPosition
}) => {
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
      <Card className="border-2 border-primary/10 shadow-md">
        <CardHeader>
          <CardTitle>مقارنة مع لاعبين محترفين</CardTitle>
          <CardDescription>كيف تقارن مهاراتك مع لاعبين محترفين مشابهين لأسلوبك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {professionalPlayers.map((player, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card transition-all hover:bg-muted/50">
                <div className="flex flex-col items-center mb-4 sm:mb-0">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback className="text-2xl font-semibold">{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.team}</p>
                  <p className="text-sm text-muted-foreground">{player.position}</p>
                  <div className="mt-2 text-2xl font-bold flex items-baseline">
                    <span>{player.match}%</span>
                    <span className="text-sm text-muted-foreground ml-1">تطابق</span>
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
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>مقارنة المهارات</CardTitle>
          <CardDescription>مقارنة بين مهاراتك ومهارات {professionalPlayers[0]?.name || "المحترفين"}</CardDescription>
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
                <Bar dataKey="professional" name={professionalPlayers[0]?.name || "المحترف"} fill="#3B82F6" />
                <Bar dataKey="average" name="متوسط اللاعبين" fill="#9CA3AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              بناءً على تحليل أسلوب لعبك ومهاراتك، أنت تشبه {professionalPlayers[0]?.name || "لاعبين محترفين"} في المركز.
              أكبر فرص التطوير لديك هي في مجالات التمركز والتكتيك، حيث يوجد أكبر فرق بينك وبين النموذج المحترف.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimilarPlayersTab;
