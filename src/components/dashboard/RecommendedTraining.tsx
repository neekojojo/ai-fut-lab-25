
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainingVideo } from '@/components/AnalysisReport.d';

interface RecommendedTrainingProps {
  trainingVideos: TrainingVideo[];
}

const RecommendedTraining: React.FC<RecommendedTrainingProps> = ({ trainingVideos }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Training</CardTitle>
        <CardDescription>Videos tailored to improve your skills</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {trainingVideos.slice(0, 3).map((video) => (
            <li key={video.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{video.title}</p>
                <p className="text-sm text-muted-foreground">
                  {video.category || video.skill || video.targetAreas[0]} • {video.duration} min
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate(`/training/${video.id}`)}>
                Watch
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendedTraining;
