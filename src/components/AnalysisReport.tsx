import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Download, Share2, AlertTriangle, Trophy, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import type { PlayerAnalysis } from './AnalysisReport.d';

interface AnalysisReportProps {
  analysis: PlayerAnalysis;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const performanceData = [
    { attribute: 'Technical', value: analysis.performance.technical },
    { attribute: 'Physical', value: analysis.performance.physical },
    { attribute: 'Tactical', value: analysis.performance.tactical },
    { attribute: 'Mental', value: analysis.performance.mental },
  ];

  const detailedPerformanceData = [
    { name: 'Ball Control', technical: Math.floor(analysis.performance.technical * 0.9), average: 60 },
    { name: 'Passing', technical: Math.floor(analysis.performance.technical * 1.1), average: 55 },
    { name: 'Shooting', technical: Math.floor(analysis.performance.technical * 0.95), average: 50 },
    { name: 'First Touch', technical: Math.floor(analysis.performance.technical * 0.85), average: 58 },
    { name: 'Dribbling', technical: Math.floor(analysis.performance.technical * 1.05), average: 52 },
    { name: 'Heading', technical: Math.floor(analysis.performance.technical * 0.9), average: 53 },
  ];

  const physicalAttributesData = [
    { name: 'Speed', physical: Math.floor(analysis.performance.physical * 1.1), average: 55 },
    { name: 'Strength', physical: Math.floor(analysis.performance.physical * 0.9), average: 58 },
    { name: 'Jumping', physical: Math.floor(analysis.performance.physical * 0.95), average: 52 },
    { name: 'Stamina', physical: Math.floor(analysis.performance.physical * 1.05), average: 54 },
    { name: 'Agility', physical: Math.floor(analysis.performance.physical * 0.85), average: 59 },
    { name: 'Balance', physical: Math.floor(analysis.performance.physical * 0.9), average: 57 },
  ];

  const progressData = analysis.progress?.areas.map(area => ({
    name: area.skill,
    before: area.before,
    after: area.after,
    gain: area.after - area.before
  })) || [];

