
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import AnalysisHeader from './AnalysisHeader';
import AnalysisTabs from './AnalysisTabs';
import MovementPatternsTab from './MovementPatternsTab';
import PerformanceMetricsTab from './PerformanceMetricsTab';
import SimilarPlayersTab from './SimilarPlayersTab';
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
  
  // Convert the movement data to an array format as expected by PerformanceMetricsTab
  const movementDataArray = [
    { timestamp: 1, speed: 15.2, acceleration: 2.1 },
    { timestamp: 2, speed: 18.3, acceleration: 3.2 },
    { timestamp: 3, speed: 22.5, acceleration: 4.2 },
    { timestamp: 4, speed: 28.4, acceleration: 5.9 },
    { timestamp: 5, speed: 25.1, acceleration: -3.3 },
    { timestamp: 6, speed: 20.7, acceleration: -4.4 },
    { timestamp: 7, speed: 18.9, acceleration: -1.8 },
    { timestamp: 8, speed: 16.3, acceleration: -2.6 }
  ];
  
  const speedZones = [
    { name: 'مشي', percentage: 20, color: '#10B981' },
    { name: 'جري خفيف', percentage: 45, color: '#6366F1' },
    { name: 'جري', percentage: 25, color: '#8B5CF6' },
    { name: 'سرعة قصوى', percentage: 10, color: '#EC4899' }
  ];
  
  // Create a list of professional players similar to the current player
  const professionalPlayers = [
    {
      name: "Kevin De Bruyne",
      team: "Manchester City",
      position: "Midfielder",
      match: 78,
      strengths: ["Vision", "Passing Range", "Set Pieces"]
    },
    {
      name: "Toni Kroos",
      team: "Real Madrid",
      position: "Midfielder",
      match: 72,
      strengths: ["Ball Control", "Positional Awareness", "Long Passing"]
    },
    {
      name: "Marco Verratti",
      team: "PSG",
      position: "Midfielder",
      match: 68,
      strengths: ["Dribbling", "Close Control", "Pressing Resistance"]
    }
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
        <MovementPatternsTab analysis={combinedAnalysis} />
      </TabsContent>

      <TabsContent value="metrics" className="mt-4">
        <PerformanceMetricsTab 
          movementData={movementDataArray}
          speedZones={speedZones}
          analysis={combinedAnalysis}
        />
      </TabsContent>
      
      <TabsContent value="comparisons" className="mt-4">
        <SimilarPlayersTab
          playerName={combinedAnalysis.playerName}
          professionalPlayers={professionalPlayers}
          playerPosition={combinedAnalysis.position}
        />
      </TabsContent>
    </div>
  );
};

export default AdvancedAnalysisView;
