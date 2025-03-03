import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
        <p>© {year} {t('app.title')}. {t('app.description')}</p>
      </div>
    </footer>
  );
};

export default Footer; 