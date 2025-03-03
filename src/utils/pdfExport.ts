import { ResumeData } from '@/types/resume';
import i18next from 'i18next';

/**
 * Exports the resume data to a PDF file
 * @param resumeData The resume data to export
 */
export const exportToPdf = async (resumeData: ResumeData): Promise<void> => {
  try {
    // Get current language
    const currentLanguage = i18next.language;
    const isRTL = currentLanguage === 'ar';

    // Generate filename based on user's name
    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    
    // Import the PDF component dynamically to avoid JSX in this file
    const { default: renderResumePDF } = await import('../components/pdf/renderResumePDF');
    
    // Render the PDF to file (downloads automatically)
    await renderResumePDF(resumeData, isRTL, fileName);
    
    return;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
}; 