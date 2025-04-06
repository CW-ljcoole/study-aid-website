'use client';

import React, { useState } from 'react';
import FeedbackButton from '@/components/feedback/FeedbackButton';

interface QuizQuestionWithFeedbackProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  onFeedbackProcessed?: (updatedQuestion: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }) => void;
}

const QuizQuestionWithFeedback: React.FC<QuizQuestionWithFeedbackProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
  onFeedbackProcessed
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const [currentOptions, setCurrentOptions] = useState(options);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState(correctAnswer);
  const [currentExplanation, setCurrentExplanation] = useState(explanation);
  
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };
  
  const handleFeedbackProcessed = (updatedContent: string) => {
    try {
      // Try to parse the updated content as a quiz question
      // This assumes the LLM returns content in a format we can parse
      const lines = updatedContent.split('\n');
      let newQuestion = currentQuestion;
      let newOptions = [...currentOptions];
      let newCorrectAnswer = currentCorrectAnswer;
      let newExplanation = currentExplanation;
      
      let optionsStarted = false;
      let optionIndex = 0;
      
      for (const line of lines) {
        if (line.toLowerCase().startsWith('question:')) {
          newQuestion = line.substring(9).trim();
        } else if (line.toLowerCase().startsWith('options:')) {
          optionsStarted = true;
        } else if (optionsStarted && line.match(/^[A-D][\)\.:]/) && optionIndex < 4) {
          newOptions[optionIndex] = line.replace(/^[A-D][\)\.:]/, '').trim();
          optionIndex++;
        } else if (line.toLowerCase().startsWith('correct answer:')) {
          const answerLetter = line.substring(15).trim().charAt(0).toUpperCase();
          newCorrectAnswer = 'ABCD'.indexOf(answerLetter);
          if (newCorrectAnswer === -1) newCorrectAnswer = currentCorrectAnswer;
        } else if (line.toLowerCase().startsWith('explanation:')) {
          newExplanation = line.substring(12).trim();
        }
      }
      
      setCurrentQuestion(newQuestion);
      setCurrentOptions(newOptions);
      setCurrentCorrectAnswer(newCorrectAnswer);
      setCurrentExplanation(newExplanation);
      
      if (onFeedbackProcessed) {
        onFeedbackProcessed({
          question: newQuestion,
          options: newOptions,
          correctAnswer: newCorrectAnswer,
          explanation: newExplanation
        });
      }
    } catch (error) {
      console.error('Error parsing updated quiz question content:', error);
    }
  };
  
  const originalContent = `Question: ${currentQuestion}\nOptions:\nA) ${currentOptions[0]}\nB) ${currentOptions[1]}\nC) ${currentOptions[2]}\nD) ${currentOptions[3]}\nCorrect Answer: ${String.fromCharCode(65 + currentCorrectAnswer)}\nExplanation: ${currentExplanation || ''}`;
  
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white relative">
      <h3 className="text-lg font-medium mb-4">{currentQuestion}</h3>
      
      <div className="space-y-3 mb-4">
        {currentOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
            className={`w-full text-left p-3 rounded-lg border ${
              selectedAnswer === null
                ? 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
                : selectedAnswer === index
                  ? index === currentCorrectAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : index === currentCorrectAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 opacity-70'
            }`}
            disabled={selectedAnswer !== null}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {selectedAnswer !== null && index === currentCorrectAnswer && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {selectedAnswer === index && index !== currentCorrectAnswer && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-red-500">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {showExplanation && currentExplanation && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-1">Explanation:</h4>
          <p className="text-blue-700">{currentExplanation}</p>
        </div>
      )}
      
      <div className="absolute top-2 right-2">
        <FeedbackButton 
          originalContent={originalContent}
          contentType="quiz"
          onFeedbackProcessed={handleFeedbackProcessed}
          className="text-xs"
        />
      </div>
    </div>
  );
};

export default QuizQuestionWithFeedback;
