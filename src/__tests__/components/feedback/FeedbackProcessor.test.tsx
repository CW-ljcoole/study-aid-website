import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackProcessor from '@/components/feedback/FeedbackProcessor';
import { llmProcessor } from '@/lib/llm';

// Mock the llmProcessor
jest.mock('@/lib/llm', () => ({
  llmProcessor: {
    processFeedback: jest.fn()
  }
}));

describe('FeedbackProcessor', () => {
  const mockOriginalContent = 'This is the original content that needs feedback.';
  const mockFeedback = 'Please make this more concise and add more details about the key concepts.';
  const mockProcessingResult = {
    updatedContent: 'This is the updated content with more concise language and additional details about key concepts.',
    changes: [
      'Made content more concise',
      'Added details about key concepts'
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(
      <FeedbackProcessor 
        originalContent={mockOriginalContent} 
        contentType="flashcard" 
      />
    );
    
    expect(screen.getByText('Provide Feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g., "Please make this flashcard more concise"/)).toBeInTheDocument();
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument();
  });

  it('shows error when submitting with empty feedback', () => {
    render(
      <FeedbackProcessor 
        originalContent={mockOriginalContent} 
        contentType="quiz" 
      />
    );
    
    fireEvent.click(screen.getByText('Submit Feedback'));
    
    expect(screen.getByText('Please provide feedback before submitting')).toBeInTheDocument();
  });

  it('processes feedback and displays results', async () => {
    // Mock the processFeedback function to return a successful result
    (llmProcessor.processFeedback as jest.Mock).mockResolvedValue(mockProcessingResult);
    
    render(
      <FeedbackProcessor 
        originalContent={mockOriginalContent} 
        contentType="studyguide" 
      />
    );
    
    // Enter feedback
    const feedbackInput = screen.getByPlaceholderText(/e.g., "Please make this study guide more concise"/);
    fireEvent.change(feedbackInput, { target: { value: mockFeedback } });
    
    fireEvent.click(screen.getByText('Submit Feedback'));
    
    // Wait for the processing to complete
    expect(await screen.findByText('Updated Content')).toBeInTheDocument();
    expect(screen.getByText('Changes Made')).toBeInTheDocument();
    expect(screen.getByText('Made content more concise')).toBeInTheDocument();
    expect(screen.getByText('Added details about key concepts')).toBeInTheDocument();
    expect(screen.getByText(mockProcessingResult.updatedContent)).toBeInTheDocument();
    
    // Verify that the processFeedback function was called with the correct arguments
    expect(llmProcessor.processFeedback).toHaveBeenCalledWith(mockOriginalContent, mockFeedback);
  });

  it('handles processing error', async () => {
    // Mock the processFeedback function to throw an error
    (llmProcessor.processFeedback as jest.Mock).mockRejectedValue(new Error('Processing failed'));
    
    render(
      <FeedbackProcessor 
        originalContent={mockOriginalContent} 
        contentType="flashcard" 
      />
    );
    
    // Enter feedback
    const feedbackInput = screen.getByPlaceholderText(/e.g., "Please make this flashcard more concise"/);
    fireEvent.change(feedbackInput, { target: { value: mockFeedback } });
    
    fireEvent.click(screen.getByText('Submit Feedback'));
    
    // Wait for the error message to appear
    expect(await screen.findByText('Failed to process feedback. Please try again.')).toBeInTheDocument();
  });

  it('calls onFeedbackProcessed callback when processing is successful', async () => {
    // Mock the processFeedback function to return a successful result
    (llmProcessor.processFeedback as jest.Mock).mockResolvedValue(mockProcessingResult);
    
    const mockOnFeedbackProcessed = jest.fn();
    
    render(
      <FeedbackProcessor 
        originalContent={mockOriginalContent} 
        contentType="quiz" 
        onFeedbackProcessed={mockOnFeedbackProcessed} 
      />
    );
    
    // Enter feedback
    const feedbackInput = screen.getByPlaceholderText(/e.g., "Please make this quiz question more concise"/);
    fireEvent.change(feedbackInput, { target: { value: mockFeedback } });
    
    fireEvent.click(screen.getByText('Submit Feedback'));
    
    // Wait for the processing to complete
    await screen.findByText('Updated Content');
    
    // Verify that the callback was called with the correct arguments
    expect(mockOnFeedbackProcessed).toHaveBeenCalledWith(mockProcessingResult);
  });
});
