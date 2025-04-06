'use client';

import React, { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions?: QuizQuestion[];
  documentId?: string;
  title?: string;
}

const Quiz: React.FC<QuizProps> = ({ 
  questions = [],
  documentId,
  title = 'Study Quiz'
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Sample questions if none provided
  const quizQuestions = questions.length > 0 ? questions : [
    {
      question: 'What is the primary purpose of a Large Language Model?',
      options: [
        'To process images and identify objects',
        'To understand and generate human-like text',
        'To create 3D models from text descriptions',
        'To translate audio between languages'
      ],
      correctAnswer: 1,
      explanation: 'Large Language Models (LLMs) are designed to understand and generate human-like text based on the patterns they learned during training on vast amounts of text data.'
    },
    {
      question: 'Which of the following is a key feature of Notability?',
      options: [
        'Video editing',
        'Spreadsheet calculations',
        'Handwriting recognition with audio recording',
        ' 3D modeling'
      ],
      correctAnswer: 2,
      explanation: 'Notability is known for its handwriting recognition capabilities combined with synchronized audio recording, allowing users to take notes while recording lectures or meetings.'
    },
    {
      question: 'What is Next.js primarily used for?',
      options: [
        'Mobile app development',
        'Desktop application development',
        'Game development',
        'React-based web application development'
      ],
      correctAnswer: 3,
      explanation: 'Next.js is a React framework for building web applications with features like server-side rendering, static site generation, and API routes.'
    }
  ];
  
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
  };
  
  const generateQuiz = () => {
    // In a real implementation, this would call the LLM API to generate a quiz
    alert('This would call the LLM API to generate a quiz from the document');
  };
  
  if (quizQuestions.length === 0) {
    return (
      <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white p-6 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Quiz Available</h3>
        <p className="text-gray-500 text-center mb-4">Generate a quiz from your study materials to test your knowledge.</p>
        <button 
          onClick={generateQuiz}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Generate Quiz
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white">
      <div className="bg-gray-100 p-3 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-medium">{title}</h2>
        <button 
          onClick={generateQuiz}
          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Generate New Quiz
        </button>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {quizCompleted ? (
          <div className="text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500 mb-4">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 className="text-2xl font-bold">Quiz Completed!</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-lg">Your score:</p>
              <p className="text-3xl font-bold text-indigo-600">{score} / {quizQuestions.length}</p>
              <p className="text-gray-600 mt-2">
                {score === quizQuestions.length 
                  ? 'Perfect score! Excellent work!' 
                  : score >= quizQuestions.length / 2 
                    ? 'Good job! Keep studying to improve further.' 
                    : 'Keep studying and try again to improve your score.'}
              </p>
            </div>
            
            <button
              onClick={restartQuiz}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span className="text-sm font-medium text-indigo-600">Score: {score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">{quizQuestions[currentQuestion].question}</h3>
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selectedAnswer === null
                        ? 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
                        : selectedAnswer === index
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : index === quizQuestions[currentQuestion].correctAnswer
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
                      {selectedAnswer !== null && index === quizQuestions[currentQuestion].correctAnswer && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-green-500">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-red-500">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {showExplanation && quizQuestions[currentQuestion].explanation && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Explanation:</h4>
                <p className="text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
              </div>
            )}
            
            {selectedAnswer !== null && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
