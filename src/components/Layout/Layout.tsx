import React from 'react';
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header/>
      
      <main className="flex-1 pt-16 pb-16 px-4 max-w-screen-lg mx-auto w-full">
        {children}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Layout; 