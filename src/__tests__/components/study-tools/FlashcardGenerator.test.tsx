import { render, screen, fireEvent } from '@testing-library/react';
import FlashcardGenerator from '@/components/study-tools/FlashcardGenerator';
import { llmProcessor } from '@/lib/llm';

// Mock the llmProcessor
jest.mock('@/lib/llm', () => ({
  llmProcessor: {
    generateFlashcards: jest.fn()
  }
}));

describe('FlashcardGenerator', () => {
  const mockDocumentText = 'This is a sample document text for testing.';
  const mockGenerationResult = {
    flashcards: [
      { front: 'Question 1', back: 'Answer 1' },
      { front: 'Question 2', back: 'Answer 2' },
      { front: 'Question 3', back: 'Answer 3' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<FlashcardGenerator documentText={mockDocumentText} />);
    
    expect(screen.getByText('Flashcard Generator')).toBeInTheDocument();
    expect(screen.getByText('Number of Flashcards')).toBeInTheDocument();
    expect(screen.getByText('Generate Flashcards')).toBeInTheDocument();
  });

  it('shows error when generating with empty document text', () => {
    render(<FlashcardGenerator documentText="" />);
    
    fireEvent.click(screen.getByText('Generate Flashcards'));
    
    expect(screen.getByText('No document text provided for flashcard generation')).toBeInTheDocument();
  });

  it('generates flashcards and displays results', async () => {
    // Mock the generateFlashcards function to return a successful result
    (llmProcessor.generateFlashcards as jest.Mock).mockResolvedValue(mockGenerationResult);
    
    render(<FlashcardGenerator documentText={mockDocumentText} />);
    
    // Change the card count
    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '15' } });
    
    fireEvent.click(screen.getByText('Generate Flashcards'));
    
    // Wait for the generation to complete
    expect(await screen.findByText('Generated Flashcards (3)')).toBeInTheDocument();
    expect(screen.getByText('Front: Question 1')).toBeInTheDocument();
    expect(screen.getByText('Back: Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Front: Question 2')).toBeInTheDocument();
    expect(screen.getByText('Back: Answer 2')).toBeInTheDocument();
    expect(screen.getByText('Front: Question 3')).toBeInTheDocument();
    expect(screen.getByText('Back: Answer 3')).toBeInTheDocument();
    
    // Verify that the generateFlashcards function was called with the correct arguments
    expect(llmProcessor.generateFlashcards).toHaveBeenCalledWith(mockDocumentText, 15);
  });

  it('handles generation error', async () => {
    // Mock the generateFlashcards function to throw an error
    (llmProcessor.generateFlashcards as jest.Mock).mockRejectedValue(new Error('Generation failed'));
    
    render(<FlashcardGenerator documentText={mockDocumentText} />);
    
    fireEvent.click(screen.getByText('Generate Flashcards'));
    
    // Wait for the error message to appear
    expect(await screen.findByText('Failed to generate flashcards. Please try again.')).toBeInTheDocument();
  });

  it('calls onGenerationComplete callback when generation is successful', async () => {
    // Mock the generateFlashcards function to return a successful result
    (llmProcessor.generateFlashcards as jest.Mock).mockResolvedValue(mockGenerationResult);
    
    const mockOnGenerationComplete = jest.fn();
    
    render(
      <FlashcardGenerator 
        documentText={mockDocumentText} 
        onGenerationComplete={mockOnGenerationComplete} 
      />
    );
    
    fireEvent.click(screen.getByText('Generate Flashcards'));
    
    // Wait for the generation to complete
    await screen.findByText('Generated Flashcards (3)');
    
    // Verify that the callback was called with the correct arguments
    expect(mockOnGenerationComplete).toHaveBeenCalledWith(mockGenerationResult);
  });
});
