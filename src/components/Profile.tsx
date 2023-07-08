/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { CustomSession } from '@/lib/types';
import { useSession } from 'next-auth/react';

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

export default function Profile() {
  const [user, setUser] = useState<User>(defaultUser);
  const { data: session } = useSession() as { data: CustomSession | null };
  const userId = session?.user?.id;
  async function getUserInfo() {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId);
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

  if (!session) {
    return null;
  }

  return (
    <div className="text-m mt-4 md:mt-8">
      <h1 id="profile-title" className="relative mx-auto text-center text-m text-seafoam mb-8">

        My Profile

      </h1>

      <div className="w-full flex justify-center">
        <div className="ml-2 mr-2 w-full bg-white p-4 mb-4 text-xs justify-center h-25 mb-5 h-full rounded-lg shadow">
          <div className="flex mb-4">
            <div className="w-1/3 p-2 h-full flex items-start">
              <img
                src={user.photo}
                alt="user_photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3">
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">First Name:</p>
                <p className="text-orange">{user.first_name}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">Last Name:</p>
                <p className="text-orange">{user.last_name}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">   Preferred Email:</p>
                <p className="text-orange">{user.email}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Phone Number:</p>
                <p className="text-orange">{user.phone}</p>
              </div>

              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Age:</p>
                <p className="text-orange">{user.age}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Street:</p>
                <p className="text-orange">{user.street}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">City:</p>
                <p className="text-orange">{user.city}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">State:</p>
                <p className="text-orange">{user.state}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Zip:</p>
                <p className="text-orange">{user.zip}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Emergency Contact Name:</p>
                <p className="text-orange">{user.ec_name}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Emergency Contact Phone:</p>
                <p className="text-orange">{user.ec_phone}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
