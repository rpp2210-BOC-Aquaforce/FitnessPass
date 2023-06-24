'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import supabase from '../../../../lib/supabase';
import MyFavorites from '../../../../components/MyFavorites';
import FavoriteEntry from '../../../../components/FavoriteEntry';

export default async function Favorites() {
  // async function getClasses() {
  //   try {
  //     const { data: allClasses, error } = await supabase
  //       .from('classes')
  //       .select('*')
  //       .eq('class_id', 2);
  //     if (error) {
  //       console.error('Supabase Error: ', error);
  //     } else {
  //       setClassList(allClasses[0]);
  //       return allClasses;
  //     }
  //   } catch (err) {
  //     console.error('Unexpected error: ', err);
  //   }
  //   return null;
  // }

  // useEffect(() => {
  //   getUserClass();
  //   getClasses();
  // }, []);

  return (
    <div className="text-2xl">
      <div className="flex flex-row justify-end text-2xl md:w-1/3 text-2xl mt-5">
        <Link href="/user/123/profile"> My Profile</Link>
      </div>
      {/* <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Favorites</h1>
      <div className="relative sm:inset-10 md:w-1/3">
        <div className="inline-block">
          Placeholder 1
        </div>
        <br />
        <div className="inline-block">
          Placeholder 1
        </div>
        <br />
        <div className="inline-block">
          Placeholder 1
        </div>
        <br />
      </div> */}
      <MyFavorites />
      {/* <FavoriteEntry /> */}
      <div className="relative sm:inset-10 inset-y-8 flex sm:place-content-between md:w-1/3">
        <Link href="/user/123/favorites"> My Schedule</Link>
        {/* <Link href="/user/123/classes"> Classes</Link> */}
        <Link href="/user/123/ratings"> My Ratings</Link>
      </div>
    </div>
  );
}
