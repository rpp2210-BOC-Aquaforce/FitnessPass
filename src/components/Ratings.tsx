'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import supabase from '../lib/supabase';
import RatingEntry from './RatingEntry';

export default function Ratings() {
  interface ClassList {
    class_id: number,
    location_id: number,
    name: string,
    description: string,
    date: string,
    time: string,
    duration: number,
    instructor: string,
    total_rating: number,
    num_ratings: number,
    created_at: string,
 }

  const [classes, setClasses] = useState<number>(0);
  const [classList, setClassList] = useState<ClassList[]>([]);

  async function getUserClass() {
    try {
      const { data: userClasses, error } = await supabase
        .from('user_classes')
        .select('*')
        .eq('class_id', 2);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        setClasses(userClasses[0].class_id);
        return classes;
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  }

  async function getClasses() {
    try {
      const { data: allClasses, error } = await supabase
        .from('classes')
        .select('*')
        .eq('class_id', 2);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        setClassList(allClasses);
        return allClasses;
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  }

  useEffect(() => {
    getUserClass();
    getClasses();
  }, []);

  return (
    <div>
      <div className="flex justify-end md:w-1/3 mt-5 text-seafoam">
        <Link href="/user/123/profile">
          My Profile
          <FontAwesomeIcon icon={faUser} className="pl-2 pr-3" />
        </Link>
      </div>
      <div className="relative mx-auto text-center text-2xl text-seafoam mb-8">My Ratings</div>
      <div>
        {classList.map((rating: ClassList) => (
          <RatingEntry
            rating={rating}
            key={rating.class_id}
          />
        ))}
      </div>
    </div>
  );
}
