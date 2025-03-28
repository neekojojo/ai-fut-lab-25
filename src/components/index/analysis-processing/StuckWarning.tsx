
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RotateCcw, AlertCircle } from 'lucide-react';

interface StuckWarningProps {
  onReset: () => void;
}

const StuckWarning: React.FC<StuckWarningProps> = ({ onReset }) => {
  return (
    <Alert variant="default" className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-500">
        يبدو أن عملية التحليل تستغرق وقتًا أطول من المتوقع
      </AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-400">
        يمكنك الانتظار أو إعادة تشغيل التحليل إذا استمرت المشكلة
      </AlertDescription>
      
      <div className="mt-3 flex justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-800 flex items-center gap-1"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>إعادة التحليل</span>
        </Button>
      </div>
    </Alert>
  );
};

export default StuckWarning;
