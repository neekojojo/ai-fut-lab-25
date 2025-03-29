
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AnalysisHeaderProps {
  onBack: () => void;
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">التحليل المتقدم للاعب</h1>
        <p className="text-muted-foreground">تحليل مفصل للحركة والأداء</p>
      </div>
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
        <span>العودة للملخص</span>
      </Button>
    </div>
  );
};

export default AnalysisHeader;
