import { ResumeData } from '@/types/resume';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumePDF from './ResumePDF';

/**
 * Renders a resume as PDF and downloads it
 * @param data The resume data
 * @param isRTL Whether to use RTL layout
 * @param fileName The name of the file to download
 */
const renderResumePDF = async (
  data: ResumeData, 
  isRTL: boolean, 
  fileName: string
): Promise<void> => {
  try {
    // Create the PDF document
    const blob = await pdf(
      <ResumePDF 
        data={data} 
        isRTL={isRTL} 
      />
    ).toBlob();
    
    // Save the PDF file
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error rendering PDF:', error);
    throw error;
  }
};

export default renderResumePDF; 