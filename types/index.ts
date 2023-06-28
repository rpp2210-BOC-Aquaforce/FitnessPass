export type ReactChildren = {
  children: React.ReactNode;
}

export interface Location {
  name: string | null;
  photo_url?: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
}

export interface Class {
  class_id: number;
  location_id: number | null;
  name: string | null;
  description: string | null;
  date: string;
  time: string | null;
  duration: number | null;
  tags: string | null; // Assuming tags is an array of strings
  instructor: string | null;
  total_rating: number | null;
  num_ratings: number | null;
  created_at: Date | null;
  locations: Location;
}

export interface UserClass {
  id: number;
  user_id: number;
  class_id: number;
  class_rating: number | null;
  favorite: boolean;
  created_at: Date | null;
  classes: Class;
}

export interface UserClasses {
  userClasses: UserClass[] | [];
}
