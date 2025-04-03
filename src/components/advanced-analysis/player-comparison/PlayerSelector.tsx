
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlayerAnalysis } from '@/types/playerAnalysis';

interface PlayerSelectorProps {
  currentAnalysis: PlayerAnalysis;
  selectedPlayer: PlayerAnalysis | undefined;
  otherAnalyses: PlayerAnalysis[];
  selectedPlayerId: string | null;
  onSelectPlayer: (playerId: string) => void;
  averageDifference: number;
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  currentAnalysis,
  selectedPlayer,
  otherAnalyses,
  selectedPlayerId,
  onSelectPlayer,
  averageDifference
}) => {
  return (
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
              onValueChange={(value) => onSelectPlayer(value)}
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
              
              <ComparisonSummary 
                currentAnalysis={currentAnalysis}
                selectedPlayer={selectedPlayer}
                averageDifference={averageDifference}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
