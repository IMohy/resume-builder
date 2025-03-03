export type Language = 'en' | 'ar';

export interface LanguageOption {
  value: Language;
  label: string;
  dir: 'ltr' | 'rtl';
}

export const languageOptions: LanguageOption[] = [
  { value: 'en', label: 'English', dir: 'ltr' },
  { value: 'ar', label: 'العربية', dir: 'rtl' },
]; 