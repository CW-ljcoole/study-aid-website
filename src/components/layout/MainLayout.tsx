'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
