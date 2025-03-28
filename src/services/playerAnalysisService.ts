
import { supabase } from '@/integrations/supabase/client';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

// تحويل تحليل اللاعب من القاعدة إلى نموذج الواجهة
const mapToPlayerAnalysis = (dbAnalysis: any): PlayerAnalysis => {
  // Calculate talent score-based market value with some randomness for variation
  const talentScore = dbAnalysis.talent_score || Math.floor(Math.random() * 30) + 60;
  const baseValue = (talentScore * 10000) + (Math.random() * 50000);
  const formattedValue = '$' + Math.floor(baseValue).toLocaleString();
  
  return {
    id: dbAnalysis.id || '',
    playerId: dbAnalysis.user_id || '',
    playerName: dbAnalysis.player_name,
    position: dbAnalysis.position || '',
    timestamp: dbAnalysis.created_at || new Date().toISOString(),
    duration: dbAnalysis.duration || 0,
    confidence: dbAnalysis.confidence || 0.8,
    marketValue: formattedValue,
    talentScore: talentScore,
    strengths: dbAnalysis.strengths || [],
    weaknesses: dbAnalysis.weaknesses || [],
    performance: {
      technical: dbAnalysis.technical_score || 0,
      physical: dbAnalysis.physical_score || 0,
      tactical: dbAnalysis.tactical_score || 0,
      mental: dbAnalysis.mental_score || 0
    },
    stats: {
      pace: dbAnalysis.physical_score || 70,
      shooting: dbAnalysis.technical_score || 70,
      passing: dbAnalysis.technical_score || 70,
      dribbling: dbAnalysis.technical_score || 70,
      defending: dbAnalysis.tactical_score || 70,
      physical: dbAnalysis.physical_score || 70,
      stamina: dbAnalysis.physical_score || 70,
      acceleration: dbAnalysis.physical_score || 70,
      agility: dbAnalysis.physical_score || 70,
      balance: dbAnalysis.physical_score || 70,
      ballControl: dbAnalysis.technical_score || 70,
      decision: dbAnalysis.tactical_score || 70,
      anticipation: dbAnalysis.tactical_score || 70,
      positioning: dbAnalysis.tactical_score || 70,
      vision: dbAnalysis.tactical_score || 70,
      composure: dbAnalysis.mental_score || 70
    },
    recommendations: dbAnalysis.recommendations || [],
    compatibilityScore: dbAnalysis.compatibility_score || 0,
    summary: dbAnalysis.summary || '',
    advancedInsights: [],
    movements: generateMockMovements(),
    passes: generateMockPasses(),
    heatmap: generateMockHeatmap(),
    performanceScore: dbAnalysis.technical_score || 0
  };
};

// توليد بيانات حركة افتراضية للاعب
const generateMockMovements = () => {
  const movements = [];
  for (let i = 0; i < 20; i++) {
    movements.push({
      timestamp: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      speed: 5 + Math.random() * 15,
      acceleration: Math.random() * 5,
      direction: Math.random() * 360,
      isActive: Math.random() > 0.2
    });
  }
  return movements;
};

// توليد بيانات تمريرات افتراضية
const generateMockPasses = () => {
  const passes = [];
  for (let i = 0; i < 10; i++) {
    passes.push({
      timestamp: i * 5,
      fromX: Math.random() * 100,
      fromY: Math.random() * 70,
      toX: Math.random() * 100,
      toY: Math.random() * 70,
      successful: Math.random() > 0.3,
      type: Math.random() > 0.5 ? 'short' : 'long'
    });
  }
  return passes;
};

// توليد بيانات خريطة حرارية افتراضية
const generateMockHeatmap = () => {
  const heatmap = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 7; j++) {
      heatmap.push({
        x: i * 10,
        y: j * 10,
        value: Math.random()
      });
    }
  }
  return heatmap;
};

// تحويل نموذج الواجهة إلى نموذج القاعدة
const mapToDbAnalysis = (analysis: PlayerAnalysis, userId: string) => {
  return {
    user_id: userId,
    player_name: analysis.playerName,
    position: analysis.position,
    talent_score: analysis.talentScore,
    technical_score: analysis.performance?.technical,
    physical_score: analysis.performance?.physical,
    tactical_score: analysis.performance?.tactical,
    mental_score: analysis.performance?.mental,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    recommendations: analysis.recommendations,
    compatibility_score: analysis.compatibilityScore
  };
};

