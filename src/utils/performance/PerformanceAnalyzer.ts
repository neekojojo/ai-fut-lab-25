
import { MovementAnalysisResult } from '../videoDetection/movementAnalysis';
import { PlayerPosition } from '../videoDetection/types';

export interface PerformanceMetrics {
  // مقاييس أساسية
  pace: number;
  acceleration: number;
  stamina: number;
  agility: number;
  balance: number;
  
  // مقاييس تكتيكية
  positioning: number;
  movement: number;
  awareness: number;
  decisionMaking: number;
  
  // مقاييس تقنية
  ballControl: number;
  technique: number;
  
  // مقاييس كلية
  overall: number;
  
  // بيانات تفصيلية
  details: {
    heatmapWeight: number;
    sprintQuality: number;
    movementEfficiency: number;
    positioningAccuracy: number;
    energyEfficiency: number;
  };
}

export class PerformanceAnalyzer {
  /**
   * تحليل أداء اللاعب بناءً على نتائج تحليل الحركة
   */
  public static analyzeTechnicalPerformance(
    movementAnalysis: MovementAnalysisResult,
    positions: PlayerPosition[]
  ): PerformanceMetrics {
    // 1. تحليل مقاييس السرعة
    const paceScore = this.calculatePaceScore(movementAnalysis);
    const accelerationScore = this.calculateAccelerationScore(movementAnalysis);
    
    // 2. تحليل القدرة على التحمل
    const staminaScore = this.calculateStaminaScore(movementAnalysis, positions);
    
    // 3. تحليل الرشاقة والتوازن
    const agilityScore = this.calculateAgilityScore(movementAnalysis);
    const balanceScore = this.calculateBalanceScore(movementAnalysis);
    
    // 4. تحليل التموضع والحركة
    const positioningScore = this.calculatePositioningScore(movementAnalysis);
    const movementScore = this.calculateMovementScore(movementAnalysis);
    
    // 5. تحليل الوعي واتخاذ القرار
    const awarenessScore = this.calculateAwarenessScore(movementAnalysis);
    const decisionMakingScore = this.calculateDecisionMakingScore(movementAnalysis);
    
    // 6. تحليل التحكم بالكرة والتقنية (محاكاة بدون بيانات الكرة)
    const ballControlScore = this.calculateBallControlScore(movementAnalysis, positions);
    const techniqueScore = this.calculateTechniqueScore(movementAnalysis, positions);
    
    // 7. حساب النتيجة الإجمالية
    const overall = this.calculateOverallScore({
      pace: paceScore,
      acceleration: accelerationScore,
      stamina: staminaScore,
      agility: agilityScore,
      balance: balanceScore,
      positioning: positioningScore,
      movement: movementScore,
      awareness: awarenessScore,
      decisionMaking: decisionMakingScore,
      ballControl: ballControlScore,
      technique: techniqueScore,
      overall: 0,
      details: {
        heatmapWeight: 0,
        sprintQuality: 0,
        movementEfficiency: 0,
        positioningAccuracy: 0,
        energyEfficiency: 0
      }
    });
    
    // تفاصيل إضافية للتحليل
    const details = {
      heatmapWeight: this.calculateHeatmapWeight(movementAnalysis),
      sprintQuality: this.calculateSprintQuality(movementAnalysis),
      movementEfficiency: movementAnalysis.movementEfficiency,
      positioningAccuracy: positioningScore * 0.8 + awarenessScore * 0.2,
      energyEfficiency: this.calculateEnergyEfficiency(movementAnalysis)
    };
    
    return {
      pace: paceScore,
      acceleration: accelerationScore,
      stamina: staminaScore,
      agility: agilityScore,
      balance: balanceScore,
      positioning: positioningScore,
      movement: movementScore,
      awareness: awarenessScore,
      decisionMaking: decisionMakingScore,
      ballControl: ballControlScore,
      technique: techniqueScore,
      overall,
      details
    };
  }
  
