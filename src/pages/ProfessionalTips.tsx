
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import { GraduationCap, Book, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProfessionalTips = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 md:py-12">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">نصائح الحياة الاحترافية</h1>
            <p className="text-muted-foreground">دليلك للتميز في عالم كرة القدم الاحترافية</p>
          </div>
          
          <Separator />
          
          <Card className="border shadow-md">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <span>المسيرة الاحترافية في كرة القدم</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-right">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span>كيف تبني مسيرة احترافية ناجحة في كرة القدم</span>
                </h2>
                
                <p>
                  مسيرة لاعب كرة القدم الاحترافية تتطلب أكثر من مجرد المهارة في الملعب. إنها رحلة متكاملة تجمع بين التدريب البدني، والنظام الغذائي، والذهنية القوية، والعلاقات المهنية.
                </p>
                
                <h3 className="text-lg font-medium mt-6">١. التدريب المنتظم والمنظم</h3>
                <p>
                  التدريب اليومي المنظم والمخطط له هو أساس التطور المستمر. ضع خطة تدريبية تتناسب مع نقاط قوتك وتعمل على تحسين نقاط ضعفك. خصص وقتاً محدداً كل يوم للتدريب على المهارات الأساسية مثل التمرير، التسديد، والتحكم بالكرة.
                </p>
                
                <h3 className="text-lg font-medium mt-6">٢. النظام الغذائي والتغذية</h3>
                <p>
                  التغذية الصحيحة هي وقود الأداء العالي. ركز على تناول البروتينات لبناء العضلات، والكربوهيدرات للطاقة، والفواكه والخضروات للفيتامينات والمعادن الضرورية. شرب كميات كافية من الماء يوميًا للحفاظ على الترطيب، خاصة قبل وبعد التدريبات والمباريات.
                </p>
                
                <h3 className="text-lg font-medium mt-6">٣. الراحة والاسترداد</h3>
                <p>
                  الراحة جزء أساسي من التدريب وليست إهدارًا للوقت. احصل على 7-9 ساعات من النوم ليلاً. خطط لأيام راحة في جدولك التدريبي. استخدم تقنيات الاسترداد مثل التدليك، والعلاج بالماء البارد، واليوغا.
                </p>
                
                <h3 className="text-lg font-medium mt-6">٤. تطوير الذهنية الاحترافية</h3>
                <p>
                  العقلية الاحترافية تميز اللاعبين الكبار. تعلم كيفية التعامل مع الضغط والانتقادات. ضع أهدافًا واضحة وقابلة للقياس. احتفظ بسجل لتقدمك وإنجازاتك. ابقَ متواضعًا وقابلاً للتعلم، مهما بلغ نجاحك.
                </p>
                
                <h3 className="text-lg font-medium mt-6">٥. بناء شبكة علاقات مهنية</h3>
                <p>
                  العلاقات المهنية تفتح الأبواب للفرص. تواصل مع المدربين واللاعبين المحترفين والكشافين. شارك في المباريات والدورات التي يحضرها الكشافون. حافظ على تواجد احترافي على منصات التواصل الاجتماعي.
                </p>
              </div>
              
              <Separator className="my-8" />
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  <span>إدارة الموارد المالية للاعبين المحترفين</span>
                </h2>
                
                <p>
                  إدارة الأموال بحكمة أمر بالغ الأهمية للاعبين المحترفين، خاصة مع قصر مدة المسيرة الرياضية مقارنة بالمهن الأخرى.
                </p>
                
                <h3 className="text-lg font-medium mt-6">١. إنشاء ميزانية وخطة مالية</h3>
                <p>
                  اعمل مع مستشار مالي لوضع ميزانية تغطي نفقاتك وتوفر للمستقبل. احسب متوسط دخلك السنوي وضع خطة توفير تتناسب مع أهدافك المالية طويلة الأمد. حدد أولوياتك المالية وضع جدولاً زمنياً لتحقيقها.
                </p>
                
                <h3 className="text-lg font-medium mt-6">٢. الاستثمار للمستقبل</h3>
                <p>
                  فكر في المستقبل بعد انتهاء مسيرتك الكروية. استثمر في مجالات متنوعة ومستقرة. اعتبر الاستثمار في العقارات أو الأعمال التجارية التي يمكن أن توفر دخلاً مستداماً. استشر خبراء استثمار متخصصين في إدارة ثروات الرياضيين.
                </p>
                
                <h3 className="text-lg font-medium mt-6">٣. التعليم والتطوير المستمر</h3>
                <p>
                  استثمر في تعليمك وتطوير مهاراتك خارج الملعب. فكر في الحصول على درجة علمية أو شهادات تدريب. تعلم مهارات قابلة للتحويل يمكن استخدامها بعد الاعتزال. اكتسب معرفة أساسية بالأمور المالية والأعمال.
                </p>
                
                <p className="mt-6 italic text-muted-foreground">
                  تذكر دائمًا أن النجاح في عالم كرة القدم الاحترافية هو رحلة طويلة تتطلب الصبر والمثابرة والتخطيط الدقيق. ابدأ اليوم في بناء أساس متين لمسيرتك المهنية، واستمر في التعلم والتطور في كل خطوة على الطريق.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalTips;
