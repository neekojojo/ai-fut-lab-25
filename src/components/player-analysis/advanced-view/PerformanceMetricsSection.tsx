
import React from 'react';
import { Timer, Dumbbell } from "lucide-react";

const PerformanceMetricsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="bg-secondary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center">
          <Timer className="h-4 w-4 mr-2 text-amber-500" />
          مؤشرات التحمل
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>القدرة على التحمل</span>
              <span className="font-medium">{85}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>سرعة الاستشفاء</span>
              <span className="font-medium">{78}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>ثبات الأداء</span>
              <span className="font-medium">{70}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center">
          <Dumbbell className="h-4 w-4 mr-2 text-blue-500" />
          ملف التسارع
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>التسارع المفاجئ</span>
              <span className="font-medium">{65}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>التسارع المستمر</span>
              <span className="font-medium">{82}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>القدرة على الإبطاء</span>
              <span className="font-medium">{73}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '73%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsSection;
