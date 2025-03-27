
import { supabase } from '@/integrations/supabase/client';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

// تحويل تحليل اللاعب من القاعدة إلى نموذج الواجهة
const mapToPlayerAnalysis = (dbAnalysis: any): PlayerAnalysis => {
  return {
    playerName: dbAnalysis.player_name,
    position: dbAnalysis.position || '',
    marketValue: '$' + (dbAnalysis.talent_score || 0) * 100000, // مجرد مثال لتحويل درجة الموهبة إلى قيمة سوقية
    talentScore: dbAnalysis.talent_score || 0,
    strengths: dbAnalysis.strengths || [],
    weaknesses: dbAnalysis.weaknesses || [],
    performance: {
      technical: dbAnalysis.technical_score || 0,
      physical: dbAnalysis.physical_score || 0,
      tactical: dbAnalysis.tactical_score || 0,
      mental: dbAnalysis.mental_score || 0
    },
    recommendations: dbAnalysis.recommendations || [],
    compatibilityScore: dbAnalysis.compatibility_score || 0
  };
};

// تحويل نموذج الواجهة إلى نموذج القاعدة
const mapToDbAnalysis = (analysis: PlayerAnalysis, userId: string) => {
  return {
    user_id: userId,
    player_name: analysis.playerName,
    position: analysis.position,
    talent_score: analysis.talentScore,
    technical_score: analysis.performance.technical,
    physical_score: analysis.performance.physical,
    tactical_score: analysis.performance.tactical,
    mental_score: analysis.performance.mental,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    recommendations: analysis.recommendations,
    compatibility_score: analysis.compatibilityScore
  };
};

export const fetchPlayerAnalyses = async (): Promise<PlayerAnalysis[]> => {
  const { data, error } = await supabase
    .from('player_analyses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching player analyses:', error);
    throw new Error(error.message);
  }

  return (data || []).map(mapToPlayerAnalysis);
};

export const fetchPlayerAnalysisById = async (id: string): Promise<PlayerAnalysis> => {
  const { data, error } = await supabase
    .from('player_analyses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching player analysis:', error);
    throw new Error(error.message);
  }

  return mapToPlayerAnalysis(data);
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