  // حساب درجة السرعة بناءً على السرعة القصوى والمتوسطة
  private static calculatePaceScore(analysis: MovementAnalysisResult): number {
    const maxSpeedWeight = 0.7;
    const avgSpeedWeight = 0.3;
    
    // افتراضياً أن أقصى سرعة ممكنة هي 30 وحدة/ثانية (للمقياس)
    const normalizedMaxSpeed = Math.min(1, analysis.maxSpeed / 30) * 100;
    const normalizedAvgSpeed = Math.min(1, analysis.averageSpeed / 15) * 100;
    
    return Math.round(
      normalizedMaxSpeed * maxSpeedWeight + 
      normalizedAvgSpeed * avgSpeedWeight
    );
  }
  
  // حساب درجة التسارع
  private static calculateAccelerationScore(analysis: MovementAnalysisResult): number {
    const maxAccelerationWeight = 0.6;
    const sprintCountWeight = 0.4;
    
    // افتراضياً أن أقصى تسارع ممكن هو 10 وحدة/ثانية² (للمقياس)
    const normalizedMaxAcceleration = Math.min(1, analysis.maxAcceleration / 10) * 100;
    
    // افتراضياً أن أقصى عدد تسارعات هو 20 (للمقياس)
    const normalizedSprintCount = Math.min(1, analysis.sprintCount / 20) * 100;
    
    return Math.round(
      normalizedMaxAcceleration * maxAccelerationWeight + 
      normalizedSprintCount * sprintCountWeight
    );
  }
  
  // حساب درجة التحمل بناءً على المسافة الكلية والمناطق السرعة
  private static calculateStaminaScore(
    analysis: MovementAnalysisResult, 
    positions: PlayerPosition[]
  ): number {
    const totalDistanceWeight = 0.5;
    const sprintingRatioWeight = 0.3;
    const positionCountWeight = 0.2;
    
    // افتراضياً أن أقصى مسافة ممكنة هي 1000 وحدة (للمقياس)
    const normalizedDistance = Math.min(1, analysis.totalDistance / 1000) * 100;
    
    // حساب نسبة الجري السريع والسريع جداً (مقياس للقدرة على التحمل)
    const highIntensityRatio = analysis.speedZones.running + analysis.speedZones.sprinting;
    const normalizedHighIntensityRatio = Math.min(1, highIntensityRatio / 0.3) * 100;
    
    // عدد البيانات يعكس طول فترة التحليل (مقياس للقدرة على التحمل)
    const normalizedPositionCount = Math.min(1, positions.length / 100) * 100;
    
    return Math.round(
      normalizedDistance * totalDistanceWeight + 
      normalizedHighIntensityRatio * sprintingRatioWeight + 
      normalizedPositionCount * positionCountWeight
    );
  }
  
  // حساب درجة الرشاقة بناءً على تغييرات الاتجاه
  private static calculateAgilityScore(analysis: MovementAnalysisResult): number {
    const directionChangesWeight = 0.7;
    const speedVariationWeight = 0.3;
    
    // افتراضياً أن أقصى عدد تغييرات اتجاه هو 30 (للمقياس)
    const normalizedDirectionChanges = Math.min(1, analysis.directionChanges / 30) * 100;
    
    // تباين السرعة يمكن استنتاجه من نسب مناطق السرعة المختلفة
    const speedVariation = 
      Math.abs(analysis.speedZones.walking - 0.25) + 
      Math.abs(analysis.speedZones.jogging - 0.25) + 
      Math.abs(analysis.speedZones.running - 0.25) + 
      Math.abs(analysis.speedZones.sprinting - 0.25);
    
    // قيمة أقل تعني توزيع أفضل بين مناطق السرعة (دليل على الرشاقة)
    const normalizedSpeedVariation = 100 - (speedVariation * 100);
    
    return Math.round(
      normalizedDirectionChanges * directionChangesWeight + 
      normalizedSpeedVariation * speedVariationWeight
    );
  }
  
