
import React, { useState } from 'react';
import Header from '@/components/Header';
import LoadingAnimation from '@/components/LoadingAnimation';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';
import PeopleDetection from '@/components/PeopleDetection';
import ModelSelection from '@/components/analysis/ModelSelection';
import HeroSection from '@/components/landing/HeroSection';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import Footer from '@/components/layout/Footer';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { analyzeFootballVideo } from '@/utils/analysisService';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [analysisState, setAnalysisState] = useState<'idle' | 'model-selection' | 'processing' | 'complete' | 'detailed-analysis'>('idle');
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [analysis, setAnalysis] = useState<PlayerAnalysis | null>(null);
  const [showPeopleDetection, setShowPeopleDetection] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedAnalysisModel, setSelectedAnalysisModel] = useState<'google-automl' | 'kaggle-datasets' | null>(null);
  const { toast } = useToast();

  const handleVideoUpload = async (file: File) => {
    setVideoFile(file);
    setAnalysisState('model-selection');
  };

  const handleSelectModel = (model: 'google-automl' | 'kaggle-datasets') => {
    setSelectedAnalysisModel(model);
    toast({
      title: `Selected ${model === 'google-automl' ? 'Google AutoML Vision' : 'Kaggle Datasets'}`,
      description: "Analysis model has been set.",
      duration: 3000,
    });
  };

  const handleAnalyzeWithAI = async () => {
    if (!videoFile) return;
    
    setAnalysisState('processing');
    setProgress(0);
    
    try {
      const result = await analyzeFootballVideo(videoFile);
      
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
    setSelectedAnalysisModel(null);
  };

  const togglePeopleDetection = () => {
    setShowPeopleDetection(!showPeopleDetection);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 md:py-12">
        {analysisState === 'idle' && !showPeopleDetection && (
          <HeroSection 
            onVideoUpload={handleVideoUpload} 
            onTogglePeopleDetection={togglePeopleDetection}
          />
        )}
        
        {analysisState === 'model-selection' && videoFile && (
          <ModelSelection 
            videoFile={videoFile}
            onSelectModel={handleSelectModel}
            onAnalyzeWithAI={handleAnalyzeWithAI}
          />
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
          <AnalysisResults 
            analysis={analysis}
            onResetAnalysis={resetAnalysis}
            onAdvancedAnalysis={handleAdvancedAnalysis}
          />
        )}
        
        {analysisState === 'detailed-analysis' && videoFile && (
          <PlayerAnalysisView
            videoFile={videoFile}
            onResetAnalysis={resetAnalysis}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
