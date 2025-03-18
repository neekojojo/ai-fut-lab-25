
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Cloud } from 'lucide-react';

interface ModelSelectionCardProps {
  videoFile: File | null;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
}

const ModelSelectionCard: React.FC<ModelSelectionCardProps> = ({
  videoFile,
  onSelectModel,
  onAnalyzeWithAI
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-0 bg-[#121212] text-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-8">
            <div className="flex flex-col items-center justify-center relative">
              {videoFile && (
                <div className="w-full mb-8 relative">
                  <div className="aspect-video bg-[#1a1a1a] rounded-md flex flex-col items-center justify-center border border-[#333] border-dashed">
                    <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </div>
                    
                    <div className="text-white/70 mb-4 text-center">
                      <p className="text-sm font-mono overflow-hidden text-ellipsis max-w-xs">
                        {videoFile.name}
                      </p>
                      <p className="text-xs mt-1">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    
                    <Button
                      onClick={onAnalyzeWithAI}
                      className="rounded-md bg-[#8575ce] hover:bg-[#7565be] px-6 py-3 flex items-center gap-2"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <polyline points="9 10 4 15 9 20"></polyline>
                        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                      </svg>
                      <span>Analyze with AI</span>
                    </Button>
                  </div>
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">Select Analysis Model</h2>
              <p className="text-gray-400 text-center mb-8">
                Choose between Google AutoML Vision for advanced visual pattern recognition 
                or Kaggle datasets for statistical comparison.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => onSelectModel('google-automl')}
                  className="border border-[#3a3a3a] rounded-lg p-6 hover:bg-[#1a1a1a] transition-colors flex flex-col items-center text-center"
                >
                  <Cloud className="h-8 w-8 text-[#8575ce] mb-3" />
                  <span className="text-lg font-medium text-[#8575ce]">Google AutoML Vision</span>
                </button>
                
                <button
                  onClick={() => onSelectModel('kaggle-datasets')}
                  className="border border-[#3a3a3a] rounded-lg p-6 hover:bg-[#1a1a1a] transition-colors flex flex-col items-center text-center"
                >
                  <Database className="h-8 w-8 text-[#8575ce] mb-3" />
                  <span className="text-lg font-medium text-[#8575ce]">Kaggle Datasets</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#333] mt-4 pt-6 pb-6 text-center">
            <p className="text-sm text-gray-400">© 2025 PlayerAI. All rights reserved.</p>
            
            <div className="flex justify-center mt-4 space-x-8">
              <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Support</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelSelectionCard;
