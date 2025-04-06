'use client';

import React, { useState } from 'react';

interface StudyGuideProps {
  content?: string;
  documentId?: string;
  title?: string;
}

const StudyGuide: React.FC<StudyGuideProps> = ({ 
  content = '',
  documentId,
  title = 'Study Guide'
}) => {
  const [editMode, setEditMode] = useState(false);
  const [guideContent, setGuideContent] = useState(content || sampleContent);
  const [guideTitle, setGuideTitle] = useState(title);
  
  const generateStudyGuide = () => {
    // In a real implementation, this would call the LLM API to generate a study guide
    alert('This would call the LLM API to generate a study guide from the document');
  };
  
  const saveStudyGuide = () => {
    // In a real implementation, this would save the study guide to the database
    alert('Study guide saved successfully!');
    setEditMode(false);
  };
  
  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white">
      <div className="bg-gray-100 p-3 border-b border-gray-300 flex justify-between items-center">
        {editMode ? (
          <input
            type="text"
            value={guideTitle}
            onChange={(e) => setGuideTitle(e.target.value)}
            className="text-lg font-medium bg-white border border-gray-300 rounded px-2 py-1 w-1/3"
          />
        ) : (
          <h2 className="text-lg font-medium">{guideTitle}</h2>
        )}
        <div className="flex space-x-2">
          <button 
            onClick={() => setEditMode(!editMode)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          {editMode ? (
            <button 
              onClick={saveStudyGuide}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <button 
              onClick={generateStudyGuide}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Generate from Document
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {editMode ? (
          <textarea
            value={guideContent}
            onChange={(e) => setGuideContent(e.target.value)}
            className="w-full h-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: guideContent }} />
        )}
      </div>
    </div>
  );
};

// Sample content for demonstration
const sampleContent = `
<h1>Introduction to Large Language Models</h1>

<h2>Overview</h2>
<p>Large Language Models (LLMs) are a type of artificial intelligence model designed to understand, generate, and manipulate human language. They are trained on vast amounts of text data and can perform a wide range of language tasks.</p>

<h2>Key Concepts</h2>
<h3>1. Neural Networks</h3>
<p>LLMs are built on neural network architectures, specifically transformer models, which allow them to process and generate text by understanding the relationships between words and phrases.</p>

<h3>2. Training Process</h3>
<p>LLMs are trained through a process called unsupervised learning, where they learn patterns from large datasets without explicit instruction. This is followed by fine-tuning on specific tasks.</p>

<h3>3. Capabilities</h3>
<ul>
  <li><strong>Text Generation:</strong> Creating human-like text based on prompts</li>
  <li><strong>Translation:</strong> Converting text between languages</li>
  <li><strong>Summarization:</strong> Condensing long documents into shorter versions</li>
  <li><strong>Question Answering:</strong> Providing information in response to queries</li>
  <li><strong>Code Generation:</strong> Writing programming code based on descriptions</li>
</ul>

<h2>Applications in Education</h2>
<p>LLMs have numerous applications in education, including:</p>
<ol>
  <li>Generating personalized study materials</li>
  <li>Creating practice questions and quizzes</li>
  <li>Providing explanations for complex concepts</li>
  <li>Assisting with research and writing</li>
  <li>Offering tutoring and feedback</li>
</ol>

<h2>Limitations and Considerations</h2>
<p>Despite their capabilities, LLMs have important limitations:</p>
<ul>
  <li>They may generate plausible-sounding but incorrect information</li>
  <li>They reflect biases present in their training data</li>
  <li>They have limited understanding of the real world beyond text patterns</li>
  <li>They may not be up-to-date on recent events or specialized knowledge</li>
</ul>

<h2>Summary</h2>
<p>Large Language Models represent a significant advancement in AI and natural language processing. They offer powerful tools for education and learning, but should be used with an understanding of their limitations and appropriate oversight.</p>

<h2>Key Terms to Remember</h2>
<table border="1" cellpadding="5">
  <tr>
    <th>Term</th>
    <th>Definition</th>
  </tr>
  <tr>
    <td>Transformer</td>
    <td>Neural network architecture that uses attention mechanisms to process sequential data</td>
  </tr>
  <tr>
    <td>Fine-tuning</td>
    <td>Process of adapting a pre-trained model to specific tasks or domains</td>
  </tr>
  <tr>
    <td>Prompt engineering</td>
    <td>Crafting effective inputs to guide LLM outputs</td>
  </tr>
  <tr>
    <td>Token</td>
    <td>Basic unit of text processing in LLMs (words or parts of words)</td>
  </tr>
</table>
`;

export default StudyGuide;
