
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle } from 'lucide-react';

interface TrainingVideo {
  id: string;
  title: string;
  duration: string;
  level: string;
}

interface RecommendedTrainingProps {
  trainingVideos: TrainingVideo[];
}

const RecommendedTraining: React.FC<RecommendedTrainingProps> = ({ trainingVideos }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تدريبات موصى بها</CardTitle>
        <CardDescription>تدريبات مخصصة بناءً على نتائج التحليل</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {trainingVideos.map(video => (
          <div key={video.id} className="flex items-center justify-between p-3 rounded-md border border-border/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <PlayCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{video.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                  <span>•</span>
                  <span>{video.level}</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              عرض
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          استعراض جميع التدريبات
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedTraining;
