
// If this file exists, only append to it. If not, create it.

export const ANALYSIS_STAGES = [
  "استخراج إطارات الفيديو",
  "تحليل حركة اللاعب",
  "تقييم المهارات الفنية",
  "حساب المؤشرات التكتيكية",
  "مقارنة مع بيانات اللاعبين المحترفين",
  "تكامل مع أنظمة FIFA وTransfermarkt"
];

export const EXTERNAL_SYSTEMS = {
  FIFA: {
    name: "FIFA API",
    description: "واجهة برمجة التطبيقات الرسمية لـ FIFA للوصول إلى إحصائيات اللاعبين والأندية والبطولات",
    endpoint: "https://api.fifa.com/api/v3",
    dataTypes: ["player_stats", "team_rankings", "tournament_data"]
  },
  TRANSFER_MARKET: {
    name: "Transfermarkt API",
    description: "واجهة برمجة التطبيقات لتحليل سوق انتقالات اللاعبين والقيم السوقية",
    endpoint: "https://api.transfermarkt.com/v1",
    dataTypes: ["market_value", "transfer_history", "contract_details"]
  },
  OPTA: {
    name: "Opta Sports API",
    description: "منصة تحليلية متخصصة في إحصائيات كرة القدم",
    endpoint: "https://api.optasports.com/v1",
    dataTypes: ["detailed_match_stats", "player_performance", "tactical_analysis"]
  },
  PERFORMANCE_OPTIONS: {
    WEBGL: "استخدام WebGL لتسريع المعالجة البصرية",
    CACHING: "تخزين البيانات مؤقتًا لتحسين الأداء",
    BATCH_PROCESSING: "معالجة الفيديو على دفعات لتحسين الكفاءة",
    PARALLEL_COMPUTING: "الحساب المتوازي لتحليل الفيديو"
  }
};

export const CACHE_DURATION = {
  SHORT: 15, // 15 minutes
  MEDIUM: 60, // 1 hour
  LONG: 1440, // 24 hours
  VERY_LONG: 10080 // 1 week
};

// Detailed stages array for progress tracking
export const DETAILED_STAGES = [
  "بدء تحليل الفيديو",
  "استخراج إطارات الفيديو",
  "اكتشاف وتتبع اللاعبين",
  "تحليل حركة اللاعب",
  "تقييم المهارات الفنية",
  "حساب مؤشرات اللياقة البدنية",
  "تحليل القدرات التكتيكية",
  "مقارنة مع بيانات اللاعبين المحترفين",
  "تحليل نقاط القوة والضعف",
  "التكامل مع بيانات FIFA",
  "تحليل القيمة السوقية",
  "تكامل مع منصات التحليل الخارجية",
  "إنشاء التقرير النهائي"
];

// Adding the missing PROFESSIONAL_PLAYERS constant
export const PROFESSIONAL_PLAYERS = [
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    skills: ["Finishing", "Aerial ability", "Long shots", "Speed", "Power"],
    style: "Direct, athletic forward with exceptional finishing ability"
  },
  {
    name: "Lionel Messi",
    position: "Forward",
    skills: ["Dribbling", "Vision", "Finishing", "Free kicks", "Ball control"],
    style: "Technical, creative playmaker with incredible close control"
  },
  {
    name: "Kevin De Bruyne",
    position: "Midfielder",
    skills: ["Passing", "Vision", "Long shots", "Set pieces", "Work rate"],
    style: "Complete midfielder with exceptional passing range and creativity"
  },
  {
    name: "Virgil van Dijk",
    position: "Defender",
    skills: ["Aerial ability", "Tackling", "Positioning", "Leadership", "Composure"],
    style: "Dominant, composed defender with excellent leadership qualities"
  },
  {
    name: "Manuel Neuer",
    position: "Goalkeeper",
    skills: ["Shot stopping", "Sweeping", "Distribution", "Command of area", "One-on-ones"],
    style: "Modern sweeper-keeper with excellent ball-playing ability"
  },
  {
    name: "N'Golo Kanté",
    position: "Midfielder",
    skills: ["Tackling", "Interceptions", "Stamina", "Positioning", "Work rate"],
    style: "Tireless ball-winner with exceptional defensive awareness"
  },
  {
    name: "Karim Benzema",
    position: "Forward",
    skills: ["Finishing", "Link-up play", "Movement", "Technical ability", "Intelligence"],
    style: "Complete forward with exceptional technical ability and game intelligence"
  },
  {
    name: "Sergio Ramos",
    position: "Defender",
    skills: ["Tackling", "Leadership", "Aerial ability", "Set pieces", "Aggression"],
    style: "Aggressive leader with exceptional set-piece ability"
  },
  {
    name: "Trent Alexander-Arnold",
    position: "Defender",
    skills: ["Crossing", "Passing", "Set pieces", "Vision", "Technique"],
    style: "Creative right-back with exceptional passing range"
  }
];

// Adding the missing AVAILABLE_BADGES constant
export const AVAILABLE_BADGES = [
  {
    name: "صانع اللعب",
    description: "لاعب متميز في تمرير الكرة وصناعة الفرص",
    level: "gold",
    unlockCondition: (analysis) => analysis.stats.passing >= 85 && analysis.stats.vision >= 80
  },
  {
    name: "القناص",
    description: "مهارة استثنائية في إنهاء الهجمات وتسجيل الأهداف",
    level: "gold",
    unlockCondition: (analysis) => analysis.stats.shooting >= 85 && analysis.position === "Forward"
  },
  {
    name: "المدافع الصلب",
    description: "قدرات دفاعية متميزة وصلابة في المواجهات",
    level: "gold",
    unlockCondition: (analysis) => analysis.position === "Defender" && analysis.stats.defending >= 85
  },
  {
    name: "الجناح السريع",
    description: "سرعة فائقة وقدرة على اختراق الدفاعات",
    level: "silver",
    unlockCondition: (analysis) => analysis.stats.pace >= 85 && analysis.stats.dribbling >= 80
  },
  {
    name: "لاعب الوسط الشامل",
    description: "متوازن في المهارات الهجومية والدفاعية",
    level: "silver",
    unlockCondition: (analysis) => (
      analysis.position === "Midfielder" && 
      analysis.stats.passing >= 75 && 
      analysis.stats.defending >= 70
    )
  },
  {
    name: "القائد",
    description: "مهارات قيادية وتأثير إيجابي على الفريق",
    level: "silver",
    unlockCondition: (analysis) => analysis.stats.vision >= 80 && analysis.stats.decision >= 80
  },
  {
    name: "المراوغ الماهر",
    description: "قدرة استثنائية على المراوغة والتحكم بالكرة",
    level: "bronze",
    unlockCondition: (analysis) => analysis.stats.dribbling >= 80 && analysis.stats.ballControl >= 80
  },
  {
    name: "لاعب تكتيكي",
    description: "فهم ممتاز للجوانب التكتيكية وتنفيذ التعليمات",
    level: "bronze",
    unlockCondition: (analysis) => analysis.performance.tactical >= 80
  },
  {
    name: "اللاعب الواعد",
    description: "إمكانات واعدة ومستقبل مشرق في كرة القدم",
    level: "bronze",
    unlockCondition: (analysis) => analysis.talentScore >= 75 && analysis.talentScore < 85
  }
];

