import { llmService } from '@/lib/llm/llmService';

describe('LLM Service', () => {
  // Mock fetch for API calls
  global.fetch = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'Mock LLM response' } }] })
    });
  });
  
  describe('processDocument', () => {
    const mockDocumentText = 'This is a sample document for testing.';
    const mockApiResponse = `
      1. Summary
      This is a mock summary of the document.
      
      2. Key Points
      - First key point
      - Second key point
      
      3. Suggested Topics
      - Topic 1
      - Topic 2
    `;
    
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ choices: [{ message: { content: mockApiResponse } }] })
      });
    });
    
    it('processes document text and returns structured data', async () => {
      const result = await llmService.processDocument(mockDocumentText);
      
      expect(result).toHaveProperty('summary');
      expect(result).toHaveProperty('keyPoints');
      expect(result).toHaveProperty('suggestedTopics');
      expect(result.keyPoints).toBeInstanceOf(Array);
      expect(result.suggestedTopics).toBeInstanceOf(Array);
    });
    
    it('handles API errors gracefully', async () => {
      // Mock API error
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));
      
      await expect(llmService.processDocument(mockDocumentText)).rejects.toThrow('Failed to process document with LLM');
    });
  });
  
  describe('generateFlashcards', () => {
    const mockDocumentText = 'This is a sample document for testing.';
    const mockApiResponse = `
      [
        {"front": "Question 1", "back": "Answer 1"},
        {"front": "Question 2", "back": "Answer 2"}
      ]
    `;
    
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ choices: [{ message: { content: mockApiResponse } }] })
      });
    });
    
    it('generates flashcards from document text', async () => {
      const result = await llmService.generateFlashcards(mockDocumentText, 2);
      
      expect(result).toHaveProperty('flashcards');
      expect(result.flashcards).toBeInstanceOf(Array);
      expect(result.flashcards.length).toBe(2);
      expect(result.flashcards[0]).toHaveProperty('front');
      expect(result.flashcards[0]).toHaveProperty('back');
    });
    
    it('respects the count parameter', async () => {
      await llmService.generateFlashcards(mockDocumentText, 5);
      
      // Check that the prompt includes the requested count
      const promptArg = (global.fetch as jest.Mock).mock.calls[0][1].body;
      expect(promptArg).toContain('Create 5 flashcards');
    });
  });
  
  describe('generateQuiz', () => {
    const mockDocumentText = 'This is a sample document for testing.';
    const mockApiResponse = `
      [
        {
          "question": "Test question 1?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 2,
          "explanation": "Explanation for question 1"
        },
        {
          "question": "Test question 2?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation for question 2"
        }
      ]
    `;
    
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ choices: [{ message: { content: mockApiResponse } }] })
      });
    });
    
    it('generates quiz questions from document text', async () => {
      const result = await llmService.generateQuiz(mockDocumentText, 2);
      
      expect(result).toHaveProperty('questions');
      expect(result.questions).toBeInstanceOf(Array);
      expect(result.questions.length).toBe(2);
      expect(result.questions[0]).toHaveProperty('question');
      expect(result.questions[0]).toHaveProperty('options');
      expect(result.questions[0]).toHaveProperty('correctAnswer');
      expect(result.questions[0]).toHaveProperty('explanation');
    });
  });
  
  describe('processFeedback', () => {
    const mockOriginalContent = 'This is the original content.';
    const mockFeedback = 'Please make this more concise.';
    const mockApiResponse = `
      UPDATED CONTENT:
      This is more concise content.
      
      CHANGES:
      - Made content more concise
      - Removed unnecessary words
    `;
    
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ choices: [{ message: { content: mockApiResponse } }] })
      });
    });
    
    it('processes feedback and returns updated content with changes', async () => {
      const result = await llmService.processFeedback(mockOriginalContent, mockFeedback);
      
      expect(result).toHaveProperty('updatedContent');
      expect(result).toHaveProperty('changes');
      expect(result.changes).toBeInstanceOf(Array);
      expect(result.updatedContent).toBe('This is more concise content.');
      expect(result.changes).toContain('Made content more concise');
    });
  });
});
