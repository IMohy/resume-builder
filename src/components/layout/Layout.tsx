import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { dir } = useLanguageContext();

  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'font-[system-ui]' : ''}`} dir={dir}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 