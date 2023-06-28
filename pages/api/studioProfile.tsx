import { supabase } from '../../lib';

const fetchStudioData = async (studioID: number, setter: Function ) => {
  const { data, error } = await supabase
    .from('studio_users')
    .select('*')
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
