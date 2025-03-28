
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabNav: React.FC<AnalysisTabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="overflow-auto pb-2">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="movement" className={activeTab === 'movement' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
            الحركة
          </TabsTrigger>
          <TabsTrigger value="technical" className={activeTab === 'technical' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
            التقنية
          </TabsTrigger>
          <TabsTrigger value="tactical" className={activeTab === 'tactical' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
            التكتيك
          </TabsTrigger>
          <TabsTrigger value="physical" className={activeTab === 'physical' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
            البدنية
          </TabsTrigger>
          <TabsTrigger value="comparison" className={activeTab === 'comparison' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
            المقارنة
          </TabsTrigger>
          <TabsTrigger value="club-compatibility" className={activeTab === 'club-compatibility' ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}>
            توافق الأندية
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AnalysisTabNav;
