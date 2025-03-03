import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { exportToPdf } from '@/utils/pdfExport';
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const ExportButton: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData } = useResumeContext();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError(null);
      
      // Check if essential data is present
      if (!resumeData.personalInfo.name) {
        throw new Error(t('preview.fillRequired'));
      }
      
      await exportToPdf(resumeData);
      
      toast({
        title: t('export.success'),
        description: t('export.successMessage'),
        duration: 3000,
      });
      
      setIsExporting(false);
    } catch (error) {
      console.error('Error exporting resume:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      
      toast({
        variant: "destructive",
        title: t('export.error'),
        description: error instanceof Error ? error.message : t('export.errorMessage'),
        duration: 5000,
      });
      
      setIsExporting(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="gap-2"
            variant={error ? "destructive" : "default"}
          >
            {isExporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              error ? <AlertCircle size={16} /> : <Download size={16} />
            )}
            {isExporting ? t('export.exporting') : t('export.downloadPdf')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{error ? error : t('export.downloadTooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExportButton; 