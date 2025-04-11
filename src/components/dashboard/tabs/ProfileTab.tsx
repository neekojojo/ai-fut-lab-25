
import React, { useState } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from '@/types/userProfile';
import { Edit2, Save } from "lucide-react";

interface ProfileTabProps {
  userProfile: UserProfile;
  onSignOut: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userProfile, onSignOut = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    avatarUrl: userProfile.avatarUrl || '',
    name: userProfile.name,
    email: userProfile.email,
    bio: userProfile.bio || '',
    age: userProfile.age || 0,
    country: userProfile.country || '',
    city: userProfile.city || '',
    height: userProfile.height || 0,
    weight: userProfile.weight || 0,
    preferredFoot: userProfile.preferredFoot || 'right',
    level: userProfile.level,
    position: userProfile.position
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save changes to the backend
    console.log("Profile saved:", profile);
  };

  const handleChange = (field: string, value: string | number) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <TabsContent value="profile" className="space-y-6">
      <Card>
        <CardHeader className="relative border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">الملف الشخصي</CardTitle>
            {isEditing ? (
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit2 className="h-4 w-4 ml-2" />
                تعديل
              </Button>
            )}
          </div>
          <CardDescription>
            عرض وتعديل بيانات الملف الشخصي
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  تغيير الصورة
                </Button>
              )}
              <div className="text-center">
                <h3 className="font-medium text-lg">{profile.name}</h3>
                <p className="text-muted-foreground text-sm">{profile.email}</p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block" />

            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">المعلومات الأساسية</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">السيرة الذاتية</label>
                    {isEditing ? (
                      <Input 
                        value={profile.bio} 
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="أدخل نبذة عنك"
                      />
                    ) : (
                      <p className="text-sm">{profile.bio || "لا توجد معلومات"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">العمر</label>
                    {isEditing ? (
                      <Input 
                        type="number" 
                        value={profile.age} 
                        onChange={(e) => handleChange('age', Number(e.target.value))}
                      />
                    ) : (
                      <p className="text-sm">{profile.age || "غير محدد"}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البلد</label>
                    {isEditing ? (
                      <Input 
                        value={profile.country} 
                        onChange={(e) => handleChange('country', e.target.value)}
                        placeholder="أدخل البلد"
                      />
                    ) : (
                      <p className="text-sm">{profile.country || "غير محدد"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المدينة</label>
                    {isEditing ? (
                      <Input 
                        value={profile.city} 
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="أدخل المدينة"
                      />
                    ) : (
                      <p className="text-sm">{profile.city || "غير محدد"}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الطول (سم)</label>
                    {isEditing ? (
                      <Input 
                        type="number" 
                        value={profile.height} 
                        onChange={(e) => handleChange('height', Number(e.target.value))}
                      />
                    ) : (
                      <p className="text-sm">{profile.height || "غير محدد"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الوزن (كجم)</label>
                    {isEditing ? (
                      <Input 
                        type="number" 
                        value={profile.weight} 
                        onChange={(e) => handleChange('weight', Number(e.target.value))}
                      />
                    ) : (
                      <p className="text-sm">{profile.weight || "غير محدد"}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">القدم المفضلة</label>
                    {isEditing ? (
                      <Select 
                        defaultValue={profile.preferredFoot}
                        onValueChange={(value) => handleChange('preferredFoot', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القدم المفضلة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="right">اليمنى</SelectItem>
                          <SelectItem value="left">اليسرى</SelectItem>
                          <SelectItem value="both">كلاهما</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm">
                        {profile.preferredFoot === 'right' ? 'اليمنى' : 
                         profile.preferredFoot === 'left' ? 'اليسرى' : 
                         profile.preferredFoot === 'both' ? 'كلاهما' : 'غير محدد'}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المركز</label>
                    {isEditing ? (
                      <Select 
                        defaultValue={profile.position}
                        onValueChange={(value) => handleChange('position', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المركز" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="هجوم">هجوم</SelectItem>
                          <SelectItem value="وسط">وسط</SelectItem>
                          <SelectItem value="دفاع">دفاع</SelectItem>
                          <SelectItem value="حراسة مرمى">حراسة مرمى</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm">{profile.position}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-center md:justify-end">
          <Button variant="outline" onClick={onSignOut}>
            تسجيل الخروج
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default ProfileTab;
