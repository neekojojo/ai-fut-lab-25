
import { PlayerPosition } from '../videoDetection/types';
import { MovementAnalysisResult } from '../videoDetection/movementAnalysis';
import { EnhancedMovementAnalysis } from '../videoDetection/movementAnalysisEnhanced';

export interface PerformanceMetrics {
  technicalScore: number;
  physicalScore: number;
  tacticalScore: number;
  overallScore: number;
  
  breakdown: {
    speed: number;
    endurance: number;
    agility: number;
    control: number;
    positioning: number;
    decisionMaking: number;
    // إضافة مؤشرات جديدة
    explosiveness: number;
    recoveryRate: number;
    tacticalAwareness: number;
    pressureResistance: number;
    consistency: number;
  };
  
  // إضافة تقييم نقاط القوة والضعف
  strengths: string[];
  improvementAreas: string[];
  recommendations: string[];
}

export class PerformanceAnalyzer {
  /**
   * تحليل الأداء الفني للاعب بناءً على تحليل الحركة وبيانات الموقع
   */
  public static analyzeTechnicalPerformance(
    movementAnalysis: EnhancedMovementAnalysis | MovementAnalysisResult,
    playerPositions: PlayerPosition[]
  ): PerformanceMetrics {
    // التحقق من نوع التحليل المقدم (أساسي أو متقدم)
    const isEnhancedAnalysis = 
      'stamina' in movementAnalysis && 
      'tacticaAwareness' in movementAnalysis;
    
    // استخراج قيم محددة من التحليل
    const speedScore = Math.min(100, (movementAnalysis.maxSpeed / 5) * 100);
    const movementEfficiency = movementAnalysis.movementEfficiency;
    const sprintPercentage = movementAnalysis.speedZones.sprinting * 100;
    
    // استخراج قيم إضافية في حالة التحليل المتقدم
    const stamina = isEnhancedAnalysis 
      ? (movementAnalysis as EnhancedMovementAnalysis).stamina 
      : Math.min(100, 50 + (movementAnalysis.totalDistance / 100) * 50);
    
    const consistency = isEnhancedAnalysis 
      ? (movementAnalysis as EnhancedMovementAnalysis).consistency 
      : Math.min(100, 100 - Math.abs(movementAnalysis.directionChanges - 10) * 5);
    
    const tacticalAwareness = isEnhancedAnalysis 
      ? (movementAnalysis as EnhancedMovementAnalysis).tacticaAwareness 
      : Math.min(100, movementEfficiency * 0.7 + (movementAnalysis.directionChanges / 20) * 30);
    
    // حساب مؤشرات الأداء
    const speedRating = Math.min(100, speedScore * 0.7 + sprintPercentage * 0.3);
    const enduranceRating = stamina;
    const agilityRating = Math.min(100, 
      (movementAnalysis.directionChanges / 10) * 50 + 
      (movementAnalysis.maxAcceleration / 5) * 50
    );
    
    // مؤشرات متقدمة
    const explosiveness = isEnhancedAnalysis 
      ? (movementAnalysis as EnhancedMovementAnalysis).accelerationProfile.explosive * 100 
      : Math.min(100, (movementAnalysis.maxAcceleration / 5) * 100);
    
    const recoveryRate = isEnhancedAnalysis 
      ? (movementAnalysis as EnhancedMovementAnalysis).recoverySpeed * 20 
      : Math.min(100, 50 + (movementAnalysis.speedZones.walking + movementAnalysis.speedZones.jogging) * 50);
    
    const pressureResistance = Math.min(100,
      (consistency * 0.4) + 
      (movementEfficiency * 0.3) + 
      (tacticalAwareness * 0.3)
    );
    
    // حساب النتائج النهائية
    const technicalScore = Math.round(
      (explosiveness * 0.2) + 
      (movementEfficiency * 0.4) + 
      (consistency * 0.4)
    );
    
    const physicalScore = Math.round(
      (speedRating * 0.35) + 
      (enduranceRating * 0.35) + 
      (agilityRating * 0.15) + 
      (recoveryRate * 0.15)
    );
    
    const tacticalScore = Math.round(
      (tacticalAwareness * 0.4) + 
      (pressureResistance * 0.3) + 
      (movementEfficiency * 0.3)
    );
    
    const overallScore = Math.round(
      (technicalScore * 0.35) + 
      (physicalScore * 0.35) + 
      (tacticalScore * 0.3)
    );
    
    // تحديد نقاط القوة والضعف
    const metrics = {
      speed: speedRating,
      endurance: enduranceRating,
      agility: agilityRating,
      control: movementEfficiency,
      positioning: tacticalAwareness,
      decisionMaking: pressureResistance,
      explosiveness,
      recoveryRate,
      tacticalAwareness,
      pressureResistance,
      consistency
    };
    
    // ترتيب المقاييس من الأعلى إلى الأقل
    const sortedMetrics = Object.entries(metrics)
      .sort(([, a], [, b]) => b - a);
    
    // اختيار أعلى 3 نقاط قوة وأقل 3 نقاط (مجالات للتحسين)
    const strengths = sortedMetrics.slice(0, 3).map(([key]) => this.getMetricDisplayName(key));
    const improvementAreas = sortedMetrics.slice(-3).map(([key]) => this.getMetricDisplayName(key));
    
    // إنشاء توصيات بناءً على مجالات التحسين
    const recommendations = improvementAreas.map(area => 
      this.getRecommendationForArea(area)
    );
    
    return {
      technicalScore,
      physicalScore,
      tacticalScore,
      overallScore,
      breakdown: metrics,
      strengths,
      improvementAreas,
      recommendations
    };
  }
  
