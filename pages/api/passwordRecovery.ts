import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function passwordRecovery(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('here? req.body', req.body);
  const { data: users, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', req.body.email);

  if (error) {
    // Handle error here
    console.error(error);
  }

  if (users && users.length !== 0) {
    const result = await supabase.auth.resetPasswordForEmail(req.body.email);
    console.log('supabase result user', result);
    res.status(200).json({ message: 'Member founded! Please check your email for password reset link!' });
    return;
  }
  const { data: studioUsers, error: errorStudioUsers } = await supabase
    .from('studio_users')
    .select('studio_email')
    .eq('studio_email', req.body.email);

  if (errorStudioUsers) {
    // Handle error here
    console.error(errorStudioUsers);
  }

  if (studioUsers && studioUsers.length !== 0) {
    const result = await supabase.auth.resetPasswordForEmail(req.body.email);
    console.log('supabase result studio', result);
    res.status(200).json({ message: 'Studio user founded! Please check your email for password reset link!!' });
    return;
  }
  res.status(422).json({ message: 'No user founded!' });
}
