
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export interface PlayerAnalysis {
  playerName: string;
  position: string;
  marketValue: string;
  talentScore: number;
  strengths: string[];
  weaknesses: string[];
  detailedSkills?: any; // Position-specific skills
  performance: {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
  };
  recommendations: string[];
  compatibilityScore: number;
  proComparison?: {
    name: string;
    similarity: number;
    skills: any;
  };
}

interface AnalysisReportProps {
  analysis: PlayerAnalysis;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Function to render the detailed skills based on position
  const renderDetailedSkills = () => {
    if (!analysis.detailedSkills) return null;
    
    return (
      <div className="space-y-4 mt-6">
        <h4 className="font-medium">Position-Specific Skills</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(analysis.detailedSkills).map(([skill, value]) => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{skill}</span>
                <span className="font-medium">{value}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Function to render the professional player comparison
  const renderProComparison = () => {
    if (!analysis.proComparison) return null;
    
    const { name, similarity, skills } = analysis.proComparison;
    
    return (
      <Card className="hover-card mt-8">
        <CardHeader>
          <CardTitle>Professional Comparison</CardTitle>
          <CardDescription>
            Player style comparison with {name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Style Similarity</h4>
                <p className="text-sm text-muted-foreground">
                  Based on movement patterns and technical approach
                </p>
              </div>
              <div className="text-xl font-bold">{similarity}%</div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-4">Skill Comparison</h4>
              <div className="space-y-4">
                {Object.entries(skills).map(([skill, value]) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{skill}</span>
                      <div className="space-x-2">
                        <span className="font-medium text-primary">You: {Math.max(Math.floor((value as number) * 0.6), 40)}</span>
                        <span className="font-medium text-muted-foreground">{name}: {value}</span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 flex">
                      <div 
                        className="bg-primary h-2 rounded-l-full" 
                        style={{ width: `${Math.max(Math.floor((value as number) * 0.6), 40)}%` }}
                      ></div>
                      <div className="h-2 border-l border-background"></div>
                      <div 
                        className="bg-muted-foreground h-2 rounded-r-full" 
                        style={{ width: `${(value as number) - Math.max(Math.floor((value as number) * 0.6), 40)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Development Path</h4>
              <p className="text-sm">
                To reach a similar level to {name}, focus on these key areas:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {Object.entries(skills)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .slice(0, 3)
                  .map(([skill]) => (
                    <li key={skill} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>Improve your <span className="capitalize">{skill}</span> with specialized training</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Function to render personalized training plans
  const renderTrainingPlan = () => {
    return (
      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Personalized Training Plan</CardTitle>
          <CardDescription>
            Recommended training regimen based on your analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Weekly Schedule</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Day 1-2: Technical</div>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        1
                      </span>
                      <span>Ball control drills (30 min)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        2
                      </span>
                      <span>Passing precision exercises (30 min)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        3
                      </span>
                      <span>Shooting practice (30 min)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Day 3-4: Physical</div>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        1
                      </span>
                      <span>Sprint intervals (20 min)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        2
                      </span>
                      <span>Strength training (40 min)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        3
                      </span>
                      <span>Agility ladder drills (20 min)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Day 5-6: Tactical</div>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        1
                      </span>
                      <span>Position-specific movements (30 min)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        2
                      </span>
                      <span>Decision making exercises (30 min)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
                        3
                      </span>
                      <span>Small-sided games (30 min)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-4">Focus Areas Based On Analysis</h4>
              <div className="space-y-4">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-3 h-8 w-8 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-medium">{recommendation}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {index === 0 ? "This will improve your technical ability and decision making in key moments." :
                           index === 1 ? "Focus on this to enhance your physical attributes and match performance." :
                           "This training will address specific weaknesses identified in your play style."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2 text-center">
        <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
          Enhanced Analysis Complete
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Advanced Player Performance Report</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI has thoroughly analyzed the video and generated a comprehensive assessment with detailed metrics and professional comparisons.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="training">Training Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
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
                  Match to typical requirements for {analysis.position} position
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="hover-card">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Key performance categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Primary Metrics</h4>
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
                  
                  {renderDetailedSkills()}
                </div>
                
                <div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Key Strengths</h4>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detailed" className="space-y-6">
          <Card className="hover-card">
            <CardHeader>
              <CardTitle>Comprehensive Skill Assessment</CardTitle>
              <CardDescription>
                In-depth analysis of all performance aspects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="font-medium mb-4">Technical Analysis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Ball Control</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.technical * 0.9)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Passing</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.technical * 1.1)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Shooting</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.technical * 0.95)}/100</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">First Touch</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.technical * 0.85)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dribbling</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.technical * 1.05)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Heading</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.technical * 0.9)}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">Physical Analysis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Speed</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.physical * 1.1)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Strength</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.physical * 0.9)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Jumping</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.physical * 0.95)}/100</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Stamina</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.physical * 1.05)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Agility</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.physical * 0.85)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Balance</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.physical * 0.9)}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">Tactical Analysis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Positioning</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.tactical * 1.05)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Awareness</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.tactical * 0.9)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Decision Making</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.tactical * 0.95)}/100</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Off-ball Movement</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.tactical * 1.1)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Defensive Contribution</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.tactical * 0.85)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Game Reading</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.tactical * 0.9)}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">Mental Analysis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Composure</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.mental * 0.95)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Concentration</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.mental * 1.05)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Work Rate</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.mental * 0.9)}/100</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Leadership</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.mental * 1.1)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Decision Making</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.mental * 0.85)}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Teamwork</span>
                        <span className="text-sm font-medium">{Math.floor(analysis.performance.mental * 0.9)}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {renderProComparison()}
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          {renderTrainingPlan()}
          
          <Card className="hover-card">
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitoring your development over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Key Metrics to Track</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Physical Metrics</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Sprint time (10m, 30m)</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Jump height (vertical leap)</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Agility test times</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Technical Metrics</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Passing accuracy percentage</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Shooting conversion rate</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Ball control efficiency</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Game Metrics</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Successful actions per game</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Decision making success rate</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4 text-primary flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Positional awareness score</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Regular Assessment</span>
                        </div>
                        <p className="text-sm mb-2">
                          Upload a new performance video every 4-6 weeks to track your progress 
                          and receive updated analysis and recommendations.
                        </p>
                        <div className="text-sm text-primary font-medium cursor-pointer hover:underline">
                          Schedule your next assessment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
