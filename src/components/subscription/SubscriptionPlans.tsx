
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define the features for each plan
const planFeatures = {
  standard: [
    { name: 'تحليل أساسي للاعب', included: true },
    { name: 'اكتشاف وتتبع اللاعبين', included: true },
    { name: 'تحليل الحركة الأساسي', included: true },
    { name: 'تقارير مختصرة', included: true },
    { name: 'مقارنة بسيطة مع لاعبين آخرين', included: true },
    { name: 'تحديث البيانات شهرياً', included: true },
    { name: 'توصيات تدريبية محدودة', included: false },
    { name: 'تحليل متقدم للمهارات', included: false },
    { name: 'تحليل بالتكنولوجيا المتقدمة', included: false },
    { name: 'خطط تطوير مخصصة', included: false },
  ],
  premium: [
    { name: 'جميع ميزات الباقة العادية', included: true },
    { name: 'تحليل متقدم للمهارات', included: true },
    { name: 'خرائط حرارية للحركة', included: true },
    { name: 'تقارير مفصلة وشاملة', included: true },
    { name: 'توصيات تدريبية متقدمة', included: true },
    { name: 'تحديث البيانات أسبوعياً', included: true },
    { name: 'مقارنة متقدمة مع لاعبين محترفين', included: true },
    { name: 'تحليل بالذكاء الاصطناعي المتقدم', included: false },
    { name: 'تحليل خاص بالموقع واللعب', included: false },
    { name: 'تكامل مع أنظمة الأندية', included: false },
  ],
  professional: [
    { name: 'جميع ميزات الباقة المتوسطة', included: true },
    { name: 'تحليل بالذكاء الاصطناعي المتقدم', included: true },
    { name: 'تحليل خاص بالموقع واللعب', included: true },
    { name: 'تكامل مع أنظمة الأندية', included: true },
    { name: 'خطط تطوير مخصصة', included: true },
    { name: 'تحديث البيانات يومياً', included: true },
    { name: 'تقارير للفريق بأكمله', included: true },
    { name: 'تحليل تكتيكي شامل', included: true },
    { name: 'دعم فني على مدار الساعة', included: true },
    { name: 'استشارات تدريبية متخصصة', included: true },
  ],
};

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: Array<{ name: string; included: boolean }>;
  highlight?: boolean;
  buttonText?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  highlight = false,
  buttonText = "اشترك الآن"
}) => {
  const { toast } = useToast();
  
  const handleSubscribe = () => {
    toast({
      title: `تم اختيار الباقة: ${title}`,
      description: "هذه ميزة عرض فقط وليست متاحة للاشتراك الفعلي حالياً",
    });
  };

  return (
    <Card className={`h-full flex flex-col ${highlight ? 'border-primary shadow-lg scale-105 relative' : 'border-muted'}`}>
      {highlight && (
        <Badge variant="default" className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1">
          الأكثر شيوعاً
        </Badge>
      )}
      <CardHeader className={`text-center pb-4 ${highlight ? 'bg-primary/10 rounded-t-lg' : ''}`}>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground"> / شهرياً</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-300 ml-2 flex-shrink-0" />
              )}
              <span className={feature.included ? "" : "text-muted-foreground"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubscribe}
          className={`w-full ${highlight ? 'bg-primary hover:bg-primary/90' : ''}`}
          variant={highlight ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const SubscriptionPlans: React.FC = () => {
  return (
    <div className="py-12 space-y-8 relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">باقات الاشتراك</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اختر الباقة المناسبة لاحتياجاتك وابدأ رحلتك في تحليل وتطوير مهارات لاعبي كرة القدم
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <PlanCard
          title="الباقة العادية"
          price="٥٠ ريال"
          description="للمدربين المبتدئين والهواة"
          features={planFeatures.standard}
        />
        
        <PlanCard
          title="الباقة المتوسطة"
          price="٢٠٠ ريال"
          description="للأكاديميات والمدربين المحترفين"
          features={planFeatures.premium}
          highlight={true}
        />
        
        <PlanCard
          title="الباقة الاحترافية"
          price="٤٠٠ ريال"
          description="للأندية والمؤسسات الرياضية المحترفة"
          features={planFeatures.professional}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
