import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (personalInfo: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: Omit<ResumeData['experience'][0], 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Omit<ResumeData['experience'][0], 'id'>>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<ResumeData['education'][0], 'id'>) => void;
  updateEducation: (id: string, education: Partial<Omit<ResumeData['education'][0], 'id'>>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<ResumeData['skills'][0], 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Omit<ResumeData['skills'][0], 'id'>>) => void;
  removeSkill: (id: string) => void;
  addLanguage: (language: Omit<ResumeData['languages'][0], 'id'>) => void;
  updateLanguage: (id: string, language: Partial<Omit<ResumeData['languages'][0], 'id'>>) => void;
  removeLanguage: (id: string) => void;
  addSocialMedia: (socialMedia: Omit<ResumeData['socialMedia'][0], 'id'>) => void;
  updateSocialMedia: (id: string, socialMedia: Partial<Omit<ResumeData['socialMedia'][0], 'id'>>) => void;
  removeSocialMedia: (id: string) => void;
  updateTemplate: (template: ResumeData['template']) => void;
  resetResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (personalInfo: Partial<ResumeData['personalInfo']>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...personalInfo,
      },
    }));
  };

  const addExperience = (experience: Omit<ResumeData['experience'][0], 'id'>) => {
    const id = crypto.randomUUID();
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id }],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Omit<ResumeData['experience'][0], 'id'>>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = (education: Omit<ResumeData['education'][0], 'id'>) => {
    const id = crypto.randomUUID();
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id }],
    }));
  };

  const updateEducation = (id: string, education: Partial<Omit<ResumeData['education'][0], 'id'>>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = (skill: Omit<ResumeData['skills'][0], 'id'>) => {
    const id = crypto.randomUUID();
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id }],
    }));
  };

  const updateSkill = (id: string, skill: Partial<Omit<ResumeData['skills'][0], 'id'>>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.id === id ? { ...s, ...skill } : s
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addLanguage = (language: Omit<ResumeData['languages'][0], 'id'>) => {
    const id = crypto.randomUUID();
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, { ...language, id }],
    }));
  };

  const updateLanguage = (id: string, language: Partial<Omit<ResumeData['languages'][0], 'id'>>) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, ...language } : lang
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  const addSocialMedia = (socialMedia: Omit<ResumeData['socialMedia'][0], 'id'>) => {
    const id = crypto.randomUUID();
    setResumeData((prev) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { ...socialMedia, id }],
    }));
  };

  const updateSocialMedia = (id: string, socialMedia: Partial<Omit<ResumeData['socialMedia'][0], 'id'>>) => {
    setResumeData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.map((social) =>
        social.id === id ? { ...social, ...socialMedia } : social
      ),
    }));
  };

  const removeSocialMedia = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((social) => social.id !== id),
    }));
  };

  const updateTemplate = (template: ResumeData['template']) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }));
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
  };

  const value = {
    resumeData,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addSocialMedia,
    updateSocialMedia,
    removeSocialMedia,
    updateTemplate,
    resetResumeData,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}; 