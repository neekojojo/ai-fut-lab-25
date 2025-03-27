
import { apiProxyService } from './apiProxyService';
import type { PlayerComparison } from '@/utils/ml/playerMLService';

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
    // في هذه الحالة المبسطة، سنجمع بعض البيانات الثابتة وسنعيد نتيجة
    
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
      // سنستمر وسنعود إلى البيانات الثابتة
    }
    
    // هذه البيانات الثابتة فقط للعرض التوضيحي
    const positionMappings = {
      'forward': [
        {
          name: "Lionel Messi",
          team: "Inter Miami",
          position: "forward",
          similarity: 83,
          strengths: ["Dribbling", "Vision", "Finishing"]
        },
        {
          name: "Mohamed Salah",
          team: "Liverpool",
          position: "forward",
          similarity: 78,
          strengths: ["Speed", "Finishing", "Technique"]
        },
        {
          name: "Kylian Mbappé",
          team: "Real Madrid",
          position: "forward",
          similarity: 75,
          strengths: ["Acceleration", "Finishing", "Pace"]
        }
      ],
      'midfielder': [
        {
          name: "Kevin De Bruyne",
          team: "Manchester City",
          position: "midfielder",
          similarity: 81,
          strengths: ["Vision", "Passing Range", "Set Pieces"]
        },
        {
          name: "Luka Modric",
          team: "Real Madrid",
          position: "midfielder",
          similarity: 79,
          strengths: ["Game Control", "First Touch", "Positioning"]
        },
        {
          name: "Bruno Fernandes",
          team: "Manchester United",
          position: "midfielder",
          similarity: 76,
          strengths: ["Creativity", "Shot Power", "Work Rate"]
        }
      ],
      'defender': [
        {
          name: "Virgil van Dijk",
          team: "Liverpool",
          position: "defender",
          similarity: 82,
          strengths: ["Aerial Ability", "Tackling", "Leadership"]
        },
        {
          name: "Rúben Dias",
          team: "Manchester City",
          position: "defender",
          similarity: 77,
          strengths: ["Positioning", "Tackling", "Physicality"]
        },
        {
          name: "Marquinhos",
          team: "Paris Saint-Germain",
          position: "defender",
          similarity: 75,
          strengths: ["Speed", "Positioning", "Tackles"]
        }
      ],
      'goalkeeper': [
        {
          name: "Alisson Becker",
          team: "Liverpool",
          position: "goalkeeper",
          similarity: 80,
          strengths: ["Reflexes", "One-on-one", "Distribution"]
        },
        {
          name: "Éderson",
          team: "Manchester City",
          position: "goalkeeper",
          similarity: 78,
          strengths: ["Distribution", "Sweeping", "Shot-stopping"]
        },
        {
          name: "Jan Oblak",
          team: "Atlético Madrid",
          position: "goalkeeper",
          similarity: 76,
          strengths: ["Positioning", "Reflexes", "Consistency"]
        }
      ]
    };

    // استخدام وضع اللاعب إذا تم تحديده، وإلا استخدام وضع افتراضي
    const players = positionMappings[position as keyof typeof positionMappings] || positionMappings.midfielder;
    
    // حساب مقاييس التشابه بناءً على السمات
    const technicalScore = attributes.technical || 70;
    const speedScore = attributes.speed || 65;
    const enduranceScore = attributes.endurance || 60;
    
    return {
      similarProfessionals: players,
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
