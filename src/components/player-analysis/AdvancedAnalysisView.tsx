
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NumberMovementChart from "../NumberMovementChart";
import type { PlayerAnalysis } from "@/types/playerAnalysis";
import type { DataPoint } from "../charts/DataTypes";
import MovementAnalysis from "../MovementAnalysis";
import AdvancedPlayerCharts from '../AdvancedPlayerCharts';
import ClubCompatibilityPanel from './ClubCompatibilityPanel';

interface AdvancedAnalysisViewProps {
  analysis: PlayerAnalysis;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState('movement');
  
  // Generate movement data
  const generateMovementData = (): DataPoint[] => {
    return [
      { name: "Sprint", current: 78, previous: 72, alternative: 85 },
      { name: "Agility", current: 82, previous: 75, alternative: 88 },
      { name: "Balance", current: 79, previous: 74, alternative: 86 },
      { name: "Coordination", current: 81, previous: 76, alternative: 87 },
      { name: "Acceleration", current: 83, previous: 77, alternative: 89 }
    ];
  };

  // Generate physical data
  const generatePhysicalData = (): DataPoint[] => {
    return [
      { name: "Speed", current: 80, previous: 73, alternative: 86 },
      { name: "Strength", current: 75, previous: 68, alternative: 82 },
      { name: "Stamina", current: 82, previous: 75, alternative: 88 },
      { name: "Jumping", current: 77, previous: 70, alternative: 84 },
      { name: "Agility", current: 81, previous: 74, alternative: 87 }
    ];
  };

  // Generate skill data
  const generateSkillData = (): DataPoint[] => {
    return [
      { name: "Passing", current: 83, previous: 76, alternative: 89 },
      { name: "Shooting", current: 79, previous: 72, alternative: 85 },
      { name: "Dribbling", current: 81, previous: 74, alternative: 87 },
      { name: "Tackling", current: 76, previous: 69, alternative: 83 },
      { name: "Positioning", current: 80, previous: 73, alternative: 86 }
    ];
  };

  const movementsData = generateMovementData();
  const physicalData = generatePhysicalData();
  const skillData = generateSkillData();

  // Enhancement percentage calculations
  const movementImprovement = "+5.7%";
  const physicalImprovement = "+9.0%";
  const skillImprovement = "+8.4%";

  // Descriptions
  const movementDescription = "Analysis of player's movement efficiency including sprint speed, agility, balance, coordination, and acceleration compared to previous assessment and potential improvements.";
  const physicalDescription = "Progression of physical attributes including speed, strength, stamina, jumping ability and agility, with projections for improvement.";
  const skillDescription = "Comparison of key technical skills based on position requirements, showing progress since last assessment and projected improvement with targeted training.";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Player Analysis</h2>
        <Button 
          onClick={onBack} 
          variant="ghost"
          className="px-4 py-2 text-sm font-medium"
        >
          Back to Summary
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="movement">Movement Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance Charts</TabsTrigger>
          <TabsTrigger value="ar">AR Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="movement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Movement Analysis</CardTitle>
              <CardDescription>
                Visual analysis of {analysis.playerName}'s movements and skill progression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="physical-movements">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="physical-movements">Physical Movements</TabsTrigger>
                  <TabsTrigger value="skill-analysis">Skill Analysis</TabsTrigger>
                  <TabsTrigger value="physical-metrics">Physical Metrics</TabsTrigger>
                </TabsList>

                <TabsContent value="physical-movements">
                  <div className="space-y-6">
                    <div className="relative">
                      <NumberMovementChart 
                        title="Movement Efficiency Analysis" 
                        data={movementsData} 
                        type="line"
                        colors={{
                          current: "#8B5CF6", // Purple
                          previous: "#9CA3AF", // Gray
                          alternative: "#F97316", // Orange
                        }}
                        description={movementDescription}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                        {movementImprovement} vs previous
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">Movement analysis compares current performance metrics with previous assessments and potential alternatives:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><span className="font-medium text-purple-500">Current (Purple):</span> Player's current movement efficiency metrics</li>
                        <li><span className="font-medium text-gray-500">Previous (Gray):</span> Metrics from previous assessment</li>
                        <li><span className="font-medium text-orange-500">Alternative (Orange):</span> Potential improvements with suggested technique adjustments</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skill-analysis">
                  <div className="space-y-6">
                    <div className="relative">
                      <NumberMovementChart 
                        title="Skill Performance Comparison" 
                        data={skillData} 
                        type="bar"
                        colors={{
                          current: "#0EA5E9", // Blue
                          previous: "#9CA3AF", // Gray
                          alternative: "#10B981", // Green
                        }}
                        description={skillDescription}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                        {skillImprovement} vs previous
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">Skill analysis shows progression in core football abilities:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><span className="font-medium text-blue-500">Current (Blue):</span> Current skill ratings based on recent performance</li>
                        <li><span className="font-medium text-gray-500">Previous (Gray):</span> Skill levels from previous assessment</li>
                        <li><span className="font-medium text-green-500">Alternative (Green):</span> Projected skill levels with focused training</li>
                      </ul>
                      <p className="mt-2">Player profile is optimized for {analysis.position || "Midfielder"} position.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="physical-metrics">
                  <div className="space-y-6">
                    <div className="relative">
                      <NumberMovementChart 
                        title="Physical Metrics Progression" 
                        data={physicalData} 
                        type="area"
                        colors={{
                          current: "#D946EF", // Pink
                          previous: "#9CA3AF", // Gray
                          alternative: "#F97316", // Orange
                        }}
                        description={physicalDescription}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                        {physicalImprovement} vs previous
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">Physical attributes measured through standardized performance tests:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><span className="font-medium text-pink-500">Current (Pink):</span> Current physical capabilities</li>
                        <li><span className="font-medium text-gray-500">Previous (Gray):</span> Physical metrics from previous assessment</li>
                        <li><span className="font-medium text-orange-500">Alternative (Orange):</span> Projected metrics with specialized conditioning</li>
                      </ul>
                      <p className="mt-2">Overall physical score: {analysis.performance?.physical || 75}/100</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Charts</CardTitle>
              <CardDescription>
                Detailed analysis of skill metrics, physical attributes, and improvement potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedPlayerCharts 
                playerStats={{
                  avgSpeed: 12.5,
                  maxSpeed: 22.8,
                  avgAcceleration: 2.3,
                  distanceCovered: 7800,
                  balanceScore: 82,
                  technicalScore: 78,
                  physicalScore: 82,
                  movementEfficiency: 76
                }}
                playerName={analysis.playerName}
                playerPosition={analysis.position}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ar">
          <Card>
            <CardHeader>
              <CardTitle>Augmented Reality Visualization</CardTitle>
              <CardDescription>
                3D visualization of player movements and physical attributes
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">AR Visualization requires device camera access</p>
                <Button>Launch AR Experience</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalysisView;
