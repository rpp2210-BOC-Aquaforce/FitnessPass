import supabase from '../../lib/supabase.js';

export default async function getStudioInfo() {
  try {
    // Make a GET request to your Supabase database
    const { data, error } = await supabase.from('studio_users').select('*');

    if (error) {
      throw error;
    }
    return data;

    // Return the data as a response
  } catch (error) {
    // console.log(error);
  }
  return -1;
}
