'use client';

import React, { useState } from 'react';

interface StudyToolsProps {
  children: React.ReactNode;
}

const StudyToolsContainer: React.FC<StudyToolsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz' | 'guide'>('flashcards');
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200">
        <nav className="flex space-x-4 px-4">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`py-4 px-2 text-sm font-medium border-b-2 ${
              activeTab === 'flashcards' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-4 px-2 text-sm font-medium border-b-2 ${
              activeTab === 'quiz' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-4 px-2 text-sm font-medium border-b-2 ${
              activeTab === 'guide' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Study Guides
          </button>
        </nav>
      </div>
      
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default StudyToolsContainer;
