
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PositionSpecificAnalysisProps {
  position: string;
}

const PositionSpecificAnalysis: React.FC<PositionSpecificAnalysisProps> = ({ position }) => {
  // Mock data for testing
  const mockData = {
    positionSpecificMetrics: {
      defenderMetrics: {
        tacklesAttempted: 12,
        interceptionsAttempted: 8,
        clearancesAttempted: 6,
        defensePositioning: 78
      },
      midfielderMetrics: {
        passesAttempted: 45,
        passAccuracy: 82,
        ballControl: 75,
        visionScore: 72
      },
      attackerMetrics: {
        shotsAttempted: 8,
        shotsOnTarget: 5,
        dribbleAttempts: 12,
        dribbleSuccess: 8
      },
      goalkeeperMetrics: {
        savesAttempted: 6,
        saveSuccess: 4,
        distribution: 65,
        commandOfArea: 70
      }
    }
  };

  const data = mockData;
  const playerPosition = position.toLowerCase() as 'defender' | 'midfielder' | 'attacker' | 'goalkeeper';

  // Get the appropriate metrics based on player position
  const getMetrics = () => {
    const { positionSpecificMetrics } = data;
    
    if (playerPosition === 'defender' && positionSpecificMetrics.defenderMetrics) {
      return positionSpecificMetrics.defenderMetrics;
    } else if (playerPosition === 'midfielder' && positionSpecificMetrics.midfielderMetrics) {
      return positionSpecificMetrics.midfielderMetrics;
    } else if ((playerPosition === 'attacker' || playerPosition === 'forward') && positionSpecificMetrics.attackerMetrics) {
      return positionSpecificMetrics.attackerMetrics;
    } else if (playerPosition === 'goalkeeper' && positionSpecificMetrics.goalkeeperMetrics) {
      return positionSpecificMetrics.goalkeeperMetrics;
    }
    
    // Default to attacker metrics if position doesn't match
    return positionSpecificMetrics.attackerMetrics;
  };
  
  // Helper to render the metrics based on position
  const renderMetrics = () => {
    const metrics = getMetrics();
    
    if (!metrics) {
      return (
        <div className="text-center py-6 text-muted-foreground">
          بيانات غير متوفرة لهذا المركز
        </div>
      );
    }
    
    if (playerPosition === 'defender') {
      const defenderMetrics = metrics as any;
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              title="محاولات القطع"
              value={defenderMetrics.tacklesAttempted}
              valueType="count"
            />
            <MetricCard 
              title="اعتراضات الكرة"
              value={defenderMetrics.interceptionsAttempted}
              valueType="count"
            />
            <MetricCard 
              title="التشتيت"
              value={defenderMetrics.clearancesAttempted}
              valueType="count"
            />
            <MetricCard 
              title="التمركز الدفاعي"
              value={defenderMetrics.defensePositioning}
              valueType="score"
            />
          </div>
          <DefenderAnalysis metrics={defenderMetrics} />
        </div>
      );
    } 
    else if (playerPosition === 'midfielder') {
      const midfielderMetrics = metrics as any;
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              title="التمريرات"
              value={midfielderMetrics.passesAttempted}
              valueType="count"
            />
            <MetricCard 
              title="دقة التمرير"
              value={midfielderMetrics.passAccuracy}
              valueType="percentage"
            />
            <MetricCard 
              title="التحكم بالكرة"
              value={midfielderMetrics.ballControl}
              valueType="score"
            />
            <MetricCard 
              title="الرؤية"
              value={midfielderMetrics.visionScore}
              valueType="score"
            />
          </div>
          <MidfielderAnalysis metrics={midfielderMetrics} />
        </div>
      );
    }
    else if (playerPosition === 'attacker' || playerPosition === 'forward') {
      const attackerMetrics = metrics as any;
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              title="التسديدات"
              value={attackerMetrics.shotsAttempted}
              valueType="count"
            />
            <MetricCard 
              title="التسديدات على المرمى"
              value={attackerMetrics.shotsOnTarget}
              valueType="count"
            />
            <MetricCard 
              title="المراوغات"
              value={attackerMetrics.dribbleAttempts}
              valueType="count"
            />
            <MetricCard 
              title="نجاح المراوغات"
              value={attackerMetrics.dribbleSuccess}
              valueType="count"
            />
          </div>
          <AttackerAnalysis 
            metrics={attackerMetrics} 
            accuracy={attackerMetrics.shotsOnTarget / Math.max(1, attackerMetrics.shotsAttempted) * 100}
            dribbleSuccess={attackerMetrics.dribbleSuccess / Math.max(1, attackerMetrics.dribbleAttempts) * 100}
          />
        </div>
      );
    }
    else if (playerPosition === 'goalkeeper') {
      const goalkeeperMetrics = metrics as any;
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              title="تصديات"
              value={goalkeeperMetrics.savesAttempted}
              valueType="count"
            />
            <MetricCard 
              title="تصديات ناجحة"
              value={goalkeeperMetrics.saveSuccess}
              valueType="count"
            />
            <MetricCard 
              title="توزيع الكرة"
              value={goalkeeperMetrics.distribution}
              valueType="score"
            />
            <MetricCard 
              title="السيطرة على المنطقة"
              value={goalkeeperMetrics.commandOfArea}
              valueType="score"
            />
          </div>
          <GoalkeeperAnalysis 
            metrics={goalkeeperMetrics} 
            savePercentage={goalkeeperMetrics.saveSuccess / Math.max(1, goalkeeperMetrics.savesAttempted) * 100}
          />
        </div>
      );
    }
    
    return null;
  };
  
  // Get position title in Arabic
  const getPositionTitle = () => {
    switch (playerPosition) {
      case 'defender': return 'المدافع';
      case 'midfielder': return 'لاعب الوسط';
      case 'attacker': 
      case 'forward': return 'المهاجم';
      case 'goalkeeper': return 'حارس المرمى';
      default: return 'اللاعب';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          تحليل مركز {getPositionTitle()}
          <Badge variant="outline" className="mr-2 rtl:ml-2 rtl:mr-0 bg-primary/5">
            متخصص
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderMetrics()}
      </CardContent>
    </Card>
  );
};

