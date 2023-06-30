import { supabase } from '@/lib';

interface StudioLocation {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  total_rating: number | null;
}
type SetterFunction = (data: [StudioLocation]) => void;

const fetchLocations = async (studioID: number, setter: SetterFunction) => {
  const { data, error } = await supabase
    .from('locations')
    .select('name, street, city, state, zip, phone, total_rating')
    .eq('studio_id', studioID);
  if (error) {
    // console.error(error);
  } else {
    // Do something with data
    console.log('data: ', data[0]);
    setter(data[0]);
  }
  return -1;
};

export default fetchLocations;