  // حساب درجة التوازن (مستمد من كفاءة الحركة)
  private static calculateBalanceScore(analysis: MovementAnalysisResult): number {
    // كفاءة الحركة تعكس جزئياً التوازن الجيد أثناء الحركة
    const efficiencyWeight = 0.6;
    
    // السرعات العالية مع تغييرات الاتجاه تتطلب توازناً جيداً
    const highSpeedDirectionChangeWeight = 0.4;
    
    // نستخدم كفاءة الحركة كمقياس للتوازن
    const normalizedEfficiency = analysis.movementEfficiency;
    
    // حساب مؤشر التوازن أثناء السرعات العالية
    const highSpeedRatio = analysis.speedZones.running + analysis.speedZones.sprinting;
    const highSpeedDirectionChanges = analysis.directionChanges * highSpeedRatio;
    const normalizedHighSpeedChanges = Math.min(1, highSpeedDirectionChanges / 15) * 100;
    
    return Math.round(
      normalizedEfficiency * efficiencyWeight + 
      normalizedHighSpeedChanges * highSpeedDirectionChangeWeight
    );
  }
  
  // حساب درجة التموضع
  private static calculatePositioningScore(analysis: MovementAnalysisResult): number {
    // نستخدم توزيع الحرارة كمؤشر على جودة التموضع
    const heatmapCoverageWeight = 0.5;
    
    // كفاءة الحركة تعكس جودة التموضع
    const movementEfficiencyWeight = 0.5;
    
    // حساب تغطية خريطة الحرارة (نسبة المناطق المغطاة)
    const heatmapCoverage = analysis.positionalHeatmap.length / 400; // افتراضياً 20×20 شبكة
    const normalizedHeatmapCoverage = 100 - (Math.min(1, heatmapCoverage) * 100); // قيمة أقل = تركيز أفضل
    
    return Math.round(
      normalizedHeatmapCoverage * heatmapCoverageWeight + 
      analysis.movementEfficiency * movementEfficiencyWeight
    );
  }
  
  // حساب درجة الحركة
  private static calculateMovementScore(analysis: MovementAnalysisResult): number {
    const efficiencyWeight = 0.4;
    const directionChangesWeight = 0.3;
    const sprintingRatioWeight = 0.3;
    
    // كفاءة الحركة
    const normalizedEfficiency = analysis.movementEfficiency;
    
    // تغييرات الاتجاه المناسبة (ليست كثيرة جداً ولا قليلة جداً)
    const optimalDirectionChanges = 15; // القيمة المثالية المفترضة
    const directionChangeDifference = Math.abs(analysis.directionChanges - optimalDirectionChanges);
    const normalizedDirectionChanges = 100 - Math.min(100, directionChangeDifference * 3);
    
    // نسبة الجري (لا تكون عالية أو منخفضة جداً)
    const optimalSprintingRatio = 0.1; // القيمة المثالية المفترضة
    const sprintingDifference = Math.abs(analysis.speedZones.sprinting - optimalSprintingRatio);
    const normalizedSprinting = 100 - Math.min(100, sprintingDifference * 500);
    
    return Math.round(
      normalizedEfficiency * efficiencyWeight + 
      normalizedDirectionChanges * directionChangesWeight + 
      normalizedSprinting * sprintingRatioWeight
    );
  }
  
  // حساب درجة الوعي (مستمد غالباً من التموضع وتغييرات الاتجاه)
  private static calculateAwarenessScore(analysis: MovementAnalysisResult): number {
    // في نظام حقيقي، سيكون هذا مبنياً على تحليل حركة العين وتتبع الرأس
    // هنا نستخدم مؤشرات غير مباشرة للوعي
    
    const movementEfficiencyWeight = 0.4;
    const positioningWeight = 0.3;
    const directionChangesWeight = 0.3;
    
    // كفاءة الحركة العالية تشير إلى وعي جيد بالمساحات
    const normalizedEfficiency = analysis.movementEfficiency;
    
    // التأثير على الاستحواذ (في نظام حقيقي سيكون مستمداً من بيانات الكرة)
    const normalizedPossessionImpact = analysis.possessionImpact;
    
    // تغييرات الاتجاه المدروسة (مؤشر على الوعي الجيد)
    const normalizedDirectionChanges = Math.min(100, analysis.directionChanges * 3);
    
    return Math.round(
      normalizedEfficiency * movementEfficiencyWeight + 
      normalizedPossessionImpact * positioningWeight + 
      normalizedDirectionChanges * directionChangesWeight
    );
  }
  
