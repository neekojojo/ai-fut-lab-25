
import React from 'react';
import { 
  PlayerStats as DataProcessingPlayerStats, 
} from '@/utils/dataProcessing/playerAnalysisTypes';
import { 
  ProfessionalPlayer, 
  SimilarityMetric, 
  TrainingRecommendation 
} from '@/utils/ml/playerMLService';
import { 
  PlayerAnalysis, 
  PlayerMovement, 
  PassAttempt, 
  PositionHeatmap 
} from '@/components/AnalysisReport.d';
import ClubCompatibilityPanel from './ClubCompatibilityPanel';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

// Define interfaces for props
interface MockAnalysis {
  playerMovements: PlayerMovement[];
  passes: PassAttempt[];
  heatmap: PositionHeatmap[];
  analysis: PlayerAnalysis;
}

interface AnalysisContentProps {
  activeTab: string;
  playerStats: DataProcessingPlayerStats;
  mockAnalysis: MockAnalysis;
  trainingRecommendations: TrainingRecommendation[];
  playerComparison: {
    similarProfessionals: ProfessionalPlayer[];
    similarityMetrics: SimilarityMetric[];
  };
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({ 
  activeTab, 
  playerStats, 
  mockAnalysis, 
  trainingRecommendations, 
  playerComparison 
}) => {
  // We'll use the analysis from mockAnalysis for consistency
  const analysis = mockAnalysis.analysis;
  
  // Prepare movement data for charts
  const movementData = mockAnalysis.playerMovements.slice(0, 20).map((movement, index) => ({
    name: `Frame ${index}`,
    speed: movement.speed,
    x: movement.x,
    y: movement.y,
  }));
  
  return (
    <div className="space-y-4">
      {activeTab === 'movement' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الحركة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">السرعة المتوسطة</h3>
                  <Progress value={playerStats.avgSpeed / 2} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {playerStats.avgSpeed.toFixed(1)} كم/ساعة
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">السرعة القصوى</h3>
                  <Progress value={playerStats.maxSpeed / 3} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {playerStats.maxSpeed.toFixed(1)} كم/ساعة
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">المسافة المقطوعة</h3>
                  <Progress value={playerStats.distanceCovered / 50} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {playerStats.distanceCovered.toFixed(1)} متر
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>تحليل الحركة بمرور الوقت</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={movementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="speed" stroke="#10b981" activeDot={{ r: 8 }} name="السرعة" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>خريطة الحرارة</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-muted-foreground">بيانات خريطة الحرارة للاعب</p>
                  <p className="text-sm text-muted-foreground mt-2">تركز اللاعب في وسط الملعب مع تحرك جيد على الأجنحة</p>
                </div>
                <div className="relative h-full w-full border border-border rounded-md bg-[#e9f5e9]">
                  {/* Field visual representation */}
                  <div className="absolute inset-2 border border-dashed border-primary/50 rounded"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/50"></div>
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/50"></div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/30 bg-primary/20"></div>
                  {/* Heat points */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/60"></div>
                  <div className="absolute left-[60%] top-[40%] w-6 h-6 rounded-full bg-primary/50"></div>
                  <div className="absolute left-[40%] top-[60%] w-6 h-6 rounded-full bg-primary/50"></div>
                  <div className="absolute left-[70%] top-[30%] w-4 h-4 rounded-full bg-primary/40"></div>
                  <div className="absolute left-[30%] top-[70%] w-4 h-4 rounded-full bg-primary/40"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'technical' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>المهارات التقنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">التمرير</h3>
                  <Progress value={analysis.stats.passing} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.passing}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">التسديد</h3>
                  <Progress value={analysis.stats.shooting} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.shooting}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">المراوغة</h3>
                  <Progress value={analysis.stats.dribbling} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.dribbling}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">التحكم بالكرة</h3>
                  <Progress value={analysis.stats.ballControl} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.ballControl}/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>ملخص المهارات التقنية</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { subject: 'التمرير', A: analysis.stats.passing },
                  { subject: 'التسديد', A: analysis.stats.shooting },
                  { subject: 'المراوغة', A: analysis.stats.dribbling },
                  { subject: 'التحكم بالكرة', A: analysis.stats.ballControl },
                  { subject: 'الدقة', A: analysis.stats.vision }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar name="المهارات" dataKey="A" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>تحليل نسبة نجاح التمريرات</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[
                    { name: 'تمريرات قصيرة', success: 85, total: 100 },
                    { name: 'تمريرات متوسطة', success: 75, total: 100 },
                    { name: 'تمريرات طويلة', success: 60, total: 100 },
                    { name: 'عرضيات', success: 45, total: 100 },
                    { name: 'تمريرات حاسمة', success: 30, total: 100 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="success" fill="#10b981" name="نسبة النجاح" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'tactical' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>المهارات التكتيكية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">التموضع</h3>
                  <Progress value={analysis.stats.positioning} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.positioning}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">القراءة التكتيكية</h3>
                  <Progress value={analysis.stats.anticipation} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.anticipation}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">اتخاذ القرار</h3>
                  <Progress value={analysis.stats.decision} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.decision}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">الرؤية</h3>
                  <Progress value={analysis.stats.vision} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.vision}/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>تحليل تكتيكي</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { subject: 'التموضع', A: analysis.stats.positioning },
                  { subject: 'القراءة التكتيكية', A: analysis.stats.anticipation },
                  { subject: 'اتخاذ القرار', A: analysis.stats.decision },
                  { subject: 'الرؤية', A: analysis.stats.vision },
                  { subject: 'الانضباط التكتيكي', A: analysis.stats.composure || 75 }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar name="التكتيك" dataKey="A" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>توصيات تكتيكية</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.filter(rec => rec.includes('تكتيك') || rec.includes('تموضع') || rec.includes('قراءة')).map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-primary">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
                {/* Add these default recommendations if none exists */}
                {analysis.recommendations.filter(rec => rec.includes('تكتيك') || rec.includes('تموضع') || rec.includes('قراءة')).length === 0 && (
                  <>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">•</span>
                      <span>تحسين التموضع عند الدفاع العميق والضغط على حامل الكرة</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">•</span>
                      <span>تطوير القراءة التكتيكية للمباراة وتوقع تحركات المنافسين</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">•</span>
                      <span>تحسين التواصل مع زملاء الفريق أثناء الهجمات المنظمة</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'physical' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>القدرات البدنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">السرعة</h3>
                  <Progress value={analysis.stats.pace} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.pace}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">التسارع</h3>
                  <Progress value={analysis.stats.acceleration} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.acceleration}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">القوة البدنية</h3>
                  <Progress value={analysis.stats.physical} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.physical}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">التحمل</h3>
                  <Progress value={analysis.stats.stamina} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.stamina}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">الرشاقة</h3>
                  <Progress value={analysis.stats.agility} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.agility}/100</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">التوازن</h3>
                  <Progress value={analysis.stats.balance} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{analysis.stats.balance}/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>تحليل القدرات البدنية</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { subject: 'السرعة', A: analysis.stats.pace },
                  { subject: 'التسارع', A: analysis.stats.acceleration },
                  { subject: 'القوة البدنية', A: analysis.stats.physical },
                  { subject: 'التحمل', A: analysis.stats.stamina },
                  { subject: 'الرشاقة', A: analysis.stats.agility },
                  { subject: 'التوازن', A: analysis.stats.balance }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar name="القدرات البدنية" dataKey="A" fill="#f97316" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>التوصيات البدنية</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {trainingRecommendations.filter(rec => rec.category === 'لياقة بدنية' || rec.category === 'Technical').map((rec, index) => (
                  <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
                    <h4 className="font-medium">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <div className="mt-1 flex justify-between text-xs">
                      <span>الصعوبة: {rec.difficulty}/5</span>
                      <span>التحسن المتوقع: {rec.expectedImprovement}%</span>
                    </div>
                  </li>
                ))}
                {trainingRecommendations.filter(rec => rec.category === 'لياقة بدنية' || rec.category === 'Technical').length === 0 && (
                  <li className="border-b pb-2 last:border-0 last:pb-0">
                    <h4 className="font-medium">برنامج تحسين السرعة والتسارع</h4>
                    <p className="text-sm text-muted-foreground">تمارين متخصصة لتحسين السرعة القصوى والتسارع في المسافات القصيرة</p>
                    <div className="mt-1 flex justify-between text-xs">
                      <span>الصعوبة: 4/5</span>
                      <span>التحسن المتوقع: 15%</span>
                    </div>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {playerComparison.similarProfessionals.map((player, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{player.team} | {player.position}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">نسبة التشابه</span>
                    <span className="text-sm font-medium text-primary">{player.similarity}%</span>
                  </div>
                  <Progress value={player.similarity} className="h-2" />
                </div>
                
                <h4 className="text-sm font-medium mb-2">نقاط القوة:</h4>
                <ul className="space-y-1">
                  {player.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>مقارنة المهارات مع اللاعبين المحترفين</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={playerComparison.similarityMetrics.map(metric => ({
                    name: metric.category,
                    value: metric.score
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" name="درجة التشابه" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'club-compatibility' && (
        <div className="grid grid-cols-1 gap-4">
          <ClubCompatibilityPanel playerAnalysis={analysis} />
        </div>
      )}
    </div>
  );
};

export default AnalysisContent;
