
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabNav: React.FC<AnalysisTabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="overflow-auto pb-2">
      <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
        <TabsTrigger value="movement" onClick={() => setActiveTab('movement')} className={activeTab === 'movement' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
          الحركة
        </TabsTrigger>
        <TabsTrigger value="technical" onClick={() => setActiveTab('technical')} className={activeTab === 'technical' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
          التقنية
        </TabsTrigger>
        <TabsTrigger value="tactical" onClick={() => setActiveTab('tactical')} className={activeTab === 'tactical' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
          التكتيك
        </TabsTrigger>
        <TabsTrigger value="physical" onClick={() => setActiveTab('physical')} className={activeTab === 'physical' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
          البدنية
        </TabsTrigger>
        <TabsTrigger value="comparison" onClick={() => setActiveTab('comparison')} className={activeTab === 'comparison' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
          المقارنة
        </TabsTrigger>
        <TabsTrigger value="club-compatibility" onClick={() => setActiveTab('club-compatibility')} className={activeTab === 'club-compatibility' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
          توافق الأندية
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default AnalysisTabNav;
