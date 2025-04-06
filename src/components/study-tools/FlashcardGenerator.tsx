'use client';

import React, { useState } from 'react';
import { llmProcessor } from '@/lib/llm';
import type { FlashcardGenerationResult } from '@/lib/llm';

interface FlashcardGeneratorProps {
  documentId?: string;
  documentText: string;
  onGenerationComplete?: (result: FlashcardGenerationResult) => void;
}

const FlashcardGenerator: React.FC<FlashcardGeneratorProps> = ({
  documentId,
  documentText,
  onGenerationComplete
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardCount, setCardCount] = useState(10);
  const [generationResult, setGenerationResult] = useState<FlashcardGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateFlashcards = async () => {
    if (!documentText.trim()) {
      setError('No document text provided for flashcard generation');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await llmProcessor.generateFlashcards(documentText, cardCount);
      setGenerationResult(result);
      if (onGenerationComplete) {
        onGenerationComplete(result);
      }
    } catch (err) {
      console.error('Error generating flashcards:', err);
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium mb-4">Flashcard Generator</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="card-count" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Flashcards
        </label>
        <div className="flex items-center">
          <input
            id="card-count"
            type="range"
            min="5"
            max="30"
            value={cardCount}
            onChange={(e) => setCardCount(parseInt(e.target.value))}
            className="w-full mr-4"
          />
          <span className="text-gray-700 w-8 text-center">{cardCount}</span>
        </div>
      </div>
      
      <button
        onClick={generateFlashcards}
        disabled={isGenerating}
        className={`px-4 py-2 rounded-md ${
          isGenerating
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Flashcards'
        )}
      </button>
      
      {generationResult && generationResult.flashcards.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Generated Flashcards ({generationResult.flashcards.length})</h4>
          
          <div className="space-y-3 max-h-80 overflow-y-auto p-2">
            {generationResult.flashcards.map((card, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                <div className="font-medium mb-2">Front: {card.front}</div>
                <div className="text-gray-600">Back: {card.back}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardGenerator;
