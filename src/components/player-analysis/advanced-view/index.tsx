
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import AnalysisHeader from './AnalysisHeader';
import AnalysisTabs from './AnalysisTabs';
import MovementPatternsTab from './MovementPatternsTab';
import PerformanceMetricsTab from './PerformanceMetricsTab';
import { useAnalysisData } from './AnalysisDataProvider';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState('patterns');
  const { toast } = useToast();
  const {
    speedData,
    accelerationData, 
    movementPatternData, 
    energyEfficiencyData,
    movementData,
    speedZones
  } = useAnalysisData(analysis);
  
  useEffect(() => {
    // Display toast when the component mounts to confirm loading
    toast({
      title: "تحليل الحركة المتقدم",
      description: "تم تحميل بيانات تحليل الحركة المتقدم بنجاح",
    });
    
    console.log("Advanced analysis view mounted with data:", analysis);
  }, [toast]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <AnalysisHeader onBack={onBack} />

      <AnalysisTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <TabsContent value="patterns" className="mt-4">
        <MovementPatternsTab 
          speedData={speedData}
          accelerationData={accelerationData}
          movementPatternData={movementPatternData}
          energyEfficiencyData={energyEfficiencyData}
        />
      </TabsContent>

      <TabsContent value="metrics" className="mt-4">
        <PerformanceMetricsTab 
          movementData={movementData}
          speedZones={speedZones}
          analysis={analysis}
        />
      </TabsContent>
    </div>
  );
};

export default AdvancedAnalysisView;
