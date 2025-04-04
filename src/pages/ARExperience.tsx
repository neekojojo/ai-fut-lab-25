
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import VirtualFieldAR from '@/components/ar/VirtualFieldAR';
import SkillChallengeAR from '@/components/ar/SkillChallengeAR';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle, Camera, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ARExperience = () => {
  const [activeTab, setActiveTab] = useState<string>("field");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePermissionsError = () => {
    toast({
      title: "خطأ في الوصول للكاميرا",
      description: "يرجى السماح باستخدام الكاميرا لتجربة الواقع المعزز",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto py-6 px-4 flex-1">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            
            <h1 className="text-3xl font-bold">تجربة الواقع المعزز</h1>
            <p className="text-muted-foreground mt-2">
              استخدم الواقع المعزز لتحسين مهاراتك وتحليل أدائك في كرة القدم
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex mt-4 sm:mt-0">
                <HelpCircle className="h-4 w-4 ml-2" />
                حول الواقع المعزز
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>حول تقنية الواقع المعزز</DialogTitle>
                <DialogDescription>
                  كيف تعمل تقنية الواقع المعزز في تطبيقنا وكيفية الاستفادة منها؟
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Camera className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">استخدام الكاميرا</h4>
                    <p className="text-sm text-muted-foreground">
                      تعمل تقنية الواقع المعزز من خلال كاميرا هاتفك أو جهازك، حيث تدمج العناصر الافتراضية مع البيئة الحقيقية.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">نصائح للاستخدام الأمثل</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mt-1">
                      <li>استخدم التطبيق في منطقة جيدة الإضاءة</li>
                      <li>وجه الكاميرا نحو مساحة فارغة أو منطقة مفتوحة</li>
                      <li>تحرك ببطء حول العناصر الافتراضية للحصول على تجربة أفضل</li>
                      <li>يمكنك استخدام الكرة الحقيقية للتفاعل مع التحديات</li>
                    </ul>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button">فهمت</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="field">الملعب الافتراضي</TabsTrigger>
                    <TabsTrigger value="challenges">تحديات المهارات</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
                
              <CardContent className="pt-2">
                <Tabs value={activeTab} defaultValue={activeTab}>
                  <TabsContent value="field" className="mt-0">
                    <VirtualFieldAR onError={handlePermissionsError} />
                  </TabsContent>
                  
                  <TabsContent value="challenges" className="mt-0">
                    <SkillChallengeAR onError={handlePermissionsError} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>فوائد الواقع المعزز</CardTitle>
                <CardDescription>
                  كيف يساعدك الواقع المعزز في تطوير مهاراتك؟
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold">تدريب مستقل</h3>
                    <p className="text-sm text-muted-foreground">
                      تدرب في أي وقت ومكان بدون الحاجة لملعب أو معدات كثيرة
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold">تحليل دقيق</h3>
                    <p className="text-sm text-muted-foreground">
                      احصل على بيانات دقيقة حول أدائك وتقدمك في كل تمرين
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold">تقنيات احترافية</h3>
                    <p className="text-sm text-muted-foreground">
                      تعلم تقنيات وتكتيكات يستخدمها لاعبو النخبة
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold">محاكاة واقعية</h3>
                    <p className="text-sm text-muted-foreground">
                      تدرب في بيئة تحاكي مواقف المباراة الحقيقية
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">المتطلبات التقنية:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      كاميرا ويب أو كاميرا هاتف
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      متصفح حديث يدعم WebGL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      اتصال إنترنت مستقر
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                      مساحة كافية للحركة (مستحسن)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ARExperience;
