'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/order, import/no-duplicates
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import FavoriteEntry from './FavoriteEntry';
import supabase from '../lib/supabase';

export default function MyFavorites() {
  interface ClassListAgain {
    class_id: number;
    location_id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    duration: number;
    instructor: string;
    total_rating: number;
    num_ratings: number;
    created_at: string;
  }

  const [classListAgain, setClassListAgain] = useState<ClassListAgain[]>([]);

  async function getClassesAgain() {
    try {
      const { data: allClasses, error } = await supabase
        .from('classes')
        .select('*')
        .eq('class_id', 2);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        setClassListAgain(allClasses); // Update the state with the array of classes
        console.log('my fav', classListAgain);
        console.log('type here', typeof allClasses);
        return allClasses;
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  }

  useEffect(() => {
    getClassesAgain();
  }, []);

  return (
    <div className="text-m">
      <div className="flex justify-end md:w-1/3 mt-5 text-seafoam">
        <Link href="/user/123/profile">
          My Profile
          <FontAwesomeIcon icon={faUser} className="pl-2 pr-3" />
        </Link>
      </div>
      <h1 className="relative mx-auto text-center text-2xl text-seafoam mb-8">My Favorites</h1>
      {classListAgain.map((favorite: ClassListAgain) => (
        <FavoriteEntry
          favorite={favorite}
          key={favorite.class_id}
        />
      ))}
    </div>
  );
}
