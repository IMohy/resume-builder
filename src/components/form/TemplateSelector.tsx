import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResumeData } from '@/types/resume';

const TemplateSelector: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, updateTemplate } = useResumeContext();

  const handleTemplateChange = (value: string) => {
    updateTemplate(value as ResumeData['template']);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('templates.selectTemplate')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={resumeData.template}
          value={resumeData.template}
          onValueChange={handleTemplateChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classic">{t('templates.classic')}</TabsTrigger>
            <TabsTrigger value="modern">{t('templates.modern')}</TabsTrigger>
            <TabsTrigger value="creative">{t('templates.creative')}</TabsTrigger>
          </TabsList>
          <TabsContent value="classic" className="mt-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold">{t('templates.classic')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('templates.classicDescription')}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="modern" className="mt-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold">{t('templates.modern')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('templates.modernDescription')}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="creative" className="mt-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold">{t('templates.creative')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('templates.creativeDescription')}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector; 