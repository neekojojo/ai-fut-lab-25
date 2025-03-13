
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export interface PlayerAnalysis {
  playerName: string;
  position: string;
  marketValue: string;
  talentScore: number;
  strengths: string[];
  weaknesses: string[];
  performance: {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
  };
  recommendations: string[];
  compatibilityScore: number;
}

interface AnalysisReportProps {
  analysis: PlayerAnalysis;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2 text-center">
        <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
          Analysis Complete
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Player Performance Report</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI has thoroughly analyzed the video and generated a comprehensive assessment of the player's performance and potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Market Value</CardTitle>
            <CardDescription>Estimated current value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analysis.marketValue}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on current performance, age, and market conditions
            </p>
          </CardContent>
        </Card>

        <Card className="hover-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Talent Score</CardTitle>
            <CardDescription>Overall rating out of 100</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">{analysis.talentScore}</div>
              <div className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {analysis.talentScore >= 85 ? 'Elite' : 
                 analysis.talentScore >= 70 ? 'Professional' : 
                 analysis.talentScore >= 60 ? 'Talented' : 'Developing'}
              </div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mt-3">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${analysis.talentScore}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Team Compatibility</CardTitle>
            <CardDescription>How well the player fits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">{analysis.compatibilityScore}%</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Match to typical requirements for {analysis.position}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>
            Breakdown of key performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-4">Skill Ratings</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Technical</span>
                    <span className="font-medium">{analysis.performance.technical}/100</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${analysis.performance.technical}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Physical</span>
                    <span className="font-medium">{analysis.performance.physical}/100</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${analysis.performance.physical}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tactical</span>
                    <span className="font-medium">{analysis.performance.tactical}/100</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${analysis.performance.tactical}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mental</span>
                    <span className="font-medium">{analysis.performance.mental}/100</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${analysis.performance.mental}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-5 w-5 text-green-500 flex-shrink-0"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-5 w-5 text-amber-500 flex-shrink-0"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div>
            <h4 className="font-medium mb-4">Improvement Recommendations</h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 h-6 w-6 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-sm">
                    {index + 1}
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center gap-4">
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Download Full Report
        </button>
        <button className="px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
          Share Results
        </button>
      </div>
    </div>
  );
};

export default AnalysisReport;
