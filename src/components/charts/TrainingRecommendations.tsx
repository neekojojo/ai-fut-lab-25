
import React from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from './constants';
import { TrainingRecommendation } from '@/utils/ml/playerMLService';

interface TrainingRecommendationsProps {
  trainingRecommendations?: TrainingRecommendation[];
}

export const TrainingRecommendations: React.FC<TrainingRecommendationsProps> = ({
  trainingRecommendations,
}) => {
  // Default training recommendations if none provided
  const defaultRecommendations: TrainingRecommendation[] = [
    {
      area: "Passing Accuracy",
      intensity: "high",
      frequency: 3,
      duration: 45,
      expectedImprovement: 15,
      exercises: [
        {
          name: "One-touch passing circuit",
          description: "Quick one-touch passing in triangles with movement",
          difficulty: "intermediate"
        },
        {
          name: "Long-range passing drill",
          description: "Practice 30-40 yard passes to moving targets",
          difficulty: "advanced"
        }
      ]
    },
    {
      area: "Defensive Awareness",
      intensity: "medium",
      frequency: 2,
      duration: 30,
      expectedImprovement: 20,
      exercises: [
        {
          name: "Defensive positioning drill",
          description: "Shadow defending scenarios with quick transitions",
          difficulty: "intermediate"
        },
        {
          name: "Zonal marking practice",
          description: "Group exercise focusing on maintaining defensive shape",
          difficulty: "intermediate"
        }
      ]
    },
    {
      area: "Decision Making",
      intensity: "high",
      frequency: 3,
      duration: 40,
      expectedImprovement: 25,
      exercises: [
        {
          name: "Small-sided games with constraints",
          description: "3v3 games with restrictions on touches and time",
          difficulty: "advanced"
        },
        {
          name: "Video analysis sessions",
          description: "Review of game decisions with coach feedback",
          difficulty: "beginner"
        }
      ]
    }
  ];

  // Use provided data or default
  const recommendations = trainingRecommendations || defaultRecommendations;

  // Prepare data for the improvement potential chart
  const improvementData = recommendations.map(rec => ({
    area: rec.area.split(' ')[0], // Get just the first word for better display
    potential: rec.expectedImprovement,
    sessions: rec.frequency,
  }));

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Improvement Potential</CardTitle>
          <CardDescription>
            Expected improvement with recommended training
          </CardDescription>
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
                <YAxis yAxisId="left" orientation="left" stroke={CHART_COLORS.primary} />
                <YAxis yAxisId="right" orientation="right" stroke={CHART_COLORS.secondary} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="potential" name="Improvement %" fill={CHART_COLORS.primary} />
                <Bar yAxisId="right" dataKey="sessions" name="Sessions per week" fill={CHART_COLORS.secondary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{rec.area}</CardTitle>
              <CardDescription>
                {rec.intensity} intensity, {rec.frequency}x per week, {rec.duration} min
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {rec.exercises.map((ex, i) => (
                  <li key={i} className="border-l-2 border-primary pl-3 py-1">
                    <div className="font-medium">{ex.name}</div>
                    <div className="text-xs text-muted-foreground">{ex.description}</div>
                    <div className="text-xs mt-1">
                      <span className={`
                        inline-block px-2 py-0.5 rounded-full text-xs
                        ${ex.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                          ex.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}
                      `}>
                        {ex.difficulty}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Expected improvement</span>
                <span className="text-sm font-bold text-primary">{rec.expectedImprovement}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
