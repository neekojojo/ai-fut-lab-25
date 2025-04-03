import { faker } from '@faker-js/faker';
import { ProgressData } from '@/types/progress';

// Mock player stats data
export const getPlayerStats = () => {
  return {
    pace: faker.number.int({ min: 65, max: 90 }),
    shooting: faker.number.int({ min: 65, max: 85 }),
    passing: faker.number.int({ min: 70, max: 88 }),
    dribbling: faker.number.int({ min: 70, max: 89 }),
    defending: faker.number.int({ min: 60, max: 80 }),
    physical: faker.number.int({ min: 70, max: 85 }),
    
    // More detailed player stats for the player analysis
    speed: faker.number.int({ min: 70, max: 90 }),
    acceleration: faker.number.int({ min: 65, max: 87 }),
    agility: faker.number.int({ min: 70, max: 88 }),
    balance: faker.number.int({ min: 65, max: 82 }),
    strength: faker.number.int({ min: 65, max: 80 }),
    stamina: faker.number.int({ min: 70, max: 85 }),
    positioning: faker.number.int({ min: 70, max: 85 }),
    finishing: faker.number.int({ min: 65, max: 80 }),
    shortPassing: faker.number.int({ min: 75, max: 90 }),
    longPassing: faker.number.int({ min: 70, max: 85 }),
    ballControl: faker.number.int({ min: 70, max: 88 }),
    dribbling_skill: faker.number.int({ min: 70, max: 85 }),
    crossing: faker.number.int({ min: 65, max: 80 }),
    freeKick: faker.number.int({ min: 60, max: 75 }),
    interceptions: faker.number.int({ min: 65, max: 80 }),
    defensiveAwareness: faker.number.int({ min: 65, max: 80 }),
    slidingTackle: faker.number.int({ min: 60, max: 75 }),
    standingTackle: faker.number.int({ min: 65, max: 80 }),
    vision: faker.number.int({ min: 70, max: 85 }),
    composure: faker.number.int({ min: 70, max: 85 }),
    aggression: faker.number.int({ min: 65, max: 80 }),
    reactions: faker.number.int({ min: 70, max: 85 }),
    firstTouch: faker.number.int({ min: 70, max: 85 }),
    
    // Physical metrics
    avgSpeed: faker.number.float({ min: 10, max: 15, precision: 0.1 }),
    maxSpeed: faker.number.float({ min: 20, max: 32, precision: 0.1 }),
    avgAcceleration: faker.number.float({ min: 2, max: 4, precision: 0.1 }),
    distanceCovered: faker.number.int({ min: 1000, max: 1500 }),
    balanceScore: faker.number.int({ min: 60, max: 80 }),
    technicalScore: faker.number.int({ min: 65, max: 85 }),
    physicalScore: faker.number.int({ min: 70, max: 85 }),
    movementEfficiency: faker.number.int({ min: 65, max: 85 }),
    
    // Enhanced movement analytics
    consistencyScore: faker.number.int({ min: 65, max: 85 }),
    decision: faker.number.int({ min: 65, max: 85 }),
    anticipation: faker.number.int({ min: 65, max: 85 }),
    tacticalAwareness: faker.number.int({ min: 65, max: 80 }),
    explosiveAccelerations: faker.number.int({ min: 20, max: 35 }),
    sustainedAccelerations: faker.number.int({ min: 40, max: 50 }),
    decelerations: faker.number.int({ min: 20, max: 35 }),
  };
};

