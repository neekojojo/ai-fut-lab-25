
import React from 'react';
import VideoUpload from '@/components/VideoUpload';
import { Button } from '@/components/ui/button';
import type { FileWithPreview } from '@/types/files';

interface HeroContentProps {
  onUpload: (file: FileWithPreview) => Promise<void>;
  isProcessing: boolean;
  onTogglePeopleDetection?: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ 
  onUpload, 
  isProcessing, 
  onTogglePeopleDetection 
}) => {
  const handleFileSelected = (file: FileWithPreview | null) => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="space-y-6 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-primary">FootballAI</span> Analyzer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Analyze football videos with AI to improve player performance and gain tactical insights
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <VideoUpload onFileSelected={handleFileSelected} />
        
        {onTogglePeopleDetection && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline"
              onClick={onTogglePeopleDetection}
              disabled={isProcessing}
            >
              Switch to People Detection Mode
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroContent;
