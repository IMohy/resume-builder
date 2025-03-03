import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResumeData } from '@/types/resume';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { t } = useTranslation();
  const { dir } = useLanguageContext();
  const { personalInfo, experience, education, skills, languages, socialMedia } = data;

  return (
    <div className={`bg-white text-black max-w-4xl mx-auto shadow-lg ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar */}
        <div className="bg-primary text-primary-foreground p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">
                {personalInfo.name.split(' ').map(name => name[0]).join('')}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-center">{personalInfo.name}</h1>
            <p className="text-lg opacity-90 mt-1 text-center">{personalInfo.jobTitle}</p>
          </div>

          <div className="space-y-6">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-bold mb-3 border-b border-primary-foreground/30 pb-2">
                {t('form.contactInfo')}
              </h2>
              <div className="space-y-3">
                {personalInfo.email && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.address && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{personalInfo.address}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Social Media */}
            {socialMedia.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 border-b border-primary-foreground/30 pb-2">
                  {t('form.socialMedia')}
                </h2>
                <div className="space-y-3">
                  {socialMedia.map((social) => (
                    <a 
                      key={social.id} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      <span>{social.platform}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 border-b border-primary-foreground/30 pb-2">
                  {t('form.skills')}
                </h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                        <div 
                          className="bg-primary-foreground h-2 rounded-full" 
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
                <h2 className="text-xl font-bold mb-3 border-b border-primary-foreground/30 pb-2">
                  {t('form.languages')}
                </h2>
                <div className="space-y-3">
                  {languages.map((language) => (
                    <div key={language.id} className="flex justify-between items-center">
                      <span className="font-medium">{language.name}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-foreground/20">
                        {language.proficiency.charAt(0).toUpperCase() + language.proficiency.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {t('form.summary')}
                </h2>
              </div>
              <p className="text-gray-700 ml-11">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {t('form.experience')}
                </h2>
              </div>
              <div className="space-y-6 ml-11">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary pl-4 pb-6">
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
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {t('form.education')}
                </h2>
              </div>
              <div className="space-y-6 ml-11">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-primary pl-4 pb-6">
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
      </div>
    </div>
  );
};

export default CreativeTemplate; 