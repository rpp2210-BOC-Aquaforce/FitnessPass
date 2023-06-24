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
      <div className="flex flex-row justify-end text-2xl md:w-1/3 text-2xl mt-5">
        <Link href="/user/123/profile"> My Profile</Link>
      </div>
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Ratings</h1>
      <div className="relative sm:inset-10 md:w-1/3">
        <div className="inline-block">
          <label htmlFor="form">
            Rate this class:
            <div className="bg-white">
              Class Name:
              {' '}
              {classList.name}
              <br />
              Class Description:
              {' '}
              {classList.description}
              <br />
              Class Date:
              {' '}
              {classList.date}
              <br />
              Instructor:
              {' '}
              {classList.instructor}
              <br />
            </div>
            <form>
              <label htmlFor="rating">
                1
                <input name="rating" type="radio" value="1" onChange={onChange} />
              </label>
              <label htmlFor="rating">
                2
                <input name="rating" type="radio" value="2" onChange={onChange} />
              </label>
              <label htmlFor="rating">
                3
                <input name="rating" type="radio" value="3" onChange={onChange} />
              </label>
              <label htmlFor="rating">
                4
                <input name="rating" type="radio" value="4" onChange={onChange} />
              </label>
              <label htmlFor="rating">
                5
                <input name="rating" type="radio" value="5" onChange={onChange} />
              </label>
              <button type="button" className="ml-5 rounded-lg border-black border-2">Submit</button>
            </form>
          </label>
        </div>
        <br />
      </div>
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3">
        <Link href="/user/123/favorites"> My Schedule</Link>
        <Link href="/user/123/classes"> Classes</Link>
        <Link href="/user/123/favorites"> My Favorites</Link>
      </div>
    </div>
  );
}
