import React from 'react';
import { useResumeContext } from '@/contexts/ResumeContext';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResumeContext();
  
  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div className="bg-muted p-4 rounded-lg shadow-inner overflow-auto h-full">
      <div className="transform scale-90 origin-top">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview; 