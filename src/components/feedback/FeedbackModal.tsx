'use client';

import React, { useState } from 'react';
import FeedbackProcessor from '@/components/feedback/FeedbackProcessor';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalContent: string;
  contentType: 'flashcard' | 'quiz' | 'studyguide';
  onFeedbackProcessed?: (updatedContent: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  originalContent,
  contentType,
  onFeedbackProcessed
}) => {
  if (!isOpen) return null;

  const handleFeedbackProcessed = (result: any) => {
    if (onFeedbackProcessed) {
      onFeedbackProcessed(result.updatedContent);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Provide Feedback</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Original Content</h3>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md max-h-40 overflow-y-auto">
              <div className="whitespace-pre-wrap">{originalContent}</div>
            </div>
          </div>
          
          <FeedbackProcessor 
            originalContent={originalContent}
            contentType={contentType}
            onFeedbackProcessed={handleFeedbackProcessed}
          />
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
