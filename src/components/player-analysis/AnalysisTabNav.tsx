
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  TrendingUp, 
  LineChart, 
  Users, 
  Dumbbell,
  Trophy
} from "lucide-react";

const AnalysisTabNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-border">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="movement"
            className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
          >
            <Activity className="h-4 w-4 mr-2" />
            الحركة
          </TabsTrigger>
          
          <TabsTrigger
            value="stats"
            className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            الإحصائيات
          </TabsTrigger>
          
          <TabsTrigger
            value="insights"
            className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
          >
            <LineChart className="h-4 w-4 mr-2" />
            التحليل
          </TabsTrigger>
          
          <TabsTrigger
            value="similar-players"
            className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
          >
            <Users className="h-4 w-4 mr-2" />
            لاعبون مشابهون
          </TabsTrigger>
          
          <TabsTrigger
            value="training"
            className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
          >
            <Dumbbell className="h-4 w-4 mr-2" />
            التدريب
          </TabsTrigger>
          
          <TabsTrigger
            value="clubs"
            className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
          >
            <Trophy className="h-4 w-4 mr-2" />
            توافق الأندية
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AnalysisTabNav;
