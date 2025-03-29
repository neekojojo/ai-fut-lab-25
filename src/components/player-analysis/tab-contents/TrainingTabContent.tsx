
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressCharts } from '@/components/charts/ProgressCharts';

interface TrainingTabContentProps {
  recommendations: any;
}

const TrainingTabContent: React.FC<TrainingTabContentProps> = ({ recommendations }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressCharts />
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{rec.title}</CardTitle>
                  <CardDescription>
                    {rec.intensity}, {rec.frequency} x per week, {rec.duration} min
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg">
                  {rec.expectedImprovement}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rec.exercises.map((exercise: any, i: number) => (
                  <div key={i} className="border-l-2 border-primary/50 pl-4 py-1">
                    <h4 className="font-bold text-lg">{exercise.title}</h4>
                    <p className="text-muted-foreground">{exercise.description}</p>
                    <Badge className="mt-2" variant={exercise.level === "advanced" ? "destructive" : "outline"}>
                      {exercise.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-muted-foreground">Expected improvement</span>
                <span className="font-bold text-xl">{rec.expectedImprovement}%</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainingTabContent;