  // حساب درجة اتخاذ القرار
  private static calculateDecisionMakingScore(analysis: MovementAnalysisResult): number {
    // في نظام حقيقي، هذا سيعتمد على تحليل الخيارات المتاحة واختيارات اللاعب
    // هنا نستخدم مؤشرات غير مباشرة لاتخاذ القرار
    
    const efficiencyWeight = 0.5;
    const sprintTimingWeight = 0.5;
    
    // كفاءة الحركة العالية تشير إلى قرارات جيدة
    const normalizedEfficiency = analysis.movementEfficiency;
    
    // توقيت التسارعات (مؤشر على اتخاذ القرار)
    // افتراضياً أن العدد المثالي للتسارعات هو 10
    const optimalSprintCount = 10;
    const sprintCountDifference = Math.abs(analysis.sprintCount - optimalSprintCount);
    const normalizedSprintTiming = 100 - Math.min(100, sprintCountDifference * 5);
    
    return Math.round(
      normalizedEfficiency * efficiencyWeight + 
      normalizedSprintTiming * sprintTimingWeight
    );
  }
  
  // حساب درجة التحكم بالكرة (محاكاة بدون بيانات الكرة الفعلية)
  private static calculateBallControlScore(
    analysis: MovementAnalysisResult, 
    positions: PlayerPosition[]
  ): number {
    // في نظام حقيقي، هذا سيعتمد على تحليل لمسات الكرة والاستحواذ
    // هنا نستخدم مؤشرات غير مباشرة للتحكم بالكرة
    
    // محاكاة درجة التحكم بالكرة بناءً على مؤشرات الحركة
    const movementEfficiencyWeight = 0.4;
    const balanceWeight = 0.3;
    const sprintingRatioWeight = 0.3;
    
    // كفاءة الحركة (مؤشر على التحكم الجيد)
    const normalizedEfficiency = analysis.movementEfficiency;
    
    // التوازن الجيد يساعد على التحكم بالكرة
    const balanceScore = this.calculateBalanceScore(analysis);
    
    // نسبة الجري البطيء (يساعد على التحكم الدقيق بالكرة)
    const controlSpeedRatio = analysis.speedZones.walking + analysis.speedZones.jogging;
    const normalizedControlSpeed = Math.min(1, controlSpeedRatio / 0.6) * 100;
    
    return Math.round(
      normalizedEfficiency * movementEfficiencyWeight + 
      balanceScore * balanceWeight + 
      normalizedControlSpeed * sprintingRatioWeight
    );
  }
  
  // حساب درجة التقنية (محاكاة بدون بيانات التقنية الفعلية)
  private static calculateTechniqueScore(
    analysis: MovementAnalysisResult, 
    positions: PlayerPosition[]
  ): number {
    // في نظام حقيقي، هذا سيعتمد على تحليل المهارات التقنية
    // هنا نستخدم مؤشرات غير مباشرة للتقنية
    
    const ballControlWeight = 0.4;
    const movementSmoothness = 0.3;
    const positioningWeight = 0.3;
    
    // التحكم بالكرة (كما تم حسابه سابقاً)
    const ballControlScore = this.calculateBallControlScore(analysis, positions);
    
    // نعومة الحركة (مؤشر على التقنية الجيدة)
    const avgScore = this.calculateAgilityScore(analysis);
    const balanceScore = this.calculateBalanceScore(analysis);
    const movementSmoothnessScore = (avgScore + balanceScore) / 2;
    
    // التموضع (يعكس الفهم التقني للعبة)
    const positioningScore = this.calculatePositioningScore(analysis);
    
    return Math.round(
      ballControlScore * ballControlWeight + 
      movementSmoothnessScore * movementSmoothness + 
      positioningScore * positioningWeight
    );
  }
  
