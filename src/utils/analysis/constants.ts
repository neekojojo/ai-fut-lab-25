// Analysis stages shown during the processing
export const ANALYSIS_STAGES = [
  "معالجة الفيديو",
  "اكتشاف اللاعبين",
  "تحليل الحركة",
  "تحليل المهارات",
  "المقارنة مع المعايير",
  "إنشاء التقرير النهائي"
];

// Detailed stages for progress tracking
export const DETAILED_STAGES = [
  "بدء تحليل الفيديو",
  "استخراج الإطارات",
  "اكتشاف اللاعبين",
  "تحليل وضعية اللاعب",
  "تحليل حركة العين",
  "قياس السرعة والحركة",
  "تحليل المهارات التقنية",
  "قياس المؤشرات البدنية",
  "تحديد نقاط القوة والضعف",
  "المقارنة مع البيانات المرجعية",
  "حساب المؤشرات التكتيكية",
  "تقييم الأداء الشامل",
  "تنسيق التقرير النهائي"
];

// Mock badge types for players
export const BADGE_TYPES = {
  TECHNICAL: "technical",
  PHYSICAL: "physical",
  MENTAL: "mental",
  TACTICAL: "tactical",
  SPECIAL: "special"
};

// Badge thresholds for different abilities
export const BADGE_THRESHOLDS = {
  SPEED: 85,
  ACCELERATION: 85,
  STAMINA: 85,
  PASSING: 85,
  DRIBBLING: 85,
  SHOOTING: 85,
  VISION: 85,
  POSITIONING: 85,
  DECISION_MAKING: 85
};

export const PROFESSIONAL_PLAYERS = [
  {
    id: "1",
    name: "محمد الشلهوب",
    team: "الهلال",
    position: "وسط",
    match: 92,
    similarity: 0.85,
    strengths: ["التمرير", "الرؤية", "القيادة"]
  },
  {
    id: "2",
    name: "ياسر القحطاني",
    team: "الهلال",
    position: "مهاجم",
    match: 88,
    similarity: 0.78,
    strengths: ["التسديد", "المراوغة", "الاستلام"]
  },
  {
    id: "3",
    name: "سامي الجابر",
    team: "الهلال",
    position: "مهاجم",
    match: 85,
    similarity: 0.81,
    strengths: ["التسديد", "الحركة", "الموقع"]
  },
  {
    id: "4",
    name: "نواف التمياط",
    team: "الهلال",
    position: "جناح",
    match: 90,
    similarity: 0.79,
    strengths: ["المراوغة", "السرعة", "التمرير"]
  },
  {
    id: "5",
    name: "سعد الحارثي",
    team: "النصر",
    position: "وسط دفاعي",
    match: 87,
    similarity: 0.77,
    strengths: ["الاعتراض", "بناء اللعب", "القطع"]
  }
];

export const PLAYER_SKILL_AREAS = [
  "تمرير",
  "تسديد",
  "مراوغة",
  "سرعة",
  "قوة",
  "دقة",
  "تحمل",
  "تموضع",
  "تكتيك",
  "رؤية",
  "قيادة"
];
