'use client';

import React, { useState } from 'react';
import { llmProcessor } from '@/lib/llm';
import type { DocumentProcessingResult } from '@/lib/llm';

interface DocumentProcessorProps {
  documentId?: string;
  documentText: string;
  onProcessingComplete?: (result: DocumentProcessingResult) => void;
}

const DocumentProcessor: React.FC<DocumentProcessorProps> = ({
  documentId,
  documentText,
  onProcessingComplete
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<DocumentProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processDocument = async () => {
    if (!documentText.trim()) {
      setError('No document text provided for processing');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await llmProcessor.processDocument(documentText);
      setProcessingResult(result);
      if (onProcessingComplete) {
        onProcessingComplete(result);
      }
    } catch (err) {
      console.error('Error processing document:', err);
      setError('Failed to process document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium mb-4">Document Processing</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      <button
        onClick={processDocument}
        disabled={isProcessing}
        className={`px-4 py-2 rounded-md ${
          isProcessing
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Process Document'
        )}
      </button>
      
      {processingResult && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Processing Results</h4>
          
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-1">Summary</h5>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{processingResult.summary}</p>
          </div>
          
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-1">Key Points</h5>
            <ul className="list-disc pl-5 space-y-1">
              {processingResult.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-600">{point}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1">Suggested Topics</h5>
            <div className="flex flex-wrap gap-2">
              {processingResult.suggestedTopics.map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentProcessor;
