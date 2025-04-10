
import React from 'react';

// تعريف بيانات عينة لاستخدامها في عدة مكونات
export const useAnalysisData = (analysis: any) => {
  // بيانات السرعة للرسومات البيانية
  const speedData = [
    { name: "0م", current: 0, previous: 0 },
    { name: "5م", current: 12, previous: 10 },
    { name: "10م", current: 18, previous: 15 },
    { name: "15م", current: 22, previous: 20 },
    { name: "20م", current: 19, previous: 17 },
    { name: "25م", current: 15, previous: 14 },
    { name: "30م", current: 10, previous: 8 }
  ];

  // بيانات التسارع
  const accelerationData = [
    { name: "0ث", current: 0, previous: 0 },
    { name: "1ث", current: 4.2, previous: 3.8 },
    { name: "2ث", current: 3.8, previous: 3.5 },
    { name: "3ث", current: 2.5, previous: 2.2 },
    { name: "4ث", current: 1.8, previous: 1.5 },
    { name: "5ث", current: 0.9, previous: 0.8 }
  ];

  // أنماط الحركة
  const movementPatternData = [
    { name: "0%", current: 5, previous: 3 },
    { name: "20%", current: 15, previous: 12 },
    { name: "40%", current: 25, previous: 18 },
    { name: "60%", current: 20, previous: 22 },
    { name: "80%", current: 30, previous: 25 },
    { name: "100%", current: 10, previous: 8 }
  ];

  // كفاءة استهلاك الطاقة
  const energyEfficiencyData = [
    { name: "0د", current: 100, previous: 100 },
    { name: "15د", current: 95, previous: 90 },
    { name: "30د", current: 90, previous: 82 },
    { name: "45د", current: 88, previous: 78 },
    { name: "60د", current: 85, previous: 73 },
    { name: "75د", current: 82, previous: 68 },
    { name: "90د", current: 80, previous: 65 }
  ];

  // بيانات حركة اللاعب مع الوقت
  const movementData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: i,
    speed: 5 + Math.sin(i / 3) * 3 + Math.random() * 2,
    acceleration: 1 + Math.cos(i / 4) * 0.8 + Math.random() * 0.5,
  }));

  // مناطق السرعة المختلفة
  const speedZones = {
    walking: 0.45,
    jogging: 0.32,
    running: 0.18,
    sprinting: 0.05
  };

  // نسخة معززة من بيانات التحليل مع قيم إضافية
  const enhancedAnalysis = {
    ...analysis,
    movementAnalysis: {
      movementEfficiency: 78,
      speedZones: speedZones,
      maxSpeed: 24.5,
      totalDistance: 9870,
      directionChanges: 37,
      maxAcceleration: 5.2
    },
    enhancedMovement: {
      stamina: 84,
      accelerationProfile: {
        explosive: 0.72,
        sustained: 0.68
      },
      consistency: 77,
      tacticaAwareness: 81,
      recoverySpeed: 4.2
    }
  };

  return {
    speedData,
    accelerationData,
    movementPatternData,
    energyEfficiencyData,
    movementData,
    speedZones,
    enhancedAnalysis
  };
};
