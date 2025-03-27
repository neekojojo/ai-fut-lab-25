
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface RecentAnalysesProps {
  analyses: PlayerAnalysis[];
}

const RecentAnalyses: React.FC<RecentAnalysesProps> = ({ analyses }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Analyses</CardTitle>
        <CardDescription>Your most recent performance analyses</CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <ul className="space-y-4">
            {analyses.slice(0, 3).map((analysis, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{analysis.playerName}</p>
                  <p className="text-sm text-muted-foreground">{analysis.position}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/analysis/${index}`)}>
                  View
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No analyses yet</p>
            <Button variant="outline" className="mt-2" onClick={() => navigate('/')}>
              Perform Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAnalyses;
