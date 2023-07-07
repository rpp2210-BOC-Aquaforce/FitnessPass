import supabase from './supabase';

export const getStudioClasses = async (studioID: string) => {
  const { data, error } = await supabase
    .from('classes')
    .select('class_id, name, locations!inner(location_id)')
    .eq('locations.studio_id', studioID);

  if (error) {
    throw error;
  }

  return data;
};

export const getClassesByDate = async (studioID: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('classes')
    .select('class_id, date, locations!inner(location_id)')
    .eq('locations.studio_id', studioID)
    .gt('date', startDate)
    .lte('date', endDate);

  if (error) {
    throw error;
  }

  return data;
};

export const getClassPopularity = async (classID: string) => {
  const { count, error } = await supabase
    .from('user_classes')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', classID);

  if (error) {
    throw error;
  }

  return count;
};
