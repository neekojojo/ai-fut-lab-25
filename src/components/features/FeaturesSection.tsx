
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  LineChart, 
  Activity, 
  Users, 
  TrendingUp, 
  Award, 
  Shield,
  ChevronRight
} from 'lucide-react';

interface FeatureArticle {
  title: string;
  content: React.ReactNode;
}

const FeaturesSection = () => {
  const [openArticle, setOpenArticle] = useState<string | null>(null);
  
  const featureArticles: Record<string, FeatureArticle> = {
    "playerMovement": {
      title: "تحليل حركة اللاعبين",
      content: (
        <div className="space-y-4">
          <p>تعتبر تقنية تحليل حركة اللاعبين من أهم التقنيات المستخدمة في كرة القدم الحديثة. تتيح هذه التقنية للمدربين والمحللين فهم أنماط حركة اللاعبين بشكل دقيق.</p>
          
          <h3 className="text-lg font-semibold mt-4">ما الذي يقيسه التحليل؟</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>سرعة اللاعب القصوى والمتوسطة</li>
            <li>معدل التسارع والتباطؤ</li>
            <li>المسافة المقطوعة خلال المباراة</li>
            <li>مناطق تواجد اللاعب الأكثر شيوعاً</li>
            <li>تحليل الحركة خارج وداخل الكرة</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">كيف يتم استخدام البيانات؟</h3>
          <p>تساعد هذه البيانات في:</p>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحسين اللياقة البدنية للاعبين</li>
            <li>تصميم خطط تدريبية مخصصة</li>
            <li>تطوير الاستراتيجيات التكتيكية</li>
            <li>تقليل خطر الإصابات</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">التقنيات المستخدمة</h3>
          <p>يستخدم نظامنا مزيجاً من:</p>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تتبع الفيديو بالذكاء الاصطناعي</li>
            <li>أجهزة GPS متخصصة للاعبين</li>
            <li>خوارزميات متقدمة لتحليل البيانات</li>
          </ul>
        </div>
      )
    },
    "technicalAnalysis": {
      title: "تحليل الأداء الفني",
      content: (
        <div className="space-y-4">
          <p>يعتبر تحليل الأداء الفني أحد أهم المؤشرات لتقييم مستوى اللاعب وقدراته التقنية في كرة القدم.</p>
          
          <h3 className="text-lg font-semibold mt-4">المهارات التي يتم تحليلها</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>دقة التمرير (القصير والطويل)</li>
            <li>قوة وإتقان التسديد</li>
            <li>مهارات المراوغة والتحكم بالكرة</li>
            <li>الاستحواذ تحت الضغط</li>
            <li>المهارات الدفاعية والهجومية</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">تقنيات التحليل</h3>
          <p>نستخدم مجموعة من التقنيات المتطورة لضمان دقة التحليل:</p>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>نماذج تعلم آلي مدربة على آلاف المباريات</li>
            <li>تحليل بصري متطور لحركة الكرة واللاعب</li>
            <li>مقارنة الأداء مع معايير محددة للمستويات المختلفة</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الفوائد للاعبين والمدربين</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحديد نقاط القوة والضعف بدقة</li>
            <li>تقديم ملاحظات فورية قابلة للتنفيذ</li>
            <li>تتبع تطور المهارات عبر الزمن</li>
            <li>تحديد أهداف واقعية للتطوير</li>
          </ul>
        </div>
      )
    },
    "talentDiscovery": {
      title: "اكتشاف المواهب",
      content: (
        <div className="space-y-4">
          <p>يُعد اكتشاف المواهب الشابة وتطويرها أحد أهم التحديات في عالم كرة القدم. يوفر نظامنا طريقة موضوعية ودقيقة لتقييم اللاعبين الناشئين.</p>
          
          <h3 className="text-lg font-semibold mt-4">منهجية التقييم</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحليل شامل للمهارات الفنية والتكتيكية</li>
            <li>تقييم القدرات البدنية والحركية</li>
            <li>دراسة السمات النفسية والذهنية</li>
            <li>مقارنة مع مسارات تطور لاعبين محترفين</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">المميزات الرئيسية</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>خوارزميات تنبؤية للتعرف على المواهب المميزة</li>
            <li>مقاييس موضوعية تتجاوز التحيزات الشخصية</li>
            <li>تقييم متعدد الأبعاد للاعب</li>
            <li>مطابقة المواهب مع متطلبات الأندية</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الفوائد للأكاديميات والأندية</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>اكتشاف المواهب في مرحلة مبكرة</li>
            <li>توفير الوقت والموارد في عملية الاختيار</li>
            <li>تقليل نسبة الفشل في اختيار اللاعبين</li>
            <li>تطوير استراتيجيات فعالة لتنمية المواهب</li>
          </ul>
        </div>
      )
    },
    "progressTracking": {
      title: "متابعة التطور",
      content: (
        <div className="space-y-4">
          <p>متابعة تطور اللاعب عبر الزمن أمر ضروري لضمان تحقيق الأهداف المرجوة وتعديل خطط التدريب حسب الحاجة.</p>
          
          <h3 className="text-lg font-semibold mt-4">آلية المتابعة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تقييمات دورية للمهارات والأداء</li>
            <li>مقاييس كمية للتطور في جميع الجوانب</li>
            <li>تحليل اتجاهات التحسن أو التراجع</li>
            <li>تحديد المراحل الحرجة في مسار التطور</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">بيانات التطور المتاحة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>رسوم بيانية توضح مسار التطور</li>
            <li>مقارنات بين الفترات المختلفة</li>
            <li>تحليل نقاط التحول الإيجابية والسلبية</li>
            <li>توقعات مستقبلية بناءً على معدلات التطور</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الفوائد للاعب والمدرب</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>الحفاظ على الدافع والحماس</li>
            <li>تعديل مسار التدريب عند الحاجة</li>
            <li>وضع أهداف واقعية قابلة للقياس</li>
            <li>تحديد المجالات التي تحتاج إلى تركيز إضافي</li>
          </ul>
        </div>
      )
    },
    "comprehensiveReports": {
      title: "تقارير شاملة",
      content: (
        <div className="space-y-4">
          <p>توفر التقارير الشاملة صورة متكاملة عن أداء اللاعب، مما يساعد في اتخاذ قرارات مستنيرة بشأن تطويره المستقبلي.</p>
          
          <h3 className="text-lg font-semibold mt-4">مكونات التقرير</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>ملخص تنفيذي لأبرز النقاط</li>
            <li>تحليل مفصل للجوانب الفنية والتكتيكية</li>
            <li>تقييم اللياقة البدنية والحركية</li>
            <li>تحليل نفسي وذهني</li>
            <li>توصيات محددة للتطوير</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">طرق عرض البيانات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>رسوم بيانية وتوضيحية سهلة القراءة</li>
            <li>مقاييس ومؤشرات رقمية</li>
            <li>تحليلات بصرية ملونة حسب مستوى الأداء</li>
            <li>خرائط حرارية للأداء في الملعب</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">إمكانيات المشاركة والوصول</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>إمكانية مشاركة التقارير مع المدربين والإداريين</li>
            <li>الوصول عبر الأجهزة المختلفة (جوال، حاسوب)</li>
            <li>تصدير التقارير بصيغ مختلفة</li>
            <li>سجل تاريخي لجميع التقارير السابقة</li>
          </ul>
        </div>
      )
    },
    "specializedTraining": {
      title: "خطط تدريبية متخصصة",
      content: (
        <div className="space-y-4">
          <p>بناءً على نتائج التحليل الشامل، يقدم النظام خططاً تدريبية مخصصة لكل لاعب لتطوير مهاراته بالشكل الأمثل.</p>
          
          <h3 className="text-lg font-semibold mt-4">آلية تصميم الخطط</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحليل نقاط القوة والضعف</li>
            <li>تحديد الأولويات التطويرية</li>
            <li>مراعاة خصائص اللاعب الفريدة</li>
            <li>الموازنة بين جوانب التطوير المختلفة</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">أنواع التمارين المقترحة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تمارين فنية لتطوير المهارات المحددة</li>
            <li>تدريبات بدنية مخصصة</li>
            <li>تمارين تكتيكية حسب مركز اللعب</li>
            <li>تدريبات ذهنية لتحسين اتخاذ القرار</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">المتابعة والتعديل</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>قياس فعالية الخطة التدريبية</li>
            <li>تعديل التمارين بناءً على النتائج</li>
            <li>زيادة مستوى الصعوبة تدريجياً</li>
            <li>اقتراحات لتمارين إضافية حسب الحاجة</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">ميزات الخطط التدريبية</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>سهولة الفهم والتطبيق</li>
            <li>مدعومة بفيديوهات توضيحية</li>
            <li>قابلة للتكييف مع الإمكانيات المتاحة</li>
            <li>تحديثات دورية بناءً على التقدم</li>
          </ul>
        </div>
      )
    }
  };

  const handleOpenArticle = (id: string) => {
    setOpenArticle(id);
  };

  const handleCloseArticle = () => {
    setOpenArticle(null);
  };

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
            onReadMore={() => handleOpenArticle("playerMovement")}
          />
          
          <FeatureCard 
            icon={<LineChart className="h-8 w-8 text-primary" />}
            title="تحليل الأداء الفني"
            description="قياس دقيق للمهارات الفنية مثل التمرير والتسديد والمراوغة"
            onReadMore={() => handleOpenArticle("technicalAnalysis")}
          />
          
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-primary" />}
            title="اكتشاف المواهب"
            description="تقييم موضوعي للمواهب الشابة ومقارنتها بمعايير اللاعبين المحترفين"
            onReadMore={() => handleOpenArticle("talentDiscovery")}
          />
          
          <FeatureCard 
            icon={<TrendingUp className="h-8 w-8 text-primary" />}
            title="متابعة التطور"
            description="رصد تطور اللاعب وتحسن أدائه عبر الزمن باستخدام مؤشرات كمية"
            onReadMore={() => handleOpenArticle("progressTracking")}
          />
          
          <FeatureCard 
            icon={<Award className="h-8 w-8 text-primary" />}
            title="تقارير شاملة"
            description="تقارير مفصلة وسهلة القراءة توضح نقاط القوة وفرص التحسين للاعب"
            onReadMore={() => handleOpenArticle("comprehensiveReports")}
          />
          
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="خطط تدريبية متخصصة"
            description="توصيات تدريبية مخصصة بناءً على نتائج التحليل لتطوير المهارات"
            onReadMore={() => handleOpenArticle("specializedTraining")}
          />
        </div>
      </div>

      {/* Feature Article Dialog */}
      <Dialog open={!!openArticle} onOpenChange={handleCloseArticle}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {openArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                  {featureArticles[openArticle].title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-foreground">
                {featureArticles[openArticle].content}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onReadMore: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onReadMore }) => {
  return (
    <Card className="glass-card border-primary/10 transition-all duration-300 card-overlay h-full group hover:-translate-y-2">
      <CardHeader className="pb-2">
        <div className="flex items-start">
          <div className="bg-primary/20 p-4 rounded-xl shadow-lg group-hover:animate-pulse">
            {icon}
          </div>
        </div>
        <CardTitle className="mt-4 text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="text-primary hover:text-primary/80 hover:bg-primary/10 p-2 h-auto"
          onClick={onReadMore}
        >
          قراءة المزيد <ChevronRight className="mr-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturesSection;
