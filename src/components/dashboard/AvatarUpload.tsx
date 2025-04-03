
import React, { useState, useRef, ChangeEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserIcon, Upload, X, Camera, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AvatarUploadProps {
  userId: string;
  url: string | null;
  onAvatarUpdate: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32"
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({ 
  userId, 
  url, 
  onAvatarUpdate,
  size = 'md' 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Validate file size and type
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "الملف كبير جدًا",
          description: "يجب أن يكون حجم الصورة أقل من 5 ميجابايت",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      
      if (!file.type.match('image.*')) {
        toast({
          title: "نوع ملف غير صالح",
          description: "يرجى تحميل صورة فقط",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userId);
        
      if (updateError) {
        throw updateError;
      }
      
      onAvatarUpdate(data.publicUrl);
      
      toast({
        title: "تم تحديث الصورة الشخصية",
        description: "تم تحميل الصورة الشخصية بنجاح",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "فشل تحميل الصورة",
        description: "حدث خطأ أثناء تحميل الصورة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const removeAvatar = async () => {
    try {
      setIsUploading(true);
      
      if (!url) return;
      
      // Extract file path from the URL
      const urlParts = url.split('/');
      const filePath = urlParts[urlParts.length - 1];
      
      // Delete avatar from storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([filePath]);
      
      // Even if deletion fails, we still want to remove the URL from the profile
      
      // Update profile to remove avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', userId);
        
      if (updateError) {
        throw updateError;
      }
      
      onAvatarUpdate('');
      
      toast({
        title: "تم إزالة الصورة الشخصية",
        description: "تم إزالة الصورة الشخصية بنجاح",
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        title: "فشل إزالة الصورة",
        description: "حدث خطأ أثناء إزالة الصورة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar 
        className={`${sizeClasses[size]} border-2 border-primary cursor-pointer transition-all`}
        onClick={handleClick}
      >
        {url ? (
          <AvatarImage src={url} alt="Profile" />
        ) : (
          <AvatarFallback className="bg-primary/20">
            <UserIcon className="h-1/2 w-1/2 text-primary" />
          </AvatarFallback>
        )}
      </Avatar>

      {/* Overlay with controls */}
      {isHovering && (
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
          <div className="flex flex-col gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white hover:bg-white/20" 
              onClick={handleClick}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
            
            {url && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-white hover:bg-white/20" 
                onClick={removeAvatar}
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={uploadAvatar}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};

export default AvatarUpload;
