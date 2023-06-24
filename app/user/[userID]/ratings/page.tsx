'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import supabase from '../../../../lib/supabase';

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

  const defaultClass = {
    class_id: 0,
    location_id: 0,
    name: 'string',
    description: 'string',
    date: 'string',
    time: 'string',
    duration: 0,
    instructor: 'string',
    total_rating: 0,
    num_ratings: 0,
    created_at: 'string',
  };
  const [rating, setRating] = useState<number>(0);
  const [classes, setClasses] = useState<number>(0);
  const [classList, setClassList] = useState<ClassList>(defaultClass);

  async function updateRating(element: number) {
    try {
      const { error } = await supabase
        .from('user_classes')
        .update({ class_rating: element })
        .eq('class_id', 4);
      console.log('were here');
      if (error) {
        console.error('Supabase Error: ', error);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  }

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
        setClassList(allClasses[0]);
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

  // function displayRadioValue() {
  //   const element = document.getElementsByName('rating');
  //   for (let i = 0; i < element.length; i += 1) {
  //     if (element[i].checked) {
  //       // setValue(element[i].value);
  //       updateRating(element[i].value);
  //     }
  //   }
  // }

  const onChange = (e:any) => {
    console.log('changed', e.target.value);
    setRating(e.target.value);
    updateRating(rating);
  };

  return (
    <div className="text-2xl">
      <div className="flex justify-end md:w-1/3 mt-5">
        <Link href="/user/123/profile">My Profile</Link>
      </div>
      <h1 className="relative m:inset-x-20 inset-y-4 text-5xl">My Ratings</h1>
      <div className="relative sm:inset-10 md:w-1/3">
        <div>
          <label htmlFor="form" className="block mb-4">
            Rate this class:
            <div className="bg-white p-4 mb-4">
              <p className="font-bold">Class Name:</p>
              <p>{classList.name}</p>
              <p className="font-bold">Class Description:</p>
              <p>{classList.description}</p>
              <p className="font-bold">Class Date:</p>
              <p>{classList.date}</p>
              <p className="font-bold">Instructor:</p>
              <p>{classList.instructor}</p>
            </div>
          </label>
          <form>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <label htmlFor={`rating-${value}`} key={value} className="flex items-center mr-4">
                  {value}
                  <input
                    name="rating"
                    id={`rating-${value}`}
                    type="radio"
                    value={value}
                    onChange={onChange}
                    className="ml-1"
                  />
                </label>
              ))}
            </div>
            <button type="button" className="ml-5 rounded-lg border border-black py-2 px-4">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3">
        <Link href="/user/123/favorites">My Schedule</Link>
        <Link href="/user/123/classes">Classes</Link>
        <Link href="/user/123/favorites">My Favorites</Link>
      </div>
    </div>
  );
}