  // حساب النتيجة الإجمالية
  private static calculateOverallScore(metrics: PerformanceMetrics): number {
    // وزن كل مجموعة من المقاييس
    const physicalWeight = 0.4; // السرعة، التسارع، التحمل، الرشاقة، التوازن
    const tacticalWeight = 0.3; // التموضع، الحركة، الوعي، اتخاذ القرار
    const technicalWeight = 0.3; // التحكم بالكرة، التقنية
    
    // حساب متوسط المقاييس الجسدية
    const physicalAvg = (
      metrics.pace +
      metrics.acceleration +
      metrics.stamina +
      metrics.agility +
      metrics.balance
    ) / 5;
    
    // حساب متوسط المقاييس التكتيكية
    const tacticalAvg = (
      metrics.positioning +
      metrics.movement +
      metrics.awareness +
      metrics.decisionMaking
    ) / 4;
    
    // حساب متوسط المقاييس التقنية
    const technicalAvg = (
      metrics.ballControl +
      metrics.technique
    ) / 2;
    
    // حساب النتيجة الإجمالية المرجحة
    return Math.round(
      physicalAvg * physicalWeight +
      tacticalAvg * tacticalWeight +
      technicalAvg * technicalWeight
    );
  }
  
  // حساب وزن خريطة الحرارة (مؤشر على جودة تغطية المساحات)
  private static calculateHeatmapWeight(analysis: MovementAnalysisResult): number {
    // حساب عدد المناطق ذات القيمة العالية (>0.5)
    const highValueAreas = analysis.positionalHeatmap.filter(point => point.value > 0.5).length;
    
    // حساب مؤشر تركيز الحرارة
    const heatFocus = highValueAreas / Math.max(1, analysis.positionalHeatmap.length);
    
    // قيمة أعلى = تركيز أفضل
    return Math.min(100, heatFocus * 200);
  }
  
  // حساب جودة التسارعات
  private static calculateSprintQuality(analysis: MovementAnalysisResult): number {
    // مزيج من عدد التسارعات ونسبة السرعة القصوى
    const sprintRatio = analysis.speedZones.sprinting;
    const sprintCount = analysis.sprintCount;
    
    // حساب المؤشر المركب
    const sprintQualityIndex = (sprintCount * 5) + (sprintRatio * 100);
    
    // تطبيع القيمة إلى نطاق 0-100
    return Math.min(100, sprintQualityIndex);
  }
  
  // حساب كفاءة استخدام الطاقة
  private static calculateEnergyEfficiency(analysis: MovementAnalysisResult): number {
    // كفاءة الطاقة تعتمد على:
    // 1. كفاءة الحركة (مسار مباشر)
    // 2. توزيع متوازن للسرعات (عدم الإفراط في السرعات العالية)
    // 3. توقيت جيد للتسارعات
    
    const movementEfficiencyWeight = 0.4;
    const speedDistributionWeight = 0.3;
    const sprintTimingWeight = 0.3;
    
    // كفاءة الحركة
    const normalizedEfficiency = analysis.movementEfficiency;
    
    // توزيع متوازن للسرعات
    // المثالي: مشي 40%، هرولة 40%، جري 15%، سرعة قصوى 5%
    const optimalDistribution = {
      walking: 0.4,
      jogging: 0.4,
      running: 0.15,
      sprinting: 0.05
    };
    
    const speedDistributionError = 
      Math.abs(analysis.speedZones.walking - optimalDistribution.walking) +
      Math.abs(analysis.speedZones.jogging - optimalDistribution.jogging) +
      Math.abs(analysis.speedZones.running - optimalDistribution.running) +
      Math.abs(analysis.speedZones.sprinting - optimalDistribution.sprinting);
    
    const normalizedSpeedDistribution = 100 - Math.min(100, speedDistributionError * 100);
    
    // توقيت التسارعات (عدد مناسب من التسارعات)
    const optimalSprintCount = 8;
    const sprintCountError = Math.abs(analysis.sprintCount - optimalSprintCount);
    const normalizedSprintTiming = 100 - Math.min(100, sprintCountError * 5);
    
    return Math.round(
      normalizedEfficiency * movementEfficiencyWeight +
      normalizedSpeedDistribution * speedDistributionWeight +
      normalizedSprintTiming * sprintTimingWeight
    );
  }
}
