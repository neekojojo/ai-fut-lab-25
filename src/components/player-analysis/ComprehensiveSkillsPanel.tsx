
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ComprehensiveSkillsPanel: React.FC = () => {
  // البيانات التقنية
  const technicalSkills = [
    { name: 'Ball Control', value: 60 },
    { name: 'Passing', value: 73 },
    { name: 'Shooting', value: 63 },
    { name: 'First Touch', value: 56 },
    { name: 'Dribbling', value: 70 },
    { name: 'Heading', value: 60 }
  ];

  // البيانات البدنية
  const physicalSkills = [
    { name: 'Speed', value: 78 },
    { name: 'Strength', value: 63 },
    { name: 'Jumping', value: 67 },
    { name: 'Stamina', value: 74 },
    { name: 'Agility', value: 60 },
    { name: 'Balance', value: 63 }
  ];

  // البيانات التكتيكية
  const tacticalSkills = [
    { name: 'Positioning', value: 85 },
    { name: 'Awareness', value: 72 },
    { name: 'Decision Making', value: 76 },
    { name: 'Off-ball Movement', value: 89 },
    { name: 'Defensive Contribution', value: 68 },
    { name: 'Game Reading', value: 72 }
  ];

  // البيانات الذهنية
  const mentalSkills = [
    { name: 'Composure', value: 63 },
    { name: 'Concentration', value: 70 },
    { name: 'Work Rate', value: 60 },
    { name: 'Leadership', value: 73 },
    { name: 'Decision Making', value: 56 },
    { name: 'Teamwork', value: 60 }
  ];

  // التفاصيل الأداء
  const performanceSnapshot = {
    playerName: 'John Doe',
    position: 'Goalkeeper',
    talentScore: 71
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>تقييم المهارات الشامل</CardTitle>
        <CardDescription>تحليل معمق لجميع جوانب الأداء</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">التحليل الفني</h3>
            <div className="space-y-3">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.value}/100</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">التحليل البدني</h3>
            <div className="space-y-3">
              {physicalSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.value}/100</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">التحليل التكتيكي</h3>
            <div className="space-y-3">
              {tacticalSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.value}/100</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">التحليل الذهني</h3>
            <div className="space-y-3">
              {mentalSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.value}/100</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">لقطة الأداء</h3>
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 text-white">
                  <h4 className="text-3xl font-bold mb-1">{performanceSnapshot.playerName}</h4>
                  <p className="text-xl mb-3">{performanceSnapshot.position}</p>
                  <div className="text-lg">
                    مؤشر الموهبة: <span className="font-bold">{performanceSnapshot.talentScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveSkillsPanel;
