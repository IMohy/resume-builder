import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageContext();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        
        <div className="flex items-center gap-4">
          <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value as 'en' | 'ar')}>
            <ToggleGroupItem value="en" aria-label="Toggle English">
              {t('language.english')}
            </ToggleGroupItem>
            <ToggleGroupItem value="ar" aria-label="Toggle Arabic">
              {t('language.arabic')}
            </ToggleGroupItem>
          </ToggleGroup>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header; 