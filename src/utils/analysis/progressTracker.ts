
// Type definition for progress update callbacks
export type ProgressCallback = (progress: number, stage: string) => void;

// Enhanced stages for more realistic analysis flow with eye tracking
export const DETAILED_STAGES = [
  'بدء تحليل الفيديو',                    // Start video analysis
  'استخراج إطارات الفيديو',               // Extract video frames
  'تحليل حركة اللاعب',                    // Player movement analysis
  'اكتشاف مواقع اللاعبين',                 // Player position detection
  'تحليل حركة العين وتوقع الموهبة',         // Eye tracking and talent prediction
  'تحليل الحركة والسرعة',                  // Speed and movement analysis
  'تحليل المهارات الفنية',                 // Technical skills analysis
  'قياس المؤشرات البدنية',                  // Physical metrics measurement
  'تحديد نقاط القوة والضعف',               // Identifying strengths and weaknesses
  'مقارنة مع البيانات المرجعية',            // Comparison with benchmark data
  'حساب المؤشرات التكتيكية',               // Calculate tactical indicators
  'تقييم الأداء الشامل',                   // Overall performance evaluation
  'إنشاء تقرير التحليل النهائي',            // Compile final analysis report
  'اكتمال التحليل'                        // Analysis complete
];

// Progress tracker class that manages progress callbacks and updates
export class ProgressTracker {
  private currentProgress: number = 0;
  private currentStage: string = '';
  private updateCallbacks: ProgressCallback[] = [];
  
  constructor(initialStage: string = DETAILED_STAGES[0]) {
    this.currentStage = initialStage;
  }
  
  // Register a callback for progress updates
  public registerCallback(callback: ProgressCallback): void {
    this.updateCallbacks.push(callback);
    // Immediately call with current progress
    callback(this.currentProgress, this.currentStage);
  }
  
  // Update progress and stage, notify all callbacks
  public updateProgress(progress: number, stageIndex: number): void {
    const stage = DETAILED_STAGES[stageIndex] || DETAILED_STAGES[DETAILED_STAGES.length - 1];
    console.log(`Analysis progress: ${progress}%, stage: ${stage}`);
    
    this.currentProgress = progress;
    this.currentStage = stage;
    
    // Call all registered callbacks with new progress
    this.updateCallbacks.forEach(callback => callback(progress, stage));
  }
  
  // Simulate progress updates for cached results
  public simulateCachedProgress(): void {
    const totalStages = DETAILED_STAGES.length;
    
    for (let i = 0; i < totalStages; i++) {
      const progress = Math.min(100, Math.round((i / (totalStages - 1)) * 100));
      
      // Create closures with different delays for each stage
      ((index, prog) => {
        setTimeout(() => {
          // Update all callbacks for this simulated progress step
          this.updateCallbacks.forEach(callback => {
            callback(prog, DETAILED_STAGES[index]);
          });
        }, 300 * index + Math.random() * 200);
      })(i, progress);
    }
  }
}
