'use client';

import React, { useState } from 'react';
import FeedbackButton from '@/components/feedback/FeedbackButton';

interface FlashcardWithFeedbackProps {
  front: string;
  back: string;
  onFeedbackProcessed?: (updatedFlashcard: { front: string; back: string }) => void;
}

const FlashcardWithFeedback: React.FC<FlashcardWithFeedbackProps> = ({ 
  front, 
  back,
  onFeedbackProcessed
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentFront, setCurrentFront] = useState(front);
  const [currentBack, setCurrentBack] = useState(back);
  
  const handleFeedbackProcessed = (updatedContent: string) => {
    try {
      // Try to parse the updated content as a flashcard
      // This assumes the LLM returns content in a format we can parse
      const lines = updatedContent.split('\n');
      let newFront = currentFront;
      let newBack = currentBack;
      
      for (const line of lines) {
        if (line.toLowerCase().startsWith('front:')) {
          newFront = line.substring(6).trim();
        } else if (line.toLowerCase().startsWith('back:')) {
          newBack = line.substring(5).trim();
        }
      }
      
      setCurrentFront(newFront);
      setCurrentBack(newBack);
      
      if (onFeedbackProcessed) {
        onFeedbackProcessed({ front: newFront, back: newBack });
      }
    } catch (error) {
      console.error('Error parsing updated flashcard content:', error);
    }
  };
  
  const originalContent = `Front: ${currentFront}\nBack: ${currentBack}`;
  
  return (
    <div className="relative">
      <div 
        className="relative w-full h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full bg-white border border-gray-300 rounded-lg p-6 shadow-sm backface-hidden">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-xl text-center">{currentFront}</p>
            </div>
          </div>
          <div className="absolute w-full h-full bg-indigo-50 border border-indigo-200 rounded-lg p-6 shadow-sm backface-hidden rotate-y-180">
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-xl text-center">{currentBack}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2">
        <FeedbackButton 
          originalContent={originalContent}
          contentType="flashcard"
          onFeedbackProcessed={handleFeedbackProcessed}
          className="text-xs bg-white bg-opacity-80 px-2 py-1 rounded"
        />
      </div>
    </div>
  );
};

export default FlashcardWithFeedback;