// Mock player analysis data
export const getMockAnalysis = () => {
  const playerStats = getPlayerStats();
  
  const progressData: ProgressData = {
    lastAnalysis: new Date(),
    improvement: faker.number.int({ min: 5, max: 15 }),
    areas: [
      {
        skill: "Technical",
        before: faker.number.int({ min: 60, max: 70 }),
        after: faker.number.int({ min: 70, max: 85 }),
      },
      {
        skill: "Tactical",
        before: faker.number.int({ min: 60, max: 70 }),
        after: faker.number.int({ min: 70, max: 80 }),
      },
      {
        skill: "Physical",
        before: faker.number.int({ min: 60, max: 70 }),
        after: faker.number.int({ min: 70, max: 80 }),
      },
      {
        skill: "Mental",
        before: faker.number.int({ min: 65, max: 75 }),
        after: faker.number.int({ min: 70, max: 85 }),
      },
    ]
  };
  
  // Generate position-specific insights
  const position = 'وسط'; // Using midfield position as default
  
  // Forward-specific insights
  const forwardInsights = {
    overallAssessment: "يظهر اللاعب مهارات هجومية ممتازة مع قدرة فائقة على إنهاء الهجمات. يتميز بحس تهديفي عالٍ وقدرة على التمركز الصحيح داخل منطقة الجزاء. يحتاج إلى تطوير في المساهمة الدفاعية والضغط على الخصم عند فقدان الكرة.",
    distinctiveSkills: [
      "الإنهاء الممتاز للهجمات",
      "التمركز الذكي داخل منطقة الجزاء",
      "القدرة على المراوغة في المساحات الضيقة",
      "قوة التسديد من مختلف المسافات",
      "الارتقاء والتسجيل بالرأس"
    ],
    developmentAreas: [
      "المساهمة الدفاعية",
      "الضغط على حامل الكرة",
      "الحركة بدون كرة لخلق مساحات للزملاء",
      "التمرير تحت الضغط"
    ],
    tacticalAnalysis: "يتميز اللاعب بقدرته على إنهاء الهجمات بكفاءة عالية، مع معدل تهديفي مميز من الفرص المتاحة. يُظهر ذكاءً في التمركز واستغلال المساحات داخل منطقة الجزاء. يحتاج إلى تحسين مستوى الضغط على الخصم عند فقدان الكرة والمساهمة في بناء الهجمات من العمق.",
    movementAnalysis: "يتميز اللاعب بحركة سلسة وانفجارية في الثلث الأخير، مع قدرة جيدة على التسارع في الم��افات القصيرة. يُظهر مهارة في تغيير الاتجاه بسرعة للتخلص من الرقابة. يميل إلى التمركز المتقدم وعدم المشاركة كثيراً في بناء الهجمات من الخلف.",
    futurePotential: "يمتلك اللاعب إمكانيات عالية للتطور كمهاجم متكامل إذا عمل على تحسين المساهمة الدفاعية والحركة بدون كرة. بقدراته التهديفية الحالية وذكائه التكتيكي، يمكنه أن يصبح من أفضل المهاجمين محلياً وربما الانتقال للعب في دوريات أقوى مستقبلاً."
  };

  // Midfielder-specific insights
  const midfielderInsights = {
    overallAssessment: "لاعب وسط متميز يجمع بين مهارات التمرير الدقيقة والرؤية الكروية الممتازة. يظهر قدرة جيدة على التحكم في إيقاع اللعب وربط الخطوط، مع مساهمة فعالة في بناء الهجمات. يحتاج إلى تطوير قدراته الدفاعية والصلابة في المواجهات الثنائية.",
    distinctiveSkills: [
      "دقة التمرير على المسافات المختلفة",
      "الرؤية الكروية وصناعة الفرص",
      "التحكم في إيقاع اللعب",
      "التمركز الذكي بين الخطوط",
      "القدرة على التسديد من خارج منطقة الجزاء"
    ],
    developmentAreas: [
      "القوة في المواجهات الثنائية",
      "الاستحواذ تحت الضغط العالي",
      "القدرة على استعادة الكرة",
      "السرعة الانتقالية بين الدفاع والهجوم"
    ],
    tacticalAnalysis: "يتميز اللاعب بقدرته على توزيع اللعب بدقة عالية وخلق الفرص للمهاجمين من خلال تمريرات مفتاحية. يمتلك وعياً تكتيكياً جيداً في التمركز بين خطوط الخصم واستغلال المساحات. يحتاج إلى تحسين الجانب الدفاعي وخصوصاً في الانتقال السريع من الهجوم إلى الدفاع.",
    movementAnalysis: "يظهر اللاعب تحركات ذكية بين خطوط الملعب، مع قدرة جيدة على التمركز لاستلام الكرة في مساحات خالية. يمتلك أسلوباً مميزاً في تدوير الكرة والتحرك بها في مساحات ضيقة. يحتاج إلى تحسين حركته الدفاعية وقدرته على تغطية المساحات عند فقدان الكرة.",
    futurePotential: "بقدراته التقنية العالية ورؤيته الكروية المميزة، يمتلك اللاعب إمكانات كبيرة للتطور كصانع ألعاب أو لاعب وسط متكامل. إذا طور جوانبه الدفاعية وقدرته على الاحتفاظ بالكرة تحت الضغط، يمكن أن يصل إلى مستويات عالية ويلعب دوراً محورياً في الفريق."
  };
  
  // Choose insights based on position - Fix the position comparison by casting to string
  let positionInsights;
  // Fix: Cast position string to be compatible for comparison
  const positionStr = String(position).toLowerCase();
  if (positionStr.includes('هجوم') || positionStr === 'مهاجم' || positionStr === 'جناح') {
    positionInsights = forwardInsights;
  } else {
    positionInsights = midfielderInsights; // Default to midfielder insights
  }
  
  return {
    analysis: {
      id: faker.string.uuid(),
      playerId: faker.string.uuid(),
      playerName: 'عبدالله محمد',
      position: 'وسط',
      timestamp: new Date().toISOString(),
      duration: faker.number.int({ min: 60, max: 90 }),
      confidence: faker.number.float({ min: 0.75, max: 0.95, precision: 0.01 }),
      videoUrl: '',
      thumbnailUrl: '',
      stats: {
        ...playerStats,
        // Additional stats
        overall: faker.number.int({ min: 65, max: 82 }),
        potential: faker.number.int({ min: 70, max: 90 }),
      },
      movements: [
        { timestamp: 1, x: 23, y: 45, speed: 12.3, acceleration: 2.1, isActive: true },
        { timestamp: 2, x: 26, y: 48, speed: 14.7, acceleration: 2.4, isActive: true },
        { timestamp: 3, x: 30, y: 52, speed: 18.5, acceleration: 3.8, isActive: true },
        { timestamp: 4, x: 35, y: 55, speed: 22.1, acceleration: 3.6, isActive: true },
        { timestamp: 5, x: 40, y: 57, speed: 19.8, acceleration: -2.3, isActive: true },
      ],
      passes: [
        { 
          timestamp: 10, 
          from: { x: 23, y: 45 }, 
          to: { x: 45, y: 50 }, 
          successful: true, 
          recipient: 'Player 2',
          type: 'short' 
        },
        { 
          timestamp: 25, 
          from: { x: 35, y: 30 }, 
          to: { x: 60, y: 45 }, 
          successful: false, 
          recipient: 'Player 3',
          type: 'long' 
        },
        { 
          timestamp: 40, 
          from: { x: 50, y: 35 }, 
          to: { x: 70, y: 40 }, 
          successful: true, 
          recipient: 'Player 4',
          type: 'through' 
        },
      ],
      heatmap: [
        { x: 25, y: 45, intensity: 0.8 },
        { x: 35, y: 50, intensity: 0.9 },
        { x: 45, y: 40, intensity: 0.7 },
        { x: 30, y: 60, intensity: 0.5 },
        { x: 55, y: 35, intensity: 0.4 },
      ],
      strengths: [
        'قوة التمرير',
        'الرؤية الكروية',
        'التمركز الجيد',
        'التحكم في الكرة',
      ],
      weaknesses: [
        'السرعة القصوى',
        'القوة البدنية',
        'الاستحواذ تحت الضغط',
      ],
      summary: 'لاعب وسط ذكي مع مهارات تمرير ممتازة ورؤية جيدة للملعب. يحتاج إلى تحسين في الجوانب البدنية.',
      advancedInsights: [
        'يظهر قدرات مميزة في التمريرات المفتاحية في الثلث الأخير',
        'يقوم بالتغطية الدفاعية بشكل جيد للمساحات خلف الظهير',
        'يحتاج إلى تحسين مستوى الجري عالي الشدة',
        'يمكنه العمل على تحسين قدرته على الاحتفاظ بالكرة تحت الضغط'
      ],
      recommendations: [
        'برنامج تدريبي لتحسين السرعة القصوى والقدرة على التحمل',
        'تمارين مكثفة للاحتفاظ بالكرة تحت الضغط',
        'تحسين المهارات الدفاعية والمراقبة'
      ],
      performanceScore: faker.number.int({ min: 65, max: 85 }),
      talentScore: faker.number.int({ min: 70, max: 88 }),
      marketValue: `$${faker.number.int({ min: 500, max: 2000 })}K`,
      compatibilityScore: faker.number.float({ min: 6.5, max: 8.5, precision: 0.1 }),
      
      progress: progressData,
      
      // Additional fields with more detailed metrics
      performance: {
        technical: faker.number.int({ min: 70, max: 85 }),
        tactical: faker.number.int({ min: 65, max: 80 }),
        physical: faker.number.int({ min: 65, max: 80 }),
        mental: faker.number.int({ min: 70, max: 85 }),
      },
      
      detailedSkills: {
        passing: faker.number.int({ min: 75, max: 88 }),
        shooting: faker.number.int({ min: 65, max: 78 }),
        dribbling: faker.number.int({ min: 70, max: 82 }),
        tackling: faker.number.int({ min: 60, max: 75 }),
        positioning: faker.number.int({ min: 70, max: 82 }),
        movement: faker.number.int({ min: 70, max: 80 }),
        awareness: faker.number.int({ min: 70, max: 85 }),
      },
      
      proComparison: {
        name: 'Kevin De Bruyne',
        similarity: faker.number.int({ min: 70, max: 85 }),
        skills: {
          passing: faker.number.int({ min: 85, max: 95 }),
          vision: faker.number.int({ min: 85, max: 95 }),
          shooting: faker.number.int({ min: 80, max: 90 }),
          movement: faker.number.int({ min: 80, max: 90 }),
          positioning: faker.number.int({ min: 80, max: 90 }),
        }
      },
      
      injuryRisk: {
        overall: faker.number.float({ min: 0.1, max: 0.3, precision: 0.01 }),
        areas: {
          knee: faker.number.float({ min: 0.05, max: 0.2, precision: 0.01 }),
          ankle: faker.number.float({ min: 0.05, max: 0.2, precision: 0.01 }),
          hamstring: faker.number.float({ min: 0.1, max: 0.25, precision: 0.01 }),
          groin: faker.number.float({ min: 0.05, max: 0.15, precision: 0.01 }),
        }
      },
      
      badges: [
        { title: 'صانع اللعب', description: 'قدرة استثنائية على صناعة الفرص', type: 'technical' },
        { title: 'رؤية مميزة', description: 'قدرة عالية على رؤية التمريرات المفتاحية', type: 'technical' },
        { title: 'ذكاء كروي', description: 'قدرة فائقة على قراءة اللعب', type: 'tactical' },
      ],
      
      // Player profile data
      age: faker.number.int({ min: 18, max: 25 }),
      country: 'المملكة العربية السعودية',
      city: 'الرياض',
      height: `${faker.number.int({ min: 170, max: 190 })} سم`,
      weight: `${faker.number.int({ min: 65, max: 85 })} كجم`,
      preferredFoot: 'Right',
      
      // Preferred style
      preferredSide: 'الأيمن',
      
      // Coach notes
      coachNotes: 'يظهر اللاعب تطوراً جيداً في مستوى التمرير وصناعة اللعب. يحتاج إلى عمل إضافي على الجوانب البدنية خاصة السرعة والقوة، مع التركيز على تحسين قدرته على المراوغة تحت الضغط وتطوير مهارات المراقبة الدفاعية.',
      
      // Physical metrics for detailed movement analysis
      physicalMetrics: {
        maxSpeed: faker.number.float({ min: 26, max: 32, precision: 0.1 }),
        avgSpeed: faker.number.float({ min: 10, max: 15, precision: 0.1 }),
        distance: faker.number.float({ min: 6.5, max: 8.5, precision: 0.1 }),
        strength: faker.number.int({ min: 65, max: 80 }),
        endurance: faker.number.int({ min: 70, max: 85 }),
      },
      
      // Movement specific data
      movementNotes: 'يظهر اللاعب قدرات حركية جيدة مع إمكانية تحسين في الرشاقة والتوازن. يوصى بتمارين مخصصة لتحسين القدرة على تغيير الاتجاه بسرعة أكبر والحفاظ على التوازن أثناء المناورات السريعة.',
      
      // New insight fields
      overallAssessment: positionInsights.overallAssessment,
      distinctiveSkills: positionInsights.distinctiveSkills,
      developmentAreas: positionInsights.developmentAreas,
      tacticalAnalysis: positionInsights.tacticalAnalysis,
      movementAnalysis: positionInsights.movementAnalysis,
      futurePotential: positionInsights.futurePotential
    }
  };
};

