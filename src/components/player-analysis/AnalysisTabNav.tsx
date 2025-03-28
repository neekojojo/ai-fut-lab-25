
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AnalysisTabNav: React.FC<AnalysisTabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap py-0">
          <TabsTrigger value="movement" className="py-3 px-4">
            الحركة
          </TabsTrigger>
          <TabsTrigger value="stats" className="py-3 px-4">
            الإحصائيات
          </TabsTrigger>
          <TabsTrigger value="insights" className="py-3 px-4">
            النصائح
          </TabsTrigger>
          <TabsTrigger value="similar-players" className="py-3 px-4">
            لاعبين مماثلين
          </TabsTrigger>
          <TabsTrigger value="training" className="py-3 px-4">
            التدريب
          </TabsTrigger>
          <TabsTrigger value="clubs" className="py-3 px-4">
            التوافق مع الأندية
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AnalysisTabNav;