// Reusable metric card component
interface MetricCardProps {
  title: string;
  value: number;
  valueType: 'count' | 'percentage' | 'score';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, valueType }) => {
  // Format the value based on type
  const formattedValue = () => {
    if (valueType === 'percentage') {
      return `${Math.round(value)}%`;
    } else if (valueType === 'score') {
      return `${Math.round(value)}/100`;
    }
    return Math.round(value);
  };
  
  // Determine the background color based on value and type
  const getBgClass = () => {
    if (valueType === 'count') return 'bg-primary/5';
    
    // For percentage or score, determine based on value
    if (value > 75) return 'bg-green-50 dark:bg-green-900/20';
    if (value > 50) return 'bg-blue-50 dark:bg-blue-900/20';
    if (value > 25) return 'bg-amber-50 dark:bg-amber-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };
  
  return (
    <div className={`rounded-lg p-3 ${getBgClass()}`}>
      <div className="text-xs text-muted-foreground mb-1">{title}</div>
      <div className="text-xl font-bold">{formattedValue()}</div>
    </div>
  );
};

// Position-specific analysis components
const DefenderAnalysis: React.FC<{
  metrics: any
}> = ({ metrics }) => {
  const getRating = (value: number) => {
    if (value >= 80) return { text: 'ممتاز', variant: 'high' as const };
    if (value >= 60) return { text: 'جيد', variant: 'medium' as const };
    return { text: 'متوسط', variant: 'low' as const };
  };
  
  const positioning = getRating(metrics.defensePositioning);
  
  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-2">التقييم التفصيلي</h4>
      <p className="text-sm text-muted-foreground mb-3">
        يتميز اللاعب بقدرات دفاعية {positioning.text} مع تركيز على 
        {metrics.tacklesAttempted > metrics.interceptionsAttempted ? ' القطع والتدخلات الدفاعية' : ' اعتراض الكرات وقطع التمريرات'}.
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge variant={positioning.variant}>التمركز {positioning.text}</Badge>
        {metrics.tacklesAttempted > 5 && <Badge variant="outline">مدافع قوي</Badge>}
        {metrics.interceptionsAttempted > 5 && <Badge variant="outline">قارئ جيد للعب</Badge>}
      </div>
    </div>
  );
};

const MidfielderAnalysis: React.FC<{
  metrics: any
}> = ({ metrics }) => {
  const getPassRating = (value: number) => {
    if (value >= 80) return { text: 'ممتازة', variant: 'high' as const };
    if (value >= 60) return { text: 'جيدة', variant: 'medium' as const };
    return { text: 'متوسطة', variant: 'low' as const };
  };
  
  const getControlRating = (value: number) => {
    if (value >= 75) return { text: 'ممتاز', variant: 'high' as const };
    if (value >= 50) return { text: 'جيد', variant: 'medium' as const };
    return { text: 'متوسط', variant: 'low' as const };
  };
  
  const getVisionRating = (value: number) => {
    if (value >= 80) return { text: 'ممتازة', variant: 'high' as const };
    if (value >= 60) return { text: 'جيدة', variant: 'medium' as const };
    return { text: 'متوسطة', variant: 'low' as const };
  };
  
  const passAccuracy = getPassRating(metrics.passAccuracy);
  const control = getControlRating(metrics.ballControl);
  const vision = getVisionRating(metrics.visionScore);
  
  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-2">التقييم التفصيلي</h4>
      <p className="text-sm text-muted-foreground mb-3">
        يتميز اللاعب بدقة تمرير {passAccuracy.text} وتحكم {control.text} في الكرة
        مع رؤية {vision.text} للملعب. {metrics.passesAttempted > 10 ? 'اللاعب يميل للتمريرات الكثيرة والمشاركة في بناء الهجمات.' : 'يفضل اللاعب اللعب المباشر مع عدد أقل من التمريرات.'}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge variant={passAccuracy.variant}>دقة التمرير {passAccuracy.text}</Badge>
        <Badge variant={control.variant}>التحكم {control.text}</Badge>
        <Badge variant={vision.variant}>الرؤية {vision.text}</Badge>
        {metrics.passesAttempted > 15 && <Badge variant="outline">صانع ألعاب</Badge>}
      </div>
    </div>
  );
};

