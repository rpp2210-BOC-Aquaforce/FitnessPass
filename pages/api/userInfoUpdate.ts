/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import supabase from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface User {
  id?: number | null | undefined;
  studio_user?: boolean;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface Session {
  user?: User | null;
}

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return;
  }

  const session: Session | null = await getServerSession(req, res, authOptions);
  console.log('session in getserver info', session);
  const id = session?.user?.id;

  const data = req.body;

  if (!session?.user?.studio_user) {
    const {
      firstName,
      lastName,
      phone,
      age,
      street,
      city,
      state,
      zip,
      ecName,
      ecPhone,
      photo,
    } = data;
    const { error } = await supabase
      .from('users')
      .update({
        first_name: firstName || null,
        last_name: lastName || null,
        phone: phone || null,
        age: age || null,
        street: street || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        ec_name: ecName || null,
        ec_phone: ecPhone || null,
        photo: photo || null,
      })
      .eq('user_id', id);
    if (error) {
      // Handle error here
      console.error('error user signup profile', error);
      res.status(500).json({ message: 'something went wrong!' });
    }

    // if (users) {
    res.status(201).json({ message: 'Your profile has been updated!' });
    // }
  } else {
    const {
      studioName,
      photo,
    } = data;
    const { error: errorStudioUsers } = await supabase
      .from('studio_users')
      .update({
        studio_name: studioName,
        photo,
      })
      .eq('studio_id', id);

    if (errorStudioUsers) {
      // Handle error here
      console.error(errorStudioUsers);
      res.status(500).json({ message: 'something went wrong!' });
    }
    // if (studioUsers) {
    res.status(201).json({ message: 'Your profile has been updated!' });
    // }
  }
}

export default handler;
