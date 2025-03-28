
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity } from "lucide-react";

interface AnalysisHeaderProps {
  onBack: () => void;
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg shadow-sm border border-primary/10">
      <h1 className="text-2xl font-bold flex items-center">
        <Activity className="mr-2 h-6 w-6 text-primary" />
        تحليل الحركة المتقدم
      </h1>
      <Button variant="outline" size="sm" onClick={onBack}>
        <ArrowLeft className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" />
        العودة
      </Button>
    </div>
  );
};

export default AnalysisHeader;
