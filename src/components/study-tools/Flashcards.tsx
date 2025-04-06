'use client';

import React, { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full bg-white border border-gray-300 rounded-lg p-6 shadow-sm backface-hidden">
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-xl text-center">{front}</p>
          </div>
        </div>
        <div className="absolute w-full h-full bg-indigo-50 border border-indigo-200 rounded-lg p-6 shadow-sm backface-hidden rotate-y-180">
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-xl text-center">{back}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FlashcardsProps {
  flashcards?: Array<{ front: string; back: string }>;
  documentId?: string;
}

const Flashcards: React.FC<FlashcardsProps> = ({ 
  flashcards = [],
  documentId
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  
  // Sample flashcards if none provided
  const cards = flashcards.length > 0 ? flashcards : [
    { front: 'What is a Large Language Model?', back: 'A type of AI model trained on vast amounts of text data to understand and generate human-like language.' },
    { front: 'What is Next.js?', back: 'A React framework for building server-side rendered and statically generated web applications.' },
    { front: 'What is Notability?', back: 'A popular note-taking app that combines handwriting, photos, typing, and audio in a single note.' }
  ];
  
  const goToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const goToPrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const addNewCard = () => {
    if (newFront.trim() && newBack.trim()) {
      // In a real implementation, this would call an API to save the new flashcard
      alert(`New flashcard would be saved: Front: ${newFront}, Back: ${newBack}`);
      setNewFront('');
      setNewBack('');
      setEditMode(false);
    }
  };
  
  const generateFlashcards = () => {
    // In a real implementation, this would call the LLM API to generate flashcards
    alert('This would call the LLM API to generate flashcards from the document');
  };
  
  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white">
      <div className="bg-gray-100 p-3 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-medium">Flashcards</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setEditMode(!editMode)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            {editMode ? 'Cancel' : 'Add Card'}
          </button>
          <button 
            onClick={generateFlashcards}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Generate from Document
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {editMode ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Add New Flashcard</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Front</label>
              <textarea
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Enter the question or term"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Back</label>
              <textarea
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Enter the answer or definition"
              />
            </div>
            <button
              onClick={addNewCard}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Card
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-8">
              <Flashcard 
                front={cards[currentIndex].front} 
                back={cards[currentIndex].back} 
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPrevCard}
                disabled={currentIndex === 0}
                className={`p-2 rounded-full ${currentIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="text-sm text-gray-600">
                {currentIndex + 1} of {cards.length}
              </span>
              <button
                onClick={goToNextCard}
                disabled={currentIndex === cards.length - 1}
                className={`p-2 rounded-full ${currentIndex === cards.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
