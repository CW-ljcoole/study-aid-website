'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">StudyAI</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/documents" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Documents
            </Link>
            <Link href="/notes" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Notes
            </Link>
            <Link href="/study-tools" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Study Tools
            </Link>
          </nav>

          {/* User menu */}
          <div className="flex items-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
