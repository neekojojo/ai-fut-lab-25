
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ComprehensiveSkillsPanelProps {
  playerSkills?: {
    technical: {
      passing: number;
      shooting: number;
      dribbling: number;
      firstTouch: number;
      crossing: number;
      finishing: number;
    };
    physical: {
      pace: number;
      strength: number;
      agility: number;
      jumping: number;
      stamina: number;
      balance: number;
    };
    mental: {
      positioning: number;
      vision: number;
      composure: number;
      aggression: number;
      decisions: number;
      teamwork: number;
    };
  };
}

const ComprehensiveSkillsPanel: React.FC<ComprehensiveSkillsPanelProps> = ({ 
  playerSkills = {
    technical: {
      passing: 78,
      shooting: 65,
      dribbling: 72,
      firstTouch: 70,
      crossing: 68,
      finishing: 62
    },
    physical: {
      pace: 82,
      strength: 75,
      agility: 79,
      jumping: 72,
      stamina: 85,
      balance: 76
    },
    mental: {
      positioning: 74,
      vision: 77,
      composure: 68,
      aggression: 72,
      decisions: 80,
      teamwork: 85
    }
  } 
}) => {
  // Create data arrays for the radar charts
  const technicalData = [
    { skill: 'تمرير', value: playerSkills.technical.passing, fullMark: 100 },
    { skill: 'تسديد', value: playerSkills.technical.shooting, fullMark: 100 },
    { skill: 'مراوغة', value: playerSkills.technical.dribbling, fullMark: 100 },
    { skill: 'لمسة أولى', value: playerSkills.technical.firstTouch, fullMark: 100 },
    { skill: 'عرضيات', value: playerSkills.technical.crossing, fullMark: 100 },
    { skill: 'إنهاء', value: playerSkills.technical.finishing, fullMark: 100 },
  ];

  const physicalData = [
    { skill: 'سرعة', value: playerSkills.physical.pace, fullMark: 100 },
    { skill: 'قوة', value: playerSkills.physical.strength, fullMark: 100 },
    { skill: 'رشاقة', value: playerSkills.physical.agility, fullMark: 100 },
    { skill: 'قفز', value: playerSkills.physical.jumping, fullMark: 100 },
    { skill: 'تحمل', value: playerSkills.physical.stamina, fullMark: 100 },
    { skill: 'توازن', value: playerSkills.physical.balance, fullMark: 100 },
  ];

  const mentalData = [
    { skill: 'تمركز', value: playerSkills.mental.positioning, fullMark: 100 },
    { skill: 'رؤية', value: playerSkills.mental.vision, fullMark: 100 },
    { skill: 'هدوء', value: playerSkills.mental.composure, fullMark: 100 },
    { skill: 'جرأة', value: playerSkills.mental.aggression, fullMark: 100 },
    { skill: 'قرارات', value: playerSkills.mental.decisions, fullMark: 100 },
    { skill: 'عمل جماعي', value: playerSkills.mental.teamwork, fullMark: 100 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>مهارات اللاعب الشاملة</CardTitle>
        <CardDescription>تحليل مفصل للمهارات الفنية والبدنية والذهنية</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="technical">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="technical">مهارات فنية</TabsTrigger>
            <TabsTrigger value="physical">مهارات بدنية</TabsTrigger>
            <TabsTrigger value="mental">مهارات ذهنية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="technical" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={technicalData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <Radar
                    name="المهارات"
                    dataKey="value"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {technicalData.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded">
                  <span className="text-sm font-medium">{item.skill}</span>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">{item.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="physical" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={physicalData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <Radar
                    name="المهارات"
                    dataKey="value"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {physicalData.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded">
                  <span className="text-sm font-medium">{item.skill}</span>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">{item.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mental" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mentalData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <Radar
                    name="المهارات"
                    dataKey="value"
                    stroke="#EC4899"
                    fill="#EC4899"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {mentalData.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded">
                  <span className="text-sm font-medium">{item.skill}</span>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">{item.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveSkillsPanel;
