
import { apiProxyService } from './apiProxyService';
import type { PlayerComparison } from '@/utils/ml/playerMLService';
import { professionalPlayers } from '@/types/training';

/**
 * خدمة للحصول على بيانات اللاعبين المحترفين ومقارنتهم
 */
export const professionalPlayerService = {
  /**
   * البحث عن لاعبين محترفين بالاسم
   */
  searchPlayers: async (name: string) => {
    try {
      return await apiProxyService.callTransferMarketApi('players/search', { name });
    } catch (error) {
      console.error('Error searching players:', error);
      throw error;
    }
  },
  
  /**
   * الحصول على بيانات لاعب محترف محدد
   */
  getPlayerDetails: async (playerId: string) => {
    try {
      return await apiProxyService.callTransferMarketApi(`players/${playerId}`);
    } catch (error) {
      console.error('Error getting player details:', error);
      throw error;
    }
  },
  
  /**
   * الحصول على لاعبين محترفين مشابهين بناءً على السمات
   */
  getSimilarPlayers: async (attributes: Record<string, number>, position?: string): Promise<PlayerComparison> => {
    // في وضع API حقيقي، سنستدعي Edge Function هنا
    // في هذه الحالة المبسطة، سنستخدم البيانات المحلية
    
    try {
      // محاولة استدعاء API للبحث عن لاعبين في الوضع الحقيقي
      // هذا قد ينجح إذا كان لديك مفاتيح API وإلا سيتم التعامل مع الخطأ
      const optaData = await apiProxyService.callOptaApi('players/similar', { 
        attributes: JSON.stringify(attributes),
        position
      }).catch(() => null);
      
      if (optaData) {
        return optaData;
      }
    } catch (error) {
      console.error('Error fetching similar players from API:', error);
      // سنستمر وسنعود إلى البيانات المحلية
    }
    
    // استخدام البيانات المحلية
    // فلترة اللاعبين حسب المركز
    const filteredPlayers = position 
      ? professionalPlayers.filter(player => player.position === position)
      : professionalPlayers;
    
    // اختيار عدد من اللاعبين عشوائيًا أو الأكثر تشابهًا
    const selectedPlayers = filteredPlayers
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
    
    // حساب مقاييس التشابه بناءً على السمات
    const technicalScore = attributes.technical || 70;
    const speedScore = attributes.speed || 65;
    const enduranceScore = attributes.endurance || 60;
    
    return {
      similarProfessionals: selectedPlayers,
      similarityMetrics: [
        { category: "Technical Ability", score: technicalScore, description: "Ball control and first touch capabilities." },
        { category: "Speed", score: speedScore, description: "Pace and acceleration on the field." },
        { category: "Endurance", score: enduranceScore, description: "Stamina and ability to maintain performance." },
        { category: "Positioning", score: attributes.balance || 68, description: "Understanding of spatial awareness on the pitch." },
        { category: "Decision Making", score: (attributes.efficiency || 60) + 5, description: "Speed and quality of decisions during play." }
      ]
    };
  },
  
  /**
   * الحصول على إحصائيات المنافسة لفريق أو لاعب
   */
  getCompetitionStats: async (competitionId: string, season: number) => {
    try {
      return await apiProxyService.callOptaApi(`competitions/${competitionId}/seasons/${season}/statistics`);
    } catch (error) {
      console.error('Error getting competition stats:', error);
      throw error;
    }
  }
};
