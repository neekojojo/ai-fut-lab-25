
import React from 'react';

interface AnalysisTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabNav: React.FC<AnalysisTabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
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
      <button
        className={`flex-1 px-4 py-2 text-sm rounded-md ${
          activeTab === 'ar' ? 'bg-background shadow-sm' : 'text-muted-foreground'
        }`}
        onClick={() => setActiveTab('ar')}
      >
        AR Visualization
      </button>
    </div>
  );
};

export default AnalysisTabNav;
