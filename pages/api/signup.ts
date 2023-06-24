/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { hashPassword } from '../../lib/auth';
import supabase from '../../lib/supabase';

async function handler(
  req: { method: string; body: any; },
  res: { status: (arg0: number) => { (): any; new(): any;
    json: { (arg0: { message: string; }): void; new(): any; }; }; },
) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({ message: 'Invalid Input, please re-enter your email or password' });
    return;
  }

  const { data: users, error } = await supabase
    .from('users')
    .select('email, password')
    .eq('email', email);

  if (error) {
    // Handle error here
    console.error(error);
  }

  if (users && users.length !== 0) {
    res.status(422).json({ message: 'User is already exist' });
    return;
  }
  const hashedPassword = await hashPassword(password);

  await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }]);

  res.status(201).json({ message: 'new user account created!' });
}
export default handler;
