
import { IdentifiedTeam } from '../playerIdentification';
import { DetectionResult } from '../types';
import { kaggleTeamDatabase } from './mockData';

/**
 * البحث عن فريق في قاعدة بيانات Kaggle استناداً إلى الاسم
 */
export const searchKaggleTeamsByName = (name: string): IdentifiedTeam[] => {
  // بحث بسيط عن اسم الفريق
  const matchingTeams = kaggleTeamDatabase.filter(
    team => team.name.toLowerCase().includes(name.toLowerCase())
  );
  
  // تحويل النتائج إلى النسق المطلوب
  return matchingTeams.map(team => ({
    id: team.team_id,
    name: team.name,
    country: team.country,
    league: team.league,
    colors: [], // بيانات الألوان غير متاحة في قاعدة البيانات الحالية
    logo: team.team_logo,
    confidenceScore: 0.9
  }));
};

/**
 * البحث عن فريق في قاعدة بيانات Kaggle استناداً إلى خصائص الفيديو
 */
export const identifyTeamFromKaggle = (result: DetectionResult): IdentifiedTeam[] => {
  // عادةً سنستخدم معالجة أكثر تعقيدًا هنا للمقارنة بين بيانات الكشف وقاعدة البيانات
  // للعرض التوضيحي، سنعود بمجرد عينة من الفرق
  
  const candidates = [...kaggleTeamDatabase]
    .sort(() => 0.5 - Math.random()) // ترتيب عشوائي
    .slice(0, 2) // أخذ أول فريقين
    .map((team, index) => {
      // إنشاء درجة ثقة وهمية مع تناقص حسب الترتيب
      const confidenceScores = [0.89, 0.74];
      
      return {
        id: team.team_id,
        name: team.name,
        country: team.country,
        league: team.league,
        colors: [], // بيانات الألوان غير متاحة في قاعدة البيانات الحالية
        logo: team.team_logo,
        confidenceScore: confidenceScores[index]
      };
    });
  
  return candidates;
};
