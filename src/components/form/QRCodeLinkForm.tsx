import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import QRCode from '@/components/ui/QRCode';

const QRCodeLinkForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const [qrLink, setQrLink] = useState(resumeData.personalInfo.qrLink || '');
  const [qrTitle, setQrTitle] = useState(resumeData.personalInfo.qrTitle || '');
  const [isEditing, setIsEditing] = useState(false);

  // Helper function to ensure URL has proper format
  const formatUrl = (url: string): string => {
    if (!url) return '';
    
    // If URL doesn't start with http:// or https://, add https://
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`;
    }
    
    return url;
  };

  const handleSave = () => {
    try {
      // Format and validate the URL
      const formattedUrl = formatUrl(qrLink);
      new URL(formattedUrl); // Will throw if invalid
      
      // Update the resume data
      updatePersonalInfo({ 
        ...resumeData.personalInfo, 
        qrLink: formattedUrl,
        qrTitle: qrTitle || t('qrCode.defaultTitle')
      });
      
      setQrLink(formattedUrl);
      setIsEditing(false);
      
      toast({
        title: t('actions.saved'),
        description: t('qrCode.linkSaved'),
      });
    } catch {
      toast({
        title: t('errors.invalidUrl'),
        description: t('errors.pleaseEnterValidUrl'),
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setQrLink(resumeData.personalInfo.qrLink || '');
    setQrTitle(resumeData.personalInfo.qrTitle || '');
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('qrCode.title')}</CardTitle>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            {resumeData.personalInfo.qrLink ? t('actions.edit') : t('qrCode.add')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="qrLink">{t('qrCode.link')}</Label>
              <Input
                id="qrLink"
                value={qrLink}
                onChange={(e) => setQrLink(e.target.value)}
                placeholder={t('qrCode.linkPlaceholder')}
              />
              <p className="text-sm text-muted-foreground">
                {t('qrCode.description')}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qrTitle">{t('qrCode.titleLabel')}</Label>
              <Input
                id="qrTitle"
                value={qrTitle}
                onChange={(e) => setQrTitle(e.target.value)}
                placeholder={t('qrCode.titlePlaceholder')}
              />
              <p className="text-sm text-muted-foreground">
                {t('qrCode.titleDescription')}
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                {t('actions.cancel')}
              </Button>
              <Button onClick={handleSave}>
                {t('actions.save')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {resumeData.personalInfo.qrLink ? (
              <>
                <QRCode 
                  value={resumeData.personalInfo.qrLink} 
                  size={150}
                  title={resumeData.personalInfo.qrTitle || t('qrCode.defaultTitle')}
                />
                <p className="text-sm text-center text-muted-foreground">
                  {t('qrCode.willBeDisplayed')}
                </p>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t('qrCode.noLink')}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeLinkForm; 