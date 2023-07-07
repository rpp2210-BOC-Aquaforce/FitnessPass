import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';
import { hashPassword } from '@/lib/auth';

export default async function passwordRecovery(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const hashedPassword = await hashPassword(req.body.password);
  const { data: users, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', req.body.emailParam);

  if (error) {
    // Handle error here
    console.error(error);
  }

  if (users && users.length !== 0) {
    await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('email', req.body.emailParam);
    res.status(200).json({ message: 'Member password has been updated successfully!' });
    return;
  }
  const { data: studioUsers, error: errorStudioUsers } = await supabase
    .from('studio_users')
    .select('studio_email')
    .eq('studio_email', req.body.emailParam);

  if (errorStudioUsers) {
    // Handle error here
    console.error(errorStudioUsers);
  }

  if (studioUsers && studioUsers.length !== 0) {
    await supabase
      .from('studio_users')
      .update({ password: hashedPassword })
      .eq('email', req.body.emailParam);
    res.status(200).json({ message: 'Studio password has been updated successfully!' });
    return;
  }
  res.status(422).json({ message: 'No user founded! Please register first!' });
}
