import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { classId } = req.query;
  const { rating } = req.body;

  if (req.method === 'PUT') {
    try {
      console.log('Ratings PUT classId: ', classId);
      const { error } = await supabase
        .from('user_classes')
        .update({ class_rating: rating })
        .eq('class_id', classId);

      if (error) {
        console.error('Supabase Error: ', error);
        res.status(500).json({ error: 'Error updating rating' });
      } else {
        res.status(200).json({ message: 'Rating updated successfully' });
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
      res.status(500).json({ error: 'Unexpected error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
