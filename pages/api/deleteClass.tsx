import { supabase } from '@/lib';

const deleteClass = async (classID: number) => {
  // console.log('ran deleteClasses');
  // console.log('classID: ', classID);
  const { data, error } = await supabase
    .from('classes')
    .delete()
    .eq('class_id', classID);

  if (error) {
    // console.log('Error retrieving classes:', error);
  }
  return data;
};

export default deleteClass;
