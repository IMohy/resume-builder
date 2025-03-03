import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResumeData } from '@/types/resume';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { t } = useTranslation();
  const { dir } = useLanguageContext();
  const { personalInfo, experience, education, skills, languages, socialMedia } = data;

  return (
    <div className={`bg-white text-black max-w-4xl mx-auto shadow-lg ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-8">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-xl opacity-90 mt-1">{personalInfo.jobTitle}</p>
        
        <div className="mt-4 flex flex-wrap gap-4 text-sm opacity-90">
          {personalInfo.email && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {personalInfo.address}
            </div>
          )}
        </div>

        {socialMedia.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {socialMedia.map((social) => (
              <a 
                key={social.id} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-primary">
              {t('form.summary')}
            </h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary">
                  {t('form.experience')}
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary transform -translate-x-1/2"></div>
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                      <p className="text-gray-500 text-sm mb-2">
                        {exp.startDate} - {exp.isPresent ? t('form.present') : exp.endDate}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-primary">
                  {t('form.education')}
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary transform -translate-x-1/2"></div>
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <p className="text-gray-600 font-medium">{edu.institution}</p>
                      <p className="text-gray-500 text-sm mb-2">
                        {edu.startDate} - {edu.isPresent ? t('form.present') : edu.endDate}
                      </p>
                      <p className="text-gray-700">{edu.field}</p>
                      {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary">
                  {t('form.skills')}
                </h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-600 text-sm">{skill.level}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-primary">
                  {t('form.languages')}
                </h2>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <div key={language.id} className="flex justify-between items-center">
                      <span className="font-medium">{language.name}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {language.proficiency.charAt(0).toUpperCase() + language.proficiency.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate; 