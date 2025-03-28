
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Search, InfoIcon, RefreshCw, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { searchPlayersByName, searchTeamsByName } from '@/utils/videoDetection/playerIdentifier';
import type { IdentifiedPlayer, IdentifiedTeam } from '@/utils/videoDetection/playerIdentification';
import PlayerIdentificationCard from './PlayerIdentificationCard';
import TeamIdentificationCard from './TeamIdentificationCard';

interface PlayerIdentificationPanelProps {
  suggestedPlayers: IdentifiedPlayer[];
  suggestedTeams: IdentifiedTeam[];
  onPlayerSelect: (player: IdentifiedPlayer | null) => void;
  onTeamSelect: (team: IdentifiedTeam | null) => void;
  selectedPlayer: IdentifiedPlayer | null;
  selectedTeam: IdentifiedTeam | null;
}

const PlayerIdentificationPanel: React.FC<PlayerIdentificationPanelProps> = ({
  suggestedPlayers,
  suggestedTeams,
  onPlayerSelect,
  onTeamSelect,
  selectedPlayer,
  selectedTeam
}) => {
  const [activeTab, setActiveTab] = useState<'suggested' | 'search'>('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    players: IdentifiedPlayer[];
    teams: IdentifiedTeam[];
  }>({
    players: [],
    teams: []
  });
  const [isSearching, setIsSearching] = useState(false);

  // تنفيذ البحث عند تغيير استعلام البحث
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults({ players: [], teams: [] });
        return;
      }
      
      setIsSearching(true);
      
      try {
        // البحث عن اللاعبين والفرق بشكل متوازٍ
        const [playersResults, teamsResults] = await Promise.all([
          searchPlayersByName(searchQuery),
          searchTeamsByName(searchQuery)
        ]);
        
        setSearchResults({
          players: playersResults,
          teams: teamsResults
        });
      } catch (error) {
        console.error('خطأ أثناء البحث:', error);
      } finally {
        setIsSearching(false);
      }
    };
    
    // استخدام مؤقت لتأخير البحث حتى يتوقف المستخدم عن الكتابة
    const timer = setTimeout(performSearch, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // دالة تحديد اللاعب
  const handlePlayerSelect = (player: IdentifiedPlayer) => {
    onPlayerSelect(player);
  };

  // دالة تحديد الفريق
  const handleTeamSelect = (team: IdentifiedTeam) => {
    onTeamSelect(team);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>تحديد هوية اللاعب والنادي</div>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'suggested' | 'search')} className="w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggested">المقترحة</TabsTrigger>
              <TabsTrigger value="search">بحث</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {activeTab === 'suggested' ? 
            'حدد هوية اللاعب والنادي من الاقتراحات التالية' : 
            'ابحث عن اللاعب أو النادي بالاسم'}
        </CardDescription>
        
        {activeTab === 'search' && (
          <div className="relative mt-2">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ابحث عن اسم اللاعب أو الفريق..."
              className="pl-3 pr-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <TabsContent value="suggested" className="space-y-6 m-0 pt-2">
          {/* قسم تحديد اللاعب */}
          <div>
            <h3 className="text-sm font-medium mb-3">تحديد اللاعب</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {suggestedPlayers.map(player => (
                <PlayerIdentificationCard
                  key={player.id}
                  player={player}
                  isSelected={selectedPlayer?.id === player.id}
                  onSelect={() => handlePlayerSelect(player)}
                />
              ))}
              
              {suggestedPlayers.length === 0 && (
                <div className="text-center p-4 text-muted-foreground text-sm">
                  لم يتم العثور على لاعبين مقترحين. يرجى تحميل فيديو للتحليل أو استخدام البحث.
                </div>
              )}
            </div>
          </div>
          
          {/* قسم تحديد النادي */}
          <div>
            <h3 className="text-sm font-medium mb-3">تحديد النادي</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {suggestedTeams.map(team => (
                <TeamIdentificationCard 
                  key={team.id}
                  team={team}
                  isSelected={selectedTeam?.id === team.id}
                  onSelect={() => handleTeamSelect(team)}
                />
              ))}
              
              {suggestedTeams.length === 0 && (
                <div className="text-center p-4 text-muted-foreground text-sm">
                  لم يتم العثور على فرق مقترحة. يرجى تحميل فيديو للتحليل أو استخدام البحث.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-6 m-0 pt-2">
          {/* نتائج بحث اللاعبين */}
          <div>
            <h3 className="text-sm font-medium mb-3">نتائج بحث اللاعبين</h3>
            
            {isSearching ? (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {searchResults.players.map(player => (
                  <PlayerIdentificationCard
                    key={player.id}
                    player={player}
                    isSelected={selectedPlayer?.id === player.id}
                    onSelect={() => handlePlayerSelect(player)}
                  />
                ))}
                
                {!isSearching && searchQuery.length >= 2 && searchResults.players.length === 0 && (
                  <div className="text-center p-4 text-muted-foreground text-sm">
                    لم يتم العثور على لاعبين مطابقين للبحث.
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* نتائج بحث الفرق */}
          <div>
            <h3 className="text-sm font-medium mb-3">نتائج بحث الفرق</h3>
            
            {isSearching ? (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {searchResults.teams.map(team => (
                  <TeamIdentificationCard 
                    key={team.id}
                    team={team}
                    isSelected={selectedTeam?.id === team.id}
                    onSelect={() => handleTeamSelect(team)}
                  />
                ))}
                
                {!isSearching && searchQuery.length >= 2 && searchResults.teams.length === 0 && (
                  <div className="text-center p-4 text-muted-foreground text-sm">
                    لم يتم العثور على فرق مطابقة للبحث.
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* نصائح حول كيفية تحسين دقة التعرف */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">نصائح لتحسين دقة التعرف:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>تأكد من وضوح وجه اللاعب في الفيديو</li>
                <li>تأكد من ظهور شعار النادي بوضوح</li>
                <li>استخدم إضاءة جيدة للحصول على نتائج أفضل</li>
                <li>حاول تسجيل مقطع من مسافة متوسطة</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerIdentificationPanel;
