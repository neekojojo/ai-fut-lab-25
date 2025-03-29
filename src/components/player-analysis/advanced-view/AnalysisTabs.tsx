
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="patterns" className="text-sm md:text-base">
          تحليل الحركة
        </TabsTrigger>
        <TabsTrigger value="metrics" className="text-sm md:text-base">
          المقاييس المتقدمة
        </TabsTrigger>
        <TabsTrigger value="comparisons" className="text-sm md:text-base">
          المقارنات
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AnalysisTabs;
