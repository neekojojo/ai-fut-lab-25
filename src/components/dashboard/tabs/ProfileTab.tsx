import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfile } from '@/components/AnalysisReport.d';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ProfileTabProps {
  userProfile: UserProfile;
  onSignOut: () => Promise<void>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userProfile, onSignOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "We couldn't update your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Your Profile</h3>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Name</div>
                  <div>{userProfile.name}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <div>{userProfile.email}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Bio</div>
                  <div>{userProfile.bio || 'No bio available'}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Age</div>
                    <div>{userProfile.age || 'Not specified'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Position</div>
                    <div>{userProfile.position || 'Not specified'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Country</div>
                    <div>{userProfile.country || 'Not specified'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">City</div>
                    <div>{userProfile.city || 'Not specified'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Height</div>
                    <div>{userProfile.height || 'Not specified'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Weight</div>
                    <div>{userProfile.weight || 'Not specified'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Preferred Foot</div>
                    <div>{userProfile.preferredFoot || 'Not specified'}</div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
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
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select 
                      value={formData.position}
                      onValueChange={(value) => handleSelectChange('position', value)}
                    >
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Forward">Forward</SelectItem>
                        <SelectItem value="Midfielder">Midfielder</SelectItem>
                        <SelectItem value="Defender">Defender</SelectItem>
                        <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="e.g. 180"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 75"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredFoot">Preferred Foot</Label>
                    <Select 
                      value={formData.preferredFoot}
                      onValueChange={(value) => handleSelectChange('preferredFoot', value)}
                    >
                      <SelectTrigger id="preferredFoot">
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
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.avatarUrl || ''} />
              <AvatarFallback className="text-2xl">{userProfile.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
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
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
