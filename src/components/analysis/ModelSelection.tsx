
import React from 'react';
import ModelSelectionCard from '@/components/ModelSelectionCard';

interface ModelSelectionProps {
  videoFile: File;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  videoFile,
  onSelectModel,
  onAnalyzeWithAI
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Analysis Model</h2>
      <div className="bg-card border rounded-lg shadow-sm p-6">
        <p className="text-muted-foreground mb-4">
          Choose an AI model to analyze your football video:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectModel('google-automl')}
            className="flex flex-col items-center p-4 border rounded-md hover:bg-accent transition-colors"
          >
            <div className="text-lg font-medium">Google AutoML Vision</div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Specialized in technical skill analysis and player positioning
            </p>
          </button>
          
          <button
            onClick={() => onSelectModel('kaggle-datasets')}
            className="flex flex-col items-center p-4 border rounded-md hover:bg-accent transition-colors"
          >
            <div className="text-lg font-medium">Kaggle Datasets Model</div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Trained on extensive football statistics and performance metrics
            </p>
          </button>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onAnalyzeWithAI}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Analyze with AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelection;
