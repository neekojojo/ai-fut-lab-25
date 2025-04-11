import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileVideo, Brain, Medal, AreaChart, TimerReset, Target } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <FileVideo className="h-10 w-10 text-primary" />,
      title: 'تحليل الفيديو',
      description: 'تحليل مقاطع فيديو أداء اللاعب باستخدام خوارزميات الرؤية الحاسوبية المتقدمة'
    },
    {
      icon: <Brain className="h-10 w-10 text-indigo-500" />,
      title: 'الذكاء الاصطناعي',
      description: 'استخدام نماذج تعلم عميق مدربة على آلاف مقاطع فيديو لاعبين محترفين'
    },
    {
      icon: <AreaChart className="h-10 w-10 text-blue-500" />,
      title: 'تقارير تفصيلية',
      description: 'تقارير وإحصائيات شاملة عن الأداء الفني والبدني والتكتيكي للاعب'
    },
    {
      icon: <Medal className="h-10 w-10 text-amber-500" />,
      title: 'مقارنة مع المحترفين',
      description: 'مقارنة أداء اللاعب مع معايير ومقاييس لاعبين محترفين عالميين'
    },
    {
      icon: <TimerReset className="h-10 w-10 text-green-500" />,
      title: 'تتبع التقدم',
      description: 'متابعة تطور أداء اللاعب عبر الزمن ومراقبة التحسن في المهارات المختلفة'
    },
    {
      icon: <Target className="h-10 w-10 text-red-500" />,
      title: 'توصيات مخصصة',
      description: 'توصيات تدريبية مخصصة بناءً على نقاط القوة والضعف المحددة'
    }
  ];
  
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">مميزات المنصة</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          نقدم مجموعة متكاملة من الأدوات المدعومة بالذكاء الاصطناعي لتحليل وتطوير أداء لاعبي كرة القدم
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
