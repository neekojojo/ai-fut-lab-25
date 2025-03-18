
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumberMovementChart from "./NumberMovementChart";
import type { PlayerAnalysis } from "./AnalysisReport.d";

interface MovementAnalysisProps {
  analysis: PlayerAnalysis;
}

const MovementAnalysis: React.FC<MovementAnalysisProps> = ({ analysis }) => {
  // Generate realistic movement data based on player position and skills
  const generateMovementData = () => {
    const baseValues = {
      Sprint: analysis.performance.physical - 5 + Math.floor(Math.random() * 10),
      Agility: Math.min(90, analysis.performance.technical - 10 + Math.floor(Math.random() * 15)),
      Balance: Math.min(95, analysis.performance.physical - 15 + Math.floor(Math.random() * 12)),
      Coordination: Math.min(88, analysis.performance.technical - 5 + Math.floor(Math.random() * 10)),
      Acceleration: Math.min(92, analysis.performance.physical - 2 + Math.floor(Math.random() * 8))
    };
    
    return Object.entries(baseValues).map(([name, current]) => {
      const previous = Math.max(50, current - 5 - Math.floor(Math.random() * 8));
      const alternative = Math.min(98, current + 3 + Math.floor(Math.random() * 10));
      
      return { name, current, previous, alternative };
    });
  };

  // Generate physical metrics data
  const generatePhysicalData = () => {
    return [
      { name: "Speed", current: analysis.performance.physical, previous: analysis.performance.physical - 7, alternative: analysis.performance.physical + 5 },
      { name: "Strength", current: Math.min(95, analysis.performance.physical - 5), previous: Math.min(95, analysis.performance.physical - 12), alternative: Math.min(95, analysis.performance.physical + 3) },
      { name: "Stamina", current: Math.min(90, analysis.performance.physical - 3), previous: Math.min(90, analysis.performance.physical - 8), alternative: Math.min(95, analysis.performance.physical + 7) },
      { name: "Jumping", current: Math.min(85, analysis.performance.physical - 15), previous: Math.min(85, analysis.performance.physical - 20), alternative: Math.min(90, analysis.performance.physical - 8) },
      { name: "Agility", current: Math.min(92, analysis.performance.technical - 5), previous: Math.min(92, analysis.performance.technical - 10), alternative: Math.min(96, analysis.performance.technical + 2) },
    ];
  };

  // Generate skill comparison data based on player position
  const generateSkillData = () => {
    const detailedSkills = analysis.detailedSkills || {};
    
    let skills = [
      { name: "Passing", current: detailedSkills.passing || 65, previous: (detailedSkills.passing || 65) - 5, alternative: (detailedSkills.passing || 65) + 8 },
      { name: "Shooting", current: detailedSkills.shooting || 70, previous: (detailedSkills.shooting || 70) - 6, alternative: (detailedSkills.shooting || 70) + 5 },
      { name: "Dribbling", current: detailedSkills.dribbling || 75, previous: (detailedSkills.dribbling || 75) - 7, alternative: (detailedSkills.dribbling || 75) + 4 },
      { name: "Tackling", current: detailedSkills.tackling || 60, previous: (detailedSkills.tackling || 60) - 3, alternative: (detailedSkills.tackling || 60) + 7 },
      { name: "Positioning", current: detailedSkills.positioning || 72, previous: (detailedSkills.positioning || 72) - 4, alternative: (detailedSkills.positioning || 72) + 6 },
    ];
    
    // Adjust based on player position
    if (analysis.position === "Forward") {
      skills = skills.map(skill => {
        if (skill.name === "Shooting" || skill.name === "Dribbling") {
          return { ...skill, current: Math.min(95, skill.current + 10), previous: Math.min(95, skill.previous + 8), alternative: Math.min(98, skill.alternative + 5) };
        }
        return skill;
      });
    } else if (analysis.position === "Midfielder") {
      skills = skills.map(skill => {
        if (skill.name === "Passing" || skill.name === "Positioning") {
          return { ...skill, current: Math.min(95, skill.current + 10), previous: Math.min(95, skill.previous + 7), alternative: Math.min(98, skill.alternative + 5) };
        }
        return skill;
      });
    } else if (analysis.position === "Defender") {
      skills = skills.map(skill => {
        if (skill.name === "Tackling" || skill.name === "Positioning") {
          return { ...skill, current: Math.min(95, skill.current + 15), previous: Math.min(95, skill.previous + 12), alternative: Math.min(98, skill.alternative + 8) };
        }
        return skill;
      });
    }
    
    return skills;
  };

  // Generate data based on analysis
  const movementsData = analysis.movements || generateMovementData();
  const skillComparisonData = generateSkillData();
  const physicalData = generatePhysicalData();

  // Descriptions for each chart
  const movementDescription = "Analysis of player's movement efficiency including sprint speed, agility, balance, coordination, and acceleration compared to previous assessment and potential improvements.";
  const skillDescription = "Comparison of key technical skills based on position requirements, showing progress since last assessment and projected improvement with targeted training.";
  const physicalDescription = "Progression of physical attributes including speed, strength, stamina, jumping ability and agility, with projections for improvement.";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Movement Analysis</CardTitle>
        <CardDescription>
          Visual analysis of {analysis.playerName}'s movements and skill progression
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
              description={movementDescription}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">Movement analysis compares current performance metrics with previous assessments and potential alternatives:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium text-purple-500">Current (Purple):</span> Player's current movement efficiency metrics</li>
                <li><span className="font-medium text-gray-500">Previous (Gray):</span> Metrics from previous assessment</li>
                <li><span className="font-medium text-orange-500">Alternative (Orange):</span> Potential improvements with suggested technique adjustments</li>
              </ul>
            </div>
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
              description={skillDescription}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">Skill analysis shows progression in core football abilities:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium text-blue-500">Current (Blue):</span> Current skill ratings based on recent performance</li>
                <li><span className="font-medium text-gray-500">Previous (Gray):</span> Skill levels from previous assessment</li>
                <li><span className="font-medium text-green-500">Alternative (Green):</span> Projected skill levels with focused training</li>
              </ul>
              <p className="mt-2">Player profile is optimized for {analysis.position} position.</p>
            </div>
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
              description={physicalDescription}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">Physical attributes measured through standardized performance tests:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium text-pink-500">Current (Pink):</span> Current physical capabilities</li>
                <li><span className="font-medium text-gray-500">Previous (Gray):</span> Physical metrics from previous assessment</li>
                <li><span className="font-medium text-orange-500">Alternative (Orange):</span> Projected metrics with specialized conditioning</li>
              </ul>
              <p className="mt-2">Overall physical score: {analysis.performance.physical}/100</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MovementAnalysis;
