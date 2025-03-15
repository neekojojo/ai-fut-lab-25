
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { ArrowUpRight, Bookmark, FileSpreadsheet, FileVideo, ActivitySquare, Lightbulb } from 'lucide-react';
import NumberMovementChart from './NumberMovementChart';
import { PlayerTracker } from '@/utils/computerVision/positionTracking';
import { PlayerDataAnalyzer } from '@/utils/dataProcessing/playerDataAnalysis';
import { OpenAIService, OpenAIAnalysis } from '@/utils/ai/openAiService';

interface PlayerAnalysisViewProps {
  videoFile: File;
  onResetAnalysis: () => void;
}

const PlayerAnalysisView: React.FC<PlayerAnalysisViewProps> = ({ videoFile, onResetAnalysis }) => {
  const [analysisStage, setAnalysisStage] = useState<'loading' | 'analyzing' | 'complete'>('loading');
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Loading video');
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<OpenAIAnalysis | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiInput, setShowApiInput] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Function to handle video loading and analysis
  useEffect(() => {
    const analyzeVideo = async () => {
      try {
        // Create object URL for video
        const videoUrl = URL.createObjectURL(videoFile);
        
        // Wait for video to load
        setStageText('Loading video');
        setProgress(10);
        
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          
          // Wait for video metadata to load
          await new Promise<void>((resolve) => {
            const handleLoadedMetadata = () => {
              videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
              resolve();
            };
            
            if (videoRef.current.readyState >= 2) {
              resolve();
            } else {
              videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            }
          });
          
          setProgress(20);
          setStageText('Extracting video frames');
          
          // Start video frame extraction
          setAnalysisStage('analyzing');
          
          // Wait for simulated processing time
          await new Promise(resolve => setTimeout(resolve, 1500));
          setProgress(40);
          setStageText('Detecting player positions');
          
          // Simulate pose extraction
          await new Promise(resolve => setTimeout(resolve, 2000));
          setProgress(60);
          setStageText('Analyzing movement patterns');
          
          // Simulate data analysis
          await new Promise(resolve => setTimeout(resolve, 1500));
          setProgress(80);
          setStageText('Generating insights');
          
          // Generate mock player stats
          const mockPlayerStats = {
            avgSpeed: 120 + Math.random() * 30,
            maxSpeed: 180 + Math.random() * 40,
            avgAcceleration: 15 + Math.random() * 10,
            distanceCovered: 3000 + Math.random() * 1000,
            balanceScore: 65 + Math.random() * 20,
            technicalScore: 70 + Math.random() * 15,
            physicalScore: 75 + Math.random() * 15,
            movementEfficiency: 68 + Math.random() * 20
          };
          
          setPlayerStats(mockPlayerStats);
          
          // Generate mock chart data
          const mockChartData = Array.from({ length: 10 }, (_, i) => ({
            name: `Frame ${i + 1}`,
            current: Math.round(50 + Math.sin(i / 2) * 25 + Math.random() * 10),
            previous: Math.round(45 + Math.sin(i / 2) * 20 + Math.random() * 5),
          }));
          
          setChartData(mockChartData);
          
          // Generate AI analysis
          const openAIService = new OpenAIService();
          const analysis = await openAIService.generatePlayerAnalysis({
            playerStats: mockPlayerStats,
            position: 'Forward'
          });
          
          setAiAnalysis(analysis);
          
          // Analysis complete
          setProgress(100);
          setAnalysisStage('complete');
          
          toast({
            title: "Analysis Complete",
            description: "Player movement analysis has been successfully completed.",
          });
        }
      } catch (error) {
        console.error('Error analyzing video:', error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "There was an error analyzing the video. Please try again.",
        });
      }
    };
    
    analyzeVideo();
    
    // Cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    };
  }, [videoFile, toast]);

  // Function to handle setting the OpenAI API key
  const handleSetApiKey = () => {
    if (apiKey) {
      const openAIService = new OpenAIService(apiKey);
      // Re-generate analysis with actual API
      if (playerStats) {
        openAIService.generatePlayerAnalysis({
          playerStats: playerStats,
          position: 'Forward'
        }).then(analysis => {
          setAiAnalysis(analysis);
          toast({
            title: "API Key Set",
            description: "Using OpenAI for analysis. Results updated.",
          });
        });
      }
      
      setShowApiInput(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Hidden video element for processing */}
      <video ref={videoRef} className="hidden" controls />
      
      {(analysisStage === 'loading' || analysisStage === 'analyzing') && (
        <Card>
          <CardHeader>
            <CardTitle>Analyzing Player Movement</CardTitle>
            <CardDescription>
              Please wait while we process your video and generate insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-center text-sm text-muted-foreground">{stageText}</p>
          </CardContent>
        </Card>
      )}
      
      {analysisStage === 'complete' && playerStats && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Player Analysis Results</h2>
            <Button variant="outline" onClick={onResetAnalysis}>
              Analyze Another Video
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Technical Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{playerStats.technicalScore.toFixed(1)}</div>
                <Progress value={playerStats.technicalScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Physical Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{playerStats.physicalScore.toFixed(1)}</div>
                <Progress value={playerStats.physicalScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Balance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{playerStats.balanceScore.toFixed(1)}</div>
                <Progress value={playerStats.balanceScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Movement Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{playerStats.movementEfficiency.toFixed(1)}</div>
                <Progress value={playerStats.movementEfficiency} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="movement">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="movement">
                <ActivitySquare className="h-4 w-4 mr-2" />
                Movement
              </TabsTrigger>
              <TabsTrigger value="stats">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="video">
                <FileVideo className="h-4 w-4 mr-2" />
                Video Analysis
              </TabsTrigger>
              <TabsTrigger value="insights">
                <Lightbulb className="h-4 w-4 mr-2" />
                AI Insights
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="movement">
              <Card>
                <CardHeader>
                  <CardTitle>Movement Analysis</CardTitle>
                  <CardDescription>
                    Visualization of player movement patterns and efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumberMovementChart
                    title="Movement Efficiency Over Time"
                    data={chartData}
                    type="line"
                    colors={{
                      current: "#8B5CF6", // Purple
                      previous: "#D1D5DB", // Gray
                      alternative: "#F97316", // Orange
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Statistics</CardTitle>
                  <CardDescription>
                    Comprehensive breakdown of player performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Average Speed</TableCell>
                        <TableCell>{playerStats.avgSpeed.toFixed(2)} px/s</TableCell>
                        <TableCell>
                          <Progress 
                            value={Math.min(playerStats.avgSpeed / 2, 100)} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Maximum Speed</TableCell>
                        <TableCell>{playerStats.maxSpeed.toFixed(2)} px/s</TableCell>
                        <TableCell>
                          <Progress 
                            value={Math.min(playerStats.maxSpeed / 3, 100)} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Acceleration</TableCell>
                        <TableCell>{playerStats.avgAcceleration.toFixed(2)} px/s²</TableCell>
                        <TableCell>
                          <Progress 
                            value={Math.min(playerStats.avgAcceleration * 3, 100)} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Distance Covered</TableCell>
                        <TableCell>{playerStats.distanceCovered.toFixed(0)} px</TableCell>
                        <TableCell>
                          <Progress 
                            value={Math.min(playerStats.distanceCovered / 50, 100)} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Technical Score</TableCell>
                        <TableCell>{playerStats.technicalScore.toFixed(1)}</TableCell>
                        <TableCell>
                          <Progress 
                            value={playerStats.technicalScore} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Physical Score</TableCell>
                        <TableCell>{playerStats.physicalScore.toFixed(1)}</TableCell>
                        <TableCell>
                          <Progress 
                            value={playerStats.physicalScore} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Balance Score</TableCell>
                        <TableCell>{playerStats.balanceScore.toFixed(1)}</TableCell>
                        <TableCell>
                          <Progress 
                            value={playerStats.balanceScore} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Movement Efficiency</TableCell>
                        <TableCell>{playerStats.movementEfficiency.toFixed(1)}</TableCell>
                        <TableCell>
                          <Progress 
                            value={playerStats.movementEfficiency} 
                            className="h-2 w-24"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="video">
              <Card>
                <CardHeader>
                  <CardTitle>Video Analysis</CardTitle>
                  <CardDescription>
                    Frame-by-frame breakdown of player movement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Full video analysis visualization will be available in a future update
                    </p>
                  </div>
                  <Alert>
                    <AlertTitle>Feature in development</AlertTitle>
                    <AlertDescription>
                      Frame-by-frame pose visualization with movement tracking will be available soon.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>AI Performance Insights</CardTitle>
                    <CardDescription>
                      AI-generated analysis of player performance
                    </CardDescription>
                  </div>
                  {!showApiInput && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiInput(true)}
                    >
                      Use OpenAI API
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {showApiInput && (
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter OpenAI API Key"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <Button onClick={handleSetApiKey}>Set Key</Button>
                    </div>
                  )}
                  
                  {aiAnalysis && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-medium mb-2">Performance Summary</h3>
                        <p className="text-sm">{aiAnalysis.summary}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h3 className="font-medium mb-2 text-green-700">Strengths</h3>
                          <ul className="space-y-1">
                            {aiAnalysis.strengths.map((strength, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <ArrowUpRight className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-amber-50 rounded-lg">
                          <h3 className="font-medium mb-2 text-amber-700">Areas for Improvement</h3>
                          <ul className="space-y-1">
                            {aiAnalysis.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <ArrowUpRight className="h-4 w-4 mr-2 text-amber-500 shrink-0 mt-0.5" />
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Recommendations</h3>
                        <ul className="space-y-2">
                          {aiAnalysis.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <Bookmark className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <h3 className="font-medium mb-2">Technical Insight</h3>
                          <p className="text-sm">{aiAnalysis.technicalInsight}</p>
                        </div>
                        
                        <div className="p-4 bg-muted rounded-lg">
                          <h3 className="font-medium mb-2">Physical Insight</h3>
                          <p className="text-sm">{aiAnalysis.physicalInsight}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PlayerAnalysisView;
