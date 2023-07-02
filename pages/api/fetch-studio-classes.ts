import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// Get location IDs for studio from locations
// Get class IDs & class name for each location from classes
// Get attendance from user_classes
export default async function getStudioClasses(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('getStudioClasses Activated for studio_id: ', req.body.studioId);
  // Gets class_id and name for all classes for a given studio
  const { data, error } = await supabase
    .from('classes')
    .select('class_id, name, locations!inner(location_id)')
    .eq('locations.studio_id', `${req.body.studioId}`);

  if (error) {
    res.status(400).send(error);
  } else {
    console.log(`Data from getStudioClasses for studio id ${req.body.studioId}: `, data);
    res.status(200).json({ data });
  }
}
