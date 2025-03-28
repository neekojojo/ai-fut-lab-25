
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalysisTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="patterns">أنماط الحركة</TabsTrigger>
        <TabsTrigger value="metrics">مؤشرات الأداء</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AnalysisTabs;
