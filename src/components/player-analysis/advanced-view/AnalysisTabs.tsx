
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart2 } from "lucide-react";

interface AnalysisTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="patterns" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>أنماط الحركة</span>
        </TabsTrigger>
        <TabsTrigger value="metrics" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span>مقاييس الأداء</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AnalysisTabs;
