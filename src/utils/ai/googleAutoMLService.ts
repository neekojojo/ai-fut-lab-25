
// Re-export from the refactored service for backward compatibility
import { GoogleAutoMLService } from './services/GoogleAutoMLServiceClass';
export type { PlayerPerformancePredictionRequest, PlayerPerformancePrediction } from './types/googleAutoML';

// Export a singleton instance - this maintains the same API as before
export const googleAutoMLService = new GoogleAutoMLService();

// Re-export the class for cases where consumers need to instantiate their own service
export { GoogleAutoMLService };
