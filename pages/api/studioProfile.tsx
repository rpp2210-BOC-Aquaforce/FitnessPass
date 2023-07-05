import { supabase } from '@/lib';

interface StudioUser {
  studio_name: string;
  studio_email: string;
  photo: string;
}
type SetterFunction = (data: StudioUser) => void;

const fetchStudioData = async (studioID: number, setter: SetterFunction) => {
  const { data, error } = await supabase
    .from('studio_users')
    .select('studio_name, studio_email, photo')
    .eq('studio_id', studioID);
  if (error) {
    // console.error(error);
  } else {
    // Do something with data
    // console.log('data: ', data[0]);
    setter(data[0]);
  }
  return -1;
};

export default fetchStudioData;
