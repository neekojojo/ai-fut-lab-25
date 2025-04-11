import { PlayerAnalysis, ProfessionalPlayer } from '@/types/playerAnalysis';
import determineEarnedBadges from './badgeService';
import { generateInjuryRiskAssessment } from './injuryRiskAnalysis';
import { InjuryRiskData } from '@/types/injuries';

export const generateMockPlayerAnalysis = (
  id = `analysis-${Date.now()}`,
  playerName = 'محمد صلاح',
  position = 'مهاجم'
): PlayerAnalysis => {
  // Generate a date in the last 30 days
  const timestamp = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
  const dateString = timestamp.toISOString().split('T')[0];
  
  // Generate random scores for performance
  const technicalScore = Math.floor(65 + Math.random() * 25);
  const physicalScore = Math.floor(65 + Math.random() * 25);
  const tacticalScore = Math.floor(65 + Math.random() * 25);
  const mentalScore = Math.floor(65 + Math.random() * 25);
  
  // Calculate overall performance score as weighted average
  const performanceScore = Math.floor(
    (technicalScore * 0.3) + 
    (physicalScore * 0.25) + 
    (tacticalScore * 0.25) + 
    (mentalScore * 0.2)
  );
  
  // Generate random stats within reasonable ranges
  const stats = {
    pace: Math.floor(60 + Math.random() * 30),
    shooting: Math.floor(60 + Math.random() * 30),
    passing: Math.floor(60 + Math.random() * 30),
    dribbling: Math.floor(60 + Math.random() * 30),
    defending: Math.floor(50 + Math.random() * 30),
    physical: Math.floor(60 + Math.random() * 30),
    stamina: Math.floor(65 + Math.random() * 25),
    acceleration: Math.floor(60 + Math.random() * 30),
    agility: Math.floor(60 + Math.random() * 30),
    balance: Math.floor(60 + Math.random() * 25),
    ballControl: Math.floor(60 + Math.random() * 30),
    decision: Math.floor(60 + Math.random() * 25),
    anticipation: Math.floor(60 + Math.random() * 25),
    positioning: Math.floor(60 + Math.random() * 25),
    vision: Math.floor(60 + Math.random() * 25),
    composure: Math.floor(60 + Math.random() * 25),
    finishing: Math.floor(60 + Math.random() * 30),
    shotPower: Math.floor(60 + Math.random() * 30),
    longShots: Math.floor(60 + Math.random() * 25),
    volleys: Math.floor(55 + Math.random() * 25),
    penalties: Math.floor(60 + Math.random() * 30),
    crossing: Math.floor(60 + Math.random() * 25),
    freeKick: Math.floor(55 + Math.random() * 25),
    shortPassing: Math.floor(60 + Math.random() * 30),
    longPassing: Math.floor(60 + Math.random() * 25),
    curve: Math.floor(55 + Math.random() * 25),
    reactions: Math.floor(60 + Math.random() * 25),
    strength: Math.floor(60 + Math.random() * 25),
    jumping: Math.floor(60 + Math.random() * 25),
    heading: Math.floor(60 + Math.random() * 25),
    reflexes: Math.floor(60 + Math.random() * 30)
  };
  
  // Generate strengths based on highest stats
  let strengths: string[] = [];
  if (stats.pace > 80) strengths.push('سرعة عالية');
  if (stats.shooting > 80) strengths.push('تسديد قوي');
  if (stats.passing > 80) strengths.push('تمرير دقيق');
  if (stats.dribbling > 80) strengths.push('مراوغة ممتازة');
  if (stats.defending > 80) strengths.push('دفاع قوي');
  if (stats.vision > 80) strengths.push('رؤية ممتازة للملعب');
  if (stats.stamina > 80) strengths.push('لياقة بدنية عالية');
  if (strengths.length < 3) {
    const potentialStrengths = [
      'قيادة فعالة',
      'ذكاء تكتيكي',
      'قدرة على التحمل',
      'قوة بدنية',
      'قوة في المواجهات الثنائية'
    ];
    while (strengths.length < 3) {
      const randomStrength = potentialStrengths[Math.floor(Math.random() * potentialStrengths.length)];
      if (!strengths.includes(randomStrength)) {
        strengths.push(randomStrength);
      }
    }
  }
  
  // Generate weaknesses based on lowest stats
  let weaknesses: string[] = [];
  if (stats.pace < 70) weaknesses.push('نقص في السرعة');
  if (stats.shooting < 70) weaknesses.push('ضعف في التسديد');
  if (stats.passing < 70) weaknesses.push('تمرير غير دقيق');
  if (stats.dribbling < 70) weaknesses.push('ضعف في المراوغة');
  if (stats.defending < 70) weaknesses.push('دفاع ضعيف');
  if (stats.stamina < 70) weaknesses.push('نقص في اللياقة البدنية');
  if (weaknesses.length < 2) {
    const potentialWeaknesses = [
      'ضعف في الرأسيات',
      'ضعف في التحكم بالكرة',
      'ضعف في الكرات الثابتة',
      'ضعف في اللعب الهوائي',
      'ضعف في المراوغة'
    ];
    while (weaknesses.length < 2) {
      const randomWeakness = potentialWeaknesses[Math.floor(Math.random() * potentialWeaknesses.length)];
      if (!weaknesses.includes(randomWeakness)) {
        weaknesses.push(randomWeakness);
      }
    }
  }
  
  // Generate recommendations based on weaknesses
  const recommendations = weaknesses.map(weakness => {
    const weaknessToRecommendation: {[key: string]: string} = {
      'نقص في السرعة': 'تمارين سرعة وخفة حركة متخصصة',
      'ضعف في التسديد': 'تدريبات على التسديد من مختلف المسافات والزوايا',
      'تمرير غير دقيق': 'تمارين تمرير متقدمة وتطوير الرؤية الميدانية',
      'ضعف في المراوغة': 'تمارين مراوغة ومهارات فردية',
      'دفاع ضعيف': 'تدريبات على التوقيت الصحيح للتدخلات الدفاعية',
      'نقص في اللياقة البدنية': 'برنامج لتحسين التحمل واللياقة البدنية',
      'ضعف في الرأسيات': 'تدريبات على التوقيت والقفز في الكرات الهوائية',
      'ضعف في التحكم بالكرة': 'تمارين تحكم بالكرة والسيطرة على الكرات الصعبة',
      'ضعف في الكرات الثابتة': 'تدريبات مكثفة على الركلات الحرة والركنيات',
      'ضعف في اللعب الهوائي': 'تمارين خاصة لتحسين اللعب الهوائي والتوقيت'
    };
    
    return weaknessToRecommendation[weakness] || 'تدريبات متخصصة لتحسين المستوى العام';
  });
  
  // Add general recommendations
  recommendations.push('تحسين التغذية وروتين الراحة للاعبين');
  recommendations.push('تدريبات منتظمة على المرونة والإطالة');
  
  // Calculate talent score based on performance
  const talentScore = Math.min(99, Math.max(60, 
    Math.floor(performanceScore + (-5 + Math.random() * 10))
  ));
  
  // Calculate market value based on talent score with some randomness
  const baseValue = (talentScore * 10000) + (Math.random() * 50000);
  const marketValue = '$' + Math.floor(baseValue).toLocaleString();
  
  // Generate injury risk data
  const injuryRisk: InjuryRiskData = generateInjuryRiskAssessment(position, stats.physical);
  
  // Generate professional player comparison
  const proComparison = {
    name: position === 'مهاجم' ? 'كريم بنزيما' : 'كيفين دي بروين',
    team: position === 'مهاجم' ? 'الاتحاد السعودي' : 'مانشستر سيتي',
    position: position === 'مهاجم' ? 'forward' : 'midfielder',
    match: 78,
    similarity: 72,
    strengths: ['تمركز ممتاز', 'رؤية ميدانية', 'تمرير دقيق'],
    skills: {
      ballControl: 85,
      passing: 88,
      shooting: 80,
      positioning: 87,
      teamwork: 83,
      leadership: 82,
      decisionMaking: 86
    }
  };
  
  // Generate movement data for heatmap visualization
  const movements = Array.from({ length: 50 }, (_, i) => ({
    timestamp: i * 30,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 60,
    speed: 2 + Math.random() * 8,
    acceleration: -3 + Math.random() * 6,
    direction: Math.random() * 360,
    isActive: Math.random() > 0.1
  }));
  
  // Generate heatmap data
  const heatmap = Array.from({ length: 100 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 70,
    value: Math.random()
  }));
  
  // Generate badges based on performance
  const mockAnalysis: PlayerAnalysis = {
    id,
    date: dateString,
    score: performanceScore,
    playerName,
    position,
    timestamp: timestamp.toISOString(),
    duration: Math.floor(60 + Math.random() * 60),
    confidence: 0.75 + Math.random() * 0.2,
    videoUrl: '',
    thumbnailUrl: '',
    marketValue,
    talentScore,
    compatibilityScore: 70 + Math.floor(Math.random() * 20),
    performanceScore,
    stats,
    strengths,
    weaknesses,
    recommendations,
    summary: `لاعب ${performanceScore > 80 ? 'متميز' : 'واعد'} في مركز ${position} يتمتع بمهارات ${strengths.join(' و')}. يحتاج إلى تطوير ${weaknesses.join(' و')}.`,
    advancedInsights: [
      'يظهر حس تكتيكي ممتاز في المواقف الهجومية',
      'قدرة جيدة على التحول السريع بين الدفاع والهجوم',
      'يتخذ قرارات سليمة تحت الضغط'
    ],
    movements,
    passes: [],
    heatmap,
    performance: {
      technical: technicalScore,
      physical: physicalScore,
      tactical: tacticalScore,
      mental: mentalScore
    },
    injuryRisk,
    badges: determineEarnedBadges({
      id,
      date: dateString,
      score: performanceScore,
      position,
      stats,
      performance: {
        technical: technicalScore,
        physical: physicalScore,
        tactical: tacticalScore,
        mental: mentalScore
      },
      performanceScore
    }),
    proComparison,
    detailedSkills: {
      ballControl: stats.ballControl,
      passing: stats.passing,
      shooting: stats.shooting,
      positioning: stats.positioning,
      teamwork: 65 + Math.random() * 25,
      leadership: 60 + Math.random() * 30,
      decisionMaking: 65 + Math.random() * 25
    },
    age: 18 + Math.floor(Math.random() * 15),
    country: 'المملكة العربية السعودية',
    city: ['الرياض', 'جدة', 'الدمام'][Math.floor(Math.random() * 3)],
    height: `${170 + Math.floor(Math.random() * 20)} سم`,
    weight: `${65 + Math.floor(Math.random() * 20)} كغ`,
    preferredFoot: Math.random() > 0.7 ? 'اليسرى' : 'اليمنى'
  };
  
  return mockAnalysis;
};

// Let's export a function that can be used as generateEnhancedAnalysis
export const generateEnhancedAnalysis = (seed: number): PlayerAnalysis => {
  const id = `analysis-${seed}`;
  const playerName = ['محمد صلاح', 'عبدالله السعيد', 'فهد المولد'][seed % 3];
  const position = ['مهاجم', 'وسط', 'مدافع'][seed % 3];
  
  return generateMockPlayerAnalysis(id, playerName, position);
};

export default generateMockPlayerAnalysis;
