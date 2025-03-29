
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Activity, 
  Users, 
  TrendingUp, 
  Award, 
  Shield 
} from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="relative py-16 z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-left bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
          مميزات التطبيق الرئيسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Activity className="h-8 w-8 text-primary" />}
            title="تحليل حركة اللاعبين"
            description="تحليل متقدم لأنماط حركة اللاعبين وسرعتهم وتسارعهم خلال المباراة"
          />
          
          <FeatureCard 
            icon={<LineChart className="h-8 w-8 text-primary" />}
            title="تحليل الأداء الفني"
            description="قياس دقيق للمهارات الفنية مثل التمرير والتسديد والمراوغة"
          />
          
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-primary" />}
            title="اكتشاف المواهب"
            description="تقييم موضوعي للمواهب الشابة ومقارنتها بمعايير اللاعبين المحترفين"
          />
          
          <FeatureCard 
            icon={<TrendingUp className="h-8 w-8 text-primary" />}
            title="متابعة التطور"
            description="رصد تطور اللاعب وتحسن أدائه عبر الزمن باستخدام مؤشرات كمية"
          />
          
          <FeatureCard 
            icon={<Award className="h-8 w-8 text-primary" />}
            title="تقارير شاملة"
            description="تقارير مفصلة وسهلة القراءة توضح نقاط القوة وفرص التحسين للاعب"
          />
          
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="خطط تدريبية متخصصة"
            description="توصيات تدريبية مخصصة بناءً على نتائج التحليل لتطوير المهارات"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="glass-card border-primary/10 transition-all duration-300 card-overlay h-full group hover:-translate-y-2">
      <CardHeader className="pb-2">
        <div className="flex items-start">
          <div className="bg-gradient-primary p-4 rounded-xl shadow-lg group-hover:animate-pulse">
            {icon}
          </div>
        </div>
        <CardTitle className="mt-4 text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeaturesSection;
