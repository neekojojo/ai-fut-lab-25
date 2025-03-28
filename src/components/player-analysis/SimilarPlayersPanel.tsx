
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';

interface SimilarPlayersPanelProps {
  playerComparison: ProfessionalPlayer[];
}

const SimilarPlayersPanel: React.FC<SimilarPlayersPanelProps> = ({ playerComparison }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>لاعبون مشابهون</CardTitle>
        <CardDescription>مقارنة مع لاعبين محترفين ذوي أسلوب لعب مشابه</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {playerComparison && playerComparison.map((player, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <img 
                    src={player.photo || "/placeholder.svg"} 
                    alt={player.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.team} • {player.position}</p>
                </div>
                <div className="ml-auto">
                  <Badge>{player.similarity}% تشابه</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">أوجه التشابه:</h4>
                <div className="flex flex-wrap gap-2">
                  {player.strengths && player.strengths.map((similarity, i) => (
                    <Badge key={i} variant="outline" className="bg-green-50">
                      {similarity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">ما يمكن تعلمه:</h4>
                <p className="text-sm">{player.learningPoints || 'التركيز على تحسين نقاط القوة المماثلة'}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarPlayersPanel;