// إنشاء تحليل افتراضي للعرض عندما لا يتوفر تحليل
const createMockAnalysis = (id: string): PlayerAnalysis => {
  const playerNames = ["محمد صلاح", "كريم بنزيما", "خالد الدوسري", "أحمد موسى", "عمر السومة"];
  const positions = ["مهاجم", "وسط", "مدافع", "حارس مرمى", "جناح"];
  const randomIndex = Math.floor(Math.random() * playerNames.length);
  
  return {
    id: id,
    playerId: `player-${id}`,
    playerName: playerNames[randomIndex],
    position: positions[randomIndex],
    timestamp: new Date().toISOString(),
    duration: 120,
    confidence: 0.85,
    videoUrl: "",
    thumbnailUrl: "",
    marketValue: "$750,000",
    talentScore: 78,
    strengths: ["سرعة عالية", "تمرير دقيق", "رؤية ممتازة للملعب"],
    weaknesses: ["ضعف في التسديد من بعيد", "بحاجة لتحسين اللياقة البدنية"],
    summary: "لاعب واعد يتمتع بمهارات فنية عالية وقدرات بدنية جيدة",
    advancedInsights: ["يظهر قدرات استثنائية في المراوغة", "يمكنه تحسين عملية اتخاذ القرار"],
    recommendations: ["تمارين لتحسين اللياقة البدنية", "تدريبات على التسديد البعيد", "تعزيز الثقة بالنفس"],
    performanceScore: 82,
    compatibilityScore: 85,
    performance: {
      technical: 80,
      physical: 75,
      tactical: 78,
      mental: 82
    },
    stats: {
      pace: 85,
      shooting: 72,
      passing: 83,
      dribbling: 87,
      defending: 70,
      physical: 75,
      stamina: 78,
      acceleration: 88,
      agility: 82,
      balance: 76,
      ballControl: 84,
      decision: 77,
      anticipation: 75,
      positioning: 80,
      vision: 82,
      composure: 79
    },
    movements: generateMockMovements(),
    passes: generateMockPasses(),
    heatmap: generateMockHeatmap(),
    age: 23,
    country: "المملكة العربية السعودية",
    city: "الرياض",
    height: "١٨٥ سم",
    weight: "٧٩ كغ",
    preferredFoot: "Right"
  };
};

export const fetchPlayerAnalyses = async (): Promise<PlayerAnalysis[]> => {
  try {
    const { data, error } = await supabase
      .from('player_analyses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching player analyses:', error);
      // في حالة الخطأ، نعيد قائمة تحليلات افتراضية
      return [createMockAnalysis('mock-1'), createMockAnalysis('mock-2')];
    }

    return (data || []).map(mapToPlayerAnalysis);
  } catch (error) {
    console.error('Error in fetchPlayerAnalyses:', error);
    // في حالة حدوث خطأ غير متوقع، نعيد قائمة تحليلات افتراضية
    return [createMockAnalysis('mock-1'), createMockAnalysis('mock-2')];
  }
};

export const fetchPlayerAnalysisById = async (id: string): Promise<PlayerAnalysis> => {
  try {
    const { data, error } = await supabase
      .from('player_analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching player analysis:', error);
      // في حالة الخطأ، نعيد تحليل افتراضي بنفس المعرف
      return createMockAnalysis(id);
    }

    return mapToPlayerAnalysis(data);
  } catch (error) {
    console.error('Error in fetchPlayerAnalysisById:', error);
    // في حالة حدوث خطأ غير متوقع، نعيد تحليل افتراضي
    return createMockAnalysis(id);
  }
};

export const savePlayerAnalysis = async (analysis: PlayerAnalysis, userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from('player_analyses')
    .insert(mapToDbAnalysis(analysis, userId))
    .select('id')
    .single();

  if (error) {
    console.error('Error saving player analysis:', error);
    throw new Error(error.message);
  }

  return data.id;
};

export const updatePlayerAnalysis = async (id: string, analysis: PlayerAnalysis, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('player_analyses')
    .update(mapToDbAnalysis(analysis, userId))
    .eq('id', id);

  if (error) {
    console.error('Error updating player analysis:', error);
    throw new Error(error.message);
  }
};

export const deletePlayerAnalysis = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('player_analyses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting player analysis:', error);
    throw new Error(error.message);
  }
};
