/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { hashPassword } from '@/lib/auth';
import supabase from '@/lib/supabase';

async function handler(
  req: { method: string; body: any; },
  res: { status: (arg0: number) => { (): any; new(): any;
    json: { (arg0: { message: string; }): void; new(): any; }; }; },
) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const {
    email,
    password,
    isStudio,
    studioName,
    studioPhoto,
  } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({ message: 'Invalid Input, please re-enter your email or password' });
    return;
  }

  // const userTable = isStudio ? 'studio_users' : 'users';
  // const userEmail = isStudio ? 'studio_email' : 'email';
  // console.log('userTable', userTable);
  // change the sign up logic here -> scen both studio_user and users table;
  const { data: users, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email);

  if (error) {
    // Handle error here
    console.error(error);
  }

  if (users && users.length !== 0) {
    res.status(422).json({ message: 'User is already exist' });
    return;
  }

  const { data: studio, error: errorStudio } = await supabase
    .from('studio_users')
    .select('studio_name')
    .eq('studio_name', studioName);

  if (errorStudio) {
    // Handle error here
    console.error(errorStudio);
  }

  if (studio && studio.length !== 0) {
    res.status(422).json({ message: 'Studio is already exist' });
    return;
  }

  const { data: studioUsers, error: errorStudioUsers } = await supabase
    .from('studio_users')
    .select('studio_email')
    .eq('studio_email', email);

  if (errorStudioUsers) {
    // Handle error here
    console.error(errorStudioUsers);
  }

  if (studioUsers && studioUsers.length !== 0) {
    res.status(422).json({ message: 'User is already exist' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  if (!isStudio) {
    await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }]);
  } else {
    await supabase
      .from('studio_users')
      .insert([{
        studio_email: email,
        password: hashedPassword,
        studio_name: studioName,
        photo: studioPhoto,
      }]);
  }
  res.status(201).json({ message: 'New user account created! Please wait while we redirect you ...' });
}
export default handler;
