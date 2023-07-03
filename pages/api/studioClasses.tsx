import { supabase } from '@/lib';

interface StudioClass {
  class_id: number;
  location_id: number;
  name: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  total_rating: number;
  num_ratings: number;
}
type SetterFunction = (data: StudioClass[]) => void;

const fetchClasses = async (studioID: number, setter: SetterFunction) => {
  // console.log('ran fetchClasses');
  const { data: locationData, error: locationError } = await supabase
    .from('locations')
    .select('location_id')
    .eq('studio_id', studioID);

  if (locationError) {
    // console.error('Error retrieving location:', locationError);
    return;
  }

  const locationIDs = locationData.map((location) => location.location_id);

  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .in('location_id', locationIDs);

  if (error) {
    // console.error('Error retrieving classes:', error);
  } else {
    // console.log('Data received from query:', data);
    setter(data);
  }
};

export default fetchClasses;
