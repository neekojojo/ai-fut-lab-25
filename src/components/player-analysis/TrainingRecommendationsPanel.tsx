
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrainingRecommendationsPanel = ({ recommendations }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>توصيات التدريب</CardTitle>
        <CardDescription>خطة تدريبية مخصصة للتطوير بناءً على التحليل</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">الأهداف التدريبية الرئيسية</h3>
            <div className="flex flex-wrap gap-2">
              {recommendations && recommendations.mainGoals && recommendations.mainGoals.map((goal, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">برنامج تدريبي مقترح</h3>
            {recommendations && recommendations.program && recommendations.program.map((week, index) => (
              <Card key={index} className="border-primary/10">
                <CardHeader className="py-3">
                  <CardTitle className="text-md">الأسبوع {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {week.sessions && week.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="border-l-2 border-primary/30 pl-4 py-1">
                        <h4 className="font-medium">{session.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {session.duration} دقيقة
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {session.intensity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {recommendations && recommendations.tips && (
            <div>
              <h3 className="text-lg font-semibold mb-3">نصائح ومؤشرات</h3>
              <ul className="space-y-2">
                {recommendations.tips.map((tip, index) => (
                  <li key={index} className="text-sm">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingRecommendationsPanel;
