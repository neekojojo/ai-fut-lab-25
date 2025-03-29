
import React from 'react';
import MovementPanel from '../MovementPanel';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced?: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  // معالج نقر زر التحليل المتقدم للحركة
  const handleAdvancedView = () => {
    console.log("تم النقر على زر التحليل المتقدم للحركة");
    if (onViewAdvanced) {
      onViewAdvanced();
    }
  };

  return (
    <div className="space-y-6">
      <MovementPanel analysis={analysis} />
      
      {onViewAdvanced && (
        <div className="text-center mt-6">
          <Button 
            onClick={handleAdvancedView} 
            variant="outline" 
            className="gap-2 px-6 py-2"
            size="lg"
          >
            <ExternalLink className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
            عرض تحليل الحركة المتقدم
          </Button>
        </div>
      )}
    </div>
  );
};

export default MovementTabContent;
