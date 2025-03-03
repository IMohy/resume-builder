import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Pencil, X, Check } from 'lucide-react';
import { Education } from '@/types/resume';

const EducationForm: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
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
      updateEducation(isEditing, formData);
      setIsEditing(null);
    } else {
      addEducation(formData);
      setIsAdding(false);
    }
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    });
  };

  const handleEdit = (education: Education) => {
    setIsEditing(education.id);
    setFormData({
      institution: education.institution,
      degree: education.degree,
      field: education.field,
      startDate: education.startDate,
      endDate: education.endDate,
      isPresent: education.isPresent,
      description: education.description,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('form.education')}</CardTitle>
        {!isAdding && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('form.addEducation')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || isEditing) && (
          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="institution">{t('form.institution')}</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder={t('form.institution')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">{t('form.degree')}</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder={t('form.degree')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">{t('form.field')}</Label>
              <Input
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                placeholder={t('form.field')}
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

        {!isAdding && !isEditing && resumeData.education.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {t('form.addEducation')} {t('actions.save')}
          </div>
        )}

        {!isAdding && !isEditing && resumeData.education.map((education) => (
          <div key={education.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{education.degree} - {education.field}</h3>
                <p className="text-sm text-muted-foreground">{education.institution}</p>
                <p className="text-sm">
                  {formatDateForDisplay(education.startDate)} - {education.isPresent ? t('form.present') : formatDateForDisplay(education.endDate)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(education)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {education.description && (
              <p className="mt-2 text-sm">{education.description}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationForm; 