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
  console.log('ran fetchLocations');
  const { data, error } = await supabase
    .from('classes')
    .select('name, description, class_id, location_id, instructor, date, time, duration, total_rating, num_ratings')
    .eq('location_id', 34);


  if (error) {
    console.error(error);
  } else {
    // Do something with data
    console.log('data received from query: ', data);
    setter(data);
  }
  return -1;
};

export default fetchClasses;
