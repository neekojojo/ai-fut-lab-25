
import React, { useState } from 'react';
import { apiProxyService } from '@/services/apiProxyService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';

const ApiTest: React.FC = () => {
  const [isLoadingOpta, setIsLoadingOpta] = useState(false);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false);
  const [optaResult, setOptaResult] = useState<any>(null);
  const [transferResult, setTransferResult] = useState<any>(null);
  const { toast } = useToast();

  const testOptaApi = async () => {
    setIsLoadingOpta(true);
    try {
      // اختبار واجهة برمجة التطبيقات Opta FIFA
      const result = await apiProxyService.callOptaApi('competitions', { 
        season: 2023 
      });
      setOptaResult(result);
      toast({
        title: "تم بنجاح!",
        description: "تم استدعاء API Opta FIFA بنجاح",
      });
    } catch (error) {
      console.error("خطأ في استدعاء Opta FIFA API:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل استدعاء API Opta FIFA. تحقق من سجلات Edge Function.",
      });
    } finally {
      setIsLoadingOpta(false);
    }
  };

  const testTransferMarketApi = async () => {
    setIsLoadingTransfer(true);
    try {
      // اختبار واجهة برمجة التطبيقات Transfer Market
      const result = await apiProxyService.callTransferMarketApi('players/search', { 
        name: 'Messi' 
      });
      setTransferResult(result);
      toast({
        title: "تم بنجاح!",
        description: "تم استدعاء API Transfer Market بنجاح",
      });
    } catch (error) {
      console.error("خطأ في استدعاء Transfer Market API:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل استدعاء API Transfer Market. تحقق من سجلات Edge Function.",
      });
    } finally {
      setIsLoadingTransfer(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6">اختبار وظائف Edge Functions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>اختبار Opta FIFA API</CardTitle>
              <CardDescription>اختبار استدعاء API من خلال Edge Function</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={testOptaApi} 
                disabled={isLoadingOpta}
                className="w-full"
              >
                {isLoadingOpta ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الاستدعاء...
                  </>
                ) : 'استدعاء Opta FIFA API'}
              </Button>
              
              {optaResult && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">النتيجة:</h3>
                  <div className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-60">
                    <pre>{JSON.stringify(optaResult, null, 2)}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>اختبار Transfer Market API</CardTitle>
              <CardDescription>اختبار استدعاء API من خلال Edge Function</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={testTransferMarketApi} 
                disabled={isLoadingTransfer}
                className="w-full"
              >
                {isLoadingTransfer ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الاستدعاء...
                  </>
                ) : 'استدعاء Transfer Market API'}
              </Button>
              
              {transferResult && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">النتيجة:</h3>
                  <div className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-60">
                    <pre>{JSON.stringify(transferResult, null, 2)}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">كيفية استخدام واجهات برمجة التطبيقات (APIs)</h2>
          <Card>
            <CardContent className="pt-6">
              <ol className="list-decimal list-inside space-y-2">
                <li>قم بإضافة مفاتيح API الخاصة بك في إعدادات Edge Functions على Supabase.</li>
                <li>استخدم الأزرار أعلاه لاختبار الاتصال بواجهات البرمجة.</li>
                <li>تحقق من سجلات Edge Functions إذا واجهتك أي مشاكل.</li>
                <li>يمكنك تعديل متغيرات البيئة في ملف <code>config.toml</code> إذا لزم الأمر.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApiTest;
