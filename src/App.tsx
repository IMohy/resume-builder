import React from "react";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ResumeBuilder from "@/pages/ResumeBuilder";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/toaster";
import './i18n';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="resume-builder-theme">
      <LanguageProvider>
        <ResumeProvider>
          <ResumeBuilder />
          <Toaster />
        </ResumeProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
