
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import VirtualFieldAR from '@/components/ar/VirtualFieldAR';
import SkillChallengeAR from '@/components/ar/SkillChallengeAR';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
        <div className="mb-6">
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
        
        <div className="my-4">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="field">الملعب الافتراضي</TabsTrigger>
              <TabsTrigger value="challenges">تحديات المهارات</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="field" className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">الملعب الافتراضي</h2>
                  <p className="mb-4">استخدم كاميرا هاتفك لتجربة ملعب كرة قدم افتراضي في محيطك الحقيقي.</p>
                  
                  <VirtualFieldAR onError={handlePermissionsError} />
                </div>
              </TabsContent>
              
              <TabsContent value="challenges" className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">تحديات المهارات</h2>
                  <p className="mb-4">تدرب على مهاراتك من خلال تحديات تفاعلية باستخدام الواقع المعزز.</p>
                  
                  <SkillChallengeAR onError={handlePermissionsError} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ARExperience;
