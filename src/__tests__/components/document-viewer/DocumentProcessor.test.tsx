import { render, screen, fireEvent } from '@testing-library/react';
import DocumentProcessor from '@/components/document-viewer/DocumentProcessor';
import { llmProcessor } from '@/lib/llm';

// Mock the llmProcessor
jest.mock('@/lib/llm', () => ({
  llmProcessor: {
    processDocument: jest.fn()
  }
}));

describe('DocumentProcessor', () => {
  const mockDocumentText = 'This is a sample document text for testing.';
  const mockProcessingResult = {
    summary: 'Test summary',
    keyPoints: ['Point 1', 'Point 2'],
    suggestedTopics: ['Topic 1', 'Topic 2']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<DocumentProcessor documentText={mockDocumentText} />);
    
    expect(screen.getByText('Document Processing')).toBeInTheDocument();
    expect(screen.getByText('Process Document')).toBeInTheDocument();
  });

  it('shows error when processing with empty document text', () => {
    render(<DocumentProcessor documentText="" />);
    
    fireEvent.click(screen.getByText('Process Document'));
    
    expect(screen.getByText('No document text provided for processing')).toBeInTheDocument();
  });

  it('processes document and displays results', async () => {
    // Mock the processDocument function to return a successful result
    (llmProcessor.processDocument as jest.Mock).mockResolvedValue(mockProcessingResult);
    
    render(<DocumentProcessor documentText={mockDocumentText} />);
    
    fireEvent.click(screen.getByText('Process Document'));
    
    // Wait for the processing to complete
    expect(await screen.findByText('Processing Results')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();
    expect(screen.getByText('Key Points')).toBeInTheDocument();
    expect(screen.getByText('Point 1')).toBeInTheDocument();
    expect(screen.getByText('Point 2')).toBeInTheDocument();
    expect(screen.getByText('Suggested Topics')).toBeInTheDocument();
    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Topic 2')).toBeInTheDocument();
    
    // Verify that the processDocument function was called with the correct arguments
    expect(llmProcessor.processDocument).toHaveBeenCalledWith(mockDocumentText);
  });

  it('handles processing error', async () => {
    // Mock the processDocument function to throw an error
    (llmProcessor.processDocument as jest.Mock).mockRejectedValue(new Error('Processing failed'));
    
    render(<DocumentProcessor documentText={mockDocumentText} />);
    
    fireEvent.click(screen.getByText('Process Document'));
    
    // Wait for the error message to appear
    expect(await screen.findByText('Failed to process document. Please try again.')).toBeInTheDocument();
  });

  it('calls onProcessingComplete callback when processing is successful', async () => {
    // Mock the processDocument function to return a successful result
    (llmProcessor.processDocument as jest.Mock).mockResolvedValue(mockProcessingResult);
    
    const mockOnProcessingComplete = jest.fn();
    
    render(
      <DocumentProcessor 
        documentText={mockDocumentText} 
        onProcessingComplete={mockOnProcessingComplete} 
      />
    );
    
    fireEvent.click(screen.getByText('Process Document'));
    
    // Wait for the processing to complete
    await screen.findByText('Processing Results');
    
    // Verify that the callback was called with the correct arguments
    expect(mockOnProcessingComplete).toHaveBeenCalledWith(mockProcessingResult);
  });
});
