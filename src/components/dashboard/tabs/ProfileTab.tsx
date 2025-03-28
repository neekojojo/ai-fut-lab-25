
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, Lock, LogOut, Upload, Edit, User, ExternalLink, MapPin, Flag, Ruler, Weight } from 'lucide-react';
import { UserProfile } from '@/components/AnalysisReport.d';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  
  // Add state for new profile fields
  const [age, setAge] = useState<number | undefined>(userProfile?.age);
  const [country, setCountry] = useState<string | undefined>(userProfile?.country || '');
  const [city, setCity] = useState<string | undefined>(userProfile?.city || '');
  const [height, setHeight] = useState<string | undefined>(userProfile?.height || '');
  const [weight, setWeight] = useState<string | undefined>(userProfile?.weight || '');
  const [preferredFoot, setPreferredFoot] = useState<'Left' | 'Right' | 'Both' | undefined>(userProfile?.preferredFoot);
  const [position, setPosition] = useState<string | undefined>(userProfile?.position || '');

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
        title: "Profile Picture Updated",
        description: "Your profile picture has been uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Error Uploading Image",
        description: "An error occurred while uploading your image. Please try again.",
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
          bio: bio,
          age: age,
          country: country,
          city: city,
          height: height,
          weight: weight,
          preferred_foot: preferredFoot,
          position: position
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setIsEditingProfile(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error Updating Profile",
        description: "An error occurred while updating your profile. Please try again.",
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
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your personal account information</CardDescription>
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
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Enter your name" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Select value={position} onValueChange={setPosition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                          <SelectItem value="Defender">Defender</SelectItem>
                          <SelectItem value="Midfielder">Midfielder</SelectItem>
                          <SelectItem value="Forward">Forward</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        value={age || ''} 
                        onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : undefined)} 
                        placeholder="Enter your age" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        placeholder="Enter your country" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        placeholder="Enter your city" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input 
                        id="height" 
                        value={height} 
                        onChange={(e) => setHeight(e.target.value)} 
                        placeholder="E.g., 5'10\" (178cm)" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input 
                        id="weight" 
                        value={weight} 
                        onChange={(e) => setWeight(e.target.value)} 
                        placeholder="E.g., 160lbs (73kg)" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="preferredFoot">Preferred Foot</Label>
                      <Select 
                        value={preferredFoot} 
                        onValueChange={(value) => setPreferredFoot(value as 'Left' | 'Right' | 'Both')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred foot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Left">Left</SelectItem>
                          <SelectItem value="Right">Right</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      placeholder="Enter your bio" 
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {position && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{position}</span>
                      </div>
                    )}
                    
                    {age && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-muted-foreground">Age:</span>
                        <span>{age}</span>
                      </div>
                    )}
                    
                    {country && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Flag className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{country}</span>
                      </div>
                    )}
                    
                    {city && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{city}</span>
                      </div>
                    )}
                    
                    {height && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{height}</span>
                      </div>
                    )}
                    
                    {weight && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Weight className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{weight}</span>
                      </div>
                    )}
                    
                    {preferredFoot && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-muted-foreground">Foot:</span>
                        <span>{preferredFoot}</span>
                      </div>
                    )}
                  </div>
                  
                  {bio && (
                    <p className="mt-2 text-sm">{bio}</p>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {userProfile.badges.length} Badges
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {userProfile.analyses.length} Analyses
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {userProfile.trainingProgress.videosWatched} Videos Watched
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
                  Cancel
                </Button>
                <Button onClick={updateProfile}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsEditingProfile(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    A password reset link will be sent to your email
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to send a password reset link?
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={async () => {
                    if (!user?.email) return;
                    
                    try {
                      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
                      if (error) throw error;
                      
                      toast({
                        title: "Password Reset Link Sent",
                        description: "Check your email for password reset instructions",
                      });
                    } catch (error) {
                      console.error('Error sending password reset email:', error);
                      toast({
                        variant: "destructive",
                        title: "Password Reset Error",
                        description: "An error occurred while sending the password reset email. Please try again.",
                      });
                    }
                  }}>
                    Send Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full justify-start" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
