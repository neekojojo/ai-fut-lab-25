import React, { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import LoadingAnimation from '@/components/LoadingAnimation';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';
import PeopleDetection from '@/components/PeopleDetection';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/components/auth/AuthContext';
import AnalysisOptions from '@/components/index/AnalysisOptions';
import AnalysisProcessing from '@/components/index/AnalysisProcessing';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import HeroContent from '@/components/index/HeroContent';
import AnalysisService from '@/services/AnalysisService';

interface IndexContentProps {
  navigate: NavigateFunction;
  isMobile: boolean;
}

const IndexContent: React.FC<IndexContentProps> = ({ navigate, isMobile }) => {
  const [analysisState, setAnalysisState] = useState<'idle' | 'model-selection' | 'processing' | 'complete' | 'detailed-analysis'>('idle');
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [analysis, setAnalysis] = useState<PlayerAnalysis | null>(null);
  const [showPeopleDetection, setShowPeopleDetection] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedAnalysisModel, setSelectedAnalysisModel] = useState<'google-automl' | 'kaggle-datasets' | null>(null);
  const [analysisStartTime, setAnalysisStartTime] = useState(Date.now());
  const { toast } = useToast();
  const { user } = useAuth();

  const handleVideoUpload = async (file: File) => {
    setVideoFile(file);
    
    // Bypass model selection and directly analyze the video
    handleAnalyzeWithAI(file);
  };

  const handleSelectModel = (model: 'google-automl' | 'kaggle-datasets') => {
    setSelectedAnalysisModel(model);
    // Immediately analyze after selecting model
    if (videoFile) {
      handleAnalyzeWithAI(videoFile);
    }
  };

  const handleAnalyzeWithAI = async (fileToAnalyze = videoFile) => {
    if (!fileToAnalyze) return;
    
    // Set the analysis start time
    setAnalysisStartTime(Date.now());
    
    AnalysisService.analyzeVideo(
      fileToAnalyze, 
      setAnalysisState,
      setProgress,
      setStage,
      setAnalysis,
      user,
      { toast },
      resetAnalysis // Pass reset function as error callback
    );
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

  const handleGoToDashboard = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to view your dashboard.",
        duration: 3000,
      });
      navigate('/sign-in');
    }
  };

  const handleResetAnalysis = () => {
    // If we have a video file, restart the analysis
    if (videoFile) {
      handleAnalyzeWithAI(videoFile);
    } else {
      // Otherwise just reset to idle state
      resetAnalysis();
    }
  };

  return (
    <main className={`flex-1 container mx-auto ${isMobile ? 'py-4 px-3' : 'py-8 px-4 md:px-6 md:py-12'}`}>
      {analysisState === 'idle' && !showPeopleDetection && (
        <HeroContent 
          user={user} 
          onVideoUpload={handleVideoUpload}
          onTogglePeopleDetection={togglePeopleDetection}
          onGoToDashboard={handleGoToDashboard}
          isMobile={isMobile}
        />
      )}
      
      {false && analysisState === 'model-selection' && videoFile && (
        <AnalysisOptions 
          videoFile={videoFile}
          onSelectModel={handleSelectModel}
          onAnalyzeWithAI={() => handleAnalyzeWithAI()}
          isMobile={isMobile}
        />
      )}
      
      {showPeopleDetection && analysisState === 'idle' && (
        <div className="space-y-6">
          <div className={`flex justify-between items-center ${isMobile ? 'flex-col gap-3' : ''}`}>
            <h2 className="text-2xl font-bold">People Detection in Video</h2>
            <button
              onClick={togglePeopleDetection}
              className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Return to Football Analysis
            </button>
          </div>
          
          <PeopleDetection />
        </div>
      )}
      
      {analysisState === 'processing' && (
        <AnalysisProcessing 
          progress={progress} 
          stage={stage} 
          isMobile={isMobile}
          onReset={handleResetAnalysis}
          analysisStartTime={analysisStartTime}
        />
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
  );
};

export default IndexContent;
