import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Pencil, X, Check } from 'lucide-react';
import { Experience } from '@/types/resume';

const ExperienceForm: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isPresent: false,
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format date for display (YYYY-MM)
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    
    // If it's already in YYYY-MM format, return as is
    if (/^\d{4}-\d{2}$/.test(dateString)) return dateString;
    
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } catch {
      return dateString;
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateExperience(isEditing, formData);
      setIsEditing(null);
    } else {
      addExperience(formData);
      setIsAdding(false);
    }
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    });
  };

  const handleEdit = (experience: Experience) => {
    setIsEditing(experience.id);
    setFormData({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isPresent: experience.isPresent,
      description: experience.description,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('form.experience')}</CardTitle>
        {!isAdding && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('form.addExperience')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || isEditing) && (
          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="company">{t('form.company')}</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('form.company')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">{t('form.position')}</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder={t('form.position')}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">{t('form.startDate')}</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">{t('form.endDate')}</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.isPresent}
                  required={!formData.isPresent}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isPresent"
                name="isPresent"
                type="checkbox"
                checked={formData.isPresent}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isPresent" className="text-sm font-normal">
                {t('form.present')}
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('form.description')}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('form.description')}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                {t('actions.cancel')}
              </Button>
              <Button type="submit">
                <Check className="h-4 w-4 mr-2" />
                {t('actions.save')}
              </Button>
            </div>
          </form>
        )}

        {!isAdding && !isEditing && resumeData.experience.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {t('form.addExperience')} {t('actions.save')}
          </div>
        )}

        {!isAdding && !isEditing && resumeData.experience.map((experience) => (
          <div key={experience.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{experience.position}</h3>
                <p className="text-sm text-muted-foreground">{experience.company}</p>
                <p className="text-sm">
                  {formatDateForDisplay(experience.startDate)} - {experience.isPresent ? t('form.present') : formatDateForDisplay(experience.endDate)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(experience)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-sm">{experience.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm; 