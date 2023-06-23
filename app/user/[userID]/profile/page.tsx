'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '../../../../lib/supabase';

export default function UserProfile() {
  interface User {
   age: number,
   city: string,
   created_at: string,
   ec_name: string,
   ec_phone: string,
   email: string,
   first_name: string,
   last_name: string,
   password: string,
   phone: string,
   photo: string,
   state: string,
   street: string,
   user_id: number,
   zip: string
}

  const defaultUser = {
    user_id: 0,
    first_name: 'Loading...',
    last_name: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...',
    age: 0,
    street: 'Loading...',
    city: 'Loading...',
    state: 'Loading...',
    zip: 'Loading...',
    password: 'Loading...',
    ec_name: 'Loading...',
    ec_phone: 'Loading...',
    photo: 'Loading...',
    created_at: 'Loading...',
  };

  const [user, setUser] = useState<User>(defaultUser);

  async function getUserInfo() {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        setUser(users[0]);
        return users;
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  return (
    <div className="text-2xl">
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Profile</h1>
      <div className="inline-flex">
        <div className="relative sm:inset-7 border-red-800 lg:rounded text-5xl bg-gray-500 max-w-xs max-h-100">
          Photo:
        </div>
        <div className="relative sm:inset-10  max-w-xs mb-12">
          First Name:
          {' '}
          {user.first_name}
          <br />
          Last Name:
          <br />
          Preferred Email:
          <br />
          Phone Number:
          <br />
          Age:
          <br />
          Street:
          <br />
          City:
          <br />
          State:
          <br />
          Zip:
          <br />
          Emergency Contact Name:
          <br />
          Emergency Contact Phone:
        </div>
      </div>
      <div className="relative sm:inset-10 mb-12">
        Next bill due in 30 days!
      </div>
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3">
        <Link href="/user/123/favorites"> My Schedule</Link>
        <Link href="/user/123/classes"> Classes</Link>
        <Link href="/user/123/favorites"> My Favorites</Link>
        <Link href="/user/123/ratings"> My Ratings</Link>

      </div>
    </div>
  );
}
