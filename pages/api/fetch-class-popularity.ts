import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';
// import { getLocations } from '@/lib/api';

// Get location IDs for studio from locations
// Get class IDs & class name for each location from classes
// Get attendance from user_classes
export default async function getClassPopularity(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('Function Activated!');
  const { data, error } = await supabase
    // .from('user_classes')
    // .select('id, classes!inner(class_id, name, locations!inner(location_id, studio_id))')
    // .eq('locations.studio_id', '11');

    .from('classes')
    .select('class_id, name, locations!inner(location_id)')
    .eq('locations.studio_id', '11');

    // .filter('location_id', 'in', 'studios ("11")');
    // .select('class_id, name, location_id')
    // .select('class_id, name, location_id, location_id!inner (location_id)')
    // .filter('location_id', 'in', `${test}`);

  if (error) {
    res.status(400).send(error);
  } else {
    console.log('Data from Popularity: ', data);
    // res.status(200).json({ data });
  }
}
