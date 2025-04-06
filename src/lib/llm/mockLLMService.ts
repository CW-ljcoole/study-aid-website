import { DocumentProcessingResult, FlashcardGenerationResult, QuizGenerationResult, StudyGuideGenerationResult, FeedbackProcessingResult } from './llmService';

// Mock implementation for development and testing
export const mockLLMService = {
  processDocument: async (documentText: string): Promise<DocumentProcessingResult> => {
    console.log('Mock processing document:', documentText.substring(0, 100) + '...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      summary: 'This is a mock summary of the document. It would contain the main points and key information extracted by the LLM.',
      keyPoints: [
        'First key point from the document',
        'Second key point about important concepts',
        'Third key point highlighting critical information',
        'Fourth key point summarizing relevant details',
        'Fifth key point with additional context'
      ],
      suggestedTopics: [
        'Related Topic 1',
        'Further Study Area 2',
        'Advanced Concept 3'
      ]
    };
  },
  
  generateFlashcards: async (documentText: string, count: number = 10): Promise<FlashcardGenerationResult> => {
    console.log(`Mock generating ${count} flashcards from document:`, documentText.substring(0, 100) + '...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      flashcards: Array(count).fill(0).map((_, i) => ({
        front: `Question or term ${i + 1} from the document`,
        back: `Answer or definition ${i + 1} with detailed explanation`
      }))
    };
  },
  
  generateQuiz: async (documentText: string, questionCount: number = 5): Promise<QuizGenerationResult> => {
    console.log(`Mock generating quiz with ${questionCount} questions from document:`, documentText.substring(0, 100) + '...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      questions: Array(questionCount).fill(0).map((_, i) => ({
        question: `Sample question ${i + 1} about the document content?`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`
        ],
        correctAnswer: Math.floor(Math.random() * 4),
        explanation: `Explanation for question ${i + 1} detailing why the answer is correct and providing additional context.`
      }))
    };
  },
  
  generateStudyGuide: async (documentText: string): Promise<StudyGuideGenerationResult> => {
    console.log('Mock generating study guide from document:', documentText.substring(0, 100) + '...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      title: 'Mock Study Guide',
      content: `
        <h1>Mock Study Guide</h1>
        
        <h2>Introduction</h2>
        <p>This is a mock study guide that would be generated from the document content. In a real implementation, this would contain comprehensive information extracted and organized by the LLM.</p>
        
        <h2>Key Concepts</h2>
        <h3>1. First Concept</h3>
        <p>Explanation of the first important concept from the document with examples and clarifications.</p>
        
        <h3>2. Second Concept</h3>
        <p>Details about the second concept including its significance and applications.</p>
        
        <h2>Important Definitions</h2>
        <ul>
          <li><strong>Term 1:</strong> Definition of the first term</li>
          <li><strong>Term 2:</strong> Definition of the second term</li>
          <li><strong>Term 3:</strong> Definition of the third term</li>
        </ul>
        
        <h2>Summary</h2>
        <p>A concise summary of all the material covered in this study guide, highlighting the most important points to remember.</p>
      `
    };
  },
  
  processFeedback: async (originalContent: string, feedback: string): Promise<FeedbackProcessingResult> => {
    console.log('Mock processing feedback:', feedback);
    console.log('Original content:', originalContent.substring(0, 100) + '...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      updatedContent: originalContent + '\n\n[This content would be updated based on the feedback: ' + feedback + ']',
      changes: [
        'Added clarification based on feedback',
        'Corrected information as requested',
        'Expanded explanation of the concept'
      ]
    };
  },
  
  transcribeAudio: async (audioBlob: Blob): Promise<string> => {
    console.log('Mock transcribing audio of size:', audioBlob.size);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return 'This is a mock transcription of the audio recording. In a real implementation, this would be the text converted from speech using a speech-to-text service.';
  }
};