// Mock player comparison data
export const getPlayerComparison = () => {
  return {
    player: {
      name: 'عبدالله محمد',
      age: 22,
      position: 'وسط',
      scores: {
        technical: 75,
        tactical: 72,
        physical: 68,
        mental: 76
      }
    },
    similarProfessionals: [
      {
        name: 'Kevin De Bruyne',
        team: 'Manchester City',
        position: 'midfielder',
        similarity: 78,
        strengths: ['Vision', 'Passing Range', 'Set Pieces']
      },
      {
        name: 'Luka Modric',
        team: 'Real Madrid',
        position: 'midfielder',
        similarity: 71,
        strengths: ['Game Control', 'First Touch', 'Positioning']
      },
      {
        name: 'Bruno Fernandes',
        team: 'Manchester United',
        position: 'midfielder',
        similarity: 65,
        strengths: ['Creativity', 'Shot Power', 'Work Rate']
      }
    ],
    similarityScore: 76,
    similarityBreakdown: [
      { category: 'Playing Style', similarity: 82 },
      { category: 'Technical Skills', similarity: 73 },
      { category: 'Physical Attributes', similarity: 68 },
      { category: 'Decision Making', similarity: 77 },
    ]
  };
};

// Mock training recommendations
export const getTrainingRecommendations = () => {
  return [
    {
      id: "tr-001",
      title: "تدريب دقة التمرير",
      description: "برنامج شامل لتحسين جميع جوانب التمرير",
      category: "تقني",
      difficulty: 3,
      estimatedTimeInMinutes: 45,
      targetAreas: ["التمرير", "الرؤية"],
      expectedImprovement: 15,
      area: "دقة التمرير",
      intensity: "عالية",
      frequency: 3,
      duration: 45,
      exercises: [
        {
          name: "تدريب التمرير بلمسة واحدة",
          description: "تمرير سريع بلمسة واحدة في مثلثات مع الحركة",
          difficulty: "intermediate"
        },
        {
          name: "تدريب التمرير طويل المدى",
          description: "ممارسة تمريرات بمسافة 30-40 ياردة إلى أهداف متحركة",
          difficulty: "advanced"
        }
      ]
    },
    {
      id: "tr-002",
      title: "تدريب الوعي الدفاعي",
      description: "جلسات لتحسين التمركز الدفاعي والوعي",
      category: "تكتيكي",
      difficulty: 4,
      estimatedTimeInMinutes: 60,
      targetAreas: ["الدفاع", "التمركز"],
      expectedImprovement: 20,
      area: "الوعي الدفاعي",
      intensity: "متوسطة",
      frequency: 2,
      duration: 30,
      exercises: [
        {
          name: "تدريب التمركز الدفاعي",
          description: "سيناريوهات الدفاع الظلي مع انتقالات سريعة",
          difficulty: "intermediate"
        },
        {
          name: "تمرين المراقبة المنطقية",
          description: "تمرين جماعي يركز على الحفاظ على التشكيل الدفاعي",
          difficulty: "intermediate"
        }
      ]
    },
    {
      id: "tr-003",
      title: "اتخاذ القرار تحت الضغط",
      description: "تدريب لتحسين اتخاذ القرار السريع في مواقف اللعب",
      category: "ذهني",
      difficulty: 3,
      estimatedTimeInMinutes: 40,
      targetAreas: ["اتخاذ القرار", "الثبات"],
      expectedImprovement: 25,
      area: "اتخاذ القرار",
      intensity: "عالية",
      frequency: 3,
      duration: 40,
      exercises: [
        {
          name: "ألعاب مصغرة مع قيود",
          description: "مباريات 3 ضد 3 مع قيود على اللمسات والوقت",
          difficulty: "advanced"
        },
        {
          name: "جلسات تحليل الفيديو",
          description: "مراجعة قرارات اللعب مع تعليقات المدرب",
          difficulty: "beginner"
        }
      ]
    }
  ];
};
