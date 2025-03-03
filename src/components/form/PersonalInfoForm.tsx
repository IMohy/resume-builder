import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import QRCodeLinkForm from './QRCodeLinkForm';

const PersonalInfoForm: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('form.personalInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('form.name')}</Label>
            <Input
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              placeholder={t('form.placeholders.name')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('form.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder={t('form.placeholders.email')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('form.phone')}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder={t('form.placeholders.phone')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">{t('form.jobTitle')}</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleChange}
              placeholder={t('form.placeholders.jobTitle')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t('form.address')}</Label>
            <Input
              id="address"
              name="address"
              value={personalInfo.address}
              onChange={handleChange}
              placeholder={t('form.placeholders.address')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">{t('form.summary')}</Label>
            <Textarea
              id="summary"
              name="summary"
              value={personalInfo.summary}
              onChange={handleChange}
              placeholder={t('form.placeholders.summary')}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* QR Code Link Form */}
      <QRCodeLinkForm />
    </div>
  );
};

export default PersonalInfoForm; 