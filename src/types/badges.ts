
export interface Badge {
  name: string;
  description: string;
  level: 'bronze' | 'silver' | 'gold';
  earnedAt?: Date;
}

export interface UserBadge {
  name: string;
  description: string;
  level: 'bronze' | 'silver' | 'gold';
  earnedAt?: Date;
}
