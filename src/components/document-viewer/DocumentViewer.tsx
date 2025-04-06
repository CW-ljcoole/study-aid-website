'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DocumentViewerProps {
  documentUrl?: string;
  documentType?: 'pdf' | 'doc' | 'image' | 'text';
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  documentUrl = '', 
  documentType = 'pdf' 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  
  // Placeholder for annotations
  const [annotations, setAnnotations] = useState<any[]>([]);
  
  useEffect(() => {
    if (documentUrl) {
      setIsLoading(true);
      setError(null);
      
      // Simulate loading document
      const timer = setTimeout(() => {
        setIsLoading(false);
        // In a real implementation, we would load the document here
        // and handle any errors that might occur
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [documentUrl]);
  
  if (!documentUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg border border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <p className="text-gray-500 text-center">No document selected</p>
        <p className="text-gray-400 text-sm text-center mt-2">Upload or select a document to view</p>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border border-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500">Loading document...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg border border-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-4">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-red-400 text-sm text-center mt-2">Please try again or select a different document</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-2 border-b border-gray-300 flex items-center">
        <div className="flex space-x-2 mr-4">
          <button className="p-2 rounded hover:bg-gray-200" title="Zoom In">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button className="p-2 rounded hover:bg-gray-200" title="Zoom Out">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        </div>
        
        <div className="flex space-x-2 mr-4">
          <button className="p-2 rounded hover:bg-gray-200" title="Previous Page">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="flex items-center text-sm">Page 1 of 10</span>
          <button className="p-2 rounded hover:bg-gray-200" title="Next Page">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-200" title="Highlight">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
          <button className="p-2 rounded hover:bg-gray-200" title="Add Note">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </button>
          <button className="p-2 rounded hover:bg-gray-200" title="Generate Study Materials">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        ref={viewerRef} 
        className="flex-1 bg-white border border-gray-300 rounded-b-lg overflow-auto p-4"
      >
        {/* This would be replaced with actual document content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-sm p-8 min-h-[800px] border border-gray-200">
            <h1 className="text-2xl font-bold mb-6">Sample Document</h1>
            <p className="mb-4">This is a placeholder for the actual document content. In a real implementation, this would be replaced with the rendered document.</p>
            <p className="mb-4">For PDFs, we would use a library like PDF.js to render the document. For Word documents, we might convert them to HTML or PDF first.</p>
            <p className="mb-4">The document viewer includes tools for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Zooming in and out</li>
              <li>Navigating between pages</li>
              <li>Highlighting text</li>
              <li>Adding notes</li>
              <li>Generating study materials from the document</li>
            </ul>
            <p>Users can interact with the document and create annotations that will be saved and synchronized with their notes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
