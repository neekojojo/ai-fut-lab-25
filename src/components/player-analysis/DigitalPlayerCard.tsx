
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, Award, Zap, DollarSign, MapPin, User, Ruler, Weight, Flag } from 'lucide-react';
import { PlayerAnalysis } from '@/types/playerAnalysis';

interface PlayerDigitalIdentityProps {
  analysis: PlayerAnalysis;
}

const PlayerDigitalIdentity: React.FC<PlayerDigitalIdentityProps> = ({ analysis }) => {
  // Generate a unique player ID
  const playerId = `FUT-${Math.floor(Math.random() * 1000)}-${analysis.playerName.substring(0, 3).toUpperCase()}`;

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-card/90 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{analysis.playerName}</CardTitle>
            <CardDescription className="flex items-center text-xs mt-1">
              <CalendarIcon className="h-3 w-3 mr-1" /> Created {new Date().toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className="bg-primary/80" variant="default">
            {playerId}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Position:</span>
            <Badge variant="outline" className="font-bold">
              {analysis.position}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Age</span>
              <span className="text-sm font-medium">{analysis.age || 'N/A'}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Country</span>
              <span className="text-sm font-medium flex items-center">
                <Flag className="h-3 w-3 mr-1" /> 
                {analysis.country || 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">City</span>
              <span className="text-sm font-medium flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> 
                {analysis.city || 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Height</span>
              <span className="text-sm font-medium flex items-center">
                <Ruler className="h-3 w-3 mr-1" /> 
                {analysis.height || 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Weight</span>
              <span className="text-sm font-medium flex items-center">
                <Weight className="h-3 w-3 mr-1" /> 
                {analysis.weight || 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Preferred Foot</span>
              <span className="text-sm font-medium">{analysis.preferredFoot || 'N/A'}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Technical Rating:</span>
              <span className="font-bold">{analysis.performance?.technical || 75}%</span>
            </div>
            <Progress value={analysis.performance?.technical || 75} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Physical Fitness:</span>
              <span className="font-bold">{analysis.performance?.physical || 70}%</span>
            </div>
            <Progress value={analysis.performance?.physical || 70} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Market Value:</span>
              <span className="font-bold text-primary flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {analysis.marketValue || '$750,000'}
              </span>
            </div>
            <Progress value={analysis.talentScore || 75} className="h-2 bg-primary/20" />
          </div>
          
          <div className="mt-4 flex items-center rounded-md bg-primary/10 p-2">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <p className="text-xs">
              <span className="font-bold">Expected Improvement Rate:</span> Track skill improvement with training
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDigitalIdentity;
