'use client';

import React from 'react';
import { Class } from '@/lib/types';
import RatingEntry from './RatingEntry';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Ratings({ fitnessClasses } : { fitnessClasses: Class[] }) {
  const hasClasses = fitnessClasses.length > 0;
  const ratingEntries = hasClasses && fitnessClasses.map((fitnessClass: Class) => (
    <RatingEntry fitnessClass={fitnessClass} key={fitnessClass.class_id} />
  ));

  return (
    <>
      <div className="text-center text-2xl text-seafoam mb-8">My Ratings</div>
      {ratingEntries}
    </>
  );
}
