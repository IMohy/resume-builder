import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import ExperienceForm from "@/components/form/ExperienceForm";
import EducationForm from "@/components/form/EducationForm";
import SkillsForm from "@/components/form/SkillsForm";
import LanguagesForm from "@/components/form/LanguagesForm";
import SocialMediaForm from "@/components/form/SocialMediaForm";
import TemplateSelector from "@/components/form/TemplateSelector";
import ResumePreview from "@/components/preview/ResumePreview";
import ExportButton from "@/components/preview/ExportButton";
import { useResumeContext } from "@/contexts/ResumeContext";
import { FileText } from "lucide-react";

const ResumeBuilder: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData } = useResumeContext();
  const [activeTab, setActiveTab] = useState("personal");

  const isFormComplete = () => {
    const { personalInfo } = resumeData;
    // Basic validation to check if essential fields are filled
    return personalInfo.name && personalInfo.jobTitle;
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 h-full ">
                  <TabsTrigger value="personal">{t("form.personal")}</TabsTrigger>
                  <TabsTrigger value="experience">{t("form.experience")}</TabsTrigger>
                  <TabsTrigger value="education">{t("form.education")}</TabsTrigger>
                  <TabsTrigger value="skills">{t("form.skills")}</TabsTrigger>
                  <TabsTrigger value="languages">{t("form.languages")}</TabsTrigger>
                  <TabsTrigger value="social">{t("form.social")}</TabsTrigger>
                  <TabsTrigger value="template">{t("form.template")}</TabsTrigger>
                </TabsList>

                <CardContent>
                  <TabsContent value="personal">
                    <PersonalInfoForm />
                  </TabsContent>

                  <TabsContent value="experience">
                    <ExperienceForm />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationForm />
                  </TabsContent>

                  <TabsContent value="skills">
                    <SkillsForm />
                  </TabsContent>

                  <TabsContent value="languages">
                    <LanguagesForm />
                  </TabsContent>

                  <TabsContent value="social">
                    <SocialMediaForm />
                  </TabsContent>

                  <TabsContent value="template">
                    <TemplateSelector />
                  </TabsContent>
                </CardContent>

                <div className="p-4 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["personal", "experience", "education", "skills", "languages", "social", "template"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex > 0) {
                        setActiveTab(tabs[currentIndex - 1]);
                      }
                    }}
                    disabled={activeTab === "personal"}
                  >
                    {t("form.previous")}
                  </Button>

                  <Button
                    onClick={() => {
                      const tabs = ["personal", "experience", "education", "skills", "languages", "social", "template"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1]);
                      }
                    }}
                    disabled={activeTab === "template"}
                  >
                    {t("form.next")}
                  </Button>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="h-[800px] flex flex-col">
            <div className="bg-card rounded-t-lg p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText size={20} />
                {t("preview.title")}
              </h2>

              <div className="flex items-center gap-2">
                <ExportButton />
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-muted rounded-b-lg">
              {isFormComplete() ? (
                <ResumePreview />
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-center">
                  <div>
                    <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium mb-2">{t("preview.incomplete")}</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">{t("preview.fillRequired")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeBuilder;
