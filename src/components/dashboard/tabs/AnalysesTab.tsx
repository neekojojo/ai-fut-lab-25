
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface AnalysesTabProps {
  analyses: PlayerAnalysis[];
}

const AnalysesTab: React.FC<AnalysesTabProps> = ({ analyses }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Analyses</CardTitle>
          <CardDescription>All your player analyses</CardDescription>
        </CardHeader>
        <CardContent>
          {analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.map((analysis, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{analysis.playerName}</h3>
                        <p className="text-sm text-muted-foreground">{analysis.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{analysis.marketValue}</p>
                        <p className="text-sm text-muted-foreground">Market Value</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Technical</p>
                        <Progress value={analysis.performance.technical} className="h-2 mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Physical</p>
                        <Progress value={analysis.performance.physical} className="h-2 mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tactical</p>
                        <Progress value={analysis.performance.tactical} className="h-2 mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mental</p>
                        <Progress value={analysis.performance.mental} className="h-2 mt-1" />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/analysis/${index}`)}>
                        View Full Analysis
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't performed any analyses yet</p>
              <Button onClick={() => navigate('/')}>Perform Your First Analysis</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysesTab;
