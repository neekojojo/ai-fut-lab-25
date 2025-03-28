
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { useToast } from '@/components/ui/use-toast';
import {
  Calendar,
  Clock,
  Download,
  Dumbbell,
  Edit3,
  Flame,
  MoreHorizontal,
  Plus,
  Save,
  Share2,
  Target,
  Trash
} from 'lucide-react';

// نوع بيانات التمرين
interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  equipment: string[];
  intensity: 'منخفض' | 'متوسط' | 'عالي';
  targetArea: string;
  videoUrl?: string;
}

// نوع بيانات خطة التدريب
interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  daysPerWeek: number;
  focusAreas: string[];
  exercises: Exercise[];
  estimatedImprovementPercentage: number;
}

interface TrainingPlanGeneratorProps {
  analysis: PlayerAnalysis;
}

export const TrainingPlanGenerator: React.FC<TrainingPlanGeneratorProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [customPlanName, setCustomPlanName] = useState('');
  const [customPlanFocus, setCustomPlanFocus] = useState('');
  const { toast } = useToast();

  // تمارين متاحة
  const availableExercises: Exercise[] = [
    {
      id: 'ex1',
      title: 'تمرير دقيق',
      description: 'تمارين لتحسين دقة التمرير القصير والطويل',
      duration: 20,
      equipment: ['كرات', 'أقماع'],
      intensity: 'متوسط',
      targetArea: 'تمرير'
    },
    {
      id: 'ex2',
      title: 'تسديد على المرمى',
      description: 'تمارين لتحسين دقة وقوة التسديد',
      duration: 25,
      equipment: ['كرات', 'مرمى'],
      intensity: 'عالي',
      targetArea: 'تسديد'
    },
    {
      id: 'ex3',
      title: 'مراوغة متقدمة',
      description: 'مهارات متقدمة للمراوغة والتحكم بالكرة',
      duration: 30,
      equipment: ['كرات', 'أقماع'],
      intensity: 'عالي',
      targetArea: 'مراوغة'
    },
    {
      id: 'ex4',
      title: 'سرعة وتسارع',
      description: 'تمارين لتحسين السرعة والتسارع',
      duration: 15,
      equipment: ['ساندي', 'مخاريط'],
      intensity: 'عالي',
      targetArea: 'سرعة'
    },
    {
      id: 'ex5',
      title: 'قوة العضلات',
      description: 'تمارين لتقوية عضلات الجسم',
      duration: 30,
      equipment: ['أوزان', 'مقاومة'],
      intensity: 'عالي',
      targetArea: 'قوة'
    },
    {
      id: 'ex6',
      title: 'تحمل هوائي',
      description: 'تمارين لتحسين التحمل البدني',
      duration: 40,
      equipment: [],
      intensity: 'متوسط',
      targetArea: 'تحمل'
    }
  ];

  // إنشاء خطط تدريبية مخصصة بناءً على التحليل
  const generateTrainingPlans = (): TrainingPlan[] => {
    // تحديد نقاط الضعف من التحليل
    const weaknesses = analysis.weaknesses || [];
    
    // تحديد المجالات التي تحتاج إلى تحسين من خلال قيم المهارات
    const needsImprovementAreas: string[] = [];
    
    if (analysis.stats) {
      if (analysis.stats.passing < 70) needsImprovementAreas.push('تمرير');
      if (analysis.stats.shooting < 70) needsImprovementAreas.push('تسديد');
      if (analysis.stats.dribbling < 70) needsImprovementAreas.push('مراوغة');
      if (analysis.stats.pace < 70) needsImprovementAreas.push('سرعة');
      if (analysis.stats.physical < 70) needsImprovementAreas.push('قوة');
      if (analysis.stats.stamina < 70) needsImprovementAreas.push('تحمل');
    }
    
    // إنشاء خطط تدريبية مخصصة
    const plans: TrainingPlan[] = [];
    
    // خطة أساسية لتحسين نقاط الضعف
    if (weaknesses.length > 0) {
      const weaknessExercises = availableExercises.filter(ex => 
        weaknesses.some(w => w.toLowerCase().includes(ex.targetArea.toLowerCase()))
      );
      
      plans.push({
        id: 'plan1',
        title: 'خطة تحسين نقاط الضعف',
        description: `خطة مخصصة لتحسين نقاط الضعف الرئيسية: ${weaknesses.join('، ')}`,
        duration: 4,
        daysPerWeek: 3,
        focusAreas: weaknesses,
        exercises: weaknessExercises.length > 0 ? weaknessExercises : availableExercises.slice(0, 3),
        estimatedImprovementPercentage: 15
      });
    }
    
    // خطة متوازنة
    plans.push({
      id: 'plan2',
      title: 'خطة تدريب متوازنة',
      description: 'خطة تدريب شاملة لتحسين جميع جوانب الأداء',
      duration: 6,
      daysPerWeek: 4,
      focusAreas: ['مهارات تقنية', 'لياقة بدنية', 'تكتيك'],
      exercises: availableExercises.filter(ex => ['تمرير', 'تسديد', 'مراوغة', 'تحمل'].includes(ex.targetArea)),
      estimatedImprovementPercentage: 20
    });
    
    // خطة مكثفة للتحسين السريع
    plans.push({
      id: 'plan3',
      title: 'خطة التحسين السريع',
      description: 'خطة مكثفة للاعبين الملتزمين بتحسين أدائهم بسرعة',
      duration: 3,
      daysPerWeek: 5,
      focusAreas: needsImprovementAreas.length > 0 ? needsImprovementAreas : ['تقنية', 'لياقة', 'سرعة'],
      exercises: availableExercises.filter(ex => ex.intensity === 'عالي'),
      estimatedImprovementPercentage: 25
    });
    
    // خطة خاصة بالمركز
    if (analysis.position) {
      let positionFocus: string[] = [];
      let positionExercises: Exercise[] = [];
      
      switch (analysis.position.toLowerCase()) {
        case 'مهاجم':
          positionFocus = ['تسديد', 'حركة في منطقة الجزاء', 'انهاء الهجمات'];
          positionExercises = availableExercises.filter(ex => ['تسديد', 'سرعة', 'قوة'].includes(ex.targetArea));
          break;
        case 'وسط':
          positionFocus = ['تمرير', 'رؤية الملعب', 'تنظيم اللعب'];
          positionExercises = availableExercises.filter(ex => ['تمرير', 'تحمل', 'مراوغة'].includes(ex.targetArea));
          break;
        case 'مدافع':
          positionFocus = ['قوة', 'قراءة اللعب', 'تشتيت الكرة'];
          positionExercises = availableExercises.filter(ex => ['قوة', 'تمرير', 'تحمل'].includes(ex.targetArea));
          break;
        default:
          positionFocus = ['تقنية عامة', 'لياقة بدنية', 'مهارات أساسية'];
          positionExercises = availableExercises.slice(0, 4);
      }
      
      plans.push({
        id: 'plan4',
        title: `خطة تدريب متخصصة لمركز ${analysis.position}`,
        description: `خطة مصممة خصيصًا لتعزيز المهارات المطلوبة في مركز ${analysis.position}`,
        duration: 5,
        daysPerWeek: 3,
        focusAreas: positionFocus,
        exercises: positionExercises,
        estimatedImprovementPercentage: 22
      });
    }
    
    return plans;
  };

  const trainingPlans = generateTrainingPlans();
  
  // دالة حفظ الخطة
  const handleSavePlan = (plan: TrainingPlan) => {
    toast({
      title: "تم حفظ الخطة",
      description: `تم حفظ "${plan.title}" بنجاح`,
    });
  };
  
  // دالة تصدير الخطة
  const handleExportPlan = (plan: TrainingPlan) => {
    toast({
      title: "تم تصدير الخطة",
      description: `تم تصدير "${plan.title}" بنجاح إلى ملف PDF`,
    });
  };
  
  // دالة إنشاء خطة مخصصة
  const handleCreateCustomPlan = () => {
    if (!customPlanName) {
      toast({
        title: "حقل فارغ",
        description: "يرجى إدخال اسم الخطة",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "تم إنشاء الخطة",
      description: `تم إنشاء خطة "${customPlanName}" بنجاح`,
    });
    
    setCustomPlanName('');
    setCustomPlanFocus('');
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="recommended">الخطط الموصى بها</TabsTrigger>
          <TabsTrigger value="custom">إنشاء خطة مخصصة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.title}</CardTitle>
                    <Badge className="bg-primary">{plan.estimatedImprovementPercentage}% تحسين</Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        <span>{plan.duration} أسابيع</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        <span>{plan.daysPerWeek} أيام/أسبوع</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Target className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        <span>{plan.exercises.length} تمارين</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">مجالات التركيز:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.focusAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/10 hover:bg-primary/20">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">التمارين المقترحة:</h4>
                      <ul className="space-y-2">
                        {plan.exercises.slice(0, 3).map((exercise) => (
                          <li key={exercise.id} className="text-sm bg-muted/50 p-2 rounded">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{exercise.title}</span>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${exercise.intensity === 'عالي' ? 'bg-red-500/10 text-red-600' : 
                                    exercise.intensity === 'متوسط' ? 'bg-amber-500/10 text-amber-600' : 
                                    'bg-green-500/10 text-green-600'}
                                `}
                              >
                                {exercise.intensity}
                              </Badge>
                            </div>
                            <div className="text-xs mt-1">{exercise.duration} دقيقة • {exercise.targetArea}</div>
                          </li>
                        ))}
                        {plan.exercises.length > 3 && (
                          <li className="text-sm text-muted-foreground text-center">
                            +{plan.exercises.length - 3} تمارين إضافية
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex pt-2 space-x-2 rtl:space-x-reverse border-t">
                      <Button size="sm" onClick={() => handleSavePlan(plan)}>
                        <Save className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        حفظ الخطة
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleExportPlan(plan)}>
                        <Download className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        تصدير
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>إنشاء خطة تدريبية مخصصة</CardTitle>
              <CardDescription>قم بتصميم خطة تدريبية خاصة تناسب احتياجاتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan-name">اسم الخطة</Label>
                    <Input 
                      id="plan-name" 
                      placeholder="أدخل اسماً للخطة" 
                      value={customPlanName} 
                      onChange={(e) => setCustomPlanName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan-focus">مجال التركيز الرئيسي</Label>
                    <Input 
                      id="plan-focus" 
                      placeholder="مثال: تحسين مهارات التمرير" 
                      value={customPlanFocus} 
                      onChange={(e) => setCustomPlanFocus(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">اختر التمارين المناسبة:</h4>
                  <div className="space-y-2">
                    {availableExercises.map((exercise) => (
                      <div 
                        key={exercise.id} 
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                      >
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {exercise.title}
                            <Badge variant="outline">{exercise.targetArea}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {exercise.description}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${exercise.intensity === 'عالي' ? 'bg-red-500/10 text-red-600' : 
                                exercise.intensity === 'متوسط' ? 'bg-amber-500/10 text-amber-600' : 
                                'bg-green-500/10 text-green-600'}
                            `}
                          >
                            {exercise.intensity}
                          </Badge>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            <span>{exercise.duration} د</span>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <div className="text-sm">التمارين المختارة: <span className="font-medium">0</span></div>
                    <div className="text-sm">مدة الخطة: <span className="font-medium">0 أسابيع</span></div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button variant="outline">إعادة ضبط</Button>
                  <Button onClick={handleCreateCustomPlan}>إنشاء الخطة</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>نصائح لإنشاء خطط تدريبية فعالة</CardTitle>
              <CardDescription>استخدم هذه النصائح للحصول على أفضل النتائج</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <Flame className="h-5 w-5 text-orange-500 shrink-0" />
                  <div>
                    <strong>تنويع التمارين:</strong> قم بتضمين تمارين متنوعة تستهدف مهارات مختلفة لتحقيق أقصى استفادة.
                  </div>
                </li>
                <li className="flex gap-2">
                  <Dumbbell className="h-5 w-5 text-blue-500 shrink-0" />
                  <div>
                    <strong>التدرج في الشدة:</strong> ابدأ بكثافة معتدلة وقم بزيادتها تدريجياً مع تحسن مستواك.
                  </div>
                </li>
                <li className="flex gap-2">
                  <Target className="h-5 w-5 text-green-500 shrink-0" />
                  <div>
                    <strong>التركيز على نقاط الضعف:</strong> خصص وقتاً أكبر للتمارين التي تعالج نقاط ضعفك المحددة.
                  </div>
                </li>
                <li className="flex gap-2">
                  <Calendar className="h-5 w-5 text-purple-500 shrink-0" />
                  <div>
                    <strong>التخطيط المنتظم:</strong> حافظ على جدول تدريبي منتظم مع وقت كافٍ للراحة والاستشفاء.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