  const injuryRiskData = analysis.injuryRisk?.areas.map(area => ({
    name: area.name,
    risk: area.risk,
    safeLevel: 100 - area.risk
  })) || [];
  
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
                <span className="font-medium">{String(value)}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Number(value)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderProComparison = () => {
    if (!analysis.proComparison) return null;
    
    const { name, similarity, skills } = analysis.proComparison;
    
    const proComparisonData = Object.entries(skills).map(([skill, value]) => ({
      skill,
      player: Math.max(Math.floor((Number(value)) * 0.6), 40),
      pro: Number(value)
    }));
    
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
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${name.replace(/\s+/g, '')}`} alt={name} />
                  <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Style Similarity</h4>
                  <div className="text-3xl font-bold text-primary">{similarity}%</div>
                </div>
              </div>
              <div className="hidden md:block w-1/3">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart 
                    data={proComparisonData.slice(0, 3)} 
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="skill" tick={{fontSize: 12}} width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="player" fill="#8884d8" name="You" />
                    <Bar dataKey="pro" fill="#82ca9d" name={name} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-4">Skill Comparison</h4>
              <div className="md:grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  {Object.entries(skills).map(([skill, value]) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{skill}</span>
                        <div className="space-x-2">
                          <span className="font-medium text-primary">You: {Math.max(Math.floor((Number(value)) * 0.6), 40)}</span>
                          <span className="font-medium text-muted-foreground">{name}: {String(value)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 flex">
                        <div 
                          className="bg-primary h-2 rounded-l-full" 
                          style={{ width: `${Math.max(Math.floor((Number(value)) * 0.6), 40)}%` }}
                        ></div>
                        <div className="h-2 border-l border-background"></div>
                        <div 
                          className="bg-muted-foreground h-2 rounded-r-full" 
                          style={{ width: `${(Number(value)) - Math.max(Math.floor((Number(value)) * 0.6), 40)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block mt-4 md:mt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={proComparisonData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="You" dataKey="player" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name={name} dataKey="pro" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
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

  const renderInjuryRisk = () => {
    if (!analysis.injuryRisk) return null;
    
    return (
      <Card className="hover-card mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            Injury Risk Assessment
          </CardTitle>
          <CardDescription>
            Analysis of potential injury concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Overall Risk Level</h4>
                <p className="text-sm text-muted-foreground">
                  Based on movement patterns and physical attributes
                </p>
              </div>
              <div className="text-xl font-bold flex items-center space-x-2">
                <span className={
                  analysis.injuryRisk.overall < 30 ? "text-green-500" : 
                  analysis.injuryRisk.overall < 60 ? "text-amber-500" : 
                  "text-red-500"
                }>
                  {analysis.injuryRisk.overall}%
                </span>
                <span className="text-sm font-normal text-muted-foreground">risk</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Risk Breakdown</h4>
                <div className="space-y-4">
                  {analysis.injuryRisk.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{area.name}</span>
                        <span className={`font-medium ${
                          area.risk < 30 ? "text-green-500" : 
                          area.risk < 60 ? "text-amber-500" : 
                          "text-red-500"
                        }`}>
                          {area.risk}% risk
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            area.risk < 30 ? "bg-green-500" : 
                            area.risk < 60 ? "bg-amber-500" : 
                            "bg-red-500"
                          }`}
                          style={{ width: `${area.risk}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{area.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:block">
                <h4 className="font-medium mb-4">Risk Visualization</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={injuryRiskData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="risk" name="Risk Level" fill="#f97316" />
                      <Bar dataKey="safeLevel" name="Safe Level" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Prevention Recommendations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {analysis.injuryRisk.areas.map((area, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="text-sm font-medium flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${
                        area.risk < 30 ? "bg-green-500" : 
                        area.risk < 60 ? "bg-amber-500" : 
                        "bg-red-500"
                      }`}></span>
                      {area.name}
                    </div>
                    <p className="text-sm">{area.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderBadges = () => {
    if (!analysis.badges || analysis.badges.length === 0) return null;
    
    return (
      <Card className="hover-card mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-amber-500" />
            Player Badges
          </CardTitle>
          <CardDescription>
            Special abilities and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {analysis.badges.map((badge, index) => (
              <div key={index} className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className={`h-14 w-14 rounded-full mb-2 flex items-center justify-center ${
                  badge.level === 'bronze' ? "bg-amber-100 text-amber-800" : 
                  badge.level === 'silver' ? "bg-slate-200 text-slate-800" : 
                  "bg-amber-200 text-amber-800"
                }`}>
                  <Trophy className="h-8 w-8" />
                </div>
                <div className="text-sm font-semibold">{badge.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                <div className={`text-xs mt-2 px-2 py-0.5 rounded-full ${
                  badge.level === 'bronze' ? "bg-amber-100 text-amber-800" : 
                  badge.level === 'silver' ? "bg-slate-200 text-slate-800" : 
                  "bg-amber-200 text-amber-800"
                }`}>
                  {badge.level.charAt(0).toUpperCase() + badge.level.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderProgress = () => {
    if (!analysis.progress) return null;
    
    return (
      <Card className="hover-card mt-6">
        <CardHeader>
          <CardTitle>Performance Progress</CardTitle>
          <CardDescription>
            Improvement since last analysis
            {analysis.progress.improvement && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +{analysis.progress.improvement}%
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Key Improvements</h4>
              <div className="space-y-4">
                {analysis.progress.areas.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{area.skill}</span>
                      <div className="space-x-1">
                        <span className="text-muted-foreground">{area.before}</span>
                        <ArrowRight className="inline h-3 w-3" />
                        <span className="font-medium">{area.after}</span>
                        <span className="text-green-500">(+{area.after - area.before})</span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 flex">
                      <div 
                        className="bg-muted-foreground h-2 rounded-l-full" 
                        style={{ width: `${area.before}%` }}
                      ></div>
                      <div 
                        className="bg-primary h-2" 
                        style={{ width: `${area.after - area.before}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden md:block">
              <h4 className="font-medium mb-4">Progress Visualization</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={progressData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="before" stroke="#8884d8" fillOpacity={1} fill="url(#colorBefore)" name="Previous" />
                  <Area type="monotone" dataKey="after" stroke="#82ca9d" fillOpacity={1} fill="url(#colorAfter)" name="Current" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
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
            
            <div className="hidden md:block">
              <h4 className="font-medium mb-4">Performance Radar</h4>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="attribute" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Player" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
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

  const handleDownloadReport = () => {
    try {
      const reportContent = `
        FOOTBALL PLAYER ANALYSIS REPORT
        ==============================
        
        PLAYER: ${analysis.playerName}
        POSITION: ${analysis.position}
        
        OVERVIEW
        --------
        Market Value: ${analysis.marketValue}
        Talent Score: ${analysis.talentScore}/100
        Team Compatibility: ${analysis.compatibilityScore}%
        
        PERFORMANCE METRICS
        ------------------
        Technical: ${analysis.performance.technical}/100
        Physical: ${analysis.performance.physical}/100
        Tactical: ${analysis.performance.tactical}/100
        Mental: ${analysis.performance.mental}/100
        
        KEY STRENGTHS
        ------------
        ${analysis.strengths.map(strength => '- ' + strength).join('\n')}
        
        AREAS FOR IMPROVEMENT
        -------------------
        ${analysis.weaknesses.map(weakness => '- ' + weakness).join('\n')}
        
        RECOMMENDATIONS
        --------------
        ${analysis.recommendations.map(rec => '- ' + rec).join('\n')}
        
        ${analysis.proComparison ? `
        PROFESSIONAL COMPARISON
        ---------------------
        Compared to: ${analysis.proComparison.name}
        Similarity: ${analysis.proComparison.similarity}%
        ` : ''}
        
        ${analysis.injuryRisk ? `
        INJURY RISK ASSESSMENT
        ---------------------
        Overall Risk: ${analysis.injuryRisk.overall}%
        Risk Areas: ${analysis.injuryRisk.areas.map(area => `- ${area.name}: ${area.risk}% (${area.recommendation})`).join('\n')}
        ` : ''}
        
        ${analysis.badges ? `
        EARNED BADGES
        ------------
        ${analysis.badges.map(badge => `- ${badge.name} (${badge.level}): ${badge.description}`).join('\n')}
        ` : ''}
        
        Report generated: ${new Date().toLocaleDateString()}
      `;
      
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${analysis.playerName.replace(/\s+/g, '_')}_Analysis_Report.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Downloaded",
        description: "Your analysis report has been downloaded successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error downloading report:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleShareReport = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to share the report.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Report Shared",
      description: `The analysis report has been shared to ${email}.`,
      duration: 3000,
    });
    
    setEmail("");
    setShareDialogOpen(false);
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
                  
                  <div className="hidden md:block mt-8">
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart outerRadius={90} data={performanceData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="attribute" />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} />
                        <Radar name="Player" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
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
                    
                    {/* Player image has been removed as requested */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {analysis.injuryRisk && renderInjuryRisk()}
          {analysis.badges && renderBadges()}
          {analysis.progress && renderProgress()}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
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
                    <div className="hidden md:block">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={detailedPerformanceData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" tick={{fontSize: 12}} width={80} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="technical" name="Player" fill="#8884d8" />
                          <Bar dataKey="average" name="Average" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">Physical Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
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
                    <div className="hidden md:block">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={physicalAttributesData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" tick={{fontSize: 12}} width={80} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="physical" name="Player" fill="#8884d8" />
                          <Bar dataKey="average" name="Average" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
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
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Performance Snapshot</h4>
                  <div className="aspect-video rounded-lg bg-muted overflow-hidden relative">
                    <div className="flex items-center justify-center h-full">
                      <img 
                        src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Football action" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-white text-center px-4">
                          <h3 className="text-xl font-bold">{analysis.playerName}</h3>
                          <p className="text-sm opacity-90">{analysis.position}</p>
                          <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary text-white">
                            Talent Score: {analysis.talentScore}/100
                          </div>
                        </div>
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
        <Button onClick={handleDownloadReport} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Full Report
        </Button>
        
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share analysis report</DialogTitle>
              <DialogDescription>
                The report will be sent via email as a PDF attachment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="coach@team.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShareDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleShareReport}>Send Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AnalysisReport;
