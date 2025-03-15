
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, ChartBar, Dumbbell, Trophy, Lightbulb, Zap, BarChart3 } from 'lucide-react';
import AdvancedPlayerCharts from './AdvancedPlayerCharts';
import { toast } from 'sonner';
import { PlayerDataAnalyzer, PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';
import { playerMLService, TrainingRecommendation, PlayerComparison } from '@/utils/ml/playerMLService';
import { openAIService, OpenAIAnalysis } from '@/utils/ai/openAiService';
import { googleAutoMLService, PlayerPerformancePrediction } from '@/utils/ai/googleAutoMLService';

// Mock player stats for demonstration
const mockPlayerStats: PlayerStats = {
  avgSpeed: 45.2,
  maxSpeed: 153.7,
  avgAcceleration: 23.8,
  distanceCovered: 3245,
  balanceScore: 72.5,
  technicalScore: 68.3,
  physicalScore: 75.9,
  movementEfficiency: 64.7
};

const PlayerAnalysisView: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("John Doe");
  const [position, setPosition] = useState<string>("midfielder");
  const [playerStats, setPlayerStats] = useState<PlayerStats>(mockPlayerStats);
  const [aiAnalysis, setAiAnalysis] = useState<OpenAIAnalysis | null>(null);
  const [trainingRecommendations, setTrainingRecommendations] = useState<TrainingRecommendation[] | null>(null);
  const [playerComparison, setPlayerComparison] = useState<PlayerComparison | null>(null);
  const [potentialPrediction, setPotentialPrediction] = useState<PlayerPerformancePrediction | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load analysis when component mounts
    generateAnalysis();
  }, []);

  const generateAnalysis = async () => {
    setIsLoading(true);
    toast.info("Generating comprehensive player analysis...");
    
    try {
      // Generate AI Analysis
      const analysisResult = await openAIService.generatePlayerAnalysis({
        playerStats,
        position
      });
      setAiAnalysis(analysisResult);
      
      // Generate Training Recommendations
      const recommendationsResult = await playerMLService.generateTrainingRecommendations(
        playerStats,
        position
      );
      setTrainingRecommendations(recommendationsResult);
      
      // Generate Player Comparison
      const comparisonResult = await playerMLService.findSimilarPlayers(
        playerStats,
        position
      );
      setPlayerComparison(comparisonResult);
      
      // Generate Potential Prediction
      const predictionResult = await googleAutoMLService.predictPlayerPotential({
        playerStats,
        position,
        age: 22 // Assuming a default age
      });
      setPotentialPrediction(predictionResult);
      
      // Generate visualization image
      generateVisualization();
      
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Error generating analysis:", error);
      toast.error("Error generating analysis");
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateVisualization = async () => {
    try {
      // Generate an image using DALL-E
      const imageResult = await openAIService.generateImage({
        prompt: `A professional sports visualization of a ${position} soccer player with technical score ${playerStats.technicalScore.toFixed(0)}, physical score ${playerStats.physicalScore.toFixed(0)}, and balance score ${playerStats.balanceScore.toFixed(0)}. Data visualization style, minimal, clean design.`,
        size: "1024x1024",
        style: "vivid"
      });
      
      if (imageResult.length > 0) {
        setGeneratedImage(imageResult[0].url);
      }
    } catch (error) {
      console.error("Error generating visualization:", error);
      // Not showing toast for image error since it's not critical
    }
  };

  // Calculate overall score
  const overallScore = Math.round(
    (playerStats.technicalScore + playerStats.physicalScore + 
     playerStats.balanceScore + playerStats.movementEfficiency) / 4
  );

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{playerName}'s Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive performance analysis powered by AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">{position}</Badge>
          <Button 
            onClick={generateAnalysis} 
            disabled={isLoading}
            className="gap-2"
          >
            <Brain size={16} />
            {isLoading ? "Analyzing..." : "Regenerate Analysis"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-[500px] mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="charts">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="h-5 w-5 text-primary" />
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Analysis of your key performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Rating</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">{overallScore}</span>
                      <span className="text-sm text-muted-foreground ml-1">/100</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Technical Score</div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="w-full bg-secondary/20 rounded-full h-2.5 mr-2">
                          <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${playerStats.technicalScore}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{playerStats.technicalScore.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Physical Score</div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="w-full bg-primary/20 rounded-full h-2.5 mr-2">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${playerStats.physicalScore}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{playerStats.physicalScore.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Balance Score</div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="w-full bg-indigo-400/20 rounded-full h-2.5 mr-2">
                          <div className="bg-indigo-400 h-2.5 rounded-full" style={{ width: `${playerStats.balanceScore}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{playerStats.balanceScore.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Movement Efficiency</div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="w-full bg-green-400/20 rounded-full h-2.5 mr-2">
                          <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${playerStats.movementEfficiency}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{playerStats.movementEfficiency.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Speed</div>
                      <div className="text-xl font-bold mt-1">{playerStats.avgSpeed.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">px/s</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Max Speed</div>
                      <div className="text-xl font-bold mt-1">{playerStats.maxSpeed.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">px/s</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Acceleration</div>
                      <div className="text-xl font-bold mt-1">{playerStats.avgAcceleration.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">px/s²</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Distance</div>
                      <div className="text-xl font-bold mt-1">{(playerStats.distanceCovered / 1000).toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">kpx</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Potential
                </CardTitle>
                <CardDescription>
                  AI-powered potential prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                {potentialPrediction ? (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-current"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-primary stroke-current"
                            strokeWidth="8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - potentialPrediction.potentialScore / 100)}`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold">{potentialPrediction.potentialScore.toFixed(0)}</span>
                          <span className="text-xs">potential</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Expected improvement</div>
                      <div className="flex items-center mt-1">
                        <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                        <span className="font-medium">{potentialPrediction.predictedImprovementRate.toFixed(1)}%</span>
                        <span className="text-xs ml-1 text-muted-foreground">in {potentialPrediction.improvementTimeframe}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Focus areas</div>
                      <ul className="space-y-1 text-sm">
                        {potentialPrediction.recommendedTrainingAreas.map((area, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-0.5 text-primary">•</div>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-xs text-right text-muted-foreground">
                      Confidence: {potentialPrediction.confidenceScore.toFixed(0)}%
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2">Calculating potential...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Comparisons
                </CardTitle>
                <CardDescription>
                  Professional players with similar profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {playerComparison ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {playerComparison.similarProfessionals.map((player, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted mr-3 flex-shrink-0">
                          {player.imageUrl && (
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{player.name}</h4>
                          <p className="text-xs text-muted-foreground capitalize">{player.position}</p>
                          <div className="mt-1 flex items-center">
                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${player.similarity}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs">{player.similarity}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-24">
                    <div className="text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2">Finding similar players...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  Training Focus
                </CardTitle>
                <CardDescription>
                  AI-recommended priority areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trainingRecommendations ? (
                  <div className="space-y-3">
                    {trainingRecommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mr-2 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{rec.area}</div>
                          <div className="text-xs text-muted-foreground">
                            {rec.intensity} intensity • {rec.frequency}x per week
                          </div>
                          <div className="text-xs mt-1">
                            <span className="text-primary font-medium">+{rec.expectedImprovement}%</span> potential improvement
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-24">
                    <div className="text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2">Generating recommendations...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Analysis
                </CardTitle>
                <CardDescription>
                  Advanced insights powered by OpenAI
                </CardDescription>
              </CardHeader>
              <CardContent>
                {aiAnalysis ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Summary</h3>
                      <p className="text-sm">{aiAnalysis.summary}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Strengths</h3>
                        <ul className="space-y-1 text-sm">
                          {aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5 text-green-500">•</div>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Areas for Improvement</h3>
                        <ul className="space-y-1 text-sm">
                          {aiAnalysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5 text-red-500">•</div>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Technical Insight</h3>
                      <p className="text-sm">{aiAnalysis.technicalInsight}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Physical Insight</h3>
                      <p className="text-sm">{aiAnalysis.physicalInsight}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2">Generating AI analysis...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>
                    Personalized improvement plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {aiAnalysis ? (
                    <ul className="space-y-2 text-sm">
                      {aiAnalysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-0.5 text-primary">{index + 1}.</div>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex justify-center items-center h-24">
                      <div className="text-center text-muted-foreground">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2">Generating recommendations...</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    AI Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedImage ? (
                    <div className="rounded-md overflow-hidden">
                      <img 
                        src={generatedImage} 
                        alt="AI generated player visualization" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-48 bg-muted/30 rounded-md">
                      <div className="text-center text-muted-foreground">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2">Generating visualization...</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-primary" />
                Advanced Analytics
              </CardTitle>
              <CardDescription>
                Detailed performance visualizations and comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedPlayerCharts 
                playerStats={playerStats} 
                playerName={playerName}
                trainingRecommendations={trainingRecommendations || undefined}
                playerComparison={playerComparison || undefined}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerAnalysisView;
