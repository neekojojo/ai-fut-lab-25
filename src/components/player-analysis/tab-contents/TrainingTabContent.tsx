
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressCharts } from '@/components/charts/ProgressCharts';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface TrainingTabContentProps {
  recommendations: any[];
}

const TrainingTabContent: React.FC<TrainingTabContentProps> = ({ recommendations }) => {
  // Ensure recommendations is an array
  const validRecommendations = Array.isArray(recommendations) ? recommendations : [];
  
  // Prepare data for the improvement potential chart
  const improvementData = validRecommendations.map((rec: any) => ({
    area: rec.title?.split(' ')[0] || 'مجال', // Get just the first word for better display
    potential: rec.expectedImprovement || 0,
    sessions: rec.frequency || 0,
  }));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>إمكانية التحسين</CardTitle>
            <CardDescription>التحسين المتوقع مع التدريب الموصى به</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={improvementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="potential" name="نسبة التحسين %" fill="#8B5CF6" />
                  <Bar yAxisId="right" dataKey="sessions" name="جلسات أسبوعية" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>تطور المهارات</CardTitle>
            <CardDescription>تتبع تقدم تطوير المهارات مع مرور الوقت</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressCharts />
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        {validRecommendations.map((rec: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{rec.title || 'توصية تدريبية'}</CardTitle>
                  <CardDescription>
                    {rec.intensity || 'متوسط'}, {rec.frequency || 2} × أسبوعياً, {rec.duration || 30} دقيقة
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg">
                  {rec.expectedImprovement || 10}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add null check for exercises property */}
                {rec.exercises && Array.isArray(rec.exercises) ? rec.exercises.map((exercise: any, i: number) => (
                  <div key={i} className="border-l-2 border-primary/50 pl-4 py-1">
                    <h4 className="font-bold text-lg">{exercise.name || 'تمرين'}</h4>
                    <p className="text-muted-foreground">{exercise.description || 'وصف التمرين'}</p>
                    <Badge className="mt-2" variant={exercise.difficulty === "advanced" ? "destructive" : exercise.difficulty === "intermediate" ? "outline" : "secondary"}>
                      {exercise.difficulty === "advanced" ? "متقدم" : 
                       exercise.difficulty === "intermediate" ? "متوسط" : "مبتدئ"}
                    </Badge>
                  </div>
                )) : (
                  <div className="text-muted-foreground text-center py-2">
                    لا توجد تمارين محددة لهذه التوصية
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-muted-foreground">التحسين المتوقع</span>
                <span className="font-bold text-xl">{rec.expectedImprovement || 10}%</span>
              </div>
            </CardFooter>
          </Card>
        ))}
        
        {validRecommendations.length === 0 && (
          <Card>
            <CardContent className="py-8">
              <div className="text-center">
                <p className="text-muted-foreground">لا توجد توصيات تدريبية متاحة حالياً</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainingTabContent;
