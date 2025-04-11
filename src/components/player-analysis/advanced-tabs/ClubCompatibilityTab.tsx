
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building, Shield, Trophy, Star } from 'lucide-react';

interface ClubCompatibilityTabProps {
  analysis: any;
}

const ClubCompatibilityTab: React.FC<ClubCompatibilityTabProps> = ({ analysis }) => {
  // Sample club compatibility data
  const clubCompatibility = [
    { club: 'الهلال', compatibility: 87, logo: '🔵', style: 'هجومي متوازن' },
    { club: 'النصر', compatibility: 82, logo: '🟡', style: 'هجومي سريع' },
    { club: 'الأهلي', compatibility: 78, logo: '🔴', style: 'متوازن تكتيكي' },
    { club: 'الاتحاد', compatibility: 75, logo: '⚫', style: 'ضغط عالٍ' },
    { club: 'الشباب', compatibility: 72, logo: '⚪', style: 'استحواذ ودفاع منظم' }
  ];
  
  const playingStyles = [
    { style: 'هجومي', compatibility: 85 },
    { style: 'دفاعي', compatibility: 65 },
    { style: 'استحواذ', compatibility: 78 },
    { style: 'ضغط عالٍ', compatibility: 72 },
    { style: 'هجمات مرتدة', compatibility: 80 }
  ];
  
  const positions = [
    { position: 'وسط هجومي', compatibility: 90 },
    { position: 'جناح', compatibility: 82 },
    { position: 'وسط متقدم', compatibility: 85 },
    { position: 'مهاجم ثاني', compatibility: 75 },
    { position: 'وسط دفاعي', compatibility: 60 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-indigo-500" />
              <span>توافق الأندية</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {clubCompatibility.map((club, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{club.logo} {club.club}</span>
                  <span className="text-sm">{club.compatibility}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={club.compatibility} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">{club.style}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>توافق أساليب اللعب</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {playingStyles.map((style, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{style.style}</span>
                  <span className="text-sm">{style.compatibility}%</span>
                </div>
                <Progress value={style.compatibility} className="h-2" />
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <div className="text-sm font-medium mb-2">التحليل العام لأسلوب اللعب</div>
              <p className="text-sm text-muted-foreground">
                يتكيف اللاعب بشكل أفضل مع الأسلوب الهجومي وأسلوب الهجمات المرتدة، مع قدرة جيدة على التأقلم مع أسلوب الاستحواذ.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span>التوافق مع المراكز</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {positions.map((pos, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{pos.position}</span>
                    <span className="text-sm">{pos.compatibility}%</span>
                  </div>
                  <Progress 
                    value={pos.compatibility} 
                    className={`h-2 ${pos.compatibility > 85 ? 'bg-green-200' : ''}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>المركز الأمثل</span>
                </h3>
                <div className="text-2xl font-bold mb-1">وسط هجومي</div>
                <p className="text-sm text-muted-foreground">
                  يتناسب اللاعب بشكل مثالي مع مركز الوسط الهجومي، حيث يمكنه استغلال مهاراته في المراوغة والتمرير والرؤية الميدانية.
                </p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium mb-2">التوصيات</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>الأندية التي تلعب بأسلوب هجومي هي الأنسب</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>يمكن أن يلعب في أكثر من مركز في الثلث الهجومي</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>تجنب الأندية التي تعتمد على الأسلوب الدفاعي</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubCompatibilityTab;
