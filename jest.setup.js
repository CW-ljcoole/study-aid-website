import '@testing-library/jest-dom';

// Mock the global fetch
global.fetch = jest.fn();

// Mock the LLM processor
jest.mock('@/lib/llm', () => ({
  llmProcessor: {
    processDocument: jest.fn(),
    generateFlashcards: jest.fn(),
    generateQuiz: jest.fn(),
    generateStudyGuide: jest.fn(),
    processFeedback: jest.fn(),
    transcribeAudio: jest.fn(),
  }
}));

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
