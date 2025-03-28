
import { IdentifiedPlayer } from '../playerIdentification';
import { DetectionResult } from '../types';
import { kagglePlayerDatabase } from './mockData';

/**
 * البحث عن لاعب في قاعدة بيانات Kaggle استناداً إلى الاسم
 */
export const searchKagglePlayersByName = (name: string): IdentifiedPlayer[] => {
  // بحث بسيط عن اسم اللاعب
  const matchingPlayers = kagglePlayerDatabase.filter(
    player => player.name.toLowerCase().includes(name.toLowerCase())
  );
  
  // تحويل النتائج إلى النسق المطلوب
  return matchingPlayers.map(player => ({
    id: player.player_id,
    name: player.name,
    team: player.team,
    position: player.position,
    nationality: player.nationality,
    rating: player.overall_rating,
    confidenceScore: 0.9
  }));
};

/**
 * البحث عن لاعب في قاعدة بيانات Kaggle استناداً إلى خصائص الفيديو
 */
export const identifyPlayerFromKaggle = (result: DetectionResult): IdentifiedPlayer[] => {
  // عادةً سنستخدم معالجة أكثر تعقيدًا هنا للمقارنة بين بيانات الكشف وقاعدة البيانات
  // للعرض التوضيحي، سنعود بمجرد عينة من اللاعبين
  
  const candidates = [...kagglePlayerDatabase]
    .sort(() => 0.5 - Math.random()) // ترتيب عشوائي
    .slice(0, 3) // أخذ أول ثلاثة لاعبين
    .map((player, index) => {
      // إنشاء درجة ثقة وهمية مع تناقص حسب الترتيب
      const confidenceScores = [0.92, 0.85, 0.79];
      
      return {
        id: player.player_id,
        name: player.name,
        team: player.team,
        position: player.position,
        nationality: player.nationality,
        rating: player.overall_rating,
        confidenceScore: confidenceScores[index]
      };
    });
  
  return candidates;
};

/**
 * تحويل بيانات لاعب من صيغة Kaggle إلى صيغة IdentifiedPlayer
 */
export const convertKaggleToIdentifiedPlayer = (kagglePlayer: any): IdentifiedPlayer => {
  return {
    id: kagglePlayer.player_id,
    name: kagglePlayer.name,
    team: kagglePlayer.team,
    position: kagglePlayer.position,
    nationality: kagglePlayer.nationality,
    rating: kagglePlayer.overall_rating,
    confidenceScore: 0.9
  };
};
