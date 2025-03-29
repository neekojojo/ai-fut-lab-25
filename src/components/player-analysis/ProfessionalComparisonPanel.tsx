
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

const ProfessionalComparisonPanel: React.FC = () => {
  // بيانات المقارنة
  const proData = {
    playerName: 'John Doe',
    proName: 'Alisson Becker',
    similarity: 41,
    skills: [
      { name: 'Reflexes', you: 55, pro: 93 },
      { name: 'Positioning', you: 56, pro: 94 },
      { name: 'Handling', you: 54, pro: 91 },
      { name: 'Passing', you: 52, pro: 87 },
      { name: 'Command', you: 55, pro: 92 }
    ],
    developmentPath: [
      'Improve your Positioning with specialized training',
      'Improve your Reflexes with specialized training',
      'Improve your Command with specialized training'
    ]
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>المقارنة مع لاعب محترف</CardTitle>
        <CardDescription>مقارنة أسلوب اللاعب مع {proData.proName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="none" />
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="#ef4444" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">تشابه الأسلوب</h3>
                <p className="text-muted-foreground">مدى التشابه في أسلوب اللعب</p>
              </div>
              <div className="text-4xl font-bold">{proData.similarity}%</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">مقارنة المهارات</h3>
            <div className="space-y-5">
              {proData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <div>
                      <span className="mr-2 rtl:ml-2 rtl:mr-0">أنت: {skill.you}</span>
                      <span className="text-primary">{proData.proName}: {skill.pro}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-black dark:bg-white h-4 rounded-l-full rtl:rounded-r-full rtl:rounded-l-none" style={{ width: `${skill.you}%` }}></div>
                    </div>
                    <div className="absolute top-1.5 w-1 h-1 bg-gray-800 dark:bg-gray-200 rounded-full" style={{ left: `${skill.pro}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">مسار التطوير</h3>
            <p className="mb-4">للوصول إلى مستوى مشابه لـ {proData.proName}، ركز على هذه المجالات الرئيسية:</p>
            <div className="space-y-3">
              {proData.developmentPath.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-2 rtl:ml-2 rtl:mr-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalComparisonPanel;
