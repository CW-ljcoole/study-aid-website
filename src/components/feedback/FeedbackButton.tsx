'use client';

import React, { useState } from 'react';
import FeedbackModal from '@/components/feedback/FeedbackModal';

interface FeedbackButtonProps {
  originalContent: string;
  contentType: 'flashcard' | 'quiz' | 'studyguide';
  onFeedbackProcessed?: (updatedContent: string) => void;
  className?: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  originalContent,
  contentType,
  onFeedbackProcessed,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeedbackProcessed = (updatedContent: string) => {
    if (onFeedbackProcessed) {
      onFeedbackProcessed(updatedContent);
    }
    // Don't close the modal automatically so user can see the changes
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`flex items-center text-indigo-600 hover:text-indigo-800 ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Provide Feedback
      </button>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        originalContent={originalContent}
        contentType={contentType}
        onFeedbackProcessed={handleFeedbackProcessed}
      />
    </>
  );
};

export default FeedbackButton;
