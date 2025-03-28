
import { PositionMappings } from './types';

// Map player position to compatible team positions
export const positionMappings: PositionMappings = {
  "Forward": ["ST", "CF", "LW", "RW"],
  "Striker": ["ST", "CF"],
  "Winger": ["LW", "RW"],
  "Attacking Midfielder": ["AM", "CAM"],
  "Midfielder": ["CM", "CDM", "AM"],
  "Central Midfielder": ["CM"],
  "Defensive Midfielder": ["CDM", "CM"],
  "Defender": ["CB", "LB", "RB", "WB"],
  "Center Back": ["CB"],
  "Full Back": ["LB", "RB", "WB"],
  "Goalkeeper": ["GK"]
};

// Role descriptions by formation and position
export const formationRoles: Record<string, Record<string, string>> = {
  "4-2-3-1": {
    "Striker": "قيادة الهجوم كتهديد رئيسي للتسجيل، والتواصل مع لاعبي الوسط المهاجمين",
    "Winger": "توفير العرض والإبداع من المناطق الواسعة، والقطع إلى الداخل لدعم الهجمات",
    "Attacking Midfielder": "خلق الفرص كصانع ألعاب أساسي خلف المهاجم",
    "Midfielder": "التحكم في الإيقاع وتوزيع الكرة في دور متوازن",
    "Defensive Midfielder": "حماية الدفاع وبدء الهجمات من المواقع العميقة",
    "Full Back": "توفير العرض في الهجوم مع الحفاظ على المسؤوليات الدفاعية",
    "Center Back": "قيادة الخط الدفاعي وبناء الهجمات من الخلف",
    "Goalkeeper": "بدء بناء اللعب للفريق وتنظيم الدفاع"
  },
  "4-3-3": {
    "Striker": "نقطة محورية مركزية للهجمات مع التركيز على التسجيل",
    "Winger": "الهجوم من المواقع العريضة، وتوفير السرعة والإبداع في الثلث الأخير",
    "Midfielder": "اللعب في وسط ميدان ديناميكي ثلاثي، مع موازنة الهجوم والدفاع",
    "Defensive Midfielder": "تثبيت وسط الميدان الثلاثي، مع التركيز على التغطية الدفاعية",
    "Full Back": "التداخل مع الأجنحة لخلق زيادة عددية في المناطق العريضة",
    "Center Back": "الدفاع ضد الهجمات المرتدة مع التركيز على تغطية المساحات",
    "Goalkeeper": "توزيع سريع للكرة لبدء الهجمات المرتدة"
  },
  "4-4-2": {
    "Striker": "العمل كجزء من شراكة هجومية، مع مسؤوليات دفاعية مشتركة",
    "Winger": "دور جناح تقليدي مع قدرة على العرضيات والعودة للدفاع",
    "Midfielder": "دور من منطقة لمنطقة مع التركيز على معدل العمل والتموضع",
    "Full Back": "تقديم دعم هجومي عرضي مع التركيز على الصلابة الدفاعية",
    "Center Back": "دفاع تقليدي مع التركيز على الشراكة والقدرة الهوائية",
    "Goalkeeper": "السيطرة على منطقة الجزاء وتنظيم الشكل الدفاعي"
  },
  "3-5-2": {
    "Striker": "العمل كجزء من شراكة هجومية مع حركة لخلق المساحات",
    "Midfielder": "السيطرة على المناطق المركزية مع التركيز على الاحتفاظ بالكرة",
    "Defensive Midfielder": "حماية الخط الخلفي الثلاثي وتوزيع اللعب",
    "Full Back": "دور الظهير الجناح مع مسؤوليات هجومية ودفاعية كبيرة",
    "Center Back": "جزء من دفاع ثلاثي، يتطلب توزيعًا جيدًا وقدرة على التغطية",
    "Goalkeeper": "المشاركة في بناء اللعب مع مهارات توزيع جيدة"
  }
};

// Generates a role description for a player in a specific team
export function generateRoleDescription(playerPosition: string, team: import('./types').SaudiLeagueTeam): string {
  // Get generic position (simplify from specific to general)
  let genericPosition = playerPosition;
  for (const [general, specific] of Object.entries(positionMappings)) {
    for (const pos of specific) {
      if (pos === playerPosition || playerPosition.includes(pos)) {
        genericPosition = general;
        break;
      }
    }
  }
  
  // Get formation-specific role
  const teamFormationRoles = formationRoles[team.formation] || {};
  const roleDescription = teamFormationRoles[genericPosition] || 
    `اللعب كـ ${genericPosition} في نظام ${team.name} بتشكيل ${team.formation}`;
  
  // Add team playing style context
  return `${roleDescription}. التكيف مع أسلوب لعب ${team.name} الذي يعتمد على ${team.playingStyle}.`;
}

// Calculate position fit score
export function calculatePositionFit(playerPosition: string, team: import('./types').SaudiLeagueTeam): number {
  // Get team positions that match the player position
  const compatiblePositions = positionMappings[playerPosition] || [];
  
  if (compatiblePositions.length === 0) return 0;
  
  // Calculate average position need score for compatible positions
  let totalNeed = 0;
  let positionsCount = 0;
  
  for (const position of compatiblePositions) {
    if (team.positionNeeds[position]) {
      totalNeed += team.positionNeeds[position];
      positionsCount++;
    }
  }
  
  return positionsCount > 0 ? (totalNeed / positionsCount) * 10 : 0;
}
