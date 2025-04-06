import { llmService } from './llmService';
import { mockLLMService } from './mockLLMService';

// Use mock service for development, real service for production
const isProduction = process.env.NODE_ENV === 'production';
export const llmProcessor = isProduction ? llmService : mockLLMService;

// Export types from llmService
export type {
  DocumentProcessingResult,
  FlashcardGenerationResult,
  QuizGenerationResult,
  StudyGuideGenerationResult,
  FeedbackProcessingResult,
  LLMProcessingOptions
} from './llmService';
