import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResumeData } from '@/types/resume';
import { useLanguageContext } from '@/contexts/LanguageContext';
import QRCode from '@/components/ui/QRCode';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { t } = useTranslation();
  const { dir } = useLanguageContext();
  const { personalInfo, experience, education, skills, languages, socialMedia } = data;

  // Generate QR code value - use custom link if provided, otherwise use contact info
  const qrCodeValue = personalInfo.qrLink || `BEGIN:VCARD
VERSION:3.0
N:${personalInfo.name}
TEL:${personalInfo.phone}
EMAIL:${personalInfo.email}
ADR:${personalInfo.address}
END:VCARD`;

  // QR code title - use custom title if provided, otherwise use default
  const qrCodeTitle = personalInfo.qrLink 
    ? (personalInfo.qrTitle || t('qrCode.defaultTitle'))
    : t('pdf.scanForContact');

  return (
    <div className={`bg-white text-black p-8 max-w-4xl mx-auto shadow-lg ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-xl text-gray-600">{personalInfo.jobTitle}</p>
        
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div>
              <span className="font-semibold">{t('form.email')}:</span> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <span className="font-semibold">{t('form.phone')}:</span> {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div>
              <span className="font-semibold">{t('form.address')}:</span> {personalInfo.address}
            </div>
          )}
        </div>

        {socialMedia.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
            {socialMedia.map((social) => (
              <a 
                key={social.id} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-gray-200 pb-1">
            {t('form.summary')}
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-gray-200 pb-1">
            {t('form.experience')}
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.isPresent ? t('form.present') : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 font-semibold">{exp.company}</p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-gray-200 pb-1">
            {t('form.education')}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree} - {edu.field}</h3>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.isPresent ? t('form.present') : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600 font-semibold">{edu.institution}</p>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills and Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2 border-b border-gray-200 pb-1">
              {t('form.skills')}
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {skills.map((skill) => (
                <li key={skill.id}>
                  {skill.name}
                  <span className="text-gray-600 ml-2">
                    {Array(skill.level).fill('★').join('')}
                    {Array(5 - skill.level).fill('☆').join('')}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2 border-b border-gray-200 pb-1">
              {t('form.languages')}
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {languages.map((language) => (
                <li key={language.id}>
                  {language.name}
                  <span className="text-gray-600 ml-2">
                    ({t(`proficiencyLevels.${language.proficiency}`)})
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      
      {/* Footer with QR Code */}
      <footer className="mt-8 pt-4 border-t border-gray-300 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <p>{t('pdf.generatedWith')} Resume Builder</p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        
        <div className={dir === 'rtl' ? 'mr-auto' : 'ml-auto'}>
          <QRCode 
            value={qrCodeValue}
            size={80}
            title={qrCodeTitle}
          />
        </div>
      </footer>
    </div>
  );
};

export default ClassicTemplate; 