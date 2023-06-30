import { supabase } from '@/lib';

interface StudioClass {
  location_id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  total_rating: number;
}
type SetterFunction = (data: StudioClass[]) => void;

const fetchClasses = async (studioID: number, setter: SetterFunction) => {
  console.log('ran fetchLocations');
  const { data, error } = await supabase
    .from('locations')
    .select('name, street, city, state, zip, phone, total_rating, location_id')
    .eq('studio_id', studioID);
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
