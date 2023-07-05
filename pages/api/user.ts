import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json({ name: 'John Doe', email: 'john.doe@example.com' });
}
