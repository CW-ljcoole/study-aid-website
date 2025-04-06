'use client';

import React, { useState } from 'react';
import { llmProcessor } from '@/lib/llm';
import type { FeedbackProcessingResult } from '@/lib/llm';

interface FeedbackProcessorProps {
  originalContent: string;
  contentType: 'flashcard' | 'quiz' | 'studyguide';
  onFeedbackProcessed?: (result: FeedbackProcessingResult) => void;
}

const FeedbackProcessor: React.FC<FeedbackProcessorProps> = ({
  originalContent,
  contentType,
  onFeedbackProcessed
}) => {
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<FeedbackProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFeedback = async () => {
    if (!feedback.trim()) {
      setError('Please provide feedback before submitting');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await llmProcessor.processFeedback(originalContent, feedback);
      setProcessingResult(result);
      if (onFeedbackProcessed) {
        onFeedbackProcessed(result);
      }
    } catch (err) {
      console.error('Error processing feedback:', err);
      setError('Failed to process feedback. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const contentTypeLabel = {
    flashcard: 'flashcard',
    quiz: 'quiz question',
    studyguide: 'study guide'
  }[contentType];

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium mb-4">Provide Feedback</h3>
      
      <div className="mb-4">
        <p className="text-gray-600 text-sm mb-2">
          How would you like to improve this {contentTypeLabel}? Your feedback will be used to refine the content.
        </p>
        
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={`e.g., "Please make this ${contentTypeLabel} more concise" or "Add more details about..."`}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
        />
        
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
      
      <button
        onClick={processFeedback}
        disabled={isProcessing || !feedback.trim()}
        className={`px-4 py-2 rounded-md ${
          isProcessing || !feedback.trim()
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
          'Submit Feedback'
        )}
      </button>
      
      {processingResult && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Updated Content</h4>
          
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mb-4">
            <div className="whitespace-pre-wrap">{processingResult.updatedContent}</div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1">Changes Made</h5>
            <ul className="list-disc pl-5 space-y-1">
              {processingResult.changes.map((change, index) => (
                <li key={index} className="text-gray-600">{change}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackProcessor;
