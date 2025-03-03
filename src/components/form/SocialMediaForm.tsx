import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeContext } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Pencil, X, Check, Link as LinkIcon, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { SocialMedia } from '@/types/resume';
import { useToast } from '@/components/ui/use-toast';

const SocialMediaForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { resumeData, addSocialMedia, updateSocialMedia, removeSocialMedia } = useResumeContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<SocialMedia, 'id'>>({
    platform: '',
    url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper function to ensure URL has proper format
  const formatUrl = (url: string): string => {
    if (!url) return '';
    
    // If URL doesn't start with http:// or https://, add https://
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`;
    }
    
    return url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Format the URL before saving
      const formattedData = {
        ...formData,
        url: formatUrl(formData.url)
      };
      
      // Validate URL by creating a URL object
      new URL(formattedData.url);
      
      if (isEditing) {
        updateSocialMedia(isEditing, formattedData);
        setIsEditing(null);
      } else {
        addSocialMedia(formattedData);
        setIsAdding(false);
      }
      
      setFormData({
        platform: '',
        url: '',
      });
    } catch {
      // Show error toast if URL is invalid
      toast({
        title: t('errors.invalidUrl'),
        description: t('errors.pleaseEnterValidUrl'),
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (socialMedia: SocialMedia) => {
    setIsEditing(socialMedia.id);
    setFormData({
      platform: socialMedia.platform,
      url: socialMedia.url,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      platform: '',
      url: '',
    });
  };

  const getPlatformIcon = (platform: string) => {
    const lowercasePlatform = platform.toLowerCase();
    if (lowercasePlatform.includes('github')) return <Github className="h-4 w-4" />;
    if (lowercasePlatform.includes('linkedin')) return <Linkedin className="h-4 w-4" />;
    if (lowercasePlatform.includes('twitter') || lowercasePlatform.includes('x')) return <Twitter className="h-4 w-4" />;
    if (lowercasePlatform.includes('instagram')) return <Instagram className="h-4 w-4" />;
    if (lowercasePlatform.includes('facebook')) return <Facebook className="h-4 w-4" />;
    return <LinkIcon className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('form.social')}</CardTitle>
        {!isAdding && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('form.addSocial')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || isEditing) && (
          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="platform">{t('form.platform')}</Label>
              <Input
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                placeholder={t('form.platform')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">{t('form.url')}</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                placeholder={t('form.url')}
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

        {!isAdding && !isEditing && resumeData.socialMedia.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {t('form.addSocial')} {t('actions.save')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isAdding && !isEditing && resumeData.socialMedia.map((social) => (
            <div key={social.id} className="border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getPlatformIcon(social.platform)}
                  <div className="ml-2">
                    <h3 className="font-medium">{social.platform}</h3>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {social.url}
                    </a>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(social)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSocialMedia(social.id)}
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

export default SocialMediaForm; 