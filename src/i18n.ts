import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./i18n/locales/en.json";
import arTranslation from "./i18n/locales/ar.json";

// Add export-related translations to English
const enhancedEnTranslation = {
  ...enTranslation,
  export: {
    downloadPdf: "Download PDF",
    exporting: "Exporting...",
    downloadTooltip: "Download your resume as a PDF file",
  },
  preview: {
    title: "Resume Preview",
    incomplete: "Resume Preview Not Available",
    fillRequired: "Please fill in at least your name and job title to see the preview",
  },
};

// Add export-related translations to Arabic
const enhancedArTranslation = {
  ...arTranslation,
  export: {
    downloadPdf: "تحميل PDF",
    exporting: "جاري التصدير...",
    downloadTooltip: "تحميل سيرتك الذاتية كملف PDF",
  },
  preview: {
    title: "معاينة السيرة الذاتية",
    incomplete: "معاينة السيرة الذاتية غير متاحة",
    fillRequired: "يرجى ملء اسمك والمسمى الوظيفي على الأقل لرؤية المعاينة",
  },
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enhancedEnTranslation,
    },
    ar: {
      translation: enhancedArTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
