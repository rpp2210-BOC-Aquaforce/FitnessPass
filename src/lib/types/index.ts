import { Session } from 'next-auth';

export type ReactChildren = {
  children: React.ReactNode;
}

export interface Location {
  name: string | null;
  photo_url?: string | null;
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

export interface CustomSession extends Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  } & Session['user'];
}

export interface StudioAddClass {
  [key: string]: unknown;
  loc_id: string;
  location: string;
  class_name: string;
  class_description: string;
  class_date: string;
  class_start: string;
  class_duration: number;
  class_tags: string;
  instructor: string;
}
