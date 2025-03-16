import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  PolarAngleAxis, 
  PolarGrid, 
  PolarRadiusAxis, 
  Radar, 
  RadarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';
import { TrainingRecommendation, PlayerComparison } from '@/utils/ml/playerMLService';

interface AdvancedPlayerChartsProps {
  playerStats: PlayerStats;
  playerName?: string;
  trainingRecommendations?: TrainingRecommendation[];
  playerComparison?: PlayerComparison;
}

// Consistent color scheme
const COLORS = {
  primary: '#8B5CF6',     // Purple
  secondary: '#F97316',   // Orange
  tertiary: '#0EA5E9',    // Blue
  quaternary: '#10B981',  // Green
  negative: '#EF4444',    // Red
  positive: '#22C55E',    // Green
  neutral: '#8E9196',     // Gray
  highlight: '#D946EF',   // Pink
  background: '#F1F0FB',  // Light purple/gray
  text: '#1A1F2C',        // Dark purple/blue
};

export const AdvancedPlayerCharts: React.FC<AdvancedPlayerChartsProps> = ({
  playerStats,
  playerName = "Player",
  trainingRecommendations,
  playerComparison,
}) => {
  // Prepare data for the radar chart
  const radarData = [
    { 
      attribute: "Speed", 
      value: Math.min(100, (playerStats.maxSpeed / 200) * 100),
      fullMark: 100 
    },
    { 
      attribute: "Acceleration", 
      value: Math.min(100, (playerStats.avgAcceleration / 50) * 100),
      fullMark: 100 
    },
    { 
      attribute: "Endurance", 
      value: Math.min(100, (playerStats.distanceCovered / 5000) * 100),
      fullMark: 100 
    },
    { 
      attribute: "Balance", 
      value: playerStats.balanceScore,
      fullMark: 100 
    },
    { 
      attribute: "Technical", 
      value: playerStats.technicalScore,
      fullMark: 100 
    },
    { 
      attribute: "Physical", 
      value: playerStats.physicalScore,
      fullMark: 100 
    },
    { 
      attribute: "Efficiency", 
      value: playerStats.movementEfficiency,
      fullMark: 100 
    }
  ];

  // Prepare data for the performance distribution pie chart
  const pieData = [
    { name: 'Technical', value: playerStats.technicalScore },
    { name: 'Physical', value: playerStats.physicalScore },
    { name: 'Balance', value: playerStats.balanceScore },
    { name: 'Efficiency', value: playerStats.movementEfficiency }
  ];

  // Prepare data for the improvement potential chart
  const improvementData = trainingRecommendations?.map(rec => ({
    area: rec.area.split(' ')[0], // Get just the first word for better display
    potential: rec.expectedImprovement,
    sessions: rec.frequency,
  })) || [];

  // Prepare data for player comparison chart
  const comparisonData = playerComparison?.similarityMetrics.map(metric => ({
    category: metric.category,
    score: metric.score,
    description: metric.description
  })) || [];

  // Prepare mock progress data (for demonstration)
  const progressData = [
    { name: 'Week 1', value: 30 },
    { name: 'Week 2', value: 35 },
    { name: 'Week 3', value: 38 },
    { name: 'Week 4', value: 42 },
    { name: 'Week 5', value: 48 },
    { name: 'Week 6', value: 50 },
    { name: 'Week 7', value: 55 },
    { name: 'Week 8', value: 60 }
  ];

  // Custom tooltip for the radar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-xs">
          <p>{`${payload[0].payload.attribute}: ${typeof payload[0].value === 'number' ? payload[0].value.toFixed(1) : payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Generic formatter for tooltip values to handle different types
  const formatTooltipValue = (value: any): string => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return String(value);
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Pro Comparison</TabsTrigger>
          <TabsTrigger value="training">Training Impact</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Profile</CardTitle>
                <CardDescription>
                  Comprehensive analysis of player attributes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="attribute" tick={{ fill: COLORS.text, fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name={playerName}
                        dataKey="value"
                        stroke={COLORS.primary}
                        fill={COLORS.primary}
                        fillOpacity={0.5}
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>
                  Balance between different skill areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0 ? COLORS.primary :
                              index === 1 ? COLORS.secondary :
                              index === 2 ? COLORS.tertiary :
                              COLORS.quaternary
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatTooltipValue(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Overall Stats</CardTitle>
              <CardDescription>
                Key performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Avg Speed', value: playerStats.avgSpeed },
                      { name: 'Max Speed', value: playerStats.maxSpeed },
                      { name: 'Avg Accel', value: playerStats.avgAcceleration },
                      { name: 'Distance', value: playerStats.distanceCovered / 100 }, // Scale down for better visualization
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name, props) => {
                      if (props.payload.name === 'Distance') {
                        return [`${(value * 100).toFixed(0)} px`, 'Distance'];
                      }
                      return [value.toFixed(1), name];
                    }} />
                    <Bar dataKey="value">
                      {[0, 1, 2, 3].map((index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0 ? COLORS.primary :
                            index === 1 ? COLORS.secondary :
                            index === 2 ? COLORS.tertiary :
                            COLORS.quaternary
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          {playerComparison ? (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Pro Player Similarity</CardTitle>
                  <CardDescription>
                    How your skills compare to professional players
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {playerComparison.similarProfessionals.map((player, index) => (
                      <div key={index} className="flex flex-col items-center p-4 border rounded-lg bg-card">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-muted">
                          {player.imageUrl && (
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <h4 className="text-lg font-medium">{player.name}</h4>
                        <p className="text-sm text-muted-foreground">{player.team}</p>
                        <p className="text-sm text-muted-foreground capitalize">{player.position}</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-lg font-bold text-primary">{player.similarity}%</span>
                          <span className="ml-2 text-sm">match</span>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium">Strengths:</p>
                          <ul className="text-xs list-disc list-inside">
                            {player.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Attribute Comparison</CardTitle>
                  <CardDescription>
                    How specific attributes compare to {playerComparison.similarProfessionals[0]?.name || "professionals"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="category" width={90} />
                        <Tooltip formatter={(value) => [`${value}% similar`, ""]} />
                        <Bar dataKey="score" fill={COLORS.primary} radius={[0, 4, 4, 0]}>
                          {comparisonData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`}
                              fill={entry.score > 75 ? COLORS.positive : entry.score > 50 ? COLORS.primary : COLORS.negative}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {comparisonData.map((metric, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{metric.category}</span>: {metric.description}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex justify-center items-center h-40">
                <p className="text-muted-foreground">No comparison data available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="training" className="space-y-4">
          {trainingRecommendations ? (
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
                        <YAxis yAxisId="left" orientation="left" stroke={COLORS.primary} />
                        <YAxis yAxisId="right" orientation="right" stroke={COLORS.secondary} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="potential" name="Improvement %" fill={COLORS.primary} />
                        <Bar yAxisId="right" dataKey="sessions" name="Sessions per week" fill={COLORS.secondary} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trainingRecommendations.map((rec, index) => (
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
          ) : (
            <Card>
              <CardContent className="flex justify-center items-center h-40">
                <p className="text-muted-foreground">No training recommendations available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Performance Progress</CardTitle>
              <CardDescription>
                Track your improvement over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={progressData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={COLORS.primary} 
                      fillOpacity={1} 
                      fill="url(#colorProgress)" 
                      strokeWidth={2}
                      name="Overall Score"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Skill Development</CardTitle>
              <CardDescription>
                Progress in specific skill areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Technical" 
                      stroke={COLORS.primary} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Physical" 
                      stroke={COLORS.secondary} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      // Add offset to create different values for demonstration
                      data={progressData.map(entry => ({ 
                        ...entry, 
                        value: Math.max(0, Math.min(100, entry.value - 10 + Math.random() * 5))
                      }))}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Tactical" 
                      stroke={COLORS.tertiary} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      // Add offset to create different values for demonstration
                      data={progressData.map(entry => ({ 
                        ...entry, 
                        value: Math.max(0, Math.min(100, entry.value - 5 - Math.random() * 10))
                      }))}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPlayerCharts;