const AttackerAnalysis: React.FC<{
  metrics: any,
  accuracy: number,
  dribbleSuccess: number
}> = ({ metrics, accuracy, dribbleSuccess }) => {
  const getAccuracyRating = (value: number) => {
    if (value >= 50) return { text: 'ممتازة', variant: 'high' as const };
    if (value >= 30) return { text: 'جيدة', variant: 'medium' as const };
    return { text: 'متوسطة', variant: 'low' as const };
  };
  
  const getDribbleRating = (value: number) => {
    if (value >= 70) return { text: 'ممتازة', variant: 'high' as const };
    if (value >= 50) return { text: 'جيدة', variant: 'medium' as const };
    return { text: 'متوسطة', variant: 'low' as const };
  };
  
  const shotAccuracy = getAccuracyRating(accuracy);
  const dribble = getDribbleRating(dribbleSuccess);
  
  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-2">التقييم التفصيلي</h4>
      <p className="text-sm text-muted-foreground mb-3">
        يتميز اللاعب بدقة تسديد {shotAccuracy.text} وقدرة {dribble.text} على المراوغة.
        {metrics.shotsAttempted > 5 ? ' يميل اللاعب للتسديد بشكل متكرر.' : ' يفضل اللاعب تمرير الكرة أكثر من التسديد.'}
        {metrics.dribbleAttempts > 8 ? ' كما يتميز بالمراوغة والمهارات الفردية العالية.' : ''}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge variant={shotAccuracy.variant}>دقة التسديد {shotAccuracy.text}</Badge>
        <Badge variant={dribble.variant}>المراوغة {dribble.text}</Badge>
        {metrics.shotsAttempted > 5 && metrics.shotsOnTarget / Math.max(1, metrics.shotsAttempted) > 0.4 && 
          <Badge variant="outline">هداف</Badge>
        }
        {metrics.dribbleAttempts > 8 && dribbleSuccess > 60 && 
          <Badge variant="outline">مراوغ ماهر</Badge>
        }
      </div>
    </div>
  );
};

const GoalkeeperAnalysis: React.FC<{
  metrics: any,
  savePercentage: number
}> = ({ metrics, savePercentage }) => {
  const getSaveRating = (value: number) => {
    if (value >= 75) return { text: 'ممتازة', variant: 'high' as const };
    if (value >= 60) return { text: 'جيدة', variant: 'medium' as const };
    return { text: 'متوسطة', variant: 'low' as const };
  };
  
  const getDistributionRating = (value: number) => {
    if (value >= 75) return { text: 'ممتاز', variant: 'high' as const };
    if (value >= 60) return { text: 'جيد', variant: 'medium' as const };
    return { text: 'متوسط', variant: 'low' as const };
  };
  
  const getCommandRating = (value: number) => {
    if (value >= 75) return { text: 'ممتازة', variant: 'high' as const };
    if (value >= 60) return { text: 'جيدة', variant: 'medium' as const };
    return { text: 'متوسطة', variant: 'low' as const };
  };
  
  const saves = getSaveRating(savePercentage);
  const distribution = getDistributionRating(metrics.distribution);
  const command = getCommandRating(metrics.commandOfArea);
  
  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-2">التقييم التفصيلي</h4>
      <p className="text-sm text-muted-foreground mb-3">
        يتميز الحارس بنسبة تصديات {saves.text} وتوزيع كرة {distribution.text}.
        يظهر سيطرة {command.text} على منطقة الجزاء و
        {metrics.savesAttempted > 5 ? ' قدرة عالية على التصدي للكرات الصعبة.' : ' تنظيم دفاعي جيد.'}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge variant={saves.variant}>التصديات {saves.text}</Badge>
        <Badge variant={distribution.variant}>التوزيع {distribution.text}</Badge>
        <Badge variant={command.variant}>السيطرة {command.text}</Badge>
        {savePercentage > 75 && <Badge variant="outline">حارس استثنائي</Badge>}
      </div>
    </div>
  );
};

export default PositionSpecificAnalysis;
