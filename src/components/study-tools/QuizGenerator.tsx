'use client';

import React, { useState } from 'react';
import { llmProcessor } from '@/lib/llm';
import type { QuizGenerationResult } from '@/lib/llm';

interface QuizGeneratorProps {
  documentId?: string;
  documentText: string;
  onGenerationComplete?: (result: QuizGenerationResult) => void;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({
  documentId,
  documentText,
  onGenerationComplete
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [generationResult, setGenerationResult] = useState<QuizGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = async () => {
    if (!documentText.trim()) {
      setError('No document text provided for quiz generation');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await llmProcessor.generateQuiz(documentText, questionCount);
      setGenerationResult(result);
      if (onGenerationComplete) {
        onGenerationComplete(result);
      }
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium mb-4">Quiz Generator</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="question-count" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Questions
        </label>
        <div className="flex items-center">
          <input
            id="question-count"
            type="range"
            min="3"
            max="15"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full mr-4"
          />
          <span className="text-gray-700 w-8 text-center">{questionCount}</span>
        </div>
      </div>
      
      <button
        onClick={generateQuiz}
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
          'Generate Quiz'
        )}
      </button>
      
      {generationResult && generationResult.questions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Generated Quiz ({generationResult.questions.length} questions)</h4>
          
          <div className="space-y-4 max-h-80 overflow-y-auto p-2">
            {generationResult.questions.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                <div className="font-medium mb-2">Q{index + 1}: {question.question}</div>
                <div className="space-y-1 mb-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-start">
                      <span className={`inline-block w-5 h-5 flex-shrink-0 rounded-full border mr-2 ${
                        optIndex === question.correctAnswer 
                          ? 'bg-green-100 border-green-500 text-green-700' 
                          : 'border-gray-300'
                      } flex items-center justify-center text-xs font-medium`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className={optIndex === question.correctAnswer ? 'text-green-700 font-medium' : ''}>
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 border-t border-gray-200 pt-2 mt-2">
                  <span className="font-medium">Explanation:</span> {question.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
