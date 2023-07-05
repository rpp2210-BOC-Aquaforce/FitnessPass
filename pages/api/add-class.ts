import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function addClass(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { error } = await supabase
    .from('classes')
    .insert([{
      location_id: Number(req.body.loc_id),
      name: req.body.class_name,
      description: req.body.class_description,
      date: req.body.class_date,
      time: req.body.class_start,
      duration: req.body.class_duration,
      tags: JSON.stringify(req.body.class_tags),
      instructor: req.body.instructor,
      total_rating: 0,
      num_ratings: 0,
    }]);
  if (error) {
    res.status(400).send(error);
  } else {
    res.status(201).json({});
  }
}
