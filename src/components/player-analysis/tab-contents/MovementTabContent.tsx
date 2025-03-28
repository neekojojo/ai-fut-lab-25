
import React from 'react';
import MovementPanel from '../MovementPanel';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  // Handle button click for advanced movement analysis
  const handleAdvancedView = () => {
    console.log("Advanced movement analysis button clicked");
    if (onViewAdvanced) {
      onViewAdvanced();
    }
  };

  return (
    <div className="space-y-6">
      <MovementPanel analysis={analysis} />
      <div className="text-center">
        <Button 
          onClick={handleAdvancedView} 
          variant="outline" 
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
          عرض تحليل الحركة المتقدم
        </Button>
      </div>
    </div>
  );
};

export default MovementTabContent;
