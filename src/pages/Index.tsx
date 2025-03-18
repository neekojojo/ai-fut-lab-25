import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import VideoUpload from '@/components/VideoUpload';
import LoadingAnimation from '@/components/LoadingAnimation';
import AnalysisReport from '@/components/AnalysisReport';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';
import PeopleDetection from '@/components/PeopleDetection';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { analyzeFootballVideo } from '@/utils/analysisService';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [analysisState, setAnalysisState] = useState<'idle' | 'processing' | 'complete' | 'detailed-analysis'>('idle');
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [analysis, setAnalysis] = useState<PlayerAnalysis | null>(null);
  const [showPeopleDetection, setShowPeopleDetection] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleVideoUpload = async (file: File) => {
    setVideoFile(file);
    setAnalysisState('processing');
    setProgress(0);
    
    try {
      const result = await analyzeFootballVideo(file);
      
      result.progressUpdates((newProgress, newStage) => {
        setProgress(newProgress);
        setStage(newStage);
      });
      
      setAnalysis(result.analysis);
      setAnalysisState('complete');
      
      toast({
        title: "Analysis Complete",
        description: "Your player performance report is ready to view.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error analyzing video:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your video. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      setAnalysisState('idle');
    }
  };

  const handleAdvancedAnalysis = () => {
    if (videoFile) {
      setAnalysisState('detailed-analysis');
    }
  };

  const resetAnalysis = () => {
    setAnalysisState('idle');
    setProgress(0);
    setStage('');
    setAnalysis(null);
    setVideoFile(null);
  };

  const togglePeopleDetection = () => {
    setShowPeopleDetection(!showPeopleDetection);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 md:py-12">
        {analysisState === 'idle' && !showPeopleDetection && (
          <div className="space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in">
              <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                AI-Powered Analysis
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Analyze Football Talent with Precision
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your match footage and let our AI analyze player performance, 
                predict market value, and assess talent in minutes.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <VideoUpload onUpload={handleVideoUpload} />
              
              <button 
                onClick={togglePeopleDetection}
                className="mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
              >
                Try People Detection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Technical Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI evaluates passing, shooting, dribbling, and other technical skills with precision.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M20.38 3.46 16 2a4 4 0 0 1 1.46 3.46" />
                    <path d="M9.69 2.49 11 7.13c.38 1.13 0 2.38-.3 3.44-.37 1.32-.8 2.61-.7 4 .19 2.77 2.76 4.25 5 4.43 3.28.28 5-1.9 5-4.43 0-1.4-.5-2.75-.88-4.11-.41-1.44-.32-2.42.14-3.83L21 2.49a1 1 0 0 0-.5-1.32c-.83-.4-1.88-.9-2.88-1.13A4.49 4.49 0 0 0 16.5 0c-2.29 0-5 2-5.25 2.15A1 1 0 0 0 10.5 3c0 .3.34.38.53.4.17.01 3-.7 6 .17-2.07-.4-7.45 3.33-8.34 5.6" />
                    <path d="M10.1 12.75c-.55 1.4-.85 3.46-1.6 5.25-.58 1.3-2 2.5-3.5 2a2.24 2.24 0 0 1-1.5-2c0-3.04 4.5-7.79 6-9.75" />
                    <path d="M2 19.5C2 21.4 3.5 22 5 22c4 0 8.5-6 9-11.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Market Valuation</h3>
                <p className="text-sm text-muted-foreground">
                  Get an accurate estimate of a player's market value based on performance metrics.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Detailed Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  Receive comprehensive reports with actionable insights for player improvement.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {showPeopleDetection && analysisState === 'idle' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video People Detection</h2>
              <button
                onClick={togglePeopleDetection}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Back to Football Analysis
              </button>
            </div>
            
            <PeopleDetection />
          </div>
        )}
        
        {analysisState === 'processing' && (
          <LoadingAnimation progress={progress} stage={stage} />
        )}
        
        {analysisState === 'complete' && analysis && (
          <div className="space-y-8">
            <AnalysisReport analysis={analysis} />
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetAnalysis}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Analyze Another Video
              </button>
              
              <button
                onClick={handleAdvancedAnalysis}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Advanced Movement Analysis
              </button>
            </div>
          </div>
        )}
        
        {analysisState === 'detailed-analysis' && videoFile && (
          <PlayerAnalysisView
            videoFile={videoFile}
            onResetAnalysis={resetAnalysis}
          />
        )}
      </main>
      
      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 FootballAnalyst. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
