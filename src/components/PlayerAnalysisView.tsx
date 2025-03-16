
import React, { useState } from 'react';
import { PlayerDataAnalyzer } from '@/utils/dataProcessing/playerDataAnalysis';
import { Card, CardContent } from './ui/card';

interface PlayerAnalysisViewProps {
  videoFile: File;
  onResetAnalysis: () => void;
}

const PlayerAnalysisView: React.FC<PlayerAnalysisViewProps> = ({ videoFile, onResetAnalysis }) => {
  const [activeTab, setActiveTab] = useState('movement');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Player Analysis</h2>
        <button
          onClick={onResetAnalysis}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Back to Summary
        </button>
      </div>
      
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        <button
          className={`flex-1 px-4 py-2 text-sm rounded-md ${
            activeTab === 'movement' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('movement')}
        >
          Movement Analysis
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm rounded-md ${
            activeTab === 'charts' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('charts')}
        >
          Performance Charts
        </button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {activeTab === 'movement' ? (
            <div className="text-center py-12">
              <p>Movement analysis functionality will be implemented here</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p>Performance charts will be displayed here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerAnalysisView;
