
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
