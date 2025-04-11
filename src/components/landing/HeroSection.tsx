
import React from 'react';
import VideoUpload from '@/components/VideoUpload';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import type { FileWithPreview } from '@/types/files';

interface HeroSectionProps {
  onVideoUpload: (file: File) => Promise<void>;
  onTogglePeopleDetection: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onVideoUpload, 
  onTogglePeopleDetection 
}) => {
  const handleFileSelected = (file: FileWithPreview | null) => {
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <div className="space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in">
        <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
          AI-Powered Analysis
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          FootballAI Analyzer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <span className="text-primary font-semibold">AI-powered</span> football talent assessment
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <VideoUpload onFileSelected={handleFileSelected} />
        
        <button 
          onClick={onTogglePeopleDetection}
          className="mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
        >
          Try People Detection
        </button>
      </div>
      
      <FeaturesGrid />
    </div>
  );
};

export default HeroSection;
