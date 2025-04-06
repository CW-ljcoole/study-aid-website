'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <aside className={`bg-gray-50 border-r border-gray-200 h-screen transition-all duration-300 ${expanded ? 'w-64' : 'w-20'} ${className}`}>
      <div className="p-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-200 mb-6 w-full flex justify-center"
        >
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </button>

        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            {expanded && <span>Dashboard</span>}
          </Link>
          
          <div className="pt-4 pb-2">
            {expanded && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Documents</h3>}
          </div>
          
          <Link href="/documents/upload" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {expanded && <span>Upload</span>}
          </Link>
          
          <Link href="/documents/recent" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            {expanded && <span>Recent</span>}
          </Link>
          
          <div className="pt-4 pb-2">
            {expanded && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</h3>}
          </div>
          
          <Link href="/notes/new" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {expanded && <span>New Note</span>}
          </Link>
          
          <Link href="/notes/all" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            {expanded && <span>All Notes</span>}
          </Link>
          
          <div className="pt-4 pb-2">
            {expanded && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Study Tools</h3>}
          </div>
          
          <Link href="/study-tools/flashcards" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            {expanded && <span>Flashcards</span>}
          </Link>
          
          <Link href="/study-tools/quizzes" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {expanded && <span>Quizzes</span>}
          </Link>
          
          <Link href="/study-tools/guides" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            {expanded && <span>Study Guides</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
