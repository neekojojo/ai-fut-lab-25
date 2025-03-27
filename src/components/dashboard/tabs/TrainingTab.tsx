
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoIcon } from 'lucide-react';
import { TrainingVideo } from '@/components/AnalysisReport.d';

interface TrainingTabProps {
  trainingVideos: TrainingVideo[];
}

const TrainingTab: React.FC<TrainingTabProps> = ({ trainingVideos }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Videos</CardTitle>
          <CardDescription>Improve your skills with these training resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                      <VideoIcon className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration} min
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        {video.skill}
                      </div>
                      <div className="text-xs text-muted-foreground ml-2">
                        {video.difficulty}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs ml-1">{video.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingTab;
