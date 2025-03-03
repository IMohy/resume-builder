import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Pencil, X, Check } from 'lucide-react';
import { Skill } from '@/types/resume';

const SkillsForm: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateSkill(isEditing, formData);
      setIsEditing(null);
    } else {
      addSkill(formData);
      setIsAdding(false);
    }
    setFormData({
      name: '',
      level: 3,
    });
  };

  const handleEdit = (skill: Skill) => {
    setIsEditing(skill.id);
    setFormData({
      name: skill.name,
      level: skill.level,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      name: '',
      level: 3,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('form.skills')}</CardTitle>
        {!isAdding && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('form.addSkill')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || isEditing) && (
          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="name">{t('form.skillName')}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.placeholders.skillName')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">{t('form.skillLevel')}: {formData.level}</Label>
              <Input
                id="level"
                name="level"
                type="range"
                min="1"
                max="5"
                value={formData.level}
                onChange={handleRangeChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t('form.beginner')}</span>
                <span>{t('form.intermediate')}</span>
                <span>{t('form.expert')}</span>
              </div>
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

        {!isAdding && !isEditing && resumeData.skills.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {t('form.noSkills')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isAdding && !isEditing && resumeData.skills.map((skill) => (
            <div key={skill.id} className="border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{skill.name}</h3>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(skill)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
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

export default SkillsForm; 