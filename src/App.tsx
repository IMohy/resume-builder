import React from "react";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ResumeBuilder from "@/pages/ResumeBuilder";
import { ThemeProvider } from "./components/ui/theme-provider";
import './i18n';
import { Toaster } from "sonner";

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
