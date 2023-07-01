import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// Get location IDs for studio from locations
// Get class IDs & class name for each location from classes
// Get attendance from user_classes
export default async function getClassPopularity(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('getClassPopularity Activated!');
  // Gets count of users for given class_id
  const { count, error } = await supabase
    .from('user_classes')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', `${req.body.classId}`);

  if (error) {
    res.status(400).send(error);
  } else {
    console.log(`Data from getClassPopularity: for classID ${req.body.classId}`, count);
    res.status(200).json({ data: count });
  }
}
