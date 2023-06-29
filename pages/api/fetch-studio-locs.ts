import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../lib/supabase';

export default async function getStudioLocations(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, error } = await supabase
    .from('locations')
    .select('location_id, name')
    .eq('studio_id', req.body.studioId);
  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).json({ data });
  }
}
