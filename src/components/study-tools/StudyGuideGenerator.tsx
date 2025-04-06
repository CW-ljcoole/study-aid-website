'use client';

import React, { useState } from 'react';
import { llmProcessor } from '@/lib/llm';
import type { StudyGuideGenerationResult } from '@/lib/llm';

interface StudyGuideGeneratorProps {
  documentId?: string;
  documentText: string;
  onGenerationComplete?: (result: StudyGuideGenerationResult) => void;
}

const StudyGuideGenerator: React.FC<StudyGuideGeneratorProps> = ({
  documentId,
  documentText,
  onGenerationComplete
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<StudyGuideGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateStudyGuide = async () => {
    if (!documentText.trim()) {
      setError('No document text provided for study guide generation');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await llmProcessor.generateStudyGuide(documentText);
      setGenerationResult(result);
      if (onGenerationComplete) {
        onGenerationComplete(result);
      }
    } catch (err) {
      console.error('Error generating study guide:', err);
      setError('Failed to generate study guide. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium mb-4">Study Guide Generator</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      <button
        onClick={generateStudyGuide}
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
          'Generate Study Guide'
        )}
      </button>
      
      {generationResult && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Generated Study Guide</h4>
          
          <div className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">{generationResult.title}</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: generationResult.content }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGuideGenerator;
