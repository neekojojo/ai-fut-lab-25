
import React from 'react';
import { BarChart4, Activity, Sparkles, Users2, Dumbbell, Building } from 'lucide-react';

interface AnalysisTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabNav: React.FC<AnalysisTabNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'stats', label: 'الإحصائيات', icon: <BarChart4 className="h-4 w-4" /> },
    { id: 'movement', label: 'الحركة', icon: <Activity className="h-4 w-4" /> },
    { id: 'insights', label: 'التحليلات', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'similar-players', label: 'لاعبون مشابهون', icon: <Users2 className="h-4 w-4" /> },
    { id: 'training', label: 'التدريب', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'clubs', label: 'الأندية', icon: <Building className="h-4 w-4" /> }
  ];
  
  return (
    <div className="flex flex-nowrap overflow-x-auto scrollbar-hide border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
            ${activeTab === tab.id 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'}
          `}
          onClick={() => setActiveTab(tab.id)}
          aria-selected={activeTab === tab.id}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AnalysisTabNav;
