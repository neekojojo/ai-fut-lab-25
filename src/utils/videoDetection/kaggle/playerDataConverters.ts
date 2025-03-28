
import { IdentifiedPlayer } from '../playerIdentification';
import { DetectionResult } from '../types';
import { KagglePlayerData } from './types';
import { kagglePlayerDatabase } from './mockData';

/**
 * تحويل بيانات لاعب Kaggle إلى تنسيق IdentifiedPlayer
 */
export const convertKaggleToIdentifiedPlayer = (player: KagglePlayerData): IdentifiedPlayer => {
  return {
    id: player.player_id,
    name: player.name,
    team: player.team,
    nationality: player.nationality,
    position: player.position,
    number: "", // بيانات Kaggle لا تشمل رقم اللاعب عادة
    confidenceScore: 0.95, // افتراض درجة ثقة عالية لبيانات Kaggle
    physicalAttributes: {
      height: player.height_cm,
      weight: player.weight_kg,
      speed: player.pace,
      agility: player.dribbling,
      stamina: player.physic
    }
  };
};

/**
 * البحث عن لاعبين في قاعدة بيانات Kaggle
 */
export const searchKagglePlayersByName = (name: string): IdentifiedPlayer[] => {
  // بحث بسيط عن اسم اللاعب
  const matchingPlayers = kagglePlayerDatabase.filter(
    player => player.name.toLowerCase().includes(name.toLowerCase())
  );
  
  // تحويل النتائج إلى النسق المطلوب
  return matchingPlayers.map(player => convertKaggleToIdentifiedPlayer(player));
};

/**
 * البحث عن لاعبين في قاعدة بيانات Kaggle استناداً إلى خصائص الفيديو
 */
export const identifyPlayerFromKaggle = (result: DetectionResult): IdentifiedPlayer[] => {
  // عادةً سنستخدم معالجة أكثر تعقيدًا هنا للمقارنة بين بيانات الكشف وقاعدة البيانات
  // للعرض التوضيحي، سنعود بمجرد عينة من اللاعبين
  
  const candidates = [...kagglePlayerDatabase]
    .sort(() => 0.5 - Math.random()) // ترتيب عشوائي
    .slice(0, 3) // أخذ أول 3 لاعبين
    .map((player, index) => {
      // إنشاء درجة ثقة وهمية مع تناقص حسب الترتيب
      const confidenceScores = [0.92, 0.78, 0.65];
      
      return {
        ...convertKaggleToIdentifiedPlayer(player),
        confidenceScore: confidenceScores[index]
      };
    });
  
  return candidates;
};