  /**
   * الحصول على اسم العرض للمقياس
   */
  private static getMetricDisplayName(metricKey: string): string {
    const displayNames: Record<string, string> = {
      speed: 'السرعة',
      endurance: 'التحمل',
      agility: 'الرشاقة',
      control: 'التحكم',
      positioning: 'التمركز',
      decisionMaking: 'اتخاذ القرار',
      explosiveness: 'القوة الانفجارية',
      recoveryRate: 'معدل الاستشفاء',
      tacticalAwareness: 'الوعي التكتيكي',
      pressureResistance: 'مقاومة الضغط',
      consistency: 'الثبات'
    };
    
    return displayNames[metricKey] || metricKey;
  }
  
  /**
   * الحصول على توصية بناءً على مجال التحسين
   */
  private static getRecommendationForArea(area: string): string {
    const recommendations: Record<string, string> = {
      'السرعة': 'تمارين السرعة القصوى وتدريبات التسارع لمسافات قصيرة',
      'التحمل': 'تمارين الجري لمسافات طويلة وتمارين القلب والأوعية الدموية',
      'الرشاقة': 'تمارين تغيير الاتجاه السريع والمراوغة بين الأقماع',
      'التحكم': 'تمارين التحكم بالكرة وتحسين التقنية الأساسية',
      'التمركز': 'تمارين التكتيك الجماعي وفهم المواقف اللعبية',
      'اتخاذ القرار': 'تمارين المحاكاة وسيناريوهات اللعب تحت الضغط',
      'القوة الانفجارية': 'تمارين البليومترك والقوة المتفجرة',
      'معدل الاستشفاء': 'تحسين نظام الاستشفاء والتغذية وتمارين التمدد',
      'الوعي التكتيكي': 'مشاهدة وتحليل المباريات ودراسة الخطط التكتيكية',
      'مقاومة الضغط': 'تمارين المحاكاة في ظروف ضاغطة والتدريب الذهني',
      'الثبات': 'تمارين التكرار المنهجي والتدريبات ذات الكثافة المنتظمة'
    };
    
    return recommendations[area] || 'تمارين مخصصة لتحسين الأداء العام';
  }
}
