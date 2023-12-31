import { Session } from 'next-auth';

export * from './ratings';

export type ReactChildren = {
  children: React.ReactNode;
}

interface StudioInfo {
  studio_name: string;
  studio_email: string;
  photo: string;
}

export interface Location {
  name: string | null;
  photo_url?: string | null;
  studio_users?: StudioInfo;
}

export interface Class {
  id: number;
  class_id: number;
  classRating?: number | null,
  favorite?: boolean | null,
  userId?: number | null,
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
    studio_user?: boolean;
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

export interface studioPopMetric {
  name: string | null;
  popularity: number | null;
}

export interface studioEngMetric {
  week: string | null;
  attendance: number | null;
}

export interface PopularityData {
  classes: {
    class_id: number;
    name: string;
    locations: {
      location_id: number;
      studio_id: number;
    };
  };
}

export type UpdateRatingArgs = {
  userId: string,
  rating: number,
  classId: number,
}

export type UpdateUserClassArgs = {
  userId: string | undefined,
  classId: number,
  key: string,
  value: boolean | number | string | null,
}

export type UserClassArgs = {
  userId: string | undefined;
  classId: number;
  _delete?: boolean;
  create?: boolean;
  key?: string;
  value?: boolean | number | string | null;
}

export type UpdateUserClassFunction = (args: UpdateUserClassArgs) => void;
export type UserClassFunction = (args: UserClassArgs) => void;
export type UpdateUserClassesFunction = (args: UserClassArgs, updatedClasses: Class[]) => void;
export type UpdateClassesFunction = (args: UserClassArgs, updatedClasses: Class) => void;
