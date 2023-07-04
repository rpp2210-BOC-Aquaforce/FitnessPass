import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// Gets class_ids in given date range for a given studioID
export default async function getClassesByDate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, error } = await supabase
    .from('classes')
    .select('class_id, date, locations!inner(location_id)')
    .eq('locations.studio_id', req.body.studioID)
    .gt('date', req.body.startDate)
    .lte('date', req.body.endDate);

  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).json({ data });
  }
}
