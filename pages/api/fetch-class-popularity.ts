import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// Gets count of users for given class_id
export default async function getClassPopularity(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { count, error } = await supabase
    .from('user_classes')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', `${req.body.classId}`);

  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).json({ data: count });
  }
}
