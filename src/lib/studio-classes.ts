import { StudioAddClass } from '@/lib/types';
import supabase from './supabase';

export const getStudioLocations = async (studioID: string) => {
  const { data, error } = await supabase
    .from('locations')
    .select('location_id, name')
    .eq('studio_id', studioID);
  if (error) {
    throw error;
  }

  return data;
};

export const getClassPopularity = async (studioID: string) => {
  const { data, error } = await supabase
    .from('user_classes')
    .select('classes!inner(class_id, name, locations!inner(location_id, studio_id))')
    .eq('classes.locations.studio_id', studioID);

  if (error) {
    throw error;
  }

  return data;
};

export const getClassesByDate = async (studioID: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('user_classes')
    .select('classes!inner(class_id, date, locations!inner(location_id, studio_id))')
    .eq('classes.locations.studio_id', studioID)
    .gt('classes.date', startDate)
    .lte('classes.date', endDate);

  if (error) {
    throw error;
  }

  return data;
};

export const addClass = async (classData: StudioAddClass) => {
  const { error } = await supabase
    .from('classes')
    .insert([{
      location_id: Number(classData.loc_id),
      name: classData.class_name,
      description: classData.class_description,
      date: classData.class_date,
      time: classData.class_start,
      duration: classData.class_duration,
      tags: JSON.stringify(classData.class_tags),
      instructor: classData.instructor,
      total_rating: 0,
      num_ratings: 0,
    }]);

  if (error) {
    throw error;
  }
};
