
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  level: string;
  earnedAt?: Date;
}

// BadgeItem type - make sure it's exported
export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: string;
}
