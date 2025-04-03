
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfile } from '@/components/AnalysisReport.d';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import AvatarUpload from '../AvatarUpload';

interface ProfileTabProps {
  userProfile: UserProfile;
  onSignOut: () => Promise<void>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userProfile, onSignOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || '');
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    bio: userProfile.bio || '',
    age: userProfile.age || '',
    country: userProfile.country || '',
    city: userProfile.city || '',
    height: userProfile.height || '',
    weight: userProfile.weight || '',
    preferredFoot: userProfile.preferredFoot || '',
    position: userProfile.position || ''
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAvatarUpdate = (url: string) => {
    setAvatarUrl(url);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate preferred foot to ensure it's one of the allowed values
      let preferredFoot = null;
      if (formData.preferredFoot === 'Left' || formData.preferredFoot === 'Right' || formData.preferredFoot === 'Both') {
        preferredFoot = formData.preferredFoot;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          bio: formData.bio,
          age: formData.age ? parseInt(formData.age.toString()) : null,
          country: formData.country,
          city: formData.city,
          height: formData.height,
          weight: formData.weight,
          preferred_foot: preferredFoot,
          position: formData.position
        })
        .eq('id', userProfile.id);
      
      if (error) throw error;
      
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم تحديث معلومات الملف الشخصي بنجاح.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "فشل التحديث",
        description: "تعذر تحديث ملفك الشخصي. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">الملف الشخصي</h3>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>تعديل الملف الشخصي</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(false)}>إلغاء</Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>معلومات الملف الشخصي</CardTitle>
            <CardDescription>
              تحديث معلوماتك الشخصية
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">الاسم</div>
                  <div>{userProfile.name}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">البريد الإلكتروني</div>
                  <div>{userProfile.email}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">نبذة شخصية</div>
                  <div>{userProfile.bio || 'لا توجد نبذة متاحة'}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">العمر</div>
                    <div>{userProfile.age || 'غير محدد'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">المركز</div>
                    <div>{userProfile.position || 'غير محدد'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">الدولة</div>
                    <div>{userProfile.country || 'غير محدد'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">المدينة</div>
                    <div>{userProfile.city || 'غير محدد'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">الطول</div>
                    <div>{userProfile.height || 'غير محدد'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">الوزن</div>
                    <div>{userProfile.weight || 'غير محدد'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">القدم المفضلة</div>
                    <div>{userProfile.preferredFoot || 'غير محدد'}</div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">العمر</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">المركز</Label>
                    <Select 
                      value={formData.position}
                      onValueChange={(value) => handleSelectChange('position', value)}
                    >
                      <SelectTrigger id="position">
                        <SelectValue placeholder="اختر المركز" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Forward">مهاجم</SelectItem>
                        <SelectItem value="Midfielder">وسط</SelectItem>
                        <SelectItem value="Defender">مدافع</SelectItem>
                        <SelectItem value="Goalkeeper">حارس مرمى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">الدولة</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">الطول (سم)</Label>
                    <Input
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="مثال: 180"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">الوزن (كجم)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="مثال: 75"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredFoot">القدم المفضلة</Label>
                    <Select 
                      value={formData.preferredFoot}
                      onValueChange={(value) => handleSelectChange('preferredFoot', value)}
                    >
                      <SelectTrigger id="preferredFoot">
                        <SelectValue placeholder="اختر القدم المفضلة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Left">اليسرى</SelectItem>
                        <SelectItem value="Right">اليمنى</SelectItem>
                        <SelectItem value="Both">كلتاهما</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>الحساب</CardTitle>
            <CardDescription>
              إدارة إعدادات حسابك
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <AvatarUpload
              userId={userProfile.id}
              url={avatarUrl}
              onAvatarUpdate={handleAvatarUpdate}
              size="lg"
            />
            
            <div className="text-center">
              <div className="font-medium text-lg">{userProfile.name}</div>
              <div className="text-sm text-muted-foreground">{userProfile.email}</div>
              {userProfile.position && (
                <div className="mt-1 text-sm font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {userProfile.position}
                </div>
              )}
            </div>
            
            <div className="w-full">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onSignOut}
              >
                تسجيل الخروج
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
