'use client';

import React from 'react';
import { Class, UserClassFunction } from '@/lib/types';
import RatingEntry from './RatingEntry';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Ratings({ userId, updateUserClass, fitnessClasses } :
  {
    userId: string,
    updateUserClass: UserClassFunction,
    fitnessClasses: Class[] }) {
  const hasClasses = fitnessClasses.length > 0;
  const ratingEntries = hasClasses && fitnessClasses.map((fitnessClass: Class) => (
    <RatingEntry
      userId={userId}
      updateUserClass={updateUserClass}
      fitnessClass={fitnessClass}
      key={fitnessClass.class_id}
    />
  ));

  return (
    <>
      <div className="text-center text-2xl text-seafoam mb-8">My Ratings</div>
      {ratingEntries}
    </>
  );
}
