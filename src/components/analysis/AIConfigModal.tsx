
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings, Info } from "lucide-react";
import { googleAutoMLService } from '@/utils/ai/googleAutoMLService';
import { toast } from 'sonner';

interface AIConfigModalProps {
  onConfigured?: () => void;
}

const AIConfigModal: React.FC<AIConfigModalProps> = ({ onConfigured }) => {
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [googleProjectId, setGoogleProjectId] = useState<string>('');
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    try {
      // تحقق من وجود المفاتيح
      if (!googleApiKey || !googleProjectId) {
        toast.error("يرجى إدخال مفتاح API ومعرف المشروع");
        return;
      }
      
      // تكوين خدمات Google AutoML
      googleAutoMLService.setApiKey(googleApiKey);
      googleAutoMLService.setProjectId(googleProjectId);
      
      // حفظ المفاتيح في التخزين المحلي للاستخدام المستقبلي
      localStorage.setItem('google_automl_api_key', googleApiKey);
      localStorage.setItem('google_automl_project_id', googleProjectId);
      
      toast.success("تم حفظ تكوين الذكاء الاصطناعي بنجاح!");
      
      // إغلاق الحوار
      setOpen(false);
      
      // استدعاء رد النداء إذا تم توفيره
      if (onConfigured) {
        onConfigured();
      }
    } catch (error) {
      console.error("خطأ في حفظ تكوين الذكاء الاصطناعي:", error);
      toast.error("حدث خطأ أثناء حفظ التكوين");
    }
  };
  
  // استعادة المفاتيح المحفوظة عند فتح الحوار
  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      const savedGoogleApiKey = localStorage.getItem('google_automl_api_key') || '';
      const savedGoogleProjectId = localStorage.getItem('google_automl_project_id') || '';
      
      setGoogleApiKey(savedGoogleApiKey);
      setGoogleProjectId(savedGoogleProjectId);
    }
    
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          إعداد الذكاء الاصطناعي
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إعداد خدمات الذكاء الاصطناعي</DialogTitle>
          <DialogDescription>
            قم بتكوين مفاتيح API الخاصة بك للذكاء الاصطناعي لتمكين تحليل الفيديو الحقيقي
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Alert variant="default" className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              للحصول على تحليل دقيق، قم بإضافة مفاتيح API الخاصة بـ Google AutoML. يمكنك الحصول عليها من لوحة تحكم Google Cloud.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="google-api-key">مفتاح Google API</Label>
            <Input
              id="google-api-key"
              type="password"
              placeholder="أدخل مفتاح Google API الخاص بك"
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="google-project-id">معرف مشروع Google</Label>
            <Input
              id="google-project-id"
              placeholder="أدخل معرف مشروع Google الخاص بك"
              value={googleProjectId}
              onChange={(e) => setGoogleProjectId(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
          <Button onClick={handleSave}>حفظ التكوين</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIConfigModal;
