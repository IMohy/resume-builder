export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  address: string;
  summary: string;
  qrLink?: string; // Optional QR code link
  qrTitle?: string; // Optional QR code title
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'fluent' | 'native';
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  socialMedia: SocialMedia[];
  template: 'classic' | 'modern' | 'creative';
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    address: '',
    summary: '',
    qrLink: '',
    qrTitle: '',
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  socialMedia: [],
  template: 'classic',
}; 