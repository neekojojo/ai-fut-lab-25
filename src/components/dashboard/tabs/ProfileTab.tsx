
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, Lock, LogOut, Upload, Edit, User, ExternalLink } from 'lucide-react';
import { UserProfile } from '@/components/AnalysisReport.d';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

interface ProfileTabProps {
  userProfile: UserProfile;
  onSignOut: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userProfile, onSignOut }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile?.avatarUrl || null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploadingAvatar(true);
      
      // Create a unique file path for the avatar
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL of the uploaded file
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      
      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      setAvatarUrl(publicUrl);
      
      toast({
        title: "تم تحديث صورة الملف الشخصي",
        description: "تم تحميل الصورة بنجاح",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "خطأ في تحميل الصورة",
        description: "حدث خطأ أثناء تحميل الصورة. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          bio: bio
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setIsEditingProfile(false);
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم تحديث معلومات ملفك الشخصي بنجاح",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "خطأ في تحديث الملف الشخصي",
        description: "حدث خطأ أثناء تحديث معلومات ملفك الشخصي. الرجاء المحاولة مرة أخرى.",
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ملفك الشخصي</CardTitle>
          <CardDescription>إدارة معلومات حسابك الشخصي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 md:space-x-reverse rtl:md:space-x-6 mb-6">
            <div className="relative w-24 h-24 mb-4 md:mb-0">
              {isEditingProfile ? (
                <>
                  <Avatar className="w-24 h-24 border-2 border-primary cursor-pointer" onClick={triggerFileInput}>
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10">
                        <UserIcon className="h-12 w-12 text-primary" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div 
                    className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-4 w-4" />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleAvatarUpload}
                    disabled={isUploadingAvatar}
                  />
                </>
              ) : (
                <Avatar className="w-24 h-24 border-2 border-primary/10">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10">
                      <UserIcon className="h-12 w-12 text-primary" />
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
            </div>
            
            <div className="w-full">
              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">الاسم</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="أدخل اسمك" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">السيرة الذاتية</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      placeholder="أدخل سيرتك الذاتية" 
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  {bio && (
                    <p className="mt-2 text-sm">{bio}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {userProfile.badges.length} وسام
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {userProfile.analyses.length} تحليل
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {userProfile.trainingProgress.videosWatched} فيديو تم مشاهدته
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            {isEditingProfile ? (
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                  إلغاء
                </Button>
                <Button onClick={updateProfile}>
                  حفظ التغييرات
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsEditingProfile(true)}>
                <Edit className="mr-2 h-4 w-4" />
                تعديل الملف الشخصي
              </Button>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  تغيير كلمة المرور
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>تغيير كلمة المرور</DialogTitle>
                  <DialogDescription>
                    سيتم إرسال رابط لتغيير كلمة المرور إلى بريدك الإلكتروني
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    هل أنت متأكد من رغبتك في إرسال رابط تغيير كلمة المرور؟
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">إلغاء</Button>
                  </DialogClose>
                  <Button onClick={async () => {
                    if (!user?.email) return;
                    
                    try {
                      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
                      if (error) throw error;
                      
                      toast({
                        title: "تم إرسال رابط تغيير كلمة المرور",
                        description: "تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور",
                      });
                    } catch (error) {
                      console.error('Error sending password reset email:', error);
                      toast({
                        variant: "destructive",
                        title: "خطأ في إعادة تعيين كلمة المرور",
                        description: "حدث خطأ أثناء إرسال بريد إعادة تعيين كلمة المرور. الرجاء المحاولة مرة أخرى.",
                      });
                    }
                  }}>
                    إرسال الرابط
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full justify-start" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
