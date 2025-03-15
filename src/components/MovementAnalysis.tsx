
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumberMovementChart from "./NumberMovementChart";
import type { PlayerAnalysis } from "./AnalysisReport.d";

interface MovementAnalysisProps {
  analysis: PlayerAnalysis;
}

const MovementAnalysis: React.FC<MovementAnalysisProps> = ({ analysis }) => {
  // If no movements data is available, generate example data
  const movementsData = analysis.movements || [
    { name: "Sprint", current: 85, previous: 78, alternative: 90 },
    { name: "Agility", current: 72, previous: 70, alternative: 75 },
    { name: "Balance", current: 68, previous: 65, alternative: 72 },
    { name: "Coordination", current: 75, previous: 71, alternative: 80 },
    { name: "Acceleration", current: 80, previous: 75, alternative: 85 },
  ];

  // Generate skill performance comparison data if not available
  const skillComparisonData = [
    { name: "Passing", current: analysis.detailedSkills?.passing || 65, previous: 60, alternative: 70 },
    { name: "Shooting", current: analysis.detailedSkills?.shooting || 70, previous: 65, alternative: 75 },
    { name: "Dribbling", current: analysis.detailedSkills?.dribbling || 75, previous: 70, alternative: 78 },
    { name: "Tackling", current: analysis.detailedSkills?.tackling || 60, previous: 58, alternative: 65 },
    { name: "Positioning", current: analysis.detailedSkills?.positioning || 72, previous: 68, alternative: 75 },
  ];

  // Generate physical metrics data
  const physicalData = [
    { name: "Speed", current: 82, previous: 78, alternative: 85 },
    { name: "Strength", current: 75, previous: 72, alternative: 78 },
    { name: "Stamina", current: 80, previous: 75, alternative: 83 },
    { name: "Jumping", current: 65, previous: 62, alternative: 68 },
    { name: "Agility", current: 78, previous: 75, alternative: 80 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Movement Analysis</CardTitle>
        <CardDescription>
          Visual analysis of alternative movements and skill progression
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="movements">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="movements">Physical Movements</TabsTrigger>
            <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
            <TabsTrigger value="physical">Physical Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movements" className="mt-4">
            <NumberMovementChart 
              title="Movement Efficiency Analysis" 
              data={movementsData} 
              type="line"
              colors={{
                current: "#8B5CF6", // Purple
                previous: "#9CA3AF", // Gray
                alternative: "#F97316", // Orange
              }}
            />
          </TabsContent>
          
          <TabsContent value="skills" className="mt-4">
            <NumberMovementChart 
              title="Skill Performance Comparison" 
              data={skillComparisonData} 
              type="bar"
              colors={{
                current: "#0EA5E9", // Blue
                previous: "#9CA3AF", // Gray
                alternative: "#10B981", // Green
              }}
            />
          </TabsContent>
          
          <TabsContent value="physical" className="mt-4">
            <NumberMovementChart 
              title="Physical Metrics Progression" 
              data={physicalData} 
              type="area"
              colors={{
                current: "#D946EF", // Pink
                previous: "#9CA3AF", // Gray
                alternative: "#F97316", // Orange
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MovementAnalysis;
