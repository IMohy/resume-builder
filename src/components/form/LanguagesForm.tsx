import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Pencil, X, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language } from '@/types/resume';

const LanguagesForm: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResumeContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Language, 'id'>>({
    name: '',
    proficiency: 'intermediate',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      proficiency: value as Language['proficiency']
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateLanguage(isEditing, formData);
      setIsEditing(null);
    } else {
      addLanguage(formData);
      setIsAdding(false);
    }
    setFormData({
      name: '',
      proficiency: 'intermediate',
    });
  };

  const handleEdit = (language: Language) => {
    setIsEditing(language.id);
    setFormData({
      name: language.name,
      proficiency: language.proficiency,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      name: '',
      proficiency: 'intermediate',
    });
  };

  const getProficiencyColor = (proficiency: Language['proficiency']) => {
    switch (proficiency) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'elementary':
        return 'bg-cyan-100 text-cyan-800';
      case 'intermediate':
        return 'bg-green-100 text-green-800';
      case 'advanced':
        return 'bg-yellow-100 text-yellow-800';
      case 'fluent':
        return 'bg-orange-100 text-orange-800';
      case 'native':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('form.languages')}</CardTitle>
        {!isAdding && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('form.addLanguage')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || isEditing) && (
          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="name">{t('form.language')}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.placeholders.language')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proficiency">{t('form.proficiency')}</Label>
              <Select
                value={formData.proficiency}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('form.proficiency')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">{t('proficiencyLevels.beginner')}</SelectItem>
                  <SelectItem value="elementary">{t('proficiencyLevels.elementary')}</SelectItem>
                  <SelectItem value="intermediate">{t('proficiencyLevels.intermediate')}</SelectItem>
                  <SelectItem value="advanced">{t('proficiencyLevels.advanced')}</SelectItem>
                  <SelectItem value="fluent">{t('proficiencyLevels.fluent')}</SelectItem>
                  <SelectItem value="native">{t('proficiencyLevels.native')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                {t('form.cancel')}
              </Button>
              <Button type="submit">
                <Check className="h-4 w-4 mr-2" />
                {t('form.save')}
              </Button>
            </div>
          </form>
        )}

        {!isAdding && !isEditing && resumeData.languages.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {t('form.noLanguages')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isAdding && !isEditing && resumeData.languages.map((language) => (
            <div key={language.id} className="border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{language.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getProficiencyColor(language.proficiency)}`}>
                    {t(`proficiencyLevels.${language.proficiency}`)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(language)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(language.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguagesForm; 