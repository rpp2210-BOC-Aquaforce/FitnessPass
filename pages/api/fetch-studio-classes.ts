import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// Gets class_id and name for all classes for a given studio
export default async function getStudioClasses(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, error } = await supabase
    .from('classes')
    .select('class_id, name, locations!inner(location_id)')
    .eq('locations.studio_id', `${req.body.studioId}`);
  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).json({ data });
  }
}
