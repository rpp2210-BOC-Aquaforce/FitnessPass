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

// export const getClassPopularity = async (classID: string) => {
//   const { count, error } = await supabase
//     .from('user_classes')
//     .select('*', { count: 'exact', head: true })
//     .eq('class_id', classID);

//   if (error) {
//     throw error;
//   }

//   return count;
// };
