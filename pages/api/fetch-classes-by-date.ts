import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// Gets class_ids in given date range for a given studioID
export default async function getClassesByDate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('getClassesByDate Activated for studio_id: ', req.body.studioId);
  const d = new Date();
  const today = d.toLocaleDateString();
  d.setDate(d.getDate() - 6);
  const lastWeek = d.toLocaleDateString();
  console.log('Today: ', today, ' Last week: ', lastWeek);
  const { data, error } = await supabase
    .from('classes')
    .select('class_id, date, locations!inner(location_id)')
    .eq('locations.studio_id', '11')
    .gt('date', lastWeek)
    .lte('date', today);

  if (error) {
    console.error(error);
    // res.status(400).send(error);
  } else {
    console.log(`Data from getClassesByDate for studio id ${req.body.studioId}: `, data);
    // res.status(200).json({ data });
  }
}
