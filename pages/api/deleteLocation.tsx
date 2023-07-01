import { supabase } from '@/lib';

const deleteLocation = async (locationID: number) => {
  // console.log('ran deleteClasses');
  // console.log('locationID: ', locationID);
  const { data, error } = await supabase
    .from('locations')
    .delete()
    .eq('location_id', locationID);

  if (error) {
    // console.log('Error retrieving classes:', error);
  }

  return data;
};

export default deleteLocation;
