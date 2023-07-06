/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Class, UpdateUserClassArgs } from '@/lib/types';
// import { updateRating } from '@/lib/api';

type RatingEntryProps = {
  userId: string,
  updateUserClass: (args: UpdateUserClassArgs) => void,
  fitnessClass: Class;
};

export default function RatingEntry({ userId, updateUserClass, fitnessClass }: RatingEntryProps) {
  const [ratingValues, setRatingValues] = useState(fitnessClass.classRating ?? 0);

  const handleRatingChange = async (ratingValue: number) => {
    setRatingValues(ratingValue);
    // await updateRating(ratingValue, fitnessClass.class_id);
    await updateUserClass({
      userId,
      key: 'class_rating',
      value: ratingValue,
      classId: fitnessClass.class_id,
    });
  };

  const generateStarIcons = () => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      const starClass = i <= ratingValues ? 'text-yellow-500' : 'text-gray-300';
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`text-m w-4 h-4 ${starClass}`}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer' }}
        />,
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div id="white background" className="w-full bg-white p-4 mb-4 text-xs justify-center h-25 mb-5 h-full rounded-lg">
          <div className="flex">
            <div className="w-1/3 p-2 h-full flex items-start">
              <img
                src={fitnessClass.locations.photo_url ?? 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                alt="gym"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3">
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">Class Name:</p>
                <p className="text-orange">{fitnessClass.name}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">Class Description:</p>
                <p className="text-orange">{fitnessClass.description}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">Class Date:</p>
                <p className="text-orange">{fitnessClass.date}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Instructor:</p>
                <p className="text-orange">{fitnessClass.instructor}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Current Rating:</p>
                {/* <p className="text-orange">{ratingValues}</p> */}
                <div className="star-rating">{generateStarIcons()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
