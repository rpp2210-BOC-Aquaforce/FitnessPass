/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
import supabase from '../lib/supabase';
import RatingEntry from './RatingEntry';
// eslint-disable-next-line import/no-extraneous-dependencies

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Ratings() {
interface FetchClass{
  id: number,
  class_id: number,
  user_id: number,
  class_rating: number,
  created_at: string,
  favorite: boolean
}

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

 interface ClassRatings{
  class_id: string,
  rating: number,
 }

 const carouselSettings = {
   dots: false,
   arrows: true,
   infinite: false,
   slidesToShow: 2,
   slidesToScroll: 2,
   vertical: true,
   verticalSwiping: true,
 };

 const [classes, setClasses] = useState<FetchClass[]>([]);
 const [classList, setClassList] = useState<ClassList[]>([]);
 const [classRatings, setClassRatings] = useState<ClassRatings[]>([]);

 async function getClasses(id: number) {
   try {
     const { data: allClasses, error } = await supabase
       .from('classes')
       .select('*')
       .eq('class_id', id);
     if (error) {
       console.error('Supabase Error: ', error);
     } else {
       const classExists = classList.some((classItem) => classItem.class_id === id);
       if (!classExists) {
         setClassList((prevList) => [...prevList, ...allClasses]);
       }
     }
   } catch (err) {
     console.error('Unexpected error: ', err);
   }
 }

 const fetchRatings = (allRatings: Array<any> | any[]) => {
   // const obj: Record<string, number> = {};
   //  for (let i = 0; i < allRatings.length; i += 1) {
   //    const key = allRatings[i].id;
   //    obj[key] = allRatings[i].class_rating;
   //  }
   //  setClassRatings(obj as ClassRatings[]);
   const ratings: ClassRatings[] = allRatings.map((rating: any) => ({
     class_id: rating.id,
     rating: rating.class_rating,
   }));
   setClassRatings(ratings);
 };

 useEffect(() => {
   async function getUserClass() {
     try {
       const { data: userClasses, error } = await supabase
         .from('user_classes')
         .select('*')
         .eq('user_id', 1);
       if (error) {
         console.error('Supabase Error: ', error);
       } else {
         // console.log('sers', userClasses);
         setClasses(userClasses);
         fetchRatings(userClasses);
       }
     } catch (err) {
       console.error('Unexpected error: ', err);
     }
   }

   getUserClass();
 }, []);

 useEffect(() => {
   classes.forEach((classItem) => {
     getClasses(classItem.class_id);
   });
 }, [classes]);

 return (
   <div>
     <div className="flex justify-end md:w-1/3 mt-5 text-seafoam">
       <Link href="/user/123/profile">
         My Profile
         <FontAwesomeIcon icon={faUser} className="pl-2 pr-3" />
       </Link>
     </div>
     <div className="relative mx-auto text-center text-2xl text-seafoam mb-8">My Ratings</div>
     {/* <div>
        {classList.map((rating: ClassList) => (
          <RatingEntry
            rating={rating}
            key={rating.class_id}
          />
        ))}
      </div> */}
     <Slider {...carouselSettings}>
       {classRatings.length > 0
          && classList.map((rating: ClassList) => (
            <RatingEntry rating={rating} key={rating.class_id} classRating={classRatings} />
          ))}
     </Slider>
   </div>
 );
}
