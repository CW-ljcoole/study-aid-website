'use client';

import React, { useState } from 'react';
import FeedbackButton from '@/components/feedback/FeedbackButton';

interface StudyGuideWithFeedbackProps {
  title: string;
  content: string;
  onFeedbackProcessed?: (updatedGuide: { title: string; content: string }) => void;
}

const StudyGuideWithFeedback: React.FC<StudyGuideWithFeedbackProps> = ({
  title,
  content,
  onFeedbackProcessed
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentContent, setCurrentContent] = useState(content);
  
  const handleFeedbackProcessed = (updatedContent: string) => {
    try {
      // Try to parse the updated content
      // This is more complex for study guides since they contain HTML
      // For simplicity, we'll just look for a title tag and use the rest as content
      
      const titleMatch = updatedContent.match(/<h1>(.*?)<\/h1>/);
      let newTitle = currentTitle;
      let newContent = updatedContent;
      
      if (titleMatch) {
        newTitle = titleMatch[1];
      }
      
      setCurrentTitle(newTitle);
      setCurrentContent(newContent);
      
      if (onFeedbackProcessed) {
        onFeedbackProcessed({
          title: newTitle,
          content: newContent
        });
      }
    } catch (error) {
      console.error('Error parsing updated study guide content:', error);
    }
  };
  
  return (
    <div className="border border-gray-300 rounded-lg bg-white relative">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{currentTitle}</h2>
        <FeedbackButton 
          originalContent={currentContent}
          contentType="studyguide"
          onFeedbackProcessed={handleFeedbackProcessed}
        />
      </div>
      
      <div className="p-6">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentContent }} />
      </div>
    </div>
  );
};

export default StudyGuideWithFeedback;
