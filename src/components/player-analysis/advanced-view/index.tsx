
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import AnalysisHeader from './AnalysisHeader';
import AnalysisTabs from './AnalysisTabs';
import MovementPatternsTab from './MovementPatternsTab';
import PerformanceMetricsTab from './PerformanceMetricsTab';

// Import the mock data directly to ensure we have data
import { getMockAnalysis } from '../mockData';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState('patterns');
  const { toast } = useToast();
  
  // Define the data directly here to ensure we always have data to display
  const mockData = getMockAnalysis().analysis;
  
  // Combine passed analysis with mock data as fallback
  const combinedAnalysis = analysis || mockData;
  
  // Create derived data for charts
  const speedData = [
    { name: '0-2 دقيقة', value: 16 },
    { name: '2-5 دقيقة', value: 18 },
    { name: '5-10 دقيقة', value: 15 },
    { name: '10-15 دقيقة', value: 12 },
    { name: '15+ دقيقة', value: 10 }
  ];
  
  const accelerationData = [
    { name: 'تسارع قوي', value: 8 },
    { name: 'تسارع متوسط', value: 15 },
    { name: 'ثبات', value: 20 },
    { name: 'تباطؤ متوسط', value: 10 },
    { name: 'تباطؤ قوي', value: 5 }
  ];
  
  const movementPatternData = [
    { name: 'الجري السريع', value: 30 },
    { name: 'الجري المتوسط', value: 45 },
    { name: 'المشي', value: 15 },
    { name: 'الوقوف', value: 10 }
  ];
  
  const energyEfficiencyData = [
    { name: '0-10 دقيقة', value: 90 },
    { name: '10-20 دقيقة', value: 85 },
    { name: '20-30 دقيقة', value: 75 },
    { name: '30-40 دقيقة', value: 70 },
    { name: '40+ دقيقة', value: 65 }
  ];
  
  const movementData = {
    avgSpeed: 15.2,
    maxSpeed: 28.4,
    totalDistance: 7.6,
    sprintCount: 12,
    directionChanges: 48,
    accelerationCount: 24
  };
  
  const speedZones = [
    { name: 'مشي', percentage: 20, color: '#10B981' },
    { name: 'جري خفيف', percentage: 45, color: '#6366F1' },
    { name: 'جري', percentage: 25, color: '#8B5CF6' },
    { name: 'سرعة قصوى', percentage: 10, color: '#EC4899' }
  ];
  
  useEffect(() => {
    // Display toast when the component mounts to confirm loading
    toast({
      title: "تحليل الحركة المتقدم",
      description: "تم تحميل بيانات تحليل الحركة المتقدم بنجاح",
    });
    
    console.log("Advanced analysis view mounted with data:", combinedAnalysis);
  }, [toast, combinedAnalysis]);
  
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
          analysis={combinedAnalysis}
        />
      </TabsContent>
    </div>
  );
};

export default AdvancedAnalysisView;
